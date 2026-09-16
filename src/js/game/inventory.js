/**
 * КЕЙСЕР - Управление инвентарём
 */

const inventoryManager = {
  // Получить все предметы
  getItems() {
    return gameState.inventory;
  },

  // Получить количество предметов
  getCount() {
    return gameState.inventory.length;
  },

  // Получить общую стоимость инвентаря
  getTotalValue() {
    return gameState.inventory.reduce((sum, item) => {
      return sum + economy.getItemValue(item);
    }, 0);
  },

  // Фильтровать по редкости
  filterByRarity(rarity) {
    return gameState.inventory.filter(item => item.rarity === rarity);
  },

  // Фильтровать по типу
  filterByType(type) {
    return gameState.inventory.filter(item => item.type === type);
  },

  // Сортировать
  sort(by = 'price') {
    const items = [...gameState.inventory];
    switch (by) {
      case 'price':
        return items.sort((a, b) => economy.getItemValue(b) - economy.getItemValue(a));
      case 'rarity':
        return items.sort((a, b) => RARITY[b.rarity].order - RARITY[a.rarity].order);
      case 'recent':
        return items.sort((a, b) => new Date(b.obtainedAt) - new Date(a.obtainedAt));
      default:
        return items;
    }
  },

  // Получить статистику
  getStats() {
    const items = gameState.inventory;
    const stats = {
      total: items.length,
      value: this.getTotalValue(),
      byRarity: {},
      byType: {},
    };

    Object.keys(RARITY).forEach(rarity => {
      const count = items.filter(i => i.rarity === rarity).length;
      stats.byRarity[rarity] = count;
    });

    const types = ['pistol', 'rifle', 'sniper', 'shotgun', 'smg', 'knife', 'gloves', 'other'];
    types.forEach(type => {
      const count = items.filter(i => i.type === type).length;
      stats.byType[type] = count;
    });

    return stats;
  },
};
