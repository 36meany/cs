const skinImage = (skin) => `https://raw.githubusercontent.com/36meany/cs/main/${skin.folder}/${encodeURIComponent(skin.name)}.png`;

const caseCard = (item) => `
  <article class="case-card" data-case-id="${item.id}" style="--case-a:${item.color1};--case-b:${item.color2}">
    <div class="case-card-glow"></div>
    <img class="case-image" src="${item.icon}" alt="${esc(item.name)}" loading="lazy">
    <div class="case-card-body"><div class="case-card-name">${esc(item.name)}</div><div class="case-card-meta"><span>${item.rarity}</span><strong>◆ ${fmt(item.price)}</strong></div></div>
  </article>`;

const renderCasesView = () => {
  const featured = CASES.slice(0, 3);
  return `<section class="page-head"><div><span class="eyebrow">КЕЙСЕР / DROP HUB</span><h1>Выбери свой дроп</h1><p class="text-muted">Открывай кейсы, собирай настоящие CS2-скины и поднимайся в рейтинге.</p></div><button class="btn btn-secondary" id="dailyRewardBtn">🎁 Ежедневная награда</button></section>
  <section class="hero-case"><div><span class="badge badge-primary">СЕГОДНЯ В ТРЕНДЕ</span><h2>${esc(featured[0].name)}</h2><p>Три уровня редкости. Один шанс на легендарный предмет.</p><button class="btn btn-primary" data-case-id="${featured[0].id}">Открыть за ◆ ${fmt(featured[0].price)}</button></div><img src="${featured[0].icon}" alt="" class="hero-case-image"></section>
  <div class="section-title"><h2>Все кейсы</h2><span class="text-muted text-sm">${CASES.length} коллекций</span></div>
  <div class="case-grid">${CASES.map(caseCard).join('')}</div>`;
};

const renderCaseDetail = (caseData) => {
  const items = caseManager.getCaseItems(caseData.id);
  return `<button class="btn btn-ghost" id="backCases">← Все кейсы</button><section class="case-detail"><img src="${caseData.icon}" class="case-detail-image" alt=""><div><span class="badge badge-primary">${caseData.rarity}</span><h1>${esc(caseData.name)}</h1><p class="text-muted">Возможные предметы · ${items.length}</p><button class="btn btn-primary" id="openCaseBtn">Открыть за ◆ ${fmt(caseData.price)}</button></div></section><div class="section-title"><h2>Содержимое кейса</h2></div><div class="skin-grid">${items.map(i => skinCard(i)).join('')}</div>`;
};

const skinCard = (item) => `<article class="skin-card" style="--rarity:${RARITY[item.rarity].color}"><img src="${skinImage(item)}" alt="${esc(item.name)}" loading="lazy" onerror="this.style.display='none'"><div class="skin-card-name">${esc(item.name)}</div><div class="skin-card-foot"><span>${RARITY[item.rarity].name}</span><strong>◆ ${fmt(item.price)}</strong></div></article>`;

const bindCasesView = () => {
  $$('#content [data-case-id]').forEach(el => el.onclick = () => {
    const id = el.dataset.caseId;
    const selected = CASES.find(c => c.id === id);
    if (selected) { window.selectedCaseId = id; renderApp(); }
  });
  $('#backCases')?.addEventListener('click', () => { window.selectedCaseId = null; renderApp(); });
  $('#openCaseBtn')?.addEventListener('click', async () => {
    const result = await caseManager.openCase(window.selectedCaseId);
    if (result) showDropModal(result.item, result.caseData);
    economy.updateBalance(); renderApp();
  });
  $('#dailyRewardBtn')?.addEventListener('click', claimDailyReward);
};
