/**
 * КЕЙСЕР - Конфигурация игры
 * Real CS2 Cases with actual prices and content
 */

const RARITY = {
  common: { name: 'Обычное', color: '#4b69ff', order: 0, chance: 60 },
  uncommon: { name: 'Необычное', color: '#8847ff', order: 1, chance: 25 },
  rare: { name: 'Редкое', color: '#d32ce6', order: 2, chance: 11 },
  mythical: { name: 'Мифическое', color: '#eb4b4b', order: 3, chance: 3.5 },
  legendary: { name: 'Легендарное', color: '#ffd700', order: 4, chance: 0.5 },
};

const WEARS = {
  FN: { name: 'Factory New', value: 1.0 },
  MW: { name: 'Minimal Wear', value: 0.7 },
  FT: { name: 'Field-Tested', value: 0.5 },
  WW: { name: 'Well-Worn', value: 0.3 },
  BS: { name: 'Battle-Scarred', value: 0.1 },
};

const WEAR_LIST = ['FN', 'MW', 'FT', 'WW', 'BS'];

// Реальные CS2 кейсы с иконками из репозитория
const CASES = [
  {
    id: 'case_01',
    name: 'Revolution Case',
    price: 99,
    rarity: 'common',
    icon: 'https://raw.githubusercontent.com/36meany/cs/main/CS2_style_cases_PNG/01_revolution.png',
    color1: '#ef4444',
    color2: '#7f1d1d',
  },
  {
    id: 'case_02',
    name: 'Dragon King Case',
    price: 149,
    rarity: 'common',
    icon: 'https://raw.githubusercontent.com/36meany/cs/main/CS2_style_cases_PNG/02_dragon.png',
    color1: '#f59e0b',
    color2: '#7c2d12',
  },
  {
    id: 'case_03',
    name: 'Deep Sea Case',
    price: 199,
    rarity: 'common',
    icon: 'https://raw.githubusercontent.com/36meany/cs/main/CS2_style_cases_PNG/03_deep_sea.png',
    color1: '#0ea5e9',
    color2: '#0c4a6e',
  },
  {
    id: 'case_04',
    name: 'Crown Case',
    price: 249,
    rarity: 'uncommon',
    icon: 'https://raw.githubusercontent.com/36meany/cs/main/CS2_style_cases_PNG/04_crown.png',
    color1: '#06b6d4',
    color2: '#0e7490',
  },
  {
    id: 'case_05',
    name: 'Venom Case',
    price: 299,
    rarity: 'uncommon',
    icon: 'https://raw.githubusercontent.com/36meany/cs/main/CS2_style_cases_PNG/05_venom.png',
    color1: '#16a34a',
    color2: '#14532d',
  },
  {
    id: 'case_06',
    name: 'Anomaly Case',
    price: 349,
    rarity: 'uncommon',
    icon: 'https://raw.githubusercontent.com/36meany/cs/main/CS2_style_cases_PNG/06_anomaly.png',
    color1: '#a855f7',
    color2: '#5b21b6',
  },
  {
    id: 'case_07',
    name: 'Vibe Case',
    price: 399,
    rarity: 'uncommon',
    icon: 'https://raw.githubusercontent.com/36meany/cs/main/CS2_style_cases_PNG/07_vibe.png',
    color1: '#ec4899',
    color2: '#831843',
  },
  {
    id: 'case_08',
    name: 'Cosmos Case',
    price: 449,
    rarity: 'rare',
    icon: 'https://raw.githubusercontent.com/36meany/cs/main/CS2_style_cases_PNG/08_cosmos.png',
    color1: '#8b5cf6',
    color2: '#4c1d95',
  },
  {
    id: 'case_09',
    name: 'Vanguard Case',
    price: 499,
    rarity: 'rare',
    icon: 'https://raw.githubusercontent.com/36meany/cs/main/CS2_style_cases_PNG/09_vanguard.png',
    color1: '#22c55e',
    color2: '#14532d',
  },
  {
    id: 'case_10',
    name: 'Neon Case',
    price: 549,
    rarity: 'rare',
    icon: 'https://raw.githubusercontent.com/36meany/cs/main/CS2_style_cases_PNG/10_neon.png',
    color1: '#22d3ee',
    color2: '#0e7490',
  },
  {
    id: 'case_11',
    name: 'Phoenix Case',
    price: 599,
    rarity: 'rare',
    icon: 'https://raw.githubusercontent.com/36meany/cs/main/CS2_style_cases_PNG/11_phoenix.png',
    color1: '#f97316',
    color2: '#7c2d12',
  },
  {
    id: 'case_12',
    name: 'Snow Case',
    price: 699,
    rarity: 'rare',
    icon: 'https://raw.githubusercontent.com/36meany/cs/main/CS2_style_cases_PNG/12_snow.png',
    color1: '#38bdf8',
    color2: '#0c4a6e',
  },
  {
    id: 'case_13',
    name: 'Legend Case',
    price: 799,
    rarity: 'mythical',
    icon: 'https://raw.githubusercontent.com/36meany/cs/main/CS2_style_cases_PNG/13_legend.png',
    color1: '#dc2626',
    color2: '#7f1d1d',
  },
  {
    id: 'case_14',
    name: 'Panther Case',
    price: 899,
    rarity: 'mythical',
    icon: 'https://raw.githubusercontent.com/36meany/cs/main/CS2_style_cases_PNG/14_panther.png',
    color1: '#2563eb',
    color2: '#1e3a8a',
  },
  {
    id: 'case_15',
    name: 'Horror Case',
    price: 999,
    rarity: 'mythical',
    icon: 'https://raw.githubusercontent.com/36meany/cs/main/CS2_style_cases_PNG/15_horror.png',
    color1: '#059669',
    color2: '#064e3b',
  },
  {
    id: 'case_16',
    name: 'Ocean Case',
    price: 1199,
    rarity: 'mythical',
    icon: 'https://raw.githubusercontent.com/36meany/cs/main/CS2_style_cases_PNG/16_ocean.png',
    color1: '#0891b2',
    color2: '#082f49',
  },
  {
    id: 'case_17',
    name: 'Special Case',
    price: 1399,
    rarity: 'legendary',
    icon: 'https://raw.githubusercontent.com/36meany/cs/main/CS2_style_cases_PNG/17_special.png',
    color1: '#a855f7',
    color2: '#6b21a8',
  },
  {
    id: 'case_18',
    name: 'Butterfly Case',
    price: 1599,
    rarity: 'legendary',
    icon: 'https://raw.githubusercontent.com/36meany/cs/main/CS2_style_cases_PNG/18_butterfly.png',
    color1: '#fbbf24',
    color2: '#92400e',
  },
];

// Реальные скины из папок
const SAMPLE_SKINS = [
  // AK-47
  { name: 'AK-47 | Aquamarine Revenge', rarity: 'rare', price: 450, type: 'rifle', folder: 'csskinspng1' },
  { name: 'AK-47 | Blue Laminate', rarity: 'common', price: 50, type: 'rifle', folder: 'csskinspng1' },
  { name: 'AK-47 | Case Hardened', rarity: 'rare', price: 800, type: 'rifle', folder: 'csskinspng1' },
  { name: 'AK-47 | Fire Serpent', rarity: 'rare', price: 2200, type: 'rifle', folder: 'csskinspng1' },
  { name: 'AK-47 | Frontside Misty', rarity: 'uncommon', price: 120, type: 'rifle', folder: 'csskinspng1' },
  { name: 'AK-47 | Head Shot', rarity: 'uncommon', price: 85, type: 'rifle', folder: 'csskinspng1' },
  { name: 'AK-47 | Redline', rarity: 'rare', price: 180, type: 'rifle', folder: 'csskinspng1' },
  // AWP
  { name: 'AWP | Asiimov', rarity: 'rare', price: 350, type: 'sniper', folder: 'csskinspng1' },
  { name: 'AWP | Hyper Beast', rarity: 'rare', price: 280, type: 'sniper', folder: 'csskinspng1' },
  { name: 'AWP | Redline', rarity: 'rare', price: 450, type: 'sniper', folder: 'csskinspng1' },
  { name: 'AWP | Dragon Lore', rarity: 'legendary', price: 50000, type: 'sniper', folder: 'csskinspng1' },
  // Ножи
  { name: 'Butterfly Knife | Fade', rarity: 'legendary', price: 8000, type: 'knife', folder: 'csskinspng1' },
  { name: 'Bayonet | Crimson Web', rarity: 'mythical', price: 5000, type: 'knife', folder: 'csskinspng1' },
  { name: 'Karambit | Doppler', rarity: 'legendary', price: 12000, type: 'knife', folder: 'csskinspng1' },
  // Перчатки
  { name: 'Driver Gloves | Black Tie', rarity: 'mythical', price: 3500, type: 'gloves', folder: 'csskinspng1' },
  { name: 'Driver Gloves | King Snake', rarity: 'mythical', price: 4200, type: 'gloves', folder: 'csskinspng1' },
  // Пистолеты
  { name: 'Desert Eagle | Golden Koi', rarity: 'uncommon', price: 80, type: 'pistol', folder: 'csskinspng1' },
  { name: 'Desert Eagle | Hypnotic', rarity: 'uncommon', price: 110, type: 'pistol', folder: 'csskinspng1' },
];

// Достижения
const ACHIEVEMENTS = [
  { id: 'first_open', name: '🎁 Первый кейс', description: 'Откройте первый кейс', points: 10 },
  { id: 'ten_opens', name: '🔟 Дюжина', description: 'Откройте 10 кейсов', points: 50 },
  { id: 'rare_drop', name: '⭐ Редкий удар', description: 'Получите редкий предмет', points: 100 },
  { id: 'mythical_drop', name: '🔥 Мифический', description: 'Получите мифический предмет', points: 500 },
  { id: 'legendary_drop', name: '👑 Легендарный', description: 'Получите легендарный предмет', points: 1000 },
  { id: 'collector', name: '🎨 Коллекционер', description: 'Соберите 50 предметов', points: 250 },
  { id: 'rich', name: '💰 Богач', description: 'Накопите 100 000 монет', points: 500 },
  { id: 'trader', name: '🔄 Трейдер', description: 'Проведите 10 апгрейдов', points: 200 },
];

// Уровни и опыт
const LEVELS = [
  { level: 1, exp: 0, name: 'Новичок', reward: 100 },
  { level: 2, exp: 500, name: 'Охотник', reward: 200 },
  { level: 3, exp: 1500, name: 'Коллекционер', reward: 500 },
  { level: 4, exp: 3500, name: 'Гуру', reward: 1000 },
  { level: 5, exp: 7000, name: 'Легенда', reward: 2500 },
];

// Прайс-лист на монеты
const COIN_PACKS = [
  { id: 'pack_100', coins: 100, price: 29, label: '100 монет' },
  { id: 'pack_500', coins: 500, price: 99, label: '500 монет (+25%)' },
  { id: 'pack_1000', coins: 1200, price: 199, label: '1200 монет (+20%)' },
  { id: 'pack_5000', coins: 6500, price: 799, label: '6500 монет (+30%)' },
];

// Ежедневные награды
const DAILY_REWARDS = [
  { day: 1, reward: 100, icon: '🎁' },
  { day: 2, reward: 150, icon: '🎁' },
  { day: 3, reward: 200, icon: '🎁' },
  { day: 4, reward: 300, icon: '🎉' },
  { day: 5, reward: 500, icon: '🌟' },
  { day: 6, reward: 750, icon: '⭐' },
  { day: 7, reward: 1000, icon: '👑' },
];

// Батлпасс
const BATTLEPASS = {
  free_tiers: 20,
  premium_tiers: 30,
  total_tiers: 50,
  cost: 500,
};
