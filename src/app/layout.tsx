import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300","400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Visionnaires Capital - Cross Border M&A Specialist",
    template: "%s | Visionnaires Capital"
  },
  description: "Leading boutique M&A advisory firm specializing in cross-border transactions for Southeast Asian companies seeking international buyers. 15+ years experience, US$800M+ in deals closed.",
  keywords: [
    "M&A advisory",
    "cross-border transactions",
    "mergers acquisitions",
    "Southeast Asia",
    "Asia Pacific",
    "international buyers",
    "strategic exits",
    "investment banking",
    "corporate finance",
    "valuation",
    "Singapore",
    "Indonesia",
    "Vietnam",
    "Thailand",
    "Malaysia"
  ],
  authors: [{ name: "Visionnaires Capital" }],
  creator: "Visionnaires Capital",
  publisher: "Visionnaires Capital",
  metadataBase: new URL('https://visionnariescapital.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://visionnariescapital.com',
    title: 'Visionnaires Capital - Cross Border M&A Specialist',
    description: 'Leading boutique M&A advisory firm specializing in cross-border transactions for Southeast Asian companies seeking international buyers.',
    siteName: 'Visionnaires Capital',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Visionnaires Capital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visionnaires Capital - Cross Border M&A Specialist',
    description: 'Leading boutique M&A advisory firm specializing in cross-border transactions for Southeast Asian companies seeking international buyers.',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when you have them
    // google: 'your-google-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
