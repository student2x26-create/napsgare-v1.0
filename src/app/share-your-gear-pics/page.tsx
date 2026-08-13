import type { Metadata } from 'next'
import InfoPage from '@/components/InfoPage'

export const metadata: Metadata = {
  title: 'Submit Gear Photos & Earn Store Credit',
  description: 'Submit clear photos of NapsGear products to our community gallery and earn store credit. Share your gym gear, packaging, and product setups.',
  keywords: ['submit photos', 'user photos', 'community gallery', 'earn credit', 'photo submission', 'gear photos'],
  alternates: { canonical: '/share-your-gear-pics/' },
}

export default function ShareGearPicsPage() {
  return <InfoPage title="Share Your Gear Pics" intro="Submit clear customer photos for possible publication in the community gallery." sections={[
    { heading: 'Photo guidelines', items: ['Use a clear, well-lit original photo.', 'Cover names, addresses, tracking labels, and order numbers.', 'Do not include faces or other personally identifying details.', 'Show only products relevant to the submission.'] },
    { heading: 'Moderation', paragraphs: ['Submissions are reviewed before appearing publicly. Images that reveal private information, contain unrelated material, or cannot be verified may be declined.'] },
    { heading: 'Store credit', paragraphs: ['Eligible campaigns may award store credit for approved submissions. The active offer and limits are shown in the promotion announcement.'] },
  ]} cta={{ href: '/community-gearpics/', label: 'View Community Gear Pics' }} />
}
