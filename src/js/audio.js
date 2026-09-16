/**
 * КЕЙСЕР - Система звуков
 */

let audioContext = null;

const initAudio = () => {
  if (!audioContext) {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioContext();
    } catch (e) {
      console.warn('AudioContext not supported');
    }
  }
};

const playTone = (frequency, duration, volume = 0.3, type = 'sine') => {
  if (!audioContext || !gameState.settings.soundEnabled) return;
  
  try {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.type = type;
    osc.frequency.value = frequency;
    
    gain.gain.setValueAtTime(volume, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + duration);
  } catch (e) {
    console.warn('Failed to play tone:', e);
  }
};

const sounds = {
  // Клик
  click: () => playTone(880, 0.04, 0.2, 'triangle'),
  
  // Выигрыш - редкий
  winRare: () => {
    playTone(660, 0.12, 0.25, 'triangle');
    setTimeout(() => playTone(880, 0.15, 0.25, 'triangle'), 110);
    setTimeout(() => playTone(1320, 0.3, 0.2, 'triangle'), 240);
  },
  
  // Выигрыш - очень редкий
  winLegendary: () => {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => playTone(880 + i * 200, 0.1, 0.3, 'sine'), i * 100);
    }
  },
  
  // Проигрыш
  lose: () => playTone(220, 0.3, 0.25, 'sawtooth'),
  
  // Спин
  spin: () => playTone(440, 0.03, 0.15, 'square'),
  
  // Волшебство
  magic: () => {
    playTone(1200, 0.08, 0.2, 'sine');
    setTimeout(() => playTone(1400, 0.06, 0.2, 'sine'), 40);
    setTimeout(() => playTone(1600, 0.1, 0.2, 'sine'), 80);
  },
  
  // Ошибка
  error: () => {
    playTone(300, 0.1, 0.2, 'square');
    setTimeout(() => playTone(250, 0.1, 0.2, 'square'), 100);
  },
  
  // Успех
  success: () => {
    playTone(500, 0.05, 0.2, 'sine');
    setTimeout(() => playTone(750, 0.1, 0.2, 'sine'), 60);
  },
};

// Инициализировать при первом взаимодействии
document.addEventListener('click', () => {
  if (!audioContext) initAudio();
}, { once: true });
