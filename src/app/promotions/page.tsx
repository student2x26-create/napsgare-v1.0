import type { Metadata } from 'next'
import promosJson from '@/data/promotions.json'
import type { Promotion } from '@/data/types'

const promos: Promotion[] = promosJson as Promotion[]

export const metadata: Metadata = {
  title: 'Promotions & Deals | Current Offers at NapsGear',
  description: 'Browse current NapsGear promotions, limited-time deals, exclusive bundles, and supplier offers. Updated regularly with seasonal sales.',
  keywords: ['promotions', 'deals', 'discounts', 'sale', 'bundles', 'offers', 'limited time', 'seasonal offers'],
  alternates: { canonical: '/promotions/' },
}

export default function PromotionsPage() {
  // Group by body (section heading) so we render Earn Store Credit /
  // Products on Sale / Ask Me Anything as distinct columns.
  const groups = new Map<string, Promotion[]>()
  for (const p of promos) {
    const k = p.body || 'General'
    const arr = groups.get(k) ?? []
    arr.push(p)
    groups.set(k, arr)
  }

  return (
    <main className="main">
      <div className="container py-5">
        <h1 className="mb-4">All Promotions</h1>
        {promos.length === 0 ? (
          <p className="text-muted">No active promotions right now.</p>
        ) : (
          [...groups.entries()].map(([heading, items]) => (
            <section key={heading} className="mb-4">
              <h2 className="h5">{heading}</h2>
              <div className="row row-cols-1 row-cols-md-2 g-3">
                {items.map(p => (
                  <div key={p.id} className="col">
                    <article className="card h-100">
                      {p.image && <img src={p.image} alt="" className="card-img-top" />}
                      <div className="card-body">
                        <h3 className="h6 mb-2">{p.title}</h3>
                        {p.cta && (
                          <a className="btn btn-sm btn-dark" href={p.cta.href}>
                            {p.cta.label}
                          </a>
                        )}
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </main>
  )
}
