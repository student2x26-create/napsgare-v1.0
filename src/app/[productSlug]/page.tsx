import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { products, productsBySlug, brands, categories } from '@/data'
import ProductDetail from '@/components/ProductDetail'
import JsonLd from '@/components/JsonLd'
import { productJsonLd, breadcrumbJsonLd } from '@/lib/jsonld'
import { SITE_NAME, absoluteUrl } from '@/lib/site'
import { buildProductRelatedLinks } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  const slugs = products.map((p) => p.slug).filter(Boolean)
  if (slugs.length === 0) return [{ productSlug: '_empty' }]
  return slugs.map((slug) => ({ productSlug: slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ productSlug: string }> },
): Promise<Metadata> {
  const { productSlug } = await params
  const product = productsBySlug.get(productSlug)
  if (!product) return { title: 'Product not found' }

  const description = product.description
    ? `${product.name}${product.brand ? ` by ${product.brand}` : ''} — ${product.description.slice(0, 160).replace(/\s+/g, ' ').trim()}`
    : `${product.name}${product.brand ? ` by ${product.brand}` : ''} — available at ${SITE_NAME}.`

  const ogImage = product.images?.[0]

  return {
    title: `${product.name}${product.brand ? ` | ${product.brand}` : ''} | ${SITE_NAME}`,
    description,
    alternates: { canonical: `/${product.slug}/` },
    openGraph: {
      type: 'website',
      title: product.name,
      description,
      url: absoluteUrl(`/${product.slug}/`),
      images: ogImage ? [absoluteUrl(ogImage)] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description,
      images: ogImage ? [absoluteUrl(ogImage)] : undefined,
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productSlug: string }>
}) {
  const { productSlug } = await params
  const product = productsBySlug.get(productSlug)
  if (!product) notFound()

  const crumbs = [
    { name: 'Home', href: '/' },
    ...(product.brand ? [{ name: product.brand }] : []),
    { name: product.name },
  ]

  const related = buildProductRelatedLinks(product, categories, brands)

  return (
    <main className="main">
      <JsonLd data={[productJsonLd(product), breadcrumbJsonLd(crumbs)]} />
      <div className="container py-5">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            {product.brand && (
              <li className="breadcrumb-item">{product.brand}</li>
            )}
            <li className="breadcrumb-item active" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>
        <ProductDetail product={product} />

        {(related.brand || related.categories.length > 0) && (
          <section className="mt-4 mb-5">
            <h2>Related shopping links</h2>
            <p className="mb-2">
              {related.brand && (
                <><a href={related.brand.href}>{related.brand.label}</a>{' '}</>
              )}
              {related.categories.map((item) => (
                <span key={item.href}><a href={item.href}>{item.label}</a>{' '}</span>
              ))}
            </p>
          </section>
        )}
      </div>
    </main>
  )
}
