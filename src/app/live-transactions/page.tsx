import React from 'react';
import Link from 'next/link';
import { ArrowRight, DollarSign, TrendingUp, Building } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Mock data for live transactions
const liveTransactions = [
  {
    id: 1,
    title: 'Project Omni',
    type: 'Growth Capital',
    capitalRequirement: 'S$1 million',
    description: 'A unified communication technology platform that allows brands and customer services centres to engage with their customers via various messaging and communication channels such as Facebook Messenger, Whatsapp, Slack, etc. all on a single platform.',
    slug: 'project-omni',
    industry: 'Technology',
    status: 'Active',
  },
  {
    id: 2,
    title: 'Project Autobot',
    type: 'Merger & Acquisition',
    ebitdaRange: 'S$3 - S$5 million',
    description: 'One of the largest car distributors in Singapore providing services that include financing, car repair, car rental, resale of used cars and car insurance.',
    slug: 'project-autobot',
    industry: 'Automotive',
    status: 'Active',
  },
  {
    id: 3,
    title: 'Project Cyber',
    type: 'Growth Capital',
    capitalRequirement: 'S$5 million',
    description: 'A leading cybersecurity technology in SEA with in-house technology that prevents attacks and restores data for website and web application.',
    slug: 'project-cyber',
    industry: 'Cybersecurity',
    status: 'Active',
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Growth Capital':
      return TrendingUp;
    case 'Merger & Acquisition':
      return Building;
    default:
      return DollarSign;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Growth Capital':
      return 'bg-green-100 text-green-800';
    case 'Merger & Acquisition':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function LiveTransactions() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Live Transactions
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
              Current opportunities available for investment and acquisition
            </p>
          </div>
        </div>
      </section>

      {/* Transactions Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {liveTransactions.map((transaction) => {
              const IconComponent = getTypeIcon(transaction.type);
              const typeColorClass = getTypeColor(transaction.type);
              
              return (
                <div key={transaction.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="bg-blue-50 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                          <IconComponent className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {transaction.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {transaction.industry}
                          </p>
                        </div>
                      </div>
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${typeColorClass}`}>
                        {transaction.type}
                      </span>
                    </div>
                    
                    <div className="mb-4 space-y-2">
                      {transaction.capitalRequirement && (
                        <div className="flex items-center text-sm text-gray-600">
                          <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                          <span className="font-semibold">Capital Requirement:</span>
                          <span className="ml-1">{transaction.capitalRequirement}</span>
                        </div>
                      )}
                      {transaction.ebitdaRange && (
                        <div className="flex items-center text-sm text-gray-600">
                          <TrendingUp className="h-4 w-4 mr-2 text-blue-600" />
                          <span className="font-semibold">EBITDA Range:</span>
                          <span className="ml-1">{transaction.ebitdaRange}</span>
                        </div>
                      )}
                      <div className="flex items-center text-sm text-gray-600">
                        <div className={`w-2 h-2 rounded-full mr-2 ${transaction.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                        <span>Status: {transaction.status}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                      {transaction.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/live-transactions/${transaction.slug}`}
                        className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center"
                      >
                        Read More
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                        Contact Us
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Interested in Our Services?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get in touch with our team to discuss your investment or acquisition opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/services"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-blue-600 hover:text-white transition-colors"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 