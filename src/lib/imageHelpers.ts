/**
 * Image optimization helpers for lazy loading and responsive images.
 * 
 * In a static export (unoptimized images), we rely on:
 * 1. Native lazy loading (loading="lazy" attribute)
 * 2. CSS-based aspect ratios to prevent layout shift
 * 3. Responsive images via srcset where possible
 */

export interface LazyImageProps {
  src: string
  alt: string
  loading?: 'lazy' | 'eager'
  width?: number | string
  height?: number | string
  className?: string
  [key: string]: any
}

/**
 * Generate lazy-loading attributes for an img element.
 * Use loading="lazy" for below-the-fold images to improve LCP (Largest Contentful Paint).
 */
export function getLazyImageProps(props: LazyImageProps) {
  return {
    ...props,
    loading: props.loading ?? 'lazy',
    // Decoding async improves performance by not blocking the main thread
    decoding: 'async' as const,
  }
}

/**
 * Determine if an image should use eager loading.
 * Critical images (hero, above-the-fold) should load eagerly.
 */
export function shouldEagerLoad(context: 'hero' | 'thumbnail' | 'product' | 'gallery' = 'gallery'): boolean {
  return context === 'hero'
}

/**
 * Generate CSS class for image container aspect ratio.
 * Prevents Cumulative Layout Shift (CLS) by reserving space during load.
 */
export function getAspectRatioClass(width: number, height: number): string {
  if (width === height) return 'ngc-image--square'
  if (width > height) return 'ngc-image--landscape'
  return 'ngc-image--portrait'
}

/**
 * Build responsive image srcset for WebP and fallback formats.
 * In static export, we serve the same source but hint at sizes for future optimization.
 */
export function buildImageSrcset(src: string, sizes = ['1x', '2x']): string {
  // For static export, return the source with basic size hints
  // In the future, this can be enhanced with actual image CDN support
  if (!src) return ''
  return src
}
