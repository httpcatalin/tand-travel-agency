'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import { useLanguage } from "@/app/context/LanguageProvider";

const GoogleMapComponent = () => {
  const latitude = 47.031456;
  const longitude = 28.82168;

  return (
    <div className="h-full w-full rounded-lg overflow-hidden relative bg-gray-100">
      <iframe
        title="Tand Travel Agency Location"
        width="100%"
        height="100%"
        style={{ border: 0, borderRadius: '0.5rem' }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=TAND+Travel,Aleea Alexandr Pușkin+Chișinău&zoom=16&maptype=roadmap&language=en&region=MD`}
      ></iframe>

      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-md shadow-md max-w-[300px] z-10">
        <h3 className="font-semibold text-primary">Tand Travel Agency</h3>
        <p className="text-sm text-gray-700">Chișinău, Moldova</p>
        <a
          href={`https://www.google.com/maps/place/TAND+Travel/@47.0313645,28.8172175,802m/data=!3m2!1e3!4b1!4m6!3m5!1s0x40c97da7eea604f1:0xd41fb8dc0b330662!8m2!3d47.0313646!4d28.8218309!16s%2Fg%2F11h3yl0vwr?entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoASAFQAw%3D%3D`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary hover:underline mt-1 inline-block"
        >
          View on Google Maps
        </a>
      </div>
    </div>
  );
};
export function QuickLinks({ lang = 'en' }) {
  const { translations, isLoaded } = useLanguage();
  const t = isLoaded ? translations.footer.quickLinks : {};

  return (
    <section className="overflow-hidden relative z-10 mx-auto mb-10 w-[90%] md:w-[85%] lg:w-[75%] max-w-7xl px-4 md:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-[140px]">
        <div className="flex-shrink-0 w-full lg:w-auto">
          <Image
            src={logo}
            alt="Company Logo"
            width={100}
            height={50}
            priority
            className="mb-6"
          />

          <div className="space-y-4 md:space-y-6 text-secondary">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2 group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:text-primary transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+40691234567" className="text-sm md:text-base hover:text-primary transition-colors duration-200">
                  {t.phone}
                </a>
              </div>
              <div className="text-xs md:text-sm text-gray-600 pl-7 space-y-1">
                <p>{t?.workingHours?.weekdays}</p>
                <p>{t?.workingHours?.saturday}</p>
                <p>{t?.workingHours?.sunday}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:text-primary transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:tandtravel.md@gmail.com" className="text-sm md:text-base hover:text-primary transition-colors duration-200 break-all">
                {t.email}
              </a>
            </div>

            <div className="flex items-start gap-2 group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1 group-hover:text-primary transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <address className="not-italic text-xs md:text-sm leading-relaxed">
                {t.address}
              </address>
            </div>
          </div>

          <div className="mt-6 flex gap-4 text-secondary">
            <Link
              href="https://www.facebook.com/share/15pMHTjtRH/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200 p-2 -m-2"
            >
              <Image
                src={"/icons/facebook-black.svg"}
                height={24}
                width={24}
                alt="facebook_icon"
              />
            </Link>
            <Link
              href="https://www.instagram.com/tandtravel.md?igsh=MXMwb3c5N2hmdTltMw=="
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200 p-2 -m-2"
            >
              <Image
                src={"/icons/instagram-black.svg"}
                height={24}
                width={24}
                alt="instagram_icon"
              />
            </Link>
          </div>
        </div>

        <div className="flex-grow w-full h-[300px] md:h-[400px] lg:h-[500px]">
          <GoogleMapComponent />

        </div>
      </div>
    </section>
  );
}