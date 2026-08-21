import type { Metadata } from 'next'
import HeroCarousel from "@/components/HeroCarousel";
import AmaSection from "@/components/AmaSection";
import QaSection from "@/components/QaSection";
import GearpicsSection from "@/components/GearpicsSection";
import JsonLd from "@/components/JsonLd";
import { localBusinessJsonLd } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/site";
import { categories } from '@/data'
import { buildHomeCategoryLinks } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'NapsGear | Premium Pharmaceutical Marketplace & Health Supplements Store',
  description: 'Shop premium health supplements, pharmaceutical products, and fitness essentials at NapsGear. Trusted by fitness enthusiasts worldwide. Authentic products, fast shipping, expert support.',
  keywords: [
    'supplements',
    'fitness supplements',
    'pharmaceutical products',
    'health supplements',
    'bodybuilding supplements',
    'online pharmacy',
    'premium supplements',
    'authentic products',
    'wellness store',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'NapsGear | Premium Pharmaceutical Marketplace',
    description: 'Discover quality health supplements and pharmaceutical products. Fast shipping, authentic guarantee, expert support.',
    type: 'website',
    url: SITE_URL,
    siteName: 'NapsGear',
  },
}

export default function HomePage() {
  const featuredCategories = buildHomeCategoryLinks(categories.slice(0, 6))

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <main className="main">
        <div className="notification">
          <section className="body">
            <span className="title">Success</span>
            <p className="message">Item added to cart</p>
          </section>
        </div>

        <div className="container">
          <HeroCarousel />
        </div>

        {/* Rich intro section for SEO and user engagement */}
        <section className="ngc-hero-intro">
          <div className="container">
            <h1>Welcome to NapsGear</h1>
            <p className="lead">The largest marketplace for pharmaceutical supplements and health products</p>
            <p>
              At NapsGear, we're dedicated to providing fitness enthusiasts, athletes, and health-conscious individuals with premium quality supplements and pharmaceutical products. 
              With years of industry expertise, we've built a reputation for authenticity, quality, and customer satisfaction.
            </p>
            <div className="ngc-features-grid">
              <div className="ngc-feature-card">
                <h3>✓ Authentic Products</h3>
                <p>100% genuine pharmaceutical supplements with verified sourcing</p>
              </div>
              <div className="ngc-feature-card">
                <h3>⚡ Fast Shipping</h3>
                <p>Quick and reliable delivery to customers worldwide</p>
              </div>
              <div className="ngc-feature-card">
                <h3>💬 Expert Support</h3>
                <p>Dedicated customer service team ready to help</p>
              </div>
              <div className="ngc-feature-card">
                <h3>🔒 Secure Shopping</h3>
                <p>Safe, encrypted transactions with multiple payment options</p>
              </div>
            </div>
            <a href="/catalog/" className="ngc-btn ngc-btn--primary">
              Browse Our Complete Catalog
            </a>
          </div>
        </section>

        <div className="welcome-text">
          <strong>NapsGear</strong> The largest marketplace for pharmaceuticals!
        </div>

        <div className="container">
          <AmaSection />
          <QaSection />
          <GearpicsSection />
        </div>

        {/* Trust & benefits section */}
        <section className="ngc-trust-section">
          <div className="container">
            <h2>Why Choose NapsGear?</h2>
            <ul className="ngc-benefits-list">
              <li><strong>Verified Authenticity:</strong> Every product is verified and sourced from authorized distributors. <a href="/laboratory-tests/">Learn about our testing process</a></li>
              <li><strong>Competitive Pricing:</strong> Best prices on the market with <a href="/promotions/">regular promotions</a> and <a href="/store-credit/">loyalty rewards</a></li>
              <li><strong>Expert Knowledge:</strong> Our team includes fitness and supplement experts to guide your choices. <a href="/ask-an-ifbb-pro/">Watch training Q&A videos</a></li>
              <li><strong>Fast & Reliable Shipping:</strong> We ship worldwide with tracking. <a href="/shipping-information/">View shipping details</a></li>
              <li><strong>Customer First Approach:</strong> Your satisfaction is guaranteed with <a href="/shipping-information/">our hassle-free return policy</a></li>
              <li><strong>Secure Checkout:</strong> Industry-leading security measures protect your personal and payment information</li>
            </ul>
          </div>
        </section>

        {/* CTA section for category exploration */}
        <section className="ngc-cta-section">
          <div className="container">
            <h2>Explore Popular Categories</h2>
            <p className="mb-3">
              Shop the most searched steroid and supplement categories for cutting, bulking, performance, and recovery.
            </p>
            <div className="ngc-category-links">
              {featuredCategories.map((category) => (
                <a
                  key={category.href}
                  href={category.href}
                  className="ngc-category-link"
                  title={category.description}
                >
                  {category.label}
                </a>
              ))}
              <a href="/catalog/" className="ngc-category-link ngc-category-link--primary">View All Categories</a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
