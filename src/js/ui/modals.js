/**
 * КЕЙСЕР - Система модальных окон
 */

const createModal = (options = {}) => {
  const {
    title = 'Уведомление',
    content = '',
    actions = [],
    size = 'medium', // small, medium, large
    closable = true,
  } = options;

  const modal = createElement('div', { className: 'modal-overlay' });

  const dialog = createElement('div', { className: `modal modal-${size}` });

  if (closable) {
    const closeBtn = createElement('button', { className: 'modal-close' });
    closeBtn.textContent = '✕';
    closeBtn.onclick = () => modal.remove();
    dialog.appendChild(closeBtn);
  }

  if (title) {
    const titleEl = createElement('h3', { className: 'modal-title' });
    titleEl.textContent = title;
    dialog.appendChild(titleEl);
  }

  if (content) {
    const contentEl = createElement('div', { className: 'modal-content' });
    if (typeof content === 'string') {
      contentEl.innerHTML = content;
    } else {
      contentEl.appendChild(content);
    }
    dialog.appendChild(contentEl);
  }

  if (actions.length > 0) {
    const actionsEl = createElement('div', { className: 'modal-actions' });
    actions.forEach(action => {
      const btn = createElement('button', {
        className: `btn btn-${action.type || 'primary'}`,
      });
      btn.textContent = action.label;
      btn.onclick = () => {
        action.handler?.();
        modal.remove();
      };
      actionsEl.appendChild(btn);
    });
    dialog.appendChild(actionsEl);
  }

  modal.onclick = (e) => {
    if (e.target === modal && closable) {
      modal.remove();
    }
  };

  dialog.appendChild(closeBtn || document.createTextNode(''));
  modal.appendChild(dialog);

  return modal;
};

const showModal = (options) => {
  const root = $('#modalRoot');
  if (!root) return;
  const modal = createModal(options);
  root.appendChild(modal);
  animations.scaleIn(modal.querySelector('.modal'));
  return modal;
};

// Предопределённые модали
const modals = {
  alert(message) {
    return showModal({
      title: 'Уведомление',
      content: message,
      actions: [{ label: 'ОК', type: 'primary', handler: () => {} }],
      closable: true,
    });
  },

  confirm(message, onConfirm, onCancel) {
    return showModal({
      title: 'Подтверждение',
      content: message,
      actions: [
        { label: 'Отмена', type: 'secondary', handler: onCancel },
        { label: 'Подтвердить', type: 'primary', handler: onConfirm },
      ],
      closable: true,
    });
  },

  loading(message = 'Загрузка...') {
    return showModal({
      title: '',
      content: `<div class="modal-loading"><div class="spinner"></div><p>${message}</p></div>`,
      closable: false,
    });
  },
};

// Добавить стили модалей
const addModalStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(5, 8, 12, 0.88);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      animation: fadeIn 0.2s;
    }

    .modal {
      background: linear-gradient(180deg, #1a212d, #12171f);
      border: 1px solid #2a3444;
      border-radius: 16px;
      padding: 28px;
      position: relative;
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.7);
      max-height: 90vh;
      overflow-y: auto;
      animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .modal-small {
      max-width: 300px;
    }

    .modal-medium {
      max-width: 420px;
    }

    .modal-large {
      max-width: 600px;
    }

    .modal-close {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 32px;
      height: 32px;
      background: rgba(34, 197, 94, 0.1);
      border: none;
      border-radius: 6px;
      color: #22c55e;
      font-size: 18px;
      cursor: pointer;
      transition: 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal-close:hover {
      background: rgba(34, 197, 94, 0.2);
    }

    .modal-title {
      font-size: 18px;
      font-weight: 900;
      margin-bottom: 16px;
      color: #fff;
    }

    .modal-content {
      font-size: 14px;
      line-height: 1.6;
      color: #a9b6c6;
      margin-bottom: 20px;
    }

    .modal-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }

    .modal-actions .btn {
      flex: 0 1 auto;
    }

    .modal-loading {
      text-align: center;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid rgba(34, 197, 94, 0.2);
      border-top-color: #22c55e;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  `;
  document.head.appendChild(style);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addModalStyles);
} else {
  addModalStyles();
}
