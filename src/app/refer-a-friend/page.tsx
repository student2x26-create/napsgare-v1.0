import type { Metadata } from 'next'
import InfoPage from '@/components/InfoPage'

export const metadata: Metadata = {
  title: 'Refer a Friend & Earn Store Credit',
  description: 'Share your NapsGear referral link with friends and earn account credit from qualifying new customer orders. Win-win for you and your friends.',
  keywords: ['referral program', 'refer friend', 'earn credit', 'store credit', 'referral bonus', 'invite friends'],
  alternates: { canonical: '/refer-a-friend/' },
}

export default function ReferFriendPage() {
  return <InfoPage title="Refer NapsGear for Cash" intro="Registered customers can share a personal referral link and earn account credit from qualifying referrals." sections={[
    { heading: 'How it works', items: ['Sign in and open your account page.', 'Copy your personal referral link.', 'Share it directly with eligible new customers.', 'Qualifying activity is credited according to the active referral terms.'] },
    { heading: 'Eligibility', paragraphs: ['Self-referrals, duplicate accounts, unsolicited bulk messages, paid search impersonation, and misleading promotion are prohibited. Referral attribution depends on the customer using the tracked link and completing the qualifying action.'] },
  ]} cta={{ href: '/account/', label: 'Open My Account' }} />
}
