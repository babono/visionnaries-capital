import Link from 'next/link'
import type { Metadata } from 'next'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'Page Not Found - Visionnaires Capital',
  description: 'The page you are looking for does not exist. This might be an old link from our previous website. Find what you need on our main pages.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 pt-24">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-sky-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8 max-w-md">
            The page you&apos;re looking for doesn&apos;t exist. This might be an old link from our previous website.
          </p>
          
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block bg-sky-600 text-white px-6 py-3 rounded-md font-medium hover:bg-sky-700 transition-colors"
            >
              Go to Homepage
            </Link>
            
            <div className="text-sm text-gray-500">
              <p>Looking for something specific? Try these pages:</p>
              <div className="flex flex-wrap justify-center gap-4 mt-2">
                <Link href="/about" className="text-sky-600 hover:underline">About</Link>
                <Link href="/services" className="text-sky-600 hover:underline">Services</Link>
                <Link href="/track-record" className="text-sky-600 hover:underline">Track Record</Link>
                <Link href="/current-transactions" className="text-sky-600 hover:underline">Live Transactions</Link>
                <Link href="/contact" className="text-sky-600 hover:underline">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
