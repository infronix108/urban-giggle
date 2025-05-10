"use client"

import AuthGuard from "@/components/authGuard";
import BrokerageContactForm from "./BrokerageContactForm";
import { useEffect, useState } from "react";
import ServicePageLayout from "@/app/components/ServicePageLayout";

export default function BrokeragePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const infronixEmail = localStorage.getItem('infronix_email');
    const infronixToken = localStorage.getItem('infronix_token');
    if (infronixEmail && infronixToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const brokerageProcess = [
    "Initial consultation and property needs assessment",
    "Personalized property search and recommendations",
    "Site visits and property tours",
    "Negotiation and paperwork assistance",
    "Deal closure and post-sale support"
  ];

  const brokerageSites = [
    {
      name: "Urban Realty",
      url: "https://urbanrealty.example.com/",
      rating: 4.8,
      verified: true,
    },
    // Add more if needed
  ];

  return (
    <div className="relative">
      <div className={!isLoggedIn ? "filter blur-sm pointer-events-none select-none" : ""}>
        <ServicePageLayout
          name="Premium Brokerage Services"
          description="Your trusted partner for residential, commercial, and lease properties. Experience seamless property transactions with our expert team guiding you at every step."
          process={brokerageProcess}
          image="/images/brokerage-hero.jpg"
          sites={brokerageSites}
          contactHeading="Contact Us"
          customSitesSection={
            (() => {
              const propertyLinks = [
                {
                  icon: "🏡",
                  title: "Residential",
                  desc: "Find your dream home or apartment",
                  url: "https://script.google.com/macros/s/AKfycbxKXXI1JIjnwsNTx0POYleTZCc2b2TidglEUY92Ur8thrB9iUZ4zLNL2pvRSjzB_KMdTg/exec"
                },
                {
                  icon: "🏢",
                  title: "Commercial",
                  desc: "Offices, shops, and business spaces",
                  url: "https://script.google.com/macros/s/AKfycbxkDWl6AJQ2XbMFAbx8NmT0cU14kF-sBio_NG7rFE5bGkUsg6Egrx_OQSPs3TYyIo2ufg/exec"
                },
                {
                  icon: "🏭",
                  title: "Warehouse / Land",
                  desc: "Industrial, storage, or land plots",
                  url: "https://script.google.com/macros/s/AKfycbymt-fQhYPmQ65padOOLGZZEJ89iY0bMV0_YFjNTTkaaghGWA3cqdh0o5rIpZoCB9loKw/exec"
                }
              ];
              return (
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                  {propertyLinks.map((item) => (
                    <button
                      key={item.title}
                      className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex flex-col items-center shadow-xl hover:scale-105 hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-electric-blue cursor-pointer w-[330px] h-[120px] md:w-[340px] md:h-[140px] lg:w-[360px] lg:h-[150px] px-6 py-6"
                      style={{ minWidth: 300, minHeight: 110 }}
                      onClick={() => window.open(item.url, "_blank")}
                    >
                      <span className="text-4xl mb-2">{item.icon}</span>
                      <span className="text-xl font-semibold text-white mb-1">{item.title}</span>
                      <span className="text-gray-300 text-center text-sm">{item.desc}</span>
                    </button>
                  ))}
                </div>
              );
            })()
          }
          customContactSection={<BrokerageContactForm />}
        />
      </div>
    </div>
  );
}
