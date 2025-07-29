import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Visionnaires Capital Pte Ltd</h3>
            <p className="text-gray-400 mb-6 max-w-md text-xs">
              Visionnaires Capital is a leading M&A advisory firm specializing in cross-border transactions across Asia Pacific. We focus on both sell-side and buy-side mandates, with deep expertise in unlocking premium outcomes through access to strategic and listed buyers globally—particularly in Japan, the U.S., and Europe. Our strength lies not only in execution, but in origination: we proactively source proprietary, off-market opportunities and deliver direct access to international buyers, unlike many regional firms limited to local networks. For sell-side clients, we manage the full transaction process end-to-end—from valuation and strategic positioning, to due diligence oversight, SPA/SHA negotiation, and legal counsel coordination. On the buy-side, we help clients identify and acquire the right businesses with precision—maintaining buyer anonymity, ensuring valuation discipline, and providing cultural and commercial context crucial for overseas buyers entering Asia. With a strong track record, high close rates, and a commitment to only taking on mandates where we know we can deliver real value, Visionnaires Capital is the trusted partner for cross-border growth.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.linkedin.com/company/visionnaires-capital-pte-ltd"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Empty column for spacing on large screens */}
          <div></div>

          {/* Contact Info moved here */}
          <div className="flex flex-col space-y-4 justify-center">
            <div className="flex items-top">
              <MapPin className="h-5 w-5 text-sky-600 mr-3 mt-1" />
              <span className="text-gray-400">
                9 Temasek Blvd<br />
                #07-01 Suntec Tower 2<br />
                Singapore 038989
                <br />
              </span>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-sky-600 mr-3" />
              <span className="text-gray-400">
                +65 94877077
              </span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-sky-600 mr-3" />
              <span className="text-gray-400">
                info@vision-cap.com
              </span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © 2025 Visionnaires Capital Pte Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}