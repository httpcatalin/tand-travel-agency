import React from 'react'; // Ensure React is imported
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import { StoreProvider } from "@/app/StoreProvider";
import { SessionProvider } from "next-auth/react";
import mongoose from "mongoose";
import dynamic from "next/dynamic";
import openGraph from "./opengraph-image.jpg";
import SetCookies from "./_setCookies";
import { LanguageProviderWrapper } from '@/components/LanguageProviderWrapper/LanguageProviderWrapper';

const monse = Montserrat({
  subsets: ["latin"],
  variable: "--font-monserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const tradegothic = localFont({
  src: "../public/fonts/gothic_extended.otf",
  variable: "--font-tradegothic",
  display: "swap",
});

export default async function RootLayout({ children }) {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
    } catch (e) {
      console.log(e.message);
    }
  }



  return (
    <html lang="en" className={`${tradegothic.variable} ${monse.variable}`}>
      <body className={monse.className}>

        <StoreProvider>
          <SessionProvider>
            <div className="max-w-[1440px] mx-auto">
              <LanguageProviderWrapper>
                {children}</LanguageProviderWrapper>
            </div>
          </SessionProvider>
        </StoreProvider>
        <NextTopLoader showSpinner={false} color="hsl(159, 44%, 69%)" />
        <Toaster className="bg-secondary" />
        <SetCookies />

      </body>
    </html >
  );
}