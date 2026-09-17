/** КЕЙСЕР - запуск приложения и маршрутизация */

window.currentView = 'cases';
window.selectedCaseId = null;

const claimDailyReward = () => {
  const now = Date.now();
  if (now - gameState.lastDailyTime < 86400000) { showToast('Награда уже получена сегодня', 'warning'); return; }
  const day = (gameState.dailyRewardDay % DAILY_REWARDS.length) + 1;
  const reward = DAILY_REWARDS[day - 1].reward;
  gameState.dailyRewardDay = day; gameState.lastDailyTime = now;
  stateManager.addCoins(reward); showToast(`🎁 День ${day}: +${fmt(reward)} монет`, 'success'); economy.updateBalance(); renderApp();
};

const showDropModal = (item, source) => {
  const r = RARITY[item.rarity] || RARITY.common;
  showModal({ title: source?.name || 'Получен предмет', content: `<div class="drop-result" style="--rarity:${r.color}"><img src="${skinImage(item)}" alt=""><h2>${esc(item.name)}</h2><span>${r.name} · ◆ ${fmt(item.price)}</span></div>`, actions: [{ label: 'Оставить', type: 'primary' }] });
  if (r.order >= 2) particleSystem.confetti(r.order >= 4 ? 60 : 25);
};

const renderApp = () => {
  const content = $('#content');
  if (!content) return;
  const selected = window.selectedCaseId && CASES.find(c => c.id === window.selectedCaseId);
  if (selected) content.innerHTML = renderCaseDetail(selected);
  else if (window.currentView === 'inventory') content.innerHTML = renderInventoryView();
  else if (window.currentView === 'upgrade') content.innerHTML = renderUpgradeView();
  else if (window.currentView === 'stats') content.innerHTML = renderStatsView();
  else if (window.currentView === 'profile') content.innerHTML = renderProfileView();
  else content.innerHTML = renderCasesView();
  document.querySelectorAll('.nav-btn,.mobile-menu-btn').forEach(b => b.classList.toggle('active', b.dataset.view === window.currentView));
  economy.updateBalance(); bindCasesView(); bindInventoryView(); bindUpgradeView(); bindProfileView();
};

const initApp = async () => {
  stateManager.load();
  if (!gameState.playerId) stateManager.initPlayer('Игрок');
  await initYandexSDK(); startAutoSave(); renderApp();
  document.querySelectorAll('[data-view]').forEach(btn => btn.addEventListener('click', () => { window.currentView = btn.dataset.view; window.selectedCaseId = null; $('#mobileMenu')?.classList.remove('active'); renderApp(); }));
  $('#menuToggle')?.addEventListener('click', () => $('#mobileMenu').classList.add('active'));
  $('#menuClose')?.addEventListener('click', () => $('#mobileMenu').classList.remove('active'));
  $('#mobileMenu')?.addEventListener('click', e => { if (e.target.id === 'mobileMenu') e.currentTarget.classList.remove('active'); });
};

document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', initApp) : initApp();
