import React from 'react';
import { Users, Award, Globe, TrendingUp } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="text-white pt-20" style={{ background: 'linear-gradient(to right, #122a5e, #455781)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Services
            </h1>            
          </div>
        </div>
      </section>      

      {/* Services Overview */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Valuation Advisory */}
            <div className="bg-white rounded-xl shadow flex flex-col">
              <div className="relative h-32 rounded-lg overflow-hidden flex items-center justify-center rounded-b-none">
                <img src="/images/valuation-header.jpg" alt="Valuation Advisory" className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white text-center">Valuation Advisory</h3>
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-700 mb-2 text-center">Seeing Value When Others Don’t</h4>
                <p className="text-gray-600 text-center">
                  Companies seek valuation for different purposes: they may be purchasing or selling a firm, merging with other firms or raising capital for the firm.
                </p>
              </div>
            </div>
            {/* Capital Advisory */}
            <div className="bg-white rounded-xl shadow flex flex-col">
              <div className="relative h-32 rounded-lg overflow-hidden flex items-center justify-center rounded-b-none">
                <img src="/images/capital-header.jpg" alt="Capital Advisory" className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white text-center">Capital Advisory</h3>
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-700 mb-2 text-center">Delivering The Capital to Build Your Legacy</h4>
                <p className="text-gray-600 text-center">
                  For growth-stage companies, securing funds at the right time and the right amount is crucial to its survival.
                </p>
              </div>
            </div>
            {/* Merger & Acquisition */}
            <div className="bg-white rounded-xl shadow flex flex-col">
              <div className="relative h-32 rounded-lg overflow-hidden flex items-center justify-center rounded-b-none">
                <img src="/images/merger-header.jpg" alt="Merger & Acquisition" className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white text-center">Merger & Acquisition</h3>
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-700 mb-2 text-center">
                  Empowering Your Business Growth Through Merger and Acquisition
                </h4>
                <p className="text-gray-600 text-center">
                  Growth is essential to all businesses, including yours. One way to expand your business and extend your footprints across multiple markets is through merger and acquisition (M&A).
                </p>
              </div>
            </div>
            {/* Financial Strategy and Corporate Advisory */}
            <div className="bg-white rounded-xl shadow flex flex-col">
              <div className="relative h-32 rounded-lg overflow-hidden flex items-center justify-center rounded-b-none">
                <img src="/images/financial-header.jpg" alt="Financial Strategy and Corporate Advisory" className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white text-center">Financial Strategy and Corporate Advisory</h3>
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-700 mb-2 text-center">
                  Empowering Your Business Growth Through Financial Strategy
                </h4>
                <p className="text-gray-600 text-center">
                  Many start-ups are founded with an end in mind, with popular exit strategies that include outright trade sale and Initial Public Offering (IPO).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}