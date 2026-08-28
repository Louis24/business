import { Business, BusinessCategory, CitySlug } from './types';
import fs from 'fs';
import path from 'path';

// Server-side helper to read static JSON files from lib/data/
export async function getBusinesses(
  city: CitySlug,
  category: BusinessCategory
): Promise<Business[]> {
  try {
    const filePath = path.join(process.cwd(), 'lib', 'data', `${city}-${category}.json`);
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data: Business[] = JSON.parse(fileContents);
    return data.filter((b) => b.published !== false);
  } catch (error) {
    console.error(`Error loading businesses for ${city}/${category}:`, error);
    return [];
  }
}

export async function getBusinessBySlug(
  city: CitySlug,
  category: BusinessCategory,
  slug: string
): Promise<Business | null> {
  const businesses = await getBusinesses(city, category);
  return businesses.find((b) => b.slug === slug) || null;
}

export async function getFeaturedBusinesses(
  city: CitySlug = 'phuket',
  limit: number = 6
): Promise<Business[]> {
  // Load primary categories for the city
  const massage = await getBusinesses(city, 'massage');
  const spa = await getBusinesses(city, 'spa');
  const all = [...massage, ...spa];

  return all
    .filter((b) => b.tier === 'featured' || b.tier === 'verified')
    .slice(0, limit);
}
