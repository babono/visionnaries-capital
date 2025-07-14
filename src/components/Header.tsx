'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NavigationItem } from '../types/index';

const navigation: NavigationItem[] = [
  {
    title: 'ABOUT',
    href: '#',
    children: [
      { title: 'CORPORATE PROFILE', href: '/about/corporate-profile' },
      { title: "FOUNDER'S PROFILE", href: '/about/founders-profile' },
    ],
  },
  {
    title: 'SERVICES',
    href: '/services',
    children: [
      { title: 'VALUATION ADVISORY', href: '/services/valuation-advisory' },
      { title: 'CAPITAL ADVISORY', href: '/services/capital-advisory' },
      { title: 'MERGER & ACQUISITION', href: '/services/merger-acquisition' },
      { title: 'FINANCIAL STRATEGY & CORPORATE ADVISORY', href: '/services/financial-strategy' },
    ],
  },
  { title: 'NETWORK', href: '/network' },
  { title: 'TRACK RECORD', href: '/track-record' },
  { title: 'LIVE TRANSACTIONS', href: '/current-transactions' },
  { title: 'CONTACT', href: '/contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ backgroundColor: '#000f1c' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/v_logo_hi.png"
              alt="Visionnaires Capital"
              width={200}
              height={40}
              className="h-8 lg:h-10"
              style={{ width: "auto", height: "auto" }}
              priority={false}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.title} className="relative group">
                {item.href !== '#' ? (
                  <Link
                    href={item.href}
                    className="flex items-center text-sm font-medium transition-colors duration-200 text-white hover:text-blue-200"
                  >
                    {item.title}
                    {item.children && (
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                    )}
                  </Link>
                ) : (
                  <button
                    className="flex items-center text-sm font-medium transition-colors duration-200 text-white hover:text-blue-200"
                  >
                    {item.title}
                    {item.children && (
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                    )}
                  </button>
                )}
                {/* Dropdown Menu */}
                {item.children && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.title}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md transition-colors text-white hover:bg-white/10"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-700" style={{ backgroundColor: '#000f1c' }}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <div key={item.title}>
                <div className="text-white block px-3 py-2 text-base font-medium">
                  {item.title}
                </div>
                {item.children && (
                  <div className="pl-4 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.title}
                        href={child.href}
                        className="text-gray-300 block px-3 py-2 text-sm hover:text-blue-200 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
} 