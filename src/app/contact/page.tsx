import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const contacts = [
  {
    location: "Singapore",
    email: "info@vision-cap.com",
    phone: "+65 94877077",
    address: `6 Raffles Boulevard
#03-308 Marina Square
Singapore 039594`,
  },
  {
    location: "Hong Kong",
    email: "info@vision-cap.com",
    phone: "+65 94877077",
    address:`6 Raffles Boulevard
#03-308 Marina Square
Singapore 039594`,
  },
  // Tambah lokasi baru di sini jika perlu
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="text-white pt-20" style={{ background: 'linear-gradient(to right, #122a5e, #455781)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact Us
            </h1>
          </div>
        </div>
      </section>
      {/* Contact Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-start gap-8">
            {contacts.map((contact, idx) => (
              <div key={idx} className="flex flex-col items-start p-6 min-w-[40%] max-w-xs w-full">                
                <span className="text-sky-600 text-2xl font-semibold py-2 block">{contact.location}</span>                
                <div className="text-lg space-y-2 w-full">
                  <div className="flex w-full">
                    <span className="font-semibold min-w-[90px]">Email</span>
                    <span className="font-semibold min-w-[10px]">: </span>
                    <span className="flex-1">{contact.email}</span>
                  </div>
                  <div className="flex w-full">
                    <span className="font-semibold min-w-[90px]">Phone</span>
                    <span className="font-semibold min-w-[10px]">: </span>
                    <span className="flex-1">{contact.phone}</span>
                  </div>
                  <div className="flex w-full items-start">
                    <span className="font-semibold min-w-[90px]">Address</span>
                    <span className="font-semibold min-w-[10px]">: </span>
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