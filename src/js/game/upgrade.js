/**
 * КЕЙСЕР - Система апгрейдов и трейдов
 */

const upgradeManager = {
  // Рассчитать шанс апгрейда
  calculateChance(fromPrice, toPrice, addedBalance = 0) {
    const invest = fromPrice + (addedBalance || 0);
    if (!toPrice || toPrice <= 0) return 0;
    const raw = invest / toPrice;
    return Math.max(0.01, Math.min(0.95, raw * 0.95));
  },

  // Выполнить апгрейд
  executeUpgrade(fromItem, toItemData, addedBalance = 0) {
    if (!fromItem || !toItemData) return { success: false };

    const chance = this.calculateChance(fromItem.price, toItemData.price, addedBalance);
    const success = Math.random() < chance;

    // Потратить баланс
    if (addedBalance > 0) {
      stateManager.spendCoins(addedBalance);
    }

    // Удалить исходный предмет
    stateManager.removeItem(fromItem.id);

    if (success) {
      // Добавить целевой предмет
      const newItem = stateManager.addItem(toItemData);
      sounds.winRare();
      showToast(`✨ Апгрейд успешен!`, 'success');
      particleSystem.burst(window.innerWidth / 2, window.innerHeight / 2, 20, 'star');
      return { success: true, item: newItem, chance };
    } else {
      sounds.lose();
      showToast(`💥 Апгрейд не удался...`, 'error');
      return { success: false, chance };
    }
  },

  // Найти рекомендуемые цели для апгрейда
  getUpgradeTargets(fromItem, limit = 30) {
    if (!fromItem) return [];

    const basePrice = fromItem.price;
    const minPrice = Math.max(1, basePrice * 0.9);
    const maxPrice = basePrice * 5; // До 5x цены

    const filtered = SAMPLE_SKINS.filter(skin => {
      return skin.price >= minPrice && skin.price <= maxPrice && skin.rarity !== fromItem.rarity;
    });

    return filtered.sort(() => Math.random() - 0.5).slice(0, limit);
  },

  // Контракты (обмен нескольких на один)
  executeContract(items, targetRarity) {
    if (items.length < 3) return null;

    // Проверить что все одной редкости
    const baseRarity = items[0].rarity;
    if (!items.every(i => i.rarity === baseRarity)) {
      showToast('Все предметы должны быть одной редкости', 'error');
      return null;
    }

    // Найти рекомендуемый результат
    const totalValue = items.reduce((s, i) => s + economy.getItemValue(i), 0);
    const targetValue = totalValue * 0.55; // 55% стоимости входа

    const targetPool = SAMPLE_SKINS.filter(skin => {
      return RARITY[skin.rarity].order === RARITY[baseRarity].order + 1;
    });

    if (targetPool.length === 0) return null;

    // Найти ближайшую по цене
    const result = targetPool.reduce((prev, curr) => {
      const prevDist = Math.abs(prev.price - targetValue);
      const currDist = Math.abs(curr.price - targetValue);
      return currDist < prevDist ? curr : prev;
    });

    // Удалить входящие предметы
    items.forEach(item => stateManager.removeItem(item.id));

    // Добавить результат
    const newItem = stateManager.addItem(result);
    sounds.magic();
    showToast(`🎁 Контракт выполнен!`, 'success');

    return newItem;
  },
};
