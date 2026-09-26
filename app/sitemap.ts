import type { MetadataRoute } from 'next'

const siteUrl = 'https://business.neonstack.net'
const lastModified = new Date('2026-09-23T00:00:00.000Z')

const routes = [
  '/',
  '/chamber',
  '/merchants',
  '/news',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }))
}
