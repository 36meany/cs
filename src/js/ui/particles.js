/**
 * КЕЙСЕР - Система частиц и эффектов
 */

const particleSystem = {
  create(x, y, type = 'coin') {
    const container = $('#particles');
    if (!container) return;

    const particle = createElement('div', {
      className: `particle particle-${type}`,
      style: {
        left: x + 'px',
        top: y + 'px',
      },
    });

    let content = '';
    switch (type) {
      case 'coin':
        content = '◆';
        break;
      case 'star':
        content = '⭐';
        break;
      case 'confetti':
        content = ['🎉', '🎊', '✨'][Math.floor(Math.random() * 3)];
        break;
      case 'drop':
        content = '✦';
        break;
    }

    particle.textContent = content;
    container.appendChild(particle);

    // Анимация
    particle.offsetHeight; // Trigger reflow
    particle.classList.add('animated');

    // Удаление
    setTimeout(() => particle.remove(), 1000);
  },

  burst(x, y, count = 12, type = 'coin') {
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const distance = 100;
      const px = x + Math.cos(angle) * distance * 0.3;
      const py = y + Math.sin(angle) * distance * 0.3;
      setTimeout(() => this.create(px, py, type), i * 30);
    }
  },

  confetti(count = 30) {
    for (let i = 0; i < count; i++) {
      const x = Math.random() * window.innerWidth;
      const y = -20;
      this.create(x, y, 'confetti');
    }
  },
};

// Добавить стили для частиц
const addParticleStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    #particles {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 300;
    }

    .particle {
      position: fixed;
      font-size: 20px;
      font-weight: 900;
      opacity: 1;
      transform: scale(1);
    }

    .particle-coin {
      color: #ffd700;
      text-shadow: 0 0 8px rgba(255, 215, 0, 0.8);
    }

    .particle-star {
      color: #22c55e;
      text-shadow: 0 0 8px rgba(34, 197, 94, 0.8);
    }

    .particle-confetti {
      font-size: 28px;
    }

    .particle-drop {
      color: #0ea5e9;
      text-shadow: 0 0 8px rgba(14, 165, 233, 0.8);
    }

    .particle.animated {
      animation: particleFloat 1s ease-out forwards;
    }

    @keyframes particleFloat {
      0% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      70% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        transform: translateY(-80px) scale(0.5);
      }
    }
  `;
  document.head.appendChild(style);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addParticleStyles);
} else {
  addParticleStyles();
}
