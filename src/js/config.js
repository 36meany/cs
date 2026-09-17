/* КЕЙСЕР v2 — единый каталог реальных PNG-ассетов и игровая экономика.
   Цены — стартовый RUB-баланс, обновляй их отдельным data-файлом при изменении рынка. */
const ASSET_ROOT = 'https://raw.githubusercontent.com/36meany/cs/main/';
const assetUrl = (folder, filename) => ASSET_ROOT + folder + '/' + encodeURIComponent(filename);

const RARITY = {
  common:{name:'Обычное',color:'#6d8cff',order:0,chance:58},
  uncommon:{name:'Необычное',color:'#9b67ff',order:1,chance:27},
  rare:{name:'Редкое',color:'#d84df0',order:2,chance:11},
  mythical:{name:'Мифическое',color:'#f04f62',order:3,chance:3.5},
  legendary:{name:'Легендарное',color:'#ffd45b',order:4,chance:.5}
};
const WEARS={FN:{name:'Прямо с завода',value:1},MW:{name:'Немного поношенное',value:.82},FT:{name:'После полевых испытаний',value:.62},WW:{name:'Поношенное',value:.42},BS:{name:'Закалённое в боях',value:.25}};
const WEAR_LIST=Object.keys(WEARS);

const CASES=[
 ['case_01','Revolution','17','01_revolution.png','#ef4c5c','#7d1823','common'],
 ['case_02','Dragon','18','02_dragon.png','#f0a52e','#6c2b0c','common'],
 ['case_03','Deep Sea','21','03_deep_sea.png','#30b9e8','#0a456a','common'],
 ['case_04','Crown','24','04_crown.png','#48d4dd','#075b70','common'],
 ['case_05','Venom','27','05_venom.png','#52db78','#0b552b','common'],
 ['case_06','Anomaly','30','06_anomaly.png','#a875ff','#421b83','uncommon'],
 ['case_07','Vibe','35','07_vibe.png','#e75da5','#661342','uncommon'],
 ['case_08','Cosmos','42','08_cosmos.png','#9473ff','#27185f','uncommon'],
 ['case_09','Vanguard','50','09_vanguard.png','#42d98a','#0d542e','uncommon'],
 ['case_10','Neon','60','10_neon.png','#31d7e7','#07596a','rare'],
 ['case_11','Phoenix','72','11_phoenix.png','#ff863a','#70210c','rare'],
 ['case_12','Snow','86','12_snow.png','#71d8ff','#11496c','rare'],
 ['case_13','Legend','110','13_legend.png','#f14f57','#721c26','rare'],
 ['case_14','Panther','135','14_panther.png','#4b8eff','#132f72','mythical'],
 ['case_15','Horror','165','15_horror.png','#35d1a0','#07513e','mythical'],
 ['case_16','Ocean','210','16_ocean.png','#26c6dc','#063c59','mythical'],
 ['case_17','Special','290','17_special.png','#b374ff','#451485','legendary'],
 ['case_18','Butterfly','390','18_butterfly.png','#ffd45b','#754a0a','legendary']
].map(([id,name,price,file,c1,c2,rarity])=>({id,name,price:Number(price),file:'CS2_style_cases_PNG/'+file,icon:assetUrl('CS2_style_cases_PNG',file),color1:c1,color2:c2,rarity}));

const skin=(name,rarity,price,type,folder='csskinspng1')=>({name,rarity,price,type,folder,image:assetUrl(folder,name+'.png')});
/* Имена ниже совпадают с PNG-файлами репозитория; никаких SVG-заглушек. */
const SAMPLE_SKINS=[
 skin('AK-47 | Blue Laminate','common',32,'rifle'),skin('AK-47 | Redline','uncommon',145,'rifle'),skin('AK-47 | Frontside Misty','uncommon',190,'rifle'),skin('AK-47 | Aquamarine Revenge','rare',510,'rifle'),skin('AK-47 | Case Hardened','rare',720,'rifle'),skin('AK-47 | Fire Serpent','legendary',18500,'rifle'),
 skin('AWP | Asiimov','rare',430,'sniper'),skin('AWP | Redline','uncommon',155,'sniper'),skin('AWP | Hyper Beast','rare',360,'sniper'),skin('AWP | Lightning Strike','mythical',4200,'sniper'),skin('AWP | Dragon Lore','legendary',0,'sniper'),
 skin('Desert Eagle | Blue Ply','common',28,'pistol'),skin('Desert Eagle | Hypnotic','uncommon',125,'pistol'),skin('Desert Eagle | Golden Koi','rare',260,'pistol'),skin('Desert Eagle | Printstream','rare',390,'pistol'),
 skin('Bayonet | Safari Mesh','uncommon',860,'knife'),skin('Bayonet | Crimson Web','mythical',5200,'knife'),skin('Bayonet | Fade','legendary',14800,'knife'),
 skin('Butterfly Knife | Safari Mesh','mythical',3400,'knife'),skin('Butterfly Knife | Freehand','mythical',5400,'knife'),skin('Butterfly Knife | Fade','legendary',26500,'knife'),skin('Butterfly Knife | Gamma Doppler','legendary',32000,'knife'),
 skin('Driver Gloves | Black Tie','mythical',3900,'gloves'),skin('Driver Gloves | King Snake','legendary',9200,'gloves'),skin('Driver Gloves | Snow Leopard','legendary',11800,'gloves'),
 skin('Classic Knife | Fade','mythical',4100,'knife'),skin('Classic Knife | Case Hardened','mythical',2800,'knife')
].filter(i=>i.price>0);

const ACHIEVEMENTS=[{id:'first_open',name:'🎁 Первый кейс',description:'Откройте первый кейс',points:10},{id:'ten_opens',name:'🔟 Десять открытий',description:'Откройте 10 кейсов',points:50},{id:'rare_drop',name:'⭐ Редкий дроп',description:'Получите редкий предмет',points:100},{id:'mythical_drop',name:'🔥 Мифический дроп',description:'Получите мифический предмет',points:500},{id:'legendary_drop',name:'👑 Легенда',description:'Получите легендарный предмет',points:1000},{id:'collector',name:'🎨 Коллекционер',description:'Соберите 50 предметов',points:250},{id:'rich',name:'💰 Богач',description:'Заработайте 10 000 ₽',points:500},{id:'trader',name:'🔄 Трейдер',description:'Проведите 10 апгрейдов',points:200}];
const LEVELS=[{level:1,exp:0,name:'Новичок',reward:100},{level:2,exp:500,name:'Охотник',reward:150},{level:3,exp:1500,name:'Коллекционер',reward:300},{level:4,exp:3500,name:'Гуру',reward:600},{level:5,exp:7000,name:'Легенда',reward:1200}];
const DAILY_REWARDS=[{day:1,reward:100,icon:'🎁'},{day:2,reward:150,icon:'🎁'},{day:3,reward:200,icon:'🎉'},{day:4,reward:300,icon:'🌟'},{day:5,reward:500,icon:'⭐'},{day:6,reward:750,icon:'⭐'},{day:7,reward:1000,icon:'👑'}];
const COIN_PACKS=[{id:'pack_100',coins:100,price:99,label:'100 монет'},{id:'pack_550',coins:550,price:399,label:'550 монет'},{id:'pack_1500',coins:1500,price:999,label:'1500 монет'}];
const BATTLEPASS={free_tiers:20,premium_tiers:30,total_tiers:50,cost:500};
