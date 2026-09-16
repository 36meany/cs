/**
 * КЕЙСЕР - Система открытия кейсов
 */

const caseManager = {
  // Получить данные кейса
  getCase(caseId) {
    return CASES.find(c => c.id === caseId);
  },

  // Получить предметы кейса (генерируются случайно из SAMPLE_SKINS)
  getCaseItems(caseId) {
    const caseData = this.getCase(caseId);
    if (!caseData) return [];

    // Фильтруем предметы по редкости кейса
    const filtered = SAMPLE_SKINS.filter(skin => {
      const skinRarity = RARITY[skin.rarity]?.order || 0;
      const caseRarity = RARITY[caseData.rarity]?.order || 0;
      return skinRarity >= caseRarity - 1; // Немного разнообразия
    });

    // Перемешиваем и берём примерно 20-30 предметов
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 20 + Math.floor(Math.random() * 10));
  },

  // Открыть кейс (с анимацией рулетки)
  async openCase(caseId, fastMode = false) {
    const caseData = this.getCase(caseId);
    if (!caseData) return null;

    // Открыть кейс в экономике
    if (!economy.openCase(caseId)) {
      return null;
    }

    gameState.stats.totalOpened++;
    if (!gameState.stats.favoriteCase) {
      gameState.stats.favoriteCase = caseId;
    }

    const items = this.getCaseItems(caseId);
    const result = economy.rollCase(items);

    if (!result) {
      gameplayStop();
      return null;
    }

    // Добавить в инвентарь
    const item = stateManager.addItem(result);

    // Проверить достижения
    this.checkAchievements(result);

    // Звуки и эффекты
    if (RARITY[result.rarity].order >= 2) {
      sounds.winRare();
    }
    if (RARITY[result.rarity].order >= 4) {
      sounds.winLegendary();
      particleSystem.confetti(50);
    }

    gameplayStop();
    stateManager.save();

    return { item, caseData, items };
  },

  // Проверить и разблокировать достижения
  checkAchievements(item) {
    const rarity = item.rarity;

    if (gameState.stats.totalOpened === 1) {
      stateManager.unlockAchievement('first_open');
    }
    if (gameState.stats.totalOpened === 10) {
      stateManager.unlockAchievement('ten_opens');
    }
    if (rarity === 'rare' && !gameState.achievements.includes('rare_drop')) {
      stateManager.unlockAchievement('rare_drop');
    }
    if (rarity === 'mythical' && !gameState.achievements.includes('mythical_drop')) {
      stateManager.unlockAchievement('mythical_drop');
    }
    if (rarity === 'legendary' && !gameState.achievements.includes('legendary_drop')) {
      stateManager.unlockAchievement('legendary_drop');
    }
    if (gameState.inventory.length === 50 && !gameState.achievements.includes('collector')) {
      stateManager.unlockAchievement('collector');
    }
    if (gameState.totalEarned >= 100000 && !gameState.achievements.includes('rich')) {
      stateManager.unlockAchievement('rich');
    }
  },
};
