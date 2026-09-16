/**
 * КЕЙСЕР - Система достижений и статистики
 */

const achievementManager = {
  // Получить достижение
  getAchievement(id) {
    return ACHIEVEMENTS.find(a => a.id === id);
  },

  // Получить все достижения
  getAllAchievements() {
    return ACHIEVEMENTS.map(a => ({
      ...a,
      unlocked: gameState.achievements.includes(a.id),
    }));
  },

  // Получить статистику достижений
  getStats() {
    const total = ACHIEVEMENTS.length;
    const unlocked = gameState.achievements.length;
    const points = gameState.achievements.reduce((sum, id) => {
      const achievement = this.getAchievement(id);
      return sum + (achievement?.points || 0);
    }, 0);

    return { total, unlocked, points, percentage: Math.round((unlocked / total) * 100) };
  },

  // Получить прогресс достижений
  getProgress() {
    const progress = {};

    // Открытие кейсов
    progress.opens = {
      current: gameState.stats.totalOpened,
      targets: [1, 10, 50, 100, 500],
    };

    // Редкие предметы
    progress.rare = {
      current: gameState.stats.totalDropped.filter(r => r === 'rare').length,
      targets: [1, 5, 10, 25],
    };

    progress.mythical = {
      current: gameState.stats.totalDropped.filter(r => r === 'mythical').length,
      targets: [1, 3, 5, 10],
    };

    progress.legendary = {
      current: gameState.stats.totalDropped.filter(r => r === 'legendary').length,
      targets: [1, 2, 5],
    };

    // Баланс
    progress.money = {
      current: gameState.totalEarned,
      targets: [100, 1000, 10000, 100000],
    };

    // Коллекция
    progress.collection = {
      current: gameState.inventory.length,
      targets: [10, 25, 50, 100],
    };

    return progress;
  },
};
