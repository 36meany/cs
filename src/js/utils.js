/**
 * КЕЙСЕР - Утилиты и вспомогательные функции
 */

// Форматирование чисел
const fmt = (n) => {
  if (typeof n !== 'number') return '0';
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

// HTML escape
const esc = (s) => {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

// Генерировать хекс цвет из строки
const hashToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  const hue = Math.abs(hash) % 360;
  const saturation = 70 + (Math.abs(hash) % 20);
  const lightness = 50 + (Math.abs(hash) % 10);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

// RGB в RGBA
const hexToRgba = (hex, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Случайное число в диапазоне
const randomRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Случайный элемент массива
const randomItem = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Выбрать по вероятности (взвешенный выбор)
const weightedRandom = (items, weights) => {
  let totalWeight = weights.reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;
  
  for (let i = 0; i < items.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return items[i];
    }
  }
  
  return items[items.length - 1];
};

// Дебаунс функции
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Тротл функции
const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Проверить поддержку функции
const isSupported = (feature) => {
  const checks = {
    localStorage: typeof localStorage !== 'undefined',
    sessionStorage: typeof sessionStorage !== 'undefined',
    indexedDb: typeof indexedDB !== 'undefined',
    serviceWorker: 'serviceWorker' in navigator,
    vibration: 'vibrate' in navigator,
    camera: navigator.mediaDevices && navigator.mediaDevices.getUserMedia,
  };
  return checks[feature] || false;
};

// Вибрация
const vibrate = (pattern = 50) => {
  if (isSupported('vibration') && gameState.settings.vibrationEnabled) {
    navigator.vibrate(pattern);
  }
};

// Копировать в буфер обмена
const copyToClipboard = (text) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
    return true;
  }
  return false;
};

// Получить параметр из URL
const getUrlParam = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

// DOM helpers
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const createElement = (tag, attrs = {}, ...children) => {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'className') {
      el.className = value;
    } else if (key === 'style' && typeof value === 'object') {
      Object.assign(el.style, value);
    } else if (key.startsWith('on')) {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      el.setAttribute(key, value);
    }
  });
  children.forEach(child => {
    if (typeof child === 'string') {
      el.textContent += child;
    } else if (child instanceof HTMLElement) {
      el.appendChild(child);
    }
  });
  return el;
};

// Форматирование времени
const formatTime = (ms) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}д`;
  if (hours > 0) return `${hours}ч`;
  if (minutes > 0) return `${minutes}м`;
  return `${seconds}с`;
};

// Дата до формата
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
