import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of valid paths in your new site
const validPaths = [
  '/',
  '/about',
  '/services',
  '/track-record',
  '/current-transactions',
  '/contact',
  '/api/current-transactions',
  '/api/download-teaser',
  '/api/get-teaser-url',
  '/api/submit-email-teaser',
  '/api/track-records'
]

// Common old paths that might be indexed (add your specific old paths here)
const oldPathRedirects: { [key: string]: string } = {
  '/old-about': '/about',
  '/old-services': '/services',
  '/portfolio': '/track-record',
  '/investments': '/track-record',
  '/deals': '/current-transactions',
  '/contact-us': '/contact',
  '/personnel/founders-profile': '/about',
  '/corporate-profile': '/about',
  '/services/capital-advisory': '/services',
  '/services/network': '/services',
  '/services/merger-acquisition': '/services',
  '/about-us-3': '/about',
  '/services/financial-strategy-and-corporate-advisory': '/services',
  '/portfolio_tag/merger-acquisition': '/portfolio',
  '/services/valuation-advisory': '/services',
  '/portfolio/my-republic': '/portfolio',
  '/team-frame-style': '/about',
  '/portfolio_tag/growth-capital': '/portfolio',
  '/portfolio/pd': '/portfolio',
  '/gallery': '/portfolio',
  '/portfolio/express-in-music': '/portfolio',
  '/portfolio/autobot': '/portfolio',
  '/portfolio/project-skin': '/portfolio',
  '/author/vp-admin': '/about',
  '/portfolio/omni': '/portfolio',
  '/portfolio/project-cyber': '/portfolio',
  '/portfolio/qoo-10': '/portfolio',
  '/portfolio/project-lab': '/portfolio',
  '/portfolio/reka-health': '/portfolio',
  '/author/vp-admin/page/2': '/about',
  '/even-the-all-powerful-pointing': '/about'
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Handle specific old path redirects
  if (oldPathRedirects[pathname]) {
    return NextResponse.redirect(new URL(oldPathRedirects[pathname], request.url), 301)
  }

  // Check if it's a static file or API route
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.') ||
    validPaths.some(path => pathname.startsWith(path))
  ) {
    return NextResponse.next()
  }

  // Handle dynamic routes like /track-record/[id]
  if (pathname.startsWith('/track-record/') && pathname.split('/').length === 3) {
    return NextResponse.next()
  }

  // For any other unrecognized path, redirect to home with 301
  // This helps with SEO by telling search engines the old URLs are permanently moved
  return NextResponse.redirect(new URL('/', request.url), 301)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
