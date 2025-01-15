'use client';
import React, { useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

const mapContainerStyle = {
  height: "400px",
  width: "100%",
  borderRadius: "8px"
};

const defaultMapOptions = {
  center: { lat: 47.031456, lng: 28.82168 },
  zoom: 16.5,
  disableDefaultUI: false,
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false
};

const GoogleMapComponent = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) {
    return (
      <div className="h-[400px] w-full flex flex-col items-center justify-center bg-gray-100 rounded-lg p-4">
        <p className="text-red-500 mb-2">Unable to load Google Maps</p>
        <p className="text-sm text-gray-600">
          {loadError.message || 'Please check your API key and network connection'}
        </p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="animate-pulse">Loading maps...</div>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      options={defaultMapOptions}
    >
      <MarkerF
        position={defaultMapOptions.center}
        title="Our Location"
      />
    </GoogleMap>
  );
};

export function QuickLinks() {
  return (
    <section className="relative z-10 mx-auto mb-20 w-[90%] max-w-7xl">
      <div className="flex gap-[40px] max-sm:flex-col sm:gap-[140px]">
        <div className="flex-shrink-0">
          <Logo
            className="mb-6 block h-10 w-fit"
            worldFill="white"
            otherFill="black"
          />
          <div className="flex gap-3 text-secondary">
            <Link
              aria-label="Visit us on Facebook"
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1 10.0503C1 14.5248 4.24975 18.2455 8.5 19V12.4998H6.25V10H8.5V7.99975C8.5 5.74975 9.94975 4.50025 12.0002 4.50025C12.6497 4.50025 13.3503 4.6 13.9998 4.69975V7H12.85C11.7498 7 11.5 7.54975 11.5 8.25025V10H13.9L13.5002 12.4998H11.5V19C15.7502 18.2455 19 14.5255 19 10.0503C19 5.0725 14.95 1 10 1C5.05 1 1 5.0725 1 10.0503Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
            <Link
              aria-label="Visit us on Instagram"
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200"
            >
              <svg width="18px" height="18px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><title>Instagram icon</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" /></svg>
            </Link>
          </div>
        </div>
        <div className="flex-grow">
          <GoogleMapComponent />
        </div>
      </div>
    </section>
  );
}