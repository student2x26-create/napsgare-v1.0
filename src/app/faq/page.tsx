import type { Metadata } from 'next'
import faqJson from '@/data/faq.json'
import type { FaqEntry } from '@/data/types'
import JsonLd from '@/components/JsonLd'
import { faqPageJsonLd } from '@/lib/jsonld'

const faq: FaqEntry[] = faqJson as FaqEntry[]

export const metadata: Metadata = {
  title: 'FAQ - NapsGear | Ordering, Shipping & Product Questions',
  description: 'Get answers to frequently asked questions about NapsGear products, ordering, shipping, returns, and authenticity. Trusted source for pharmaceutical supplements.',
  alternates: { canonical: '/faq/' },
  keywords: ['faq', 'help', 'questions', 'ordering', 'shipping', 'returns', 'product authentication'],
}

export default function FAQPage() {
  // Group by category, preserving insertion order
  const groups = new Map<string, FaqEntry[]>()
  for (const e of faq) {
    const k = e.category ?? 'General'
    const arr = groups.get(k) ?? []
    arr.push(e)
    groups.set(k, arr)
  }

  // Build FAQ schema items from questions with answers
  const schemaItems = faq
    .filter(e => e.question && (e.answer || e.sourceUrl))
    .map(e => ({
      question: e.question,
      answer: e.answer || `For more information, see ${e.sourceUrl}`,
    }))

  return (
    <>
      <JsonLd data={faqPageJsonLd(schemaItems)} />
      <main className="main">
        <div className="container py-5">
          <article className="ngc-info-page">
            <header className="ngc-info-page__header">
              <h1>Frequently Asked Questions</h1>
              <p>Browse the original support topics by category. Each question opens its full NapsHelp knowledgebase article.</p>
            </header>
            {faq.length === 0 ? (
              <p className="text-muted">No FAQ entries available.</p>
            ) : (
              [...groups.entries()].map(([cat, entries]) => (
                <section key={cat} className="ngc-info-page__section">
                  <h2>{cat}</h2>
                  <ul className="list-unstyled">
                    {entries.map(e => (
                      <li key={e.id} className="mb-2" data-faq-q={e.id}>
                        {e.sourceUrl ? (
                          <a href={e.sourceUrl} rel="noreferrer">{e.question}</a>
                        ) : (
                          <strong>{e.question}</strong>
                        )}
                        {e.answer && (
                          <div className="text-muted mt-1" data-faq-a={e.id}>{e.answer}</div>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              ))
            )}
            <a className="ngc-btn ngc-btn--dark" href="/contact-us/">Contact Support</a>

            {/* Related links for better internal navigation */}
            <section className="ngc-info-page__related-links">
              <h3>Helpful resources</h3>
              <ul className="ngc-link-list">
                <li><a href="/help/">Help Portal & Tickets</a></li>
                <li><a href="/contact-us/">Contact Support</a></li>
                <li><a href="/shipping-information/">Shipping & Returns</a></li>
                <li><a href="/why-naps/">About NapsGear</a></li>
              </ul>
            </section>
          </article>
        </div>
      </main>
    </>
  )
}
