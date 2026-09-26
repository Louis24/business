import type { MetadataRoute } from 'next'
import { CITIES_CONFIG } from '@/lib/config/cities'

const siteUrl = 'https://business.neonstack.net'
const lastModified = new Date('2026-09-26T00:00:00.000Z')

const routes = ['/', '/chamber', '/merchants', '/news']

// City home + city/category listing routes
const guideRoutes = [
  ...Object.keys(CITIES_CONFIG).map((city) => `/${city}`),
  ...Object.entries(CITIES_CONFIG).flatMap(([city, info]) =>
    info.categories.map((category) => `/${city}/${category}`)
  ),
]

export default function sitemap(): MetadataRoute.Sitemap {
  return [...routes, ...guideRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route.startsWith('/chamber') ? 0.9 : 0.7,
  }))
}
