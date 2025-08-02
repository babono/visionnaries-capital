import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const contacts = [
  {
    location: "Singapore",
    email: "info@vision-cap.com",
    phone: "+65 94877077",
    address: `9 Temasek Blvd
#07-01 Suntec Tower 2
Singapore 038989`,
  },
  {
    location: "Hong Kong",
    email: "info@vision-cap.com",
    phone: "+65 94877077",
    address:`9 Temasek Blvd
#07-01 Suntec Tower 2
Singapore 038989`,
  },  
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <section className="relative text-white pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/header-contact.jpg"
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-700/50 to-sky-500/30"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light mb-6 text-shadow-lg">
              Contact Us
            </h1>
          </div>
        </div>
      </section>
      {/* Contact Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8">
            {contacts.map((contact, idx) => (
              <div key={idx} className="flex flex-col items-start p-6 min-w-[40%] max-w-xs w-full">                
                <span className="text-sky-600 text-2xl font-medium py-2 block">{contact.location}</span>                
                <div className="text-lg space-y-2 w-full">
                  <div className="flex w-full">
                    <span className="font-medium min-w-[90px]">Email</span>
                    <span className="font-medium min-w-[10px]">: </span>
                    <span className="flex-1">{contact.email}</span>
                  </div>
                  <div className="flex w-full">
                    <span className="font-medium min-w-[90px]">Phone</span>
                    <span className="font-medium min-w-[10px]">: </span>
                    <span className="flex-1">{contact.phone}</span>
                  </div>
                  <div className="flex w-full items-start">
                    <span className="font-medium min-w-[90px]">Address</span>
                    <span className="font-medium min-w-[10px]">: </span>
                    <pre className="inline whitespace-pre-wrap break-words font-sans text-lg align-middle flex-1 m-0 p-0 bg-none border-none">{contact.address}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>      
      <Footer />
    </div>
  );
} 