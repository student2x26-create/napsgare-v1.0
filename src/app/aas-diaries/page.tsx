import type { Metadata } from 'next'
import diariesJson from '@/data/diaries.json'
import type { DiaryEntry } from '@/data/types'

const diaries: DiaryEntry[] = diariesJson as DiaryEntry[]

export const metadata: Metadata = {
  title: 'Cycle Diaries | Real Bodybuilding Progress Logs',
  description: 'Read real cycle diaries and progress logs from NapsGear community members. Track training, nutrition, and results from actual users.',
  keywords: ['cycle diary', 'progress log', 'user diaries', 'bodybuilding journal', 'training log', 'community content'],
  alternates: { canonical: '/aas-diaries/' },
}

export default function DiariesPage() {
  return (
    <main className="main">
      <div className="container py-5">
        <h1 className="mb-4">AAS Diaries</h1>
        {diaries.length === 0 ? (
          <p className="text-muted">No diary entries yet.</p>
        ) : (
          <div className="row g-4">
            {diaries.map(d => (
              <div key={d.slug} className="col-12 col-md-6 col-lg-4">
                <article className="card h-100">
                  {d.thumbnail && (
                    <img src={d.thumbnail} alt="" className="card-img-top" />
                  )}
                  <div className="card-body">
                    <h2 className="h5">
                      {d.sourceUrl ? (
                        <a href={d.sourceUrl} rel="noreferrer">{d.title}</a>
                      ) : (
                        d.title
                      )}
                    </h2>
                    <p className="text-muted small mb-2">
                      {d.author && <span>{d.author} · </span>}
                      <time>{d.date}</time>
                    </p>
                    {d.excerpt && (
                      <p className="text-muted">{d.excerpt}</p>
                    )}
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
