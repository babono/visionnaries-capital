import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Visionnaires Capital</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Leading financial advisory firm specializing in valuation, capital advisory, 
              merger & acquisition, and financial strategy services across Southeast Asia.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services/valuation-advisory" className="text-gray-400 hover:text-white transition-colors">
                  Valuation Advisory
                </Link>
              </li>
              <li>
                <Link href="/services/capital-advisory" className="text-gray-400 hover:text-white transition-colors">
                  Capital Advisory
                </Link>
              </li>
              <li>
                <Link href="/services/merger-acquisition" className="text-gray-400 hover:text-white transition-colors">
                  Merger & Acquisition
                </Link>
              </li>
              <li>
                <Link href="/services/financial-strategy" className="text-gray-400 hover:text-white transition-colors">
                  Financial Strategy
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about/corporate-profile" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/network" className="text-gray-400 hover:text-white transition-colors">
                  Network
                </Link>
              </li>
              <li>
                <Link href="/track-record" className="text-gray-400 hover:text-white transition-colors">
                  Track Record
                </Link>
              </li>
              <li>
                <Link href="/live-transactions" className="text-gray-400 hover:text-white transition-colors">
                  Live Transactions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-blue-400 mr-3" />
              <span className="text-gray-400">
                Singapore Financial District
              </span>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-blue-400 mr-3" />
              <span className="text-gray-400">
                +65 6xxx xxxx
              </span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-blue-400 mr-3" />
              <span className="text-gray-400">
                info@visionnaries-capital.com
              </span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © 2024 Visionnaires Capital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 