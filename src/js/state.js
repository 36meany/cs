/**
 * КЕЙСЕР - Управление состоянием игры
 */

const gameState = {
  // Профиль
  playerId: null,
  playerName: 'Player',
  avatar: '👤',
  level: 1,
  exp: 0,
  expNext: 500,

  // Экономика
  balance: 500,
  premiumBalance: 0,
  totalSpent: 0,
  totalEarned: 500,

  // Инвентарь
  inventory: [],
  nextItemId: 1,

  // Статистика
  stats: {
    totalOpened: 0,
    totalDropped: [],
    highestRarity: 'common',
    mostExpensive: 0,
    favoriteCase: null,
  },

  // Достижения
  achievements: [],
  dailyRewardDay: 0,
  lastDailyTime: 0,

  // Батлпасс
  battlepass: {
    active: false,
    tier: 0,
    progress: 0,
  },

  // Настройки
  settings: {
    soundEnabled: true,
    musicEnabled: true,
    vibrationEnabled: true,
    language: 'ru',
    theme: 'dark',
  },

  // Версия сохранения
  version: 2,
};

// Методы управления состоянием
const stateManager = {
  // Добавить монеты
  addCoins(amount, earned = true) {
    gameState.balance += amount;
    if (earned) {
      gameState.totalEarned += amount;
    }
    this.addExp(Math.floor(amount / 10));
    this.save();
  },

  // Потратить монеты
  spendCoins(amount) {
    if (gameState.balance >= amount) {
      gameState.balance -= amount;
      gameState.totalSpent += amount;
      this.save();
      return true;
    }
    return false;
  },

  // Добавить опыт
  addExp(amount) {
    gameState.exp += amount;
    const nextLevel = LEVELS.find(l => l.level === gameState.level + 1);
    if (nextLevel && gameState.exp >= nextLevel.exp) {
      this.levelUp();
    }
    this.save();
  },

  // Повышение уровня
  levelUp() {
    gameState.level++;
    const levelData = LEVELS.find(l => l.level === gameState.level);
    if (levelData) {
      this.addCoins(levelData.reward, false);
      showToast(`⬆️ Уровень ${gameState.level}! Награда: ${levelData.reward} монет`, 'success');
    }
  },

  // Добавить предмет в инвентарь
  addItem(itemData) {
    const wear = WEAR_LIST[Math.floor(Math.random() * WEAR_LIST.length)];
    const item = {
      id: gameState.nextItemId++,
      ...itemData,
      wear,
      obtainedAt: new Date().toISOString(),
    };
    gameState.inventory.push(item);
    
    // Обновить статистику
    if (RARITY[itemData.rarity].order > RARITY[gameState.stats.highestRarity].order) {
      gameState.stats.highestRarity = itemData.rarity;
    }
    if (itemData.price > gameState.stats.mostExpensive) {
      gameState.stats.mostExpensive = itemData.price;
    }
    gameState.stats.totalDropped.push(itemData.rarity);
    
    this.save();
    return item;
  },

  // Удалить предмет
  removeItem(itemId) {
    gameState.inventory = gameState.inventory.filter(i => i.id !== itemId);
    this.save();
  },

  // Разблокировать достижение
  unlockAchievement(achievementId) {
    if (!gameState.achievements.includes(achievementId)) {
      gameState.achievements.push(achievementId);
      const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
      if (achievement) {
        this.addExp(achievement.points);
        showToast(`🏆 ${achievement.name}! +${achievement.points} опыта`, 'success');
      }
      this.save();
    }
  },

  // Инициализировать игрока
  initPlayer(name = 'Player') {
    gameState.playerName = name;
    gameState.playerId = 'player_' + Math.random().toString(36).substr(2, 9);
    this.save();
  },

  // Сохранить состояние
  save() {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('keyser_state', JSON.stringify(gameState));
      } catch (e) {
        console.warn('Failed to save state:', e);
      }
    }
  },

  // Загрузить состояние
  load() {
    if (typeof localStorage !== 'undefined') {
      try {
        const saved = localStorage.getItem('keyser_state');
        if (saved) {
          const data = JSON.parse(saved);
          // Мергируем с дефолтом, чтобы сохранить новые поля
          Object.assign(gameState, data);
          return true;
        }
      } catch (e) {
        console.warn('Failed to load state:', e);
      }
    }
    return false;
  },

  // Сбросить состояние
  reset() {
    Object.assign(gameState, {
      playerId: null,
      playerName: 'Player',
      level: 1,
      exp: 0,
      balance: 500,
      premiumBalance: 0,
      inventory: [],
      achievements: [],
      stats: {
        totalOpened: 0,
        totalDropped: [],
        highestRarity: 'common',
        mostExpensive: 0,
        favoriteCase: null,
      },
    });
    this.save();
  },
};
