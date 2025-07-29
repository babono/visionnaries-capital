"use client";
import React, { useState } from 'react';
import { Users, Award, Handshake, DollarSign } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const TABS = [
  { label: 'Overview', key: 'overview' },
  { label: "Founder's Message", key: 'founder' },
  { label: 'Our Specialty', key: 'specialty' },
];

export default function About() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="text-white pt-20" style={{ background: 'linear-gradient(to right, #122a5e, #455781)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Us
            </h1>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center border-b border-gray-200 mb-8">
            {TABS.map(tab => (
              <button
                key={tab.key}
                className={`px-6 py-3 font-medium text-lg focus:outline-none ${
                  activeTab === tab.key
                    ? 'border-b-2 border-sky-600 text-sky-600'
                    : 'text-gray-700'
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div>
            {activeTab === 'overview' && (
              <div className="bg-white rounded-lg shadow p-8 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      About Visionnaires Capital
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 mb-6">
                      Founded in 2011, Visionnaires Capital is a boutique M&A advisory firm focused on cross-border mid-market transactions across Asia Pacific. We advise both buy-side and sell-side clients on deals ranging from US$30M to US$300M, across sectors such as Business Services, Manufacturing, Technology, Food & Beverage, and Healthcare.
                      <br /><br />
                      Our transactional footprint spans key markets including Singapore, Indonesia, Vietnam, Thailand, Malaysia, India, Hong Kong, and Japan.
                      <br /><br />
                      Unlike many regional advisors who focus solely on Southeast Asian buyers, Visionnaires Capital has cultivated deep relationships with strategic and financial acquirers globally—with a particular strength in accessing listed companies in North Asia, especially Japan. This allows us to bring in premium international buyers that are often out of reach for local competitors, unlocking higher valuations and better strategic alignment for our clients.
                      <br /><br />
                      We pride ourselves on long-term relationships and hands-on execution, consistently delivering cross-border outcomes where others cannot.
                    </p>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <Award className="h-8 w-8 text-sky-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">15+</h3>
                        <p className="text-gray-600 text-sm">Years of Cross-Border M&A Experience</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <DollarSign className="h-8 w-8 text-sky-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">US$800M+</h3>
                        <p className="text-gray-600 text-sm">in Cumulative Deal Value Closed</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <Handshake className="h-8 w-8 text-sky-600" />                          
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">90%</h3>
                        <p className="text-gray-600 text-sm">of Transactions Sold to Strategic Buyers Including Listed Corporates in Japan, U.S., and Europe</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <Users className="h-8 w-8 text-sky-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">100%</h3>
                        <p className="text-gray-600 text-sm">Superior Outcomes for Clients Achieved 100% Full Exits and Valuations 30–40% Above Prior Benchmarks</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'founder' && (
              <div className="bg-white rounded-lg shadow mb-8">
                {/* Responsive Header section with custom image */}
                <div className="relative flex flex-col items-start justify-center py-10 px-8 rounded-t-lg overflow-hidden min-h-[20rem]">
                  {/* Desktop Image */}
                  <img
                    src="/image-ceo.png"
                    alt="Founder's Message"
                    className="hidden md:block absolute inset-0 w-full h-full object-cover rounded-t-lg"
                    style={{ objectPosition: 'center', zIndex: 0 }}
                  />
                  {/* Mobile Image */}
                  <img
                    src="/image-ceo-responsive.png"
                    alt="Founder's Message Mobile"
                    className="block md:hidden absolute inset-0 w-full h-full object-cover rounded-t-lg"
                    style={{ objectPosition: 'center', zIndex: 0 }}
                  />
                  {/* Desktop Title */}
                  <div className="relative z-10 flex flex-col items-start w-full">
                    <h2 className="hidden md:block text-2xl md:text-3xl font-semibold text-gray-900 mb-2 py-2">
                      Message from CEO
                    </h2>
                  </div>
                </div>
                {/* Mobile Title */}
                <div className="block md:hidden px-8 pt-4 pb-0">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2 py-2 rounded text-left">
                    Message from CEO
                  </h2>
                </div>
                <div className="px-8 py-8 text-lg relative">
                  <p className="mb-4">
                    <span className="font-semibold">Founder’s Foreword</span>
                  </p>
                    <p className="mb-4">
                    When I started Visionnaires Capital in 2015, we had no capital, no legacy portfolio, and no shortcuts—only belief. Belief in building something meaningful, guided by values that matter. From those humble beginnings, we&apos;ve grown into one of Asia&apos;s leading boutique cross-border M&amp;A firms, known for execution, trust, and a relentless commitment to our clients.
                    <br /><br />
                    As someone who came from nothing and built a business from scratch, I know what it means to be an entrepreneur. I understand the fears, sacrifices, and aspirations behind every company—because I&apos;ve lived it. That&apos;s why we advise not just with expertise, but with empathy.
                    <br /><br />
                    Our values <strong>integrity, resourcefulness, and relentless grit</strong> are at the heart of everything we do. We take a consultative, strategic approach to every transaction, going far beyond numbers. We dive deep into each business model to uncover the real drivers of value and position our clients in a way that resonates with serious acquirers.
                    <br /><br />
                    We are highly selective about the mandates we take on—our decision is based on how much value we can truly deliver. This includes our ability to enhance valuation through strategic positioning, unlock access to the right buyers, and guide the deal through to a successful close. If we believe the timing is off or the business isn&apos;t ready to achieve the best possible outcome, we&apos;re honest about it. We would rather have a candid conversation early than pursue a transaction that doesn&apos;t serve the client&apos;s long-term interests.
                    <br /><br />
                    And when we do take on a mandate, we don&apos;t just push paper—we drive the deal. From tailored origination to hands-on due diligence, from localised materials to SPA/SHA negotiation, we manage the process end-to-end. We also manage legal advisors and ensure alignment across all parties, maintaining focus and momentum.
                    <br /><br />
                    Some transactions close quickly. Others take longer than expected—especially in volatile markets. But we don&apos;t quit. Our never-give-up mindset has seen deals through in the middle of downturns and helped our clients exit at strong valuations despite the odds.
                    <br /><br />
                    Ultimately, Visionnaires Capital is more than an advisory firm. We are a relationship-driven business. We don&apos;t just close deals—we build long-term partnerships. We don&apos;t walk away—we stay committed until the right outcome is achieved.
                    <br /><br />
                    Thank you for placing your trust in us. We look forward to being not just your advisors—but your allies.
                    </p>
                  <div className="text-right">
                    <div className="text-5xl font-bold text-black leading-none mb-4">JOEY</div>
                    <div className="text-lg font-medium leading-tight">
                      Joey David Yeo<br />
                      Managing Director and CEO<br />
                      July 2025
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'specialty' && (
              <div className="bg-white rounded-lg shadow mb-8 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Left side - World Map and Statistics */}
                  <div className="relative bg-blue-100 p-8 flex flex-col justify-center items-center min-h-[500px]">
                    {/* World Map SVG */}
                    <div className="w-full mb-8">
                      <img 
                        src="/world.svg" 
                        alt="World Map" 
                        className="w-full h-auto"
                      />
                    </div>
                    
                    {/* Statistics Box */}
                    <div className="bg-slate-700 text-white p-6 rounded-lg text-center w-full max-w-sm">
                      <h3 className="text-xs md:text-sm mb-2">
                        <strong>Dozens of successful transactions closed</strong>, with a total deal value of nearly <strong>US$1 billion</strong>—spanning Asia-based deals sold to major buyers from the <strong>U.S., Europe, Japan, and across the Asia Pacific</strong> region.
                      </h3>
                    </div>
                    
                    {/* Country Flags */}
                    <div className="flex flex-wrap justify-center gap-3 mt-6">
                      <div className="flex items-center justify-center">
                        <img 
                          src="/flag-europe.png" 
                          alt="Europe Flag" 
                          className="w-8 h-6 md:w-12 md:h-9 object-cover rounded"
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        <img 
                          src="/flag-japan.png" 
                          alt="Japan Flag" 
                          className="w-8 h-6 md:w-12 md:h-9 object-cover rounded"
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        <img 
                          src="/flag-us.png" 
                          alt="US Flag" 
                          className="w-8 h-6 md:w-12 md:h-9 object-cover rounded"
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        <img 
                          src="/flag-asean.png" 
                          alt="ASEAN Flag" 
                          className="w-8 h-6 md:w-12 md:h-9 object-cover rounded"
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        <img 
                          src="/flag-hongkong.png" 
                          alt="Hong Kong Flag" 
                          className="w-8 h-6 md:w-12 md:h-9 object-cover rounded"
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        <img 
                          src="/flag-india.png" 
                          alt="India Flag" 
                          className="w-8 h-6 md:w-12 md:h-9 object-cover rounded"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Right side - Specialty Content */}
                  <div className="p-8 flex flex-col justify-center">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold mb-4">Our Specialty:</h2>
                        <p className="text-xs md:text-sm leading-relaxed">                          
                          Our core strength lies in cross-border M&A, where we leverage a deeply entrenched global buyer network—spanning Japan, the U.S., Europe, and beyond—to run competitive processes that maximise valuation, structure, and execution certainty.
                          <br /><br />
                          Unlike many regional advisors who focus on collecting mandates and retainers, we are highly selective. We don&apos;t take on transactions just to list them—we take them on to close them. Our success-based model and hands-on approach mean our interests are fully aligned with those of our clients. This is a key reason behind our high close rate and track record of delivering premium outcomes.
                          <br /><br />
                          We maintain direct relationships with international strategic and financial buyers, including listed acquirers. These global connections enable us to unlock valuation arbitrage and strategic synergies often missed by firms limited to regional networks.
                          <br /><br />  
                          Beyond origination, we actively manage the full M&A process. We localise materials for overseas acquirers (including Japanese buyers), review and curate all sell-side documents, and tightly manage the due diligence process to ensure data accuracy, clarity, and strategic positioning.
                          <br /><br />
                          With experience across sectors and deal sizes, we bring tailored insight and execution precision to every mandate.
                          <br /><br />
                          For us, it&apos;s not about volume. It&apos;s about value. We close the right deals—with the right buyers—on the right terms.
                        </p>
                      </div>                                            
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>      

      <Footer />
    </div>
  );
}