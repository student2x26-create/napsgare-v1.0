import { describe, expect, it } from 'vitest'
import { SITE_URL } from './site'
import {
  buildHomeCategoryLinks,
  buildProductRelatedLinks,
  buildCategoryDescription,
  seoHelpTopics,
} from './seo'

describe('SEO helpers', () => {
  it('uses the canonical production domain', () => {
    expect(SITE_URL).toBe('https://www.napsgare.com')
  })

  it('creates homepage category links with human-readable copy', () => {
    const links = buildHomeCategoryLinks([
      { slug: 'anavar', name: 'Anavar', url: '/categories/anavar' },
      { slug: 'fat-burners', name: 'Fat Burners', url: '/categories/fat-burners' },
      { slug: 'testosterone', name: 'Testosterone', url: '/categories/testosterone' },
    ])

    expect(links).toHaveLength(3)
    expect(links[0].href).toBe('/categories/anavar/')
    expect(links[0].description).toContain('Anavar')
  })

  it('builds related product links for brand and category context', () => {
    const links = buildProductRelatedLinks(
      {
        slug: 'anavar-10',
        name: 'Anavar 10',
        description: 'Anavar 10mg tabs',
        brand: 'Alpha Pharma',
        ingredient: 'Oxandrolone',
        images: [],
      },
      [
        { slug: 'anavar', name: 'Anavar', url: '/categories/anavar' },
        { slug: 'fat-burners', name: 'Fat Burners', url: '/categories/fat-burners' },
      ],
      [
        { slug: 'alpha-pharma', name: 'Alpha Pharma', url: '/brands/alpha-pharma', id: 1 },
      ],
    )

    expect(links.brand).toEqual({ href: '/brands/alpha-pharma/', label: 'Alpha Pharma' })
    expect(links.categories).toContainEqual({ href: '/categories/anavar/', label: 'Anavar' })
  })

  it('adds descriptive category copy and FAQ support topics for search intent', () => {
    expect(buildCategoryDescription('Anavar')).toContain('Anavar')
    expect(seoHelpTopics[0].question).toContain('shipping')
    expect(seoHelpTopics[0].href).toMatch(/^\//)
  })
})
