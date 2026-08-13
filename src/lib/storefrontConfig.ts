const trim = (value: string | undefined) => value?.trim() ?? ''

function isPlaceholderValue(value: string) {
  if (!value) return true
  const lowered = value.trim().toLowerCase()
  return [
    'example.com',
    'example.org',
    'example.net',
    'support@example.com',
    'support@napsgear.io',
    '+10000000000',
    '0000000000',
    'https://example.com',
    'http://example.com',
    'https://payments.example.com',
    'http://payments.example.com',
    'your-hcaptcha-site-key',
    'your-access-key-here',
  ].some(token => lowered.includes(token))
}

function sanitizeEmail(value: string) {
  const trimmed = trim(value)
  return trimmed && !isPlaceholderValue(trimmed) ? trimmed : ''
}

function sanitizeWhatsApp(value: string) {
  const trimmed = trim(value)
  return trimmed && !isPlaceholderValue(trimmed) ? trimmed : ''
}

function sanitizePaymentUrl(value: string) {
  const trimmed = trim(value)
  if (!trimmed || isPlaceholderValue(trimmed)) return ''
  try {
    const url = new URL(trimmed)
    return ['http:', 'https:'].includes(url.protocol) ? trimmed : ''
  } catch {
    return ''
  }
}

export const SUPPORT_EMAIL = sanitizeEmail(process.env.NEXT_PUBLIC_SUPPORT_EMAIL || '')
export const SUPPORT_WHATSAPP = sanitizeWhatsApp(process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || '')
export const BTC_WALLET_ADDRESS = trim(process.env.NEXT_PUBLIC_BTC_WALLET_ADDRESS)
export const BTC_PAYMENT_URL = sanitizePaymentUrl(process.env.NEXT_PUBLIC_BTC_PAYMENT_URL || '')

export function normalizeWhatsAppNumber(value: string) {
  return value.replace(/[^\d]/g, '')
}

export function buildWhatsAppHref(value = SUPPORT_WHATSAPP) {
  const digits = normalizeWhatsAppNumber(value)
  return digits ? `https://wa.me/${digits}` : ''
}

export function buildPaymentHref({
  reference,
  total,
  baseUrl = BTC_PAYMENT_URL,
}: {
  reference: string
  total: string
  baseUrl?: string
}) {
  const href = sanitizePaymentUrl(baseUrl ?? '')
  if (!href) return ''
  return href
    .replaceAll('{reference}', encodeURIComponent(reference))
    .replaceAll('{total}', encodeURIComponent(total))
}

export function renderBitcoinInstructions({
  reference,
  total,
  wallet = BTC_WALLET_ADDRESS,
  paymentUrl = BTC_PAYMENT_URL,
  supportEmail = SUPPORT_EMAIL,
  supportWhatsApp = SUPPORT_WHATSAPP,
}: {
  reference: string
  total: string
  wallet?: string
  paymentUrl?: string
  supportEmail?: string
  supportWhatsApp?: string
}) {
  const safePaymentUrl = sanitizePaymentUrl(paymentUrl ?? '')
  const safeSupportEmail = sanitizeEmail(supportEmail ?? '')
  const safeSupportWhatsApp = sanitizeWhatsApp(supportWhatsApp ?? '')

  return [
    'Payment method: Bitcoin',
    `Order reference: ${reference}`,
    `Order total: ${total}`,
    wallet ? `BTC wallet: ${wallet}` : '',
    safePaymentUrl ? `Payment link: ${buildPaymentHref({ reference, total, baseUrl: safePaymentUrl })}` : '',
    safeSupportEmail ? `Support email: ${safeSupportEmail}` : '',
    safeSupportWhatsApp ? `WhatsApp: ${safeSupportWhatsApp}` : '',
    'Use the wallet details below and contact support with your order reference.',
  ].filter(Boolean).join('\n')
}
