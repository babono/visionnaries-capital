import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Phone, Mail, Navigation } from 'lucide-react';

const contacts = [
  {
    location: "Singapore",
    email: "vc@gmail.com",
    phone: "0182930219",
    address: `6 Raffles Boulevard
#03-308 Marina Square
Singapore 039594`,
  },
  {
    location: "Hong Kong",
    email: "vc@gmail.com",
    phone: "0182930219",
    address: "Hong Kong",
  },
  // Tambah lokasi baru di sini jika perlu
];

const infoCards = [
  {
    icon: Phone,
    title: "Call Us",
    content: (
      <div className="text-lg text-gray-600">+65 94877077</div>
    ),
  },
  {
    icon: Mail,
    title: "Email Us",
    content: (
      <a href="mailto:info@vision-cap.com" className="text-lg text-blue-700 hover:underline">info@vision-cap.com</a>
    ),
  },
  {
    icon: Navigation,
    title: "Locate Us",
    content: (
      <div className="text-lg text-gray-600 mb-2">
        6 Raffles Boulevard<br />
        #03-308 Marina Square<br />
        Singapore 039594
        <br />
        <a href="https://goo.gl/maps/2Qw2Qw2Qw2Qw2Qw2A" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline text-base font-medium block mt-2">View On Google Map</a>
      </div>
    ),
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <section
        className="text-white pt-20 relative flex items-center justify-center h-[250px] md:h-[500px] py-0"
        style={{
          backgroundImage: "url('/page-title-background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-left">
            Contact Us
          </h1>
          <p className="text-xl max-w-2xl text-left">
            Get In Touch With Us
          </p>
        </div>
      </section>
      {/* Contact Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-start gap-8">
            {contacts.map((contact, idx) => (
              <div key={idx} className="flex flex-col items-start p-6 min-w-[30%] max-w-xs w-full">
                <div className="bg-[#23607a] rounded-md p-2 w-fit mb-4">
                  <span className="text-white text-2xl font-semibold px-8 py-2 block">{contact.location}</span>
                </div>
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
      {/* Info Section with Icons (JSON/loop) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-start gap-8">
            {infoCards.map((card, idx) => (
              <div key={idx} className="flex flex-col items-start p-6 min-w-[30%] max-w-xs w-full">
                <card.icon size={48} className="mb-4 text-gray-700" />
                <h3 className="text-2xl font-semibold mb-2">{card.title}</h3>
                {card.content}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
} 