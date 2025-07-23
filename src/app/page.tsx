"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const aboutRef = useRef<HTMLElement>(null); // Add ref for About section
  const servicesRef = useRef<HTMLElement>(null);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/hero-bg.mp4"
          poster="/hero-poster.png"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Content */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center px-4 py-24">
          <h1 className="text-5xl md:text-6xl text-center mb-4">
            Cross Border<br />M&A Specialist
          </h1>
          <p className="text-lg md:text-2xl text-center mb-8 max-w-2xl">
            We create deals, we strategise ways to negotiate deals, we execute deals, and most importantly, we close deals.
          </p>
          <a
            href="/VC-Engagement Proposal 2025_shared.pdf"
            download
            className="bg-sky-600 text-white px-8 py-4 rounded-md font-semibold hover:bg-sky-700 transition-colors mb-6"
          >
            Download Our Credentials
          </a>
          <button
            onClick={() => {
              aboutRef.current?.scrollIntoView({ behavior: 'smooth' }); // Scroll to About section
            }}
            className="flex flex-col items-center text-white mt-4"
          >
            <span className="text-lg">Scroll</span>
            <span className="animate-bounce mt-1">&#8595;</span>
          </button>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about-section" className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
          {/* Left: Who We Are */}
          <div className="flex flex-col justify-center px-6 md:px-24 py-16 lg:py-24 bg-white">
            <h3 className="uppercase text-sm font-semibold text-sky-600 mb-2">Who We Are</h3>
            <p className="text-xl md:text-2xl mb-8">
              Founded in 2011, we are a boutique deal advisory firm specialising in cross-border M&A transactions.
            </p>
            <a
              href="/about"
              className="border border-sky-600 text-sky-600 px-8 py-3 rounded-md font-semibold hover:bg-blue-50 transition-colors inline-block w-fit"
            >
              Learn More
            </a>
          </div>
          {/* Right: Stats with full background */}
          <div className="relative flex flex-col justify-center items-center px-6 md:px-24 py-16 lg:py-24 overflow-hidden">            
            <div className="absolute inset-0 bg-[#0077C6] z-10" />
            {/* Stats content */}
            <div className="relative z-20 grid grid-cols-2 gap-12 w-full max-w-xl text-white items-end">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-1">20+</div>
                <div className="text-base md:text-lg opacity-80">Clients Served</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-1">26+</div>
                <div className="text-base md:text-lg opacity-80">Transactions</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-1">15+</div>
                <div className="text-base md:text-lg opacity-80">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-3xl font-bold mb-1">USD 500M+</div>
                <div className="text-base md:text-lg opacity-80">Transaction Value</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} id="services-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
          {/* Left: Who We Are */}
          <div className="relative flex flex-col justify-center items-center px-6 md:px-24 py-16 lg:py-24 overflow-hidden">
            {/* Background image */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: "url('/image-services.jpg')",
                backgroundPosition: "50%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                zIndex: 1,
              }}
            />                        
          </div>          
          {/* Right: Stats with full background */}
          <div className="flex flex-col justify-center px-6 md:px-24 py-16 lg:py-24 bg-white">
            <h3 className="uppercase text-sm font-semibold text-sky-600 mb-2">Our Services</h3>
            <p className="text-xl md:text-2xl mb-8">
              We provide end-to-end M&A advisory services, covering both buy-side and sell-side mandates across multiple sectors and geographies.
            </p>
            <Link
              href="/services"
              className="border border-sky-600 text-sky-600 px-8 py-3 rounded-md font-semibold hover:bg-blue-50 transition-colors inline-block w-fit"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Track Records Section */}
      <section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
          {/* Left: Track Records */}
          <div className="flex flex-col justify-center px-6 md:px-24 py-16 lg:py-24 bg-white">
            <h3 className="uppercase text-sm font-semibold text-sky-600 mb-2">Track Record</h3>
            <p className="text-xl md:text-2xl mb-8">
              Over the years, we’ve built a reputation for navigating complex transactions with discretion, agility, and value creation for our clients.
            </p>
            <Link
              href="/track-record"
              className="border border-sky-600 text-sky-600 px-8 py-3 rounded-md font-semibold hover:bg-blue-50 transition-colors inline-block w-fit"
            >
              Learn More
            </Link>
          </div>
          {/* Right: List of Companies */}
          <div className="relative flex flex-col justify-center items-center px-6 md:px-24 py-16 lg:py-24 overflow-hidden">            
            <div className="absolute inset-0 bg-[#0077C6] z-10" />
            {/* Companies content */}
            <div className="relative z-20 grid grid-cols-2 gap-12 w-full max-w-xl">
              <div className="flex justify-center items-center bg-white rounded-lg p-4">
                <img src="/logo-myrepublic.png" alt="MyRepublic" className="max-h-16" />
              </div>              
              <div className="flex justify-center items-center bg-white rounded-lg p-4">
                <img src="/logo-soupspoon.png" alt="The Soup Spoon" className="max-h-16" />
              </div>
              <div className="flex justify-center items-center bg-white rounded-lg p-4">
                <img src="/logo-twelvecupcakes.png" alt="Twelve Cupcakes" className="max-h-16" />
              </div>
              <div className="flex justify-center items-center bg-white rounded-lg p-4">
                <img src="/logo-qoo10.png" alt="Qoo10" className="max-h-16" />
              </div>              
            </div>
          </div>
        </div>
      </section>

      {/* Live Transactions */}
      <section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
          <div className="relative flex flex-col justify-center items-center px-6 md:px-24 py-16 lg:py-24 overflow-hidden">
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: "url('/image-livetransactions.jpg')",
                backgroundPosition: "50%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                zIndex: 1,
              }}
            />                        
          </div>          
          <div className="flex flex-col justify-center px-6 md:px-24 py-16 lg:py-24 bg-white">
            <h3 className="uppercase text-sm font-semibold text-sky-600 mb-2">Live Transactions</h3>
            <p className="text-xl md:text-2xl mb-8">
              We listed all ongoing M&A and funding projects that we are currently managing. Each listed project provides a teaser reference, highlighting its specific industry focus.
            </p>
            <Link
              href="/current-transactions"
              className="border border-sky-600 text-sky-600 px-8 py-3 rounded-md font-semibold hover:bg-blue-50 transition-colors inline-block w-fit"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}