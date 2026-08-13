import type { Metadata } from 'next'
import InfoPage from '@/components/InfoPage'

export const metadata: Metadata = {
  title: 'Cashback Program | Earn Promotional Credit at NapsGear',
  description: 'Earn promotional cashback on eligible products at NapsGear. Redeem cashback as store credit toward future purchases. Check product details for qualifying offers.',
  keywords: ['cashback', 'store credit', 'promotional offers', 'discounts', 'rewards', 'earn credit'],
  alternates: { canonical: '/cashback/' },
}

export default function CashbackPage() {
  return <InfoPage title="Cashback Program" intro="Selected products and suppliers may include promotional cashback issued as store credit." sections={[
    { heading: 'Qualifying offers', paragraphs: ['Cashback applies only when a product or promotion explicitly displays the offer. Percentages, caps, eligible pack sizes, and promotion dates can differ.'] },
    { heading: 'Receiving credit', paragraphs: ['Eligible credit is calculated from the qualifying merchandise value after discounts. Shipping charges and previously issued credit are excluded unless an offer says otherwise.'] },
    { heading: 'Returns and adjustments', paragraphs: ['Cancelled, refunded, disputed, or ineligible orders can cause pending or issued promotional credit to be reversed.'] },
  ]} cta={{ href: '/promotions/', label: 'View Promotions' }} />
}
