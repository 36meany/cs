/**
 * КЕЙСЕР - Система уведомлений (Toasts)
 */

const showToast = (message, type = 'info', duration = 3000) => {
  const toastContainer = $('#toasts');
  if (!toastContainer) return;

  const toast = createElement('div', {
    className: `toast toast-${type}`,
  });

  toast.innerHTML = `
    <div class="toast-content">
      <span>${message}</span>
    </div>
  `;

  toastContainer.appendChild(toast);

  // Анимация входа
  toast.offsetHeight; // Trigger reflow
  toast.classList.add('show');

  // Удаление через время
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, duration);
};

// Добавить стили для тостов
const addToastStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    #toasts {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 500;
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: center;
      pointer-events: none;
    }

    .toast {
      background: rgba(28, 36, 48, 0.95);
      backdrop-filter: blur(10px);
      border: 1px solid #2f3b4d;
      border-radius: 10px;
      padding: 12px 22px;
      font-size: 13px;
      font-weight: 700;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
      pointer-events: auto;
      max-width: 90vw;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .toast.show {
      opacity: 1;
      transform: translateY(0);
    }

    .toast-success {
      border-color: #22c55e;
      color: #b3ffcc;
    }

    .toast-error {
      border-color: #ef4444;
      color: #ffb3b3;
    }

    .toast-warning {
      border-color: #f59e0b;
      color: #ffd699;
    }

    .toast-info {
      border-color: #0ea5e9;
      color: #b3e5ff;
    }
  `;
  document.head.appendChild(style);
};

// Инициализировать при загрузке
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addToastStyles);
} else {
  addToastStyles();
}
