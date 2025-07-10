import React from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Users, Award, Globe } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Mock data for live transactions
const liveTransactions = [
  {
    id: 1,
    title: 'Project Omni',
    type: 'Growth Capital',
    capitalRequirement: 'S$1 million',
    description: 'A unified communication technology platform that allows brands and customer services centres to engage with their customers via various messaging and communication channels.',
    slug: 'project-omni',
  },
  {
    id: 2,
    title: 'Project Autobot',
    type: 'Merger & Acquisition',
    ebitdaRange: 'S$3 - S$5 million',
    description: 'One of the largest car distributors in Singapore providing services that include financing, car repair, car rental, resale of used cars and car insurance.',
    slug: 'project-autobot',
  },
  {
    id: 3,
    title: 'Project Cyber',
    type: 'Growth Capital',
    capitalRequirement: 'S$5 million',
    description: 'A leading cybersecurity technology in SEA with in-house technology that prevents attacks and restores data for website and web application.',
    slug: 'project-cyber',
  },
];

const services = [
  {
    title: 'Valuation Advisory',
    description: 'Expert valuation services for businesses across various industries and stages.',
    icon: TrendingUp,
  },
  {
    title: 'Capital Advisory',
    description: 'Strategic capital raising and financial structuring solutions.',
    icon: Users,
  },
  {
    title: 'Merger & Acquisition',
    description: 'End-to-end M&A advisory services for buyers and sellers.',
    icon: Award,
  },
  {
    title: 'Financial Strategy & Corporate Advisory',
    description: 'Comprehensive financial strategy and corporate advisory services.',
    icon: Globe,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative text-white" style={{ background: 'linear-gradient(to right, #122a5e, #455781)' }}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Visionnaires Capital
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
              Leading financial advisory firm specializing in valuation, capital advisory, 
              merger & acquisition, and financial strategy services across Southeast Asia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services"
                className="bg-white text-blue-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                Our Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/live-transactions"
                className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-900 transition-colors"
              >
                Live Transactions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive financial advisory services tailored to your business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center group">
                <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors">
                  <service.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Transactions Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Live Transactions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Current opportunities available for investment and acquisition
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {liveTransactions.map((transaction) => (
              <div key={transaction.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {transaction.title}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {transaction.type}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    {transaction.capitalRequirement && (
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-semibold">Capital Requirement:</span> {transaction.capitalRequirement}
                      </p>
                    )}
                    {transaction.ebitdaRange && (
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-semibold">EBITDA Range:</span> {transaction.ebitdaRange}
                      </p>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm">
                    {transaction.description}
                  </p>
                  
                  <Link
                    href={`/live-transactions/${transaction.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/live-transactions"
              className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Transactions
            </Link>
          </div>
        </div>
      </section>

      {/* Success Stories Preview */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Proven track record of delivering exceptional results for our clients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Print vs Media
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                <span className="font-medium">Industry:</span> Print/Media Production
              </p>
              <p className="text-gray-600 text-sm mb-4">
                Successfully repositioned a printing company as an outdoor media company, 
                achieving a P/E ratio of more than 10X versus the industry standard of 3-4X.
              </p>
              <div className="flex items-center text-blue-600 text-sm font-medium">
                <span>Valuation Advisory | M&A</span>
              </div>
            </div>
            
            <div className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Attaining The Valuation Right
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                <span className="font-medium">Industry:</span> Telematics / Technology
              </p>
              <p className="text-gray-600 text-sm mb-4">
                Helped client raise S$2.6 million in equity after correcting valuation 
                methodology flaws that prevented previous fundraising attempts.
              </p>
              <div className="flex items-center text-blue-600 text-sm font-medium">
                <span>Valuation Advisory | Capital Advisory</span>
              </div>
            </div>
            
            <div className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Getting The Right Investor
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                <span className="font-medium">Industry:</span> Healthcare / Technology
              </p>
              <p className="text-gray-600 text-sm mb-4">
                Successfully raised S$5 million in equity within six months for a 
                healthcare technology startup in Singapore`s early-stage ecosystem.
              </p>
              <div className="flex items-center text-blue-600 text-sm font-medium">
                <span>Valuation Advisory | Capital Advisory</span>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/track-record"
              className="bg-gray-900 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors"
            >
              View Track Record
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 