/**
 * КЕЙСЕР - Система анимаций
 */

const animations = {
  // Анимация выбора
  pulse(element, duration = 300) {
    if (!element) return;
    element.style.animation = `none`;
    element.offsetHeight; // Trigger reflow
    element.style.animation = `pulse ${duration}ms cubic-bezier(0.4, 0, 0.6, 1)`;
  },

  // Встряска
  shake(element, duration = 300) {
    if (!element) return;
    element.style.animation = `none`;
    element.offsetHeight;
    element.style.animation = `shake ${duration}ms cubic-bezier(0.36, 0, 0.66, -0.56)`;
  },

  // Прыжок
  bounce(element, duration = 500) {
    if (!element) return;
    element.style.animation = `none`;
    element.offsetHeight;
    element.style.animation = `bounce ${duration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
  },

  // Вращение
  spin(element, duration = 1000) {
    if (!element) return;
    element.style.animation = `none`;
    element.offsetHeight;
    element.style.animation = `spin ${duration}ms linear`;
  },

  // Наплыв
  fadeIn(element, duration = 300) {
    if (!element) return;
    element.style.opacity = '0';
    element.style.animation = `none`;
    element.offsetHeight;
    element.style.animation = `fadeIn ${duration}ms ease-out forwards`;
  },

  // Исчезновение
  fadeOut(element, duration = 300) {
    if (!element) return;
    element.style.animation = `none`;
    element.offsetHeight;
    element.style.animation = `fadeOut ${duration}ms ease-out forwards`;
  },

  // Слайд справа
  slideInRight(element, duration = 400) {
    if (!element) return;
    element.style.animation = `none`;
    element.offsetHeight;
    element.style.animation = `slideInRight ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
  },

  // Слайд слева
  slideInLeft(element, duration = 400) {
    if (!element) return;
    element.style.animation = `none`;
    element.offsetHeight;
    element.style.animation = `slideInLeft ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
  },

  // Масштабирование
  scaleIn(element, duration = 300) {
    if (!element) return;
    element.style.animation = `none`;
    element.offsetHeight;
    element.style.animation = `scaleIn ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
  },
};

// Добавить стили анимаций
const addAnimationStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.1); opacity: 0.8; }
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }

    @keyframes bounce {
      0% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0); }
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }

    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideInLeft {
      from { transform: translateX(-100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    @keyframes scaleIn {
      from { transform: scale(0.9); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addAnimationStyles);
} else {
  addAnimationStyles();
}
