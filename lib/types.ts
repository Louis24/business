// ============================================================
// AA Unified Platform — Type Definitions (Tourism & Chamber)
// ============================================================

// -------------------- Chamber / B2B Types --------------------
export type ChamberPosition = 'president' | 'vice_president' | 'director' | 'member';
export type MerchantType = 'manufacturer' | 'distributor' | 'trader';
export type NewsType = 'announcement' | 'supply' | 'demand' | 'event';
export type InquiryStatus = 'pending' | 'replied' | 'closed';

export interface Merchant {
  id: string;
  name: string;
  logo_url: string | null;
  description: string | null;
  chamber_position: ChamberPosition;
  industry: string;
  type: MerchantType;
  region: string;
  certifications: string[];
  contact_person: string | null;
  phone: string | null;
  address: string | null;
  website: string | null;
  member_since: number | null;
  product_count: number | null;
  is_featured: boolean | null;
  created_at: string;
}

export interface Product {
  id: string;
  merchant_id: string;
  name: string;
  images: string[];
  reference_price: number | null;
  unit: string | null;
  moq: number | null;
  category: string;
  description: string | null;
  specs: Array<{ name: string; value: string }>;
  is_featured: boolean | null;
  created_at: string;
  merchants?: Pick<Merchant, 'id' | 'name' | 'chamber_position' | 'certifications'>;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string | null;
  summary: string | null;
  type: NewsType;
  author: string | null;
  published_at: string;
  event_date: string | null;
  event_location: string | null;
  contact_phone: string | null;
  merchant_id: string | null;
  created_at: string;
  merchants?: Pick<Merchant, 'id' | 'name'>;
}

export interface Inquiry {
  id: string;
  product_id: string | null;
  merchant_id: string | null;
  product_name: string | null;
  merchant_name: string | null;
  contact_name: string;
  contact_phone: string;
  contact_company: string | null;
  quantity: number | null;
  message: string | null;
  status: InquiryStatus;
  created_at: string;
}

export interface InquiryFormData {
  contact_name: string;
  contact_phone: string;
  contact_company: string;
  quantity: number;
  message: string;
}

export interface FavoriteItem {
  id: string;
  type: 'merchant' | 'product';
  name: string;
  savedAt: string;
}

export const CHAMBER_POSITION_LABELS: Record<ChamberPosition, string> = {
  president: '会长',
  vice_president: '副会长',
  director: '理事',
  member: '会员',
};

export const MERCHANT_TYPE_LABELS: Record<MerchantType, string> = {
  manufacturer: '生产商',
  distributor: '经销商',
  trader: '贸易商',
};

export const NEWS_TYPE_LABELS: Record<NewsType, string> = {
  announcement: '商会公告',
  supply: '供应信息',
  demand: '采购需求',
  event: '近期活动',
};

export const INDUSTRIES = [
  '机械制造', '新能源', '化工贸易', '建材', '医疗器械',
  '电子元器件', '食品配料', '纺织原料', '物流仓储', '化工新材料',
  '农业科技', '包装材料',
];

export const REGIONS = [
  '上海市', '江苏省', '广东省', '浙江省', '北京市',
  '深圳市', '山东省', '四川省', '河南省',
];

// -------------------- Tourism / Directory / Multi-City Types --------------------
export type BusinessCategory =
  | 'massage'
  | 'spa'
  | 'hotel'
  | 'restaurants'
  | 'tour'
  | 'culture'
  | 'shopping';

export type CitySlug =
  | 'phuket'
  | 'bangkok'
  | 'chiang-mai'
  | 'krabi'
  | 'pattaya'
  | 'beijing'
  | 'danang'
  | 'hanoi';

export type City = CitySlug;

export type PriceRange = '$' | '$$' | '$$$' | '$$$$';

export type ListingTier =
  | 'featured'
  | 'verified'
  | 'standard';

export interface OpeningHours {
  open: string;
  close: string;
  days: string;
}

export interface GeoLocation {
  lat: number;
  lng: number;
  address: string;
  googleMapsUrl?: string;
}

export interface ContactInfo {
  whatsapp?: string;
  wechat?: string;
  line?: string;
  phone?: string;
  email?: string;
  instagram?: string;
  facebook?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  nameZh?: string;
  nameJa?: string;
  nameKo?: string;
  description?: string;
  duration: number;
  price: number;
  currency: 'THB' | 'USD' | 'VND' | string;
  imageUrl?: string;
}

export interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
  source: 'google' | 'tripadvisor' | 'manual';
  avatarUrl?: string;
}

export interface Business {
  id: string;
  slug: string;
  name: string;
  nameZh?: string;
  tagline?: string;
  taglineZh?: string;
  description: string;
  descriptionZh?: string;

  category: BusinessCategory;
  city: City;
  tier: ListingTier;

  // Visuals
  heroImage: string;
  gallery: string[];
  logoUrl?: string;

  // Business info
  priceRange: PriceRange;
  startingPrice: number;
  currency: 'THB' | 'USD' | string;
  rating: number;
  reviewCount: number;
  services: ServiceItem[];

  // Location & Contact
  location: GeoLocation;
  contact: ContactInfo;
  openingHours: OpeningHours;

  // SEO & sorting
  isFeatured: boolean;
  isVerified: boolean;
  tags: string[];
  createdAt: string;
  published?: boolean;
}

export interface CityInfo {
  slug: CitySlug;
  name: string;
  nameZh: string;
  country: string;
  heroImage: string;
  description: string;
  popularAreas: string[];
  categories: BusinessCategory[];
  themeColor?: string;
}

export interface BusinessFilters {
  priceRange?: PriceRange[];
  minRating?: number;
  tags?: string[];
  sortBy?: 'rating' | 'price_asc' | 'price_desc' | 'newest';
}

export const CATEGORY_META: Record<BusinessCategory, {
  label: string;
  labelZh: string;
  emoji: string;
  description: string;
}> = {
  massage: {
    label: 'Massage',
    labelZh: '按摩',
    emoji: '💆',
    description: 'Traditional Thai massage, oil massage, foot massage & more',
  },
  spa: {
    label: 'Spa',
    labelZh: '水疗',
    emoji: '🌸',
    description: 'Luxury day spas, wellness centers & beauty treatments',
  },
  hotel: {
    label: 'Hotel',
    labelZh: '酒店',
    emoji: '🏨',
    description: 'Hotels, resorts, villas & boutique guesthouses',
  },
  restaurants: {
    label: 'Restaurants',
    labelZh: '餐厅',
    emoji: '🍜',
    description: 'Thai cuisine, seafood, rooftop bars & international dining',
  },
  tour: {
    label: 'Tours',
    labelZh: '出游',
    emoji: '⛵',
    description: 'Island hopping, diving, elephant sanctuary & city tours',
  },
  culture: {
    label: 'Culture',
    labelZh: '文化',
    emoji: '🏛️',
    description: 'Historical sites, temples, museums & art exhibits',
  },
  shopping: {
    label: 'Shopping',
    labelZh: '购物',
    emoji: '🛍️',
    description: 'Night markets, luxury malls & local artisan crafts',
  },
};

export const CITY_META: Record<CitySlug, {
  label: string;
  labelZh: string;
  country: string;
  hero: string;
}> = {
  phuket: {
    label: 'Phuket',
    labelZh: '普吉岛',
    country: 'Thailand',
    hero: '/phuket/city-hero.jpg',
  },
  bangkok: {
    label: 'Bangkok',
    labelZh: '曼谷',
    country: 'Thailand',
    hero: '/bangkok/city-hero.jpg',
  },
  'chiang-mai': {
    label: 'Chiang Mai',
    labelZh: '清迈',
    country: 'Thailand',
    hero: '/chiang-mai/city-hero.jpg',
  },
  krabi: {
    label: 'Krabi',
    labelZh: '甲米',
    country: 'Thailand',
    hero: '/krabi/city-hero.jpg',
  },
  pattaya: {
    label: 'Pattaya',
    labelZh: '芭提雅',
    country: 'Thailand',
    hero: '/pattaya/city-hero.jpg',
  },
  beijing: {
    label: 'Beijing',
    labelZh: '北京',
    country: 'China',
    hero: '/beijing/city-hero.jpg',
  },
  danang: {
    label: 'Danang',
    labelZh: '岘港',
    country: 'Vietnam',
    hero: '/danang/city-hero.jpg',
  },
  hanoi: {
    label: 'Hanoi',
    labelZh: '河内',
    country: 'Vietnam',
    hero: '/hanoi/city-hero.jpg',
  },
};

export const LISTING_TIER_LABELS: Record<ListingTier, string> = {
  featured: '⭐ Featured',
  verified: '✓ Verified',
  standard: 'Standard',
};
