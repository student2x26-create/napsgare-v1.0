export type SeoLink = {
  href: string
  label: string
  description?: string
}

export type SeoRelatedLinks = {
  brand?: { href: string; label: string }
  categories: Array<{ href: string; label: string }>
}

function ensureTrailingSlash(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return normalized === '/' ? '/' : normalized.replace(/\/+$/, '') + '/'
}

function normalizeName(value?: string): string {
  return (value ?? '').trim().toLowerCase().replace(/\s+/g, ' ')
}

export function buildHomeCategoryLinks(
  items: Array<{ slug?: string; name: string; url?: string }> = [],
): SeoLink[] {
  return items
    .filter((item) => item.slug || item.name)
    .slice(0, 6)
    .map((item) => {
      const slug = item.slug ?? item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      const href = ensureTrailingSlash(item.url ?? `/categories/${slug}`)
      return {
        href,
        label: item.name,
        description: `${item.name} products and supplements at NapsGear for bodybuilding, cutting, and performance support.`,
      }
    })
}

export function buildCategoryDescription(name: string): string {
  const label = (name || 'Supplements').trim()
  return `${label} products at NapsGear include trusted brands, performance-focused formulas, and competitively priced options for athletes and health-conscious shoppers.`
}

export function buildProductRelatedLinks(
  product: { slug: string; name: string; description?: string; brand?: string; ingredient?: string },
  categories: Array<{ slug: string; name: string; url?: string }> = [],
  brands: Array<{ slug: string | null; name: string }> = [],
): SeoRelatedLinks {
  const relatedCategories = categories
    .filter((category) => {
      const categoryName = normalizeName(category.name)
      const productName = normalizeName(product.name)
      const ingredient = normalizeName(product.ingredient)
      const description = normalizeName(product.description)
      return (
        productName.includes(categoryName) ||
        ingredient.includes(categoryName) ||
        description.includes(categoryName) ||
        categoryName.includes(ingredient) ||
        categoryName.includes(normalizeName(product.brand))
      )
    })
    .slice(0, 3)
    .map((category) => ({
      href: ensureTrailingSlash(category.url ?? `/categories/${category.slug}`),
      label: category.name,
    }))

  const brandMatch = brands.find((brand) => {
    const target = normalizeName(brand.name)
    const candidate = normalizeName(product.brand)
    return target === candidate || candidate.includes(target) || target.includes(candidate)
  })

  return {
    brand: brandMatch && brandMatch.slug
      ? { href: ensureTrailingSlash(`/brands/${brandMatch.slug}`), label: brandMatch.name }
      : undefined,
    categories: relatedCategories.length > 0
      ? relatedCategories
      : categories.slice(0, 3).map((category) => ({
          href: ensureTrailingSlash(category.url ?? `/categories/${category.slug}`),
          label: category.name,
        })),
  }
}

export const seoHelpTopics = [
  { question: 'How long does shipping take?', href: '/shipping-information/' },
  { question: 'How do I contact NapsGear support?', href: '/contact-us/' },
  { question: 'Where can I find my order status or support ticket?', href: '/help/' },
  { question: 'What payment and Bitcoin options are available?', href: '/checkout/' },
  { question: 'What products are popular for cutting and performance?', href: '/catalog/' },
  { question: 'Why buy from NapsGear?', href: '/why-naps/' },
]
