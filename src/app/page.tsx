"use client";
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Types for Notion database
interface NotionDatabaseItem {
  id: string;
  properties: {
    [key: string]: {
      title?: Array<{ plain_text: string }>;
      select?: { name: string };
      multi_select?: Array<{ name: string }>;
      rich_text?: Array<{ plain_text: string }>;
      number?: number;
      files?: Array<{
        file?: { url: string };
        external?: { url: string };
      }>;
    };
  };
}

interface TrackRecordProject {
  id: string;
  logo1?: string;
  logo2?: string;
}

// Helper function to parse Notion database into projects
function parseTrackRecordData(databaseResults: NotionDatabaseItem[]): TrackRecordProject[] {
  return databaseResults.map((item, index) => {
    const properties = item.properties || {};

    const logo1Property = properties["Logo 1"];
    const logo1 = logo1Property?.files?.[0]?.external?.url || logo1Property?.files?.[0]?.file?.url;

    const logo2Property = properties["Logo 2"];
    const logo2 = logo2Property?.files?.[0]?.external?.url || logo2Property?.files?.[0]?.file?.url;

    return {
      id: item.id || String(index + 1),
      logo1: logo1,
      logo2: logo2,
    };
  });
}

export default function Home() {
  const aboutRef = useRef<HTMLElement>(null); // Add ref for About section
  const servicesRef = useRef<HTMLElement>(null);
  const [trackRecordProjects, setTrackRecordProjects] = useState<TrackRecordProject[]>([]);

  useEffect(() => {
    async function fetchTrackRecords() {
      try {
        const response = await fetch("/api/track-records");
        const data = await response.json();

        if (response.ok && data.success && data.projects) {
          const parsedProjects = parseTrackRecordData(data.projects as NotionDatabaseItem[]);
          // Get only first 4 projects
          setTrackRecordProjects(parsedProjects.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching track records:", error);
        // Keep empty array as fallback
      }
    }

    fetchTrackRecords();
  }, []);

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
          <h1 className="text-5xl md:text-6xl text-center mb-4 font-light text-shadow-lg">
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
            <h3 className="uppercase text-sm font-medium text-sky-600 mb-2">Who We Are</h3>
            <p className="text-xs md:text-sm mb-8">
              <strong>Founded in 2011, Visionnaires Capital is a leading boutique M&A advisory firm specialising in cross-border transactions for Southeast Asian and Asia Pacific companies seeking international buyers.</strong>
              <br /><br />
              We focus on helping mid-market businesses across Singapore, Indonesia, Vietnam, Thailand, Malaysia, and beyond unlock strategic exits through buyers in Japan, Korea, Greater China, Europe, and North America.
              <br /><br />
              Cross-border deals often yield superior outcomes compared to local processes. By reaching international buyers—particularly listed strategics and global funds—we expand the competitive landscape, which drives higher valuations, improved deal terms, and more flexible structures. These buyers often offer premiums for geographic expansion, strategic alignment, or supply chain synergies, and are more open to structures like equity rollovers, earn-outs, or hybrid consideration.
              <br /><br />
              With deep regional knowledge and global connectivity, Visionnaires Capital delivers bespoke cross-border solutions that maximise value for Asia-based sellers.
            </p>
            <a
              href="/about"
              className="border border-sky-600 text-sky-600 px-8 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors inline-block w-fit"
            >
              Learn More
            </a>
          </div>
          {/* Right: Stats with full background */}
          <div className="relative flex flex-col justify-center items-center px-6 md:px-24 py-16 lg:py-24 overflow-hidden">            
            <div className="absolute inset-0 bg-[#0077C6] z-10" />
            {/* Stats content */}
            <div className="relative z-20 grid grid-cols-2 gap-8 w-full max-w-xl text-white items-center">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-medium mb-1">15+</div>
                <div className="text-xs md:text-sm opacity-80">Years of Cross-Border M&A Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-medium mb-1">US$800M+</div>
                <div className="text-xs md:text-sm opacity-80">in Cumulative Deal Value Closed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-medium mb-1">90%</div>
                <div className="text-xs md:text-sm opacity-80">of Transactions Sold to Strategic Buyers Including Listed Corporates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-medium mb-1">100%</div>
                <div className="text-xs md:text-sm opacity-80">Superior Outcomes for Clients - Full Exits and Valuations 30-40% Above Prior Benchmarks</div>
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
            <h3 className="uppercase text-sm font-medium text-sky-600 mb-2">Our Services</h3>
            <p className="text-xs md:text-sm mb-8">
              <strong>We provide end-to-end cross-border M&A advisory services, covering both buy-side and sell-side mandates across diverse sectors and geographies.</strong>
              <br /><br />
              Our core strength lies in enabling Asian companies to secure strategic acquirers—particularly listed corporates from Japan, the U.S., and Europe—who are seeking market entry, supply chain integration, or growth synergies.
              <br /><br />
              Conversely, we also support global listed companies in accessing high-growth markets across Asia through strategic acquisitions. With deep regional knowledge and execution capabilities, we help our clients navigate local complexities and unlock long-term value.
            </p>
            <Link
              href="/services"
              className="border border-sky-600 text-sky-600 px-8 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors inline-block w-fit"
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
            <h3 className="uppercase text-sm font-medium text-sky-600 mb-2">Track Record</h3>
            <p className="text-xs md:text-sm mb-8">
              Over the years, we’ve built a strong reputation for executing complex cross-border transactions with discretion, agility, and a focus on long-term value creation.
              <br /><br />
              Our ability to tap into international strategic and listed buyers—particularly from Japan, the U.S., and Europe—has consistently led to higher success rates, stronger valuations, and more favourable deal structures for our clients. Whether navigating regulatory hurdles or aligning cross-market interests, we bring a global perspective with local execution.
            </p>
            <Link
              href="/track-record"
              className="border border-sky-600 text-sky-600 px-8 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors inline-block w-fit"
            >
              Learn More
            </Link>
          </div>
          {/* Right: List of Companies */}
          <div className="relative flex flex-col justify-center items-center px-6 md:px-24 py-16 lg:py-24 overflow-hidden">            
            <div className="absolute inset-0 bg-[#0077C6] z-10" />
            {/* Companies content */}
            <div className="relative z-20 grid grid-cols-2 gap-12 w-full max-w-xl">
              {trackRecordProjects.length > 0 ? (
                trackRecordProjects.map((project, index) => (
                  <Link 
                    key={project.id} 
                    href="/track-record" 
                    className="flex justify-center items-center bg-white rounded-lg p-4 hover:shadow-lg transition-shadow"
                  >
                    {project.logo1 ? (
                      <div className="relative w-full h-16">
                        <img
                          src={project.logo1}
                          alt={`Company ${index + 1}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : project.logo2 ? (
                      <div className="relative w-full h-16">
                        <img
                          src={project.logo2}
                          alt={`Company ${index + 1}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-16 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No Logo</span>
                      </div>
                    )}
                  </Link>
                ))
              ) : (
                // Fallback to static images if API fails
                <>
                  <Link href="/track-record" className="flex justify-center items-center bg-white rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <img src="/logo-myrepublic.png" alt="MyRepublic" className="max-h-16" />
                  </Link>              
                  <Link href="/track-record" className="flex justify-center items-center bg-white rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <img src="/logo-soupspoon.png" alt="The Soup Spoon" className="max-h-16" />
                  </Link>
                  <Link href="/track-record" className="flex justify-center items-center bg-white rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <img src="/logo-twelvecupcakes.png" alt="Twelve Cupcakes" className="max-h-16" />
                  </Link>
                  <Link href="/track-record" className="flex justify-center items-center bg-white rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <img src="/logo-qoo10.png" alt="Qoo10" className="max-h-16" />
                  </Link>
                </>
              )}
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
            <h3 className="uppercase text-sm font-medium text-sky-600 mb-2">Live Transactions</h3>
            <p className="text-xs md:text-sm mb-8">
              Explore projects that we are currently managing from different industries and regions.
            </p>
            <Link
              href="/current-transactions"
              className="border border-sky-600 text-sky-600 px-8 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors inline-block w-fit"
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