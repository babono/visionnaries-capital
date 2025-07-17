"use client";
import React, { useState } from 'react';
import { Users, Award, Globe, TrendingUp } from 'lucide-react';
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
                    <p className="text-lg text-gray-600 mb-6">
                      Visionnaires Capital is a leading financial advisory firm specializing in valuation, 
                      capital advisory, merger & acquisition, and financial strategy services across Southeast Asia.
                    </p>
                    <p className="text-lg text-gray-600 mb-6">
                      Our team of experienced professionals combines deep industry knowledge with innovative 
                      financial solutions to help businesses achieve their strategic objectives and unlock value.
                    </p>
                    <p className="text-lg text-gray-600">
                      We pride ourselves on building long-term relationships with our clients, 
                      providing personalized service and strategic guidance that goes beyond traditional advisory services.
                    </p>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <Users className="h-8 w-8 text-sky-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">50+</h3>
                        <p className="text-gray-600">Clients Served</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <Award className="h-8 w-8 text-sky-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">100+</h3>
                        <p className="text-gray-600">Transactions</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <Globe className="h-8 w-8 text-sky-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">10+</h3>
                        <p className="text-gray-600">Years Experience</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <TrendingUp className="h-8 w-8 text-sky-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">S$1B+</h3>
                        <p className="text-gray-600">Transaction Value</p>
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
                    <span className="font-semibold">He's Your Go-to Guy to Close that Deal</span>
                  </p>
                  <p className="mb-4">
                    Joey David Yeo is the founder and CEO of Visionnaires Capital. Since 2008, he has been working in the corporate advisory sector, starting at Spring Singapore, an agency under the Ministry of Trade and Industry in Singapore that helps Singapore enterprises in financing, technology and innovation and access to markets. There, he oversaw over 30 SMEs and supported them in raising capital through venture capitalists, government grants and other channels.
                  </p>
                  <p className="mb-4">
                    Known for his expertise in deal-making – especially in the areas of raising capital and merger and acquisitions (M&A) – as well as financial due diligence management, legal due diligence management and enterprise valuation enhancement, he has quickly become the go-to guy who helps growth-stage enterprises in raising money and companies looking for M&A opportunities.
                  </p>
                  <p className="mb-4">
                    His passion is to groom and empower Asian entrepreneurs by helping them find the right strategic investors or partners to grow and expand their business. Through his close-knitted relationships with angel investors, venture capitalists, institutional investors and equity firms nurtured over the years, plus his honed financial acumen and astute negotiation skills, he makes things happen.
                  </p>
                  <p className="mb-4">He believes that his personal values of trustworthiness, respect for others and loyalty mean more to his clients and partners than any clever slogans or marketing collaterals. To him, it is important that one continues to develop wisdom and competencies, a journey that would take a lifetime, or possibly more.
                  </p>
                  <p className="mb-4">Joey also has a type “C” personality – he is razor-focused on Closing deals.
                  </p>
                  <p className="mb-4">If you think Joey can help you, get in touch with him. He would love to share his many stories with you.
                  </p>
                  <div className="text-right">
                    <div className="text-5xl font-bold text-black leading-none mb-4">JOEY</div>
                    <div className="text-lg font-medium leading-tight">
                      Joey David Yeo<br />
                      President and CEO<br />
                      July 2025
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'specialty' && (
              <div className="text-center text-lg text-gray-800 bg-white rounded-lg p-8 shadow mb-8">
                {/* Replace with actual specialty content */}
                <strong>Our Specialty:</strong> <br />
                We specialize in cross-border mergers & acquisitions, capital advisory, and financial strategy, leveraging deep industry expertise and a global network to help clients achieve their growth objectives.
              </div>
            )}
          </div>
        </div>
      </section>      

      <Footer />
    </div>
  );
}