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
                <div className="text-gray-600 text-left space-y-4">
                  <p>
                    In our sell-side mandates, we work closely with shareholders and management teams to position the business for a competitive, value-maximising outcome.
                  </p>
                  <p>
                    We go beyond traditional advisory. We actively manage the full transaction process to ensure valuation is maximised, risks are mitigated, and closing certainty is high.
                  </p>
                  <div>
                    <p className="font-semibold mb-2">Our typical scope includes:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Internal valuation and benchmarking</li>
                      <li>Strategic positioning tailored to global acquirers</li>
                      <li>Preparation of marketing materials and virtual data room</li>
                      <li>Targeted outreach and screening through our global buyer network</li>
                      <li>Discreet transaction marketing and NDA coordination</li>
                      <li>Full due diligence management—including document review, data gap checks, and buyer Q&A handling</li>
                      <li>Active negotiation support on SPA/SHA terms, including commercial structuring and legal clause advisory</li>
                      <li>Coordination and oversight of legal counsel to ensure alignment with deal strategy and protect seller interests</li>
                    </ul>
                  </div>
                  <p>
                    We act as the central deal driver—balancing strategy, execution, and legal negotiations—so our clients can stay focused on running the business while we drive the deal to close.
                  </p>
                </div>
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
                <div className="text-gray-600 text-left space-y-4">
                  <p>
                    At Visionnaires Capital, we specialise in helping corporate and financial investors execute strategic acquisitions across Southeast Asia and the broader Asia Pacific region.
                  </p>
                  <p>
                    What sets us apart is our origination capability—we don&apos;t just wait for deals to come to market. We proactively source and unlock proprietary, off-market opportunities that are aligned with your strategic objectives and offer superior value. This direct access allows our clients to avoid crowded processes and inflated pricing driven by competitive tension.
                  </p>
                  <div>
                    <p className="font-semibold mb-2">Our typical buy-side scope includes:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Off-market origination and discreet target outreach</li>
                      <li>Strategic fit assessment and valuation benchmarking—ensuring discipline in pricing, especially where buyer profile may otherwise trigger inflated seller expectations</li>
                      <li>Cultural and contextual advisory—bridging negotiation styles, business norms, and sensitivities for overseas buyers entering Asia</li>
                      <li>Full-spectrum commercial due diligence and Q&A management</li>
                      <li>Transaction structuring and negotiation support</li>
                      <li>Acquisition financing advisory</li>
                      <li>SPA/SHA support, including coordination with legal counsel</li>
                    </ul>
                  </div>
                  <p>
                    We bring a tailored, high-touch approach to every mandate—ensuring you not only find the right target, but secure it on the right terms.
                  </p>
                </div>
              </div>
            </div>            
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}