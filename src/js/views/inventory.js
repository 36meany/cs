const renderInventoryView = () => {
  const items = inventoryManager.sort('price');
  const total = inventoryManager.getTotalValue();
  return `<section class="page-head"><div><span class="eyebrow">КОЛЛЕКЦИЯ</span><h1>Инвентарь</h1><p class="text-muted">${items.length} предметов · стоимость ${fmt(total)} монет</p></div><button class="btn btn-secondary" id="sellAllBtn">Продать всё</button></section><div class="toolbar"><select id="inventorySort"><option value="price">Сначала дорогие</option><option value="rarity">По редкости</option><option value="recent">Новые</option></select><span class="text-muted text-sm">Нажмите на предмет для деталей</span></div>${items.length ? `<div class="skin-grid">${items.map(item => `${skinCard(item)}<button class="inventory-sell" data-sell-id="${item.id}">Продать за ◆ ${fmt(economy.getItemValue(item))}</button>`).join('')}</div>` : `<div class="empty-state"><div class="empty-state-icon">◇</div><div class="empty-state-text">Инвентарь пуст.<br>Открой первый кейс, чтобы получить предмет.</div></div>`}`;
};
const bindInventoryView = () => {
  $('#sellAllBtn')?.addEventListener('click', () => { economy.sellAll(); renderApp(); });
  $('#inventorySort')?.addEventListener('change', e => { window.inventorySort = e.target.value; renderApp(); });
  $$('#content [data-sell-id]').forEach(btn => btn.onclick = () => { const item = gameState.inventory.find(i => i.id === Number(btn.dataset.sellId)); if (item) economy.sellItem(item); renderApp(); });
};
