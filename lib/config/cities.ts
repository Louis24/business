import { CityInfo, CitySlug } from '../types';

/**
 * Multi-City / Multi-Region Configuration
 * Demonstrates how Beijing, Vietnam (Danang/Hanoi), and Thailand (Phuket/Bangkok)
 * share the exact same underlying architecture while allowing regional styles & categories.
 */
export const CITIES_CONFIG: Record<CitySlug, CityInfo> = {
  phuket: {
    slug: 'phuket',
    name: 'Phuket',
    nameZh: '普吉岛',
    country: 'Thailand',
    heroImage: '/phuket/hero.jpg',
    description: 'World-famous tropical paradise with award-winning luxury day spas and traditional Thai massage.',
    popularAreas: ['Patong', 'Kata', 'Karon', 'Bang Tao', 'Old Phuket Town'],
    categories: ['massage', 'spa', 'hotel', 'restaurants', 'tour'],
    themeColor: '#C9A96E', // Warm Gold
  },
  bangkok: {
    slug: 'bangkok',
    name: 'Bangkok',
    nameZh: '曼谷',
    country: 'Thailand',
    heroImage: '/bangkok/hero.jpg',
    description: 'Vibrant metropolis blending historic temples, Michelin dining, and world-class urban wellness.',
    popularAreas: ['Sukhumvit', 'Silom', 'Siam', 'Thonglor', 'Riverside'],
    categories: ['massage', 'spa', 'hotel', 'restaurants', 'shopping'],
    themeColor: '#D4AF37',
  },
  'chiang-mai': {
    slug: 'chiang-mai',
    name: 'Chiang Mai',
    nameZh: '清迈',
    country: 'Thailand',
    heroImage: '/chiang-mai/hero.jpg',
    description: 'Northern culture capital known for tranquil mountain retreats and holistic herbal healing.',
    popularAreas: ['Old City', 'Nimman', 'Riverside', 'Hang Dong'],
    categories: ['massage', 'spa', 'tour', 'restaurants'],
    themeColor: '#84A98C',
  },
  krabi: {
    slug: 'krabi',
    name: 'Krabi',
    nameZh: '甲米',
    country: 'Thailand',
    heroImage: '/krabi/hero.jpg',
    description: 'Limestone cliffs, emerald waters, and beachfront luxury relaxation sanctuaries.',
    popularAreas: ['Ao Nang', 'Railay Beach', 'Klong Muang', 'Koh Lanta'],
    categories: ['massage', 'spa', 'hotel', 'tour'],
    themeColor: '#52B788',
  },
  pattaya: {
    slug: 'pattaya',
    name: 'Pattaya',
    nameZh: '芭提雅',
    country: 'Thailand',
    heroImage: '/pattaya/hero.jpg',
    description: 'Lively coastal city offering premium resort spas, yachting, and entertainment.',
    popularAreas: ['Central Pattaya', 'Jomtien', 'Naklua', 'Pratumnak'],
    categories: ['massage', 'spa', 'hotel', 'tour', 'restaurants'],
    themeColor: '#3A86FF',
  },
  beijing: {
    slug: 'beijing',
    name: 'Beijing',
    nameZh: '北京',
    country: 'China',
    heroImage: '/beijing/hero.jpg',
    description: '千年古都与现代活力，故宫红墙、四合院茶馆、地道烤鸭与胡同深处的文化沉浸。',
    popularAreas: ['三里屯', '王府井', '前门胡同', '国贸CBD', '什刹海'],
    categories: ['culture', 'hotel', 'restaurants', 'tour'],
    themeColor: '#8B1E1E', // 故宫朱红
  },
  danang: {
    slug: 'danang',
    name: 'Danang',
    nameZh: '岘港',
    country: 'Vietnam',
    heroImage: '/danang/hero.jpg',
    description: '美溪沙滩与巴拿山风光，越式草本疗愈、海鲜盛宴与慢节奏热带海滨度假。',
    popularAreas: ['My Khe Beach', 'Han River', 'Son Tra', 'Hoi An Ancient Town'],
    categories: ['spa', 'massage', 'hotel', 'restaurants', 'tour'],
    themeColor: '#0D9488', // 越式热带青
  },
  hanoi: {
    slug: 'hanoi',
    name: 'Hanoi',
    nameZh: '河内',
    country: 'Vietnam',
    heroImage: '/hanoi/hero.jpg',
    description: '法式殖民风情与古街咖啡馆，体验纯正滴漏咖啡与传统草药按摩。',
    popularAreas: ['Old Quarter', 'Hoan Kiem', 'West Lake', 'French Quarter'],
    categories: ['massage', 'restaurants', 'culture', 'tour'],
    themeColor: '#B45309', // 琥珀复古色
  },
};
