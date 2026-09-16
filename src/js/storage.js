/**
 * КЕЙСЕР - Управление хранилищем данных
 */

const storage = {
  // LocalStorage
  local: {
    set(key, value) {
      try {
        localStorage.setItem(`keyser_${key}`, JSON.stringify(value));
      } catch (e) {
        console.warn('LocalStorage set failed:', e);
      }
    },
    get(key) {
      try {
        const data = localStorage.getItem(`keyser_${key}`);
        return data ? JSON.parse(data) : null;
      } catch (e) {
        console.warn('LocalStorage get failed:', e);
        return null;
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(`keyser_${key}`);
      } catch (e) {
        console.warn('LocalStorage remove failed:', e);
      }
    },
    clear() {
      try {
        const keys = Object.keys(localStorage).filter(k => k.startsWith('keyser_'));
        keys.forEach(k => localStorage.removeItem(k));
      } catch (e) {
        console.warn('LocalStorage clear failed:', e);
      }
    },
  },

  // SessionStorage
  session: {
    set(key, value) {
      try {
        sessionStorage.setItem(`keyser_${key}`, JSON.stringify(value));
      } catch (e) {
        console.warn('SessionStorage set failed:', e);
      }
    },
    get(key) {
      try {
        const data = sessionStorage.getItem(`keyser_${key}`);
        return data ? JSON.parse(data) : null;
      } catch (e) {
        console.warn('SessionStorage get failed:', e);
        return null;
      }
    },
  },
};
