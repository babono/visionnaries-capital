import React from 'react';
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
                <div className="absolute inset-0 bg-sky-600 bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white text-center">Sell-side & M&A Advisory</h3>
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-700 mb-2 text-center">Unlocking Maximum Value</h4>
                <p className="text-gray-600 text-center">
                  In sell-side mandates, we work closely with shareholders and management teams to prepare the business for a competitive and value-maximizing transaction. <br />
                  A typical process includes internal valuation, strategic positioning, preparing a data room, buyer screening, transaction marketing, running a due diligence process, and negotiating with investors. We put a strong emphasis on confidentiality and execution certainty.
                </p>
              </div>
            </div>
            {/* Capital Advisory */}
            <div className="bg-white rounded-xl shadow flex flex-col">
              <div className="relative h-32 rounded-lg overflow-hidden flex items-center justify-center rounded-b-none">
                <img src="/images/capital-header.jpg" alt="Capital Advisory" className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-sky-600 bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white text-center">Buyside M&A Advisory</h3>
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-700 mb-2 text-center">Empowering your growth</h4>
                <p className="text-gray-600 text-center">
                  On buy-side engagements, we assist corporate and financial buyers in identifying, evaluating, and executing acquisition opportunities aligned with their growth strategies.
                  A typical process includes deal sourcing, valuation analysis, due diligence, acquisition financing, negotiation, and transaction structuring support. We highly value alignment with our clients and long-term value creation.
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