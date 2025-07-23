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
                    <p className="text-lg text-gray-600 mb-6">
                      Established in 2011, we are a boutique deal advisory firm specialising in cross-border M&A for buy-side and sell-side clients.
                    </p>
                    <p className="text-lg text-gray-600 mb-6">
                      Our expertise spans across industries, from Technology, Food & Beverage to Healthcare We facilitate transactions valued from US$10M to US$200M
                    </p>
                    <p className="text-lg text-gray-600">
                      We pride ourselves in our long-term relationships with strategic and financial buyers across the globe, enabling us to drive successful outcomes for our clients.
                    </p>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <Users className="h-8 w-8 text-sky-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">20+</h3>
                        <p className="text-gray-600">Clients Served</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <Handshake className="h-8 w-8 text-sky-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">26+</h3>
                        <p className="text-gray-600">Transactions</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <Award className="h-8 w-8 text-sky-600" />                          
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">15+</h3>
                        <p className="text-gray-600">Years Experience</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <DollarSign className="h-8 w-8 text-sky-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">USD 800M+</h3>
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
                    <span className="font-semibold">He is Your Go-to Guy to Close that Deal</span>
                  </p>
                  <p className="mb-4">
                    Joey David Yeo is the founder and CEO of Visionnaires Capital, with over 15 years of experience advising entrepreneurs and shareholders on M&A and capital raising. Joey is best known for one thing: getting deals done.
                  </p>
                  <p className="mb-4">
                    Today, Joey is focused on mergers and acquisitions (M&A), advising business owners, entrepreneurs, and investors on buy-side and sell-side transactions across Southeast Asia. He is best known for his ability to run competitive cross-border processes, manage due diligence, and identify strategic angles that unlock maximum value for his clients.
                  </p>
                  <p className="mb-4">
                    Joey's passion lies in empowering Asian entrepreneurs by connecting them with the right buyers and partners to grow or exit their businesses. His strong relationships with financial sponsors, corporates, and family offices—paired with sharp financial instincts and proven deal execution skills—make him the go-to person to close complex deals.
                  </p>
                  <p className="mb-4">He believes in trust, integrity, and loyalty over buzzwords and branding. For Joey, what matters most is doing meaningful work that creates long-term value for his clients and partners. A self-proclaimed "type C" personality, Joey is razor-focused on Closing.
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