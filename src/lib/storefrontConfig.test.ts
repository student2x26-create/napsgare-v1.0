import { describe, expect, it } from 'vitest'
import { buildPaymentHref, buildWhatsAppHref, normalizeWhatsAppNumber, renderBitcoinInstructions } from './storefrontConfig'

describe('storefrontConfig helpers', () => {
  it('normalizes WhatsApp numbers for wa.me links', () => {
    expect(normalizeWhatsAppNumber('+1 (555) 123-4567')).toBe('15551234567')
    expect(buildWhatsAppHref('+1 (555) 123-4567')).toBe('https://wa.me/15551234567')
  })

  it('fills payment URL placeholders', () => {
    expect(buildPaymentHref({
      reference: 'NG-20260623-ABC123',
      total: '$238.00',
      baseUrl: 'https://pay.example/checkout?ref={reference}&amount={total}',
    })).toBe('https://pay.example/checkout?ref=NG-20260623-ABC123&amount=%24238.00')
  })

  it('ignores placeholder / stale config values so no fake payment link leaks into the email', () => {
    expect(buildPaymentHref({
      reference: 'NG-20260623-ABC123',
      total: '$238.00',
      baseUrl: 'https://example.com/pay-with-bitcoin',
    })).toBe('')

    const instructions = renderBitcoinInstructions({
      reference: 'NG-20260623-ABC123',
      total: '$238.00',
      wallet: 'bc1-wallet',
      paymentUrl: 'https://example.com/pay-with-bitcoin',
      supportEmail: 'support@napsgear.io',
      supportWhatsApp: '+10000000000',
    })

    expect(instructions).not.toContain('Payment link:')
    expect(instructions).not.toContain('support@napsgear.io')
    expect(instructions).not.toContain('+10000000000')
  })

  it('renders Bitcoin payment instructions with configured support channels', () => {
    const instructions = renderBitcoinInstructions({
      reference: 'NG-20260623-ABC123',
      total: '$238.00',
      wallet: 'bc1-wallet',
      paymentUrl: 'https://pay.example/{reference}',
      supportEmail: 'support@example.com',
      supportWhatsApp: '+15551234567',
    })

    expect(instructions).toContain('BTC wallet: bc1-wallet')
    expect(instructions).toContain('WhatsApp: +15551234567')
    expect(instructions).not.toContain('support@example.com')
  })

  it('uses the cleaner support guidance for payment follow-up', () => {
    const instructions = renderBitcoinInstructions({
      reference: 'NG-20260623-ABC123',
      total: '$238.00',
      wallet: 'bc1-wallet',
      supportEmail: 'support@example.com',
      supportWhatsApp: '+15551234567',
    })

    expect(instructions).toContain('Use the wallet details below and contact support with your order reference.')
    expect(instructions).not.toContain('Send Bitcoin payment and include the order reference when contacting support.')
    expect(instructions).not.toContain('support@example.com')
  })
})
