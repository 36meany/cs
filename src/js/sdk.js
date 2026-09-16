/**
 * КЕЙСЕР - Интеграция с Яндекс Games SDK
 */

let ysdk = null;

const initYandexSDK = async () => {
  try {
    if (typeof YaGames === 'undefined') {
      console.log('YaGames SDK not available');
      return false;
    }

    ysdk = await YaGames.init();
    console.log('Yandex Games SDK initialized');

    // Загрузить данные игрока
    try {
      const player = await ysdk.getPlayer({ scopes: false });
      const data = await player.getData(['keyser_state']);
      if (data.keyser_state) {
        const saved = data.keyser_state;
        Object.assign(gameState, saved);
      }
    } catch (e) {
      console.warn('Failed to load player data:', e);
    }

    return true;
  } catch (e) {
    console.warn('YaGames init failed:', e);
    return false;
  }
};

const saveToCloud = async () => {
  if (!ysdk) return false;

  try {
    const player = await ysdk.getPlayer({ scopes: false });
    await player.setData({ keyser_state: gameState });
    return true;
  } catch (e) {
    console.warn('Failed to save to cloud:', e);
    return false;
  }
};

const gameplayStart = () => {
  try {
    ysdk?.features?.GameplayAPI?.start();
  } catch (e) {}
};

const gameplayStop = () => {
  try {
    ysdk?.features?.GameplayAPI?.stop();
  } catch (e) {}
};

// Периодически сохранять в облако
let autoSaveInterval = null;

const startAutoSave = () => {
  autoSaveInterval = setInterval(async () => {
    await saveToCloud();
  }, 30000); // Каждые 30 сек
};

const stopAutoSave = () => {
  if (autoSaveInterval) {
    clearInterval(autoSaveInterval);
  }
};

// При выгрузке страницы сохранить
window.addEventListener('beforeunload', () => {
  saveToCloud();
});
