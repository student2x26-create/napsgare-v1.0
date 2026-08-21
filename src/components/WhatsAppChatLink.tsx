import { buildWhatsAppHref } from '@/lib/storefrontConfig'

export default function WhatsAppChatLink() {
  const href = buildWhatsAppHref()
  if (!href) return null

  return (
    <a
      className="ngc-whatsapp-chat"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with NapsGear support on WhatsApp"
    >
      <svg
        className="ngc-whatsapp-chat__icon"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path
          fill="currentColor"
          d="M12.04 2.02c-5.46 0-9.9 4.34-9.9 9.69 0 1.7.44 3.35 1.27 4.8l-1.35 4.92 5.08-1.33a9.68 9.68 0 0 0 4.9 1.31c5.46 0 9.9-4.34 9.9-9.69s-4.44-9.7-9.9-9.7zm5.73 13.33c-.25.7-1.46 1.36-2.01 1.43-.51.08-1.15.12-3.7-.79-3.13-1.12-5.16-3.86-5.32-4.04-.16-.18-1.32-1.75-1.32-3.35 0-1.6 .84-2.39 1.14-2.72.3-.33.66-.42 1.08-.42h.77c.24 0 .57.01.87.66.31.68.96 2.35.98 2.51.05.18.01.41-.17.65-.18.24-.2.4-.39.62-.18.22-.39.5-.55.67-.18.18-.37.39-.16.73.2.33.9 1.49 1.93 2.4 1.33 1.18 2.45 1.54 2.78 1.71.33.17.52.14.71-.09.2-.24.86-.99.92-1.33.08-.34.17-.28.36-.17.19.11 1.18.56 1.38.66.2.11.33.17.38.27.05.1.05.6-.2 1.3z"
        />
      </svg>
    </a>
  )
}
