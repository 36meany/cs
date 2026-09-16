/**
 * КЕЙСЕР - Система экономики и монет
 */

const economy = {
  // Стоимость предмета с учётом состояния
  getItemValue(item) {
    if (!item) return 0;
    const basePrice = item.price || 0;
    const wearMultiplier = WEARS[item.wear]?.value || 0.5;
    return Math.round(basePrice * wearMultiplier);
  },

  // Продать предмет
  sellItem(item) {
    const value = this.getItemValue(item);
    stateManager.addCoins(value, true);
    stateManager.removeItem(item.id);
    showToast(`Продано: ${item.name} за ${fmt(value)} 💰`, 'success');
    return value;
  },

  // Продать все
  sellAll() {
    if (gameState.inventory.length === 0) {
      showToast('Инвентарь пуст', 'warning');
      return 0;
    }

    let total = 0;
    const items = [...gameState.inventory];
    items.forEach(item => {
      total += this.getItemValue(item);
    });

    stateManager.addCoins(total, true);
    gameState.inventory = [];
    showToast(`Продано всё за ${fmt(total)} 💰`, 'success');
    stateManager.save();
    return total;
  },

  // Стоимость открытия кейса
  getCaseCost(caseId) {
    const caseData = CASES.find(c => c.id === caseId);
    return caseData?.price || 0;
  },

  // Может ли открыть кейс
  canOpenCase(caseId) {
    const cost = this.getCaseCost(caseId);
    return gameState.balance >= cost;
  },

  // Открыть кейс
  openCase(caseId) {
    const cost = this.getCaseCost(caseId);
    if (!this.canOpenCase(caseId)) {
      showToast(`Недостаточно монет! Нужно ${fmt(cost)}`, 'error');
      return false;
    }

    if (!stateManager.spendCoins(cost)) {
      return false;
    }

    gameplayStart();
    return true;
  },

  // Получить случайный предмет из кейса
  rollCase(caseItems) {
    if (!caseItems || caseItems.length === 0) return null;

    // Вероятности редкостей
    const weights = [];
    const items = [];

    caseItems.forEach(item => {
      items.push(item);
      weights.push(RARITY[item.rarity]?.chance || 1);
    });

    return weightedRandom(items, weights);
  },

  // Обновить баланс в UI
  updateBalance() {
    const el = $('#balance');
    if (el) {
      el.textContent = fmt(gameState.balance);
      const balanceBox = el.closest('.balance-box');
      if (balanceBox) {
        balanceBox.classList.remove('flash');
        void balanceBox.offsetWidth; // Trigger reflow
        balanceBox.classList.add('flash');
      }
    }
  },
};
