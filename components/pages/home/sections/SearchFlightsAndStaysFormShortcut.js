"use client";

import Image from "next/image";
import { useEffect, useState } from 'react';
import { SearchFlightsForm } from "@/components/sections/SearchFlightsForm";
import { SearchStaysForm } from "@/components/sections/SearchStaysForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import airplane from "@/public/icons/airplane-filled.svg";
import bed from "@/public/icons/bed-filled.svg";
import { translations } from "@/lib/translations";
import { useLanguage } from "@/app/context/LanguageProvider";

export function SearchFlightsAndStaysFormShortcut({ className }) {
  const { translations, isLoaded } = useLanguage();
  const t = isLoaded ? translations.search : {};

  return (
    <div className={cn("rounded-[8px] bg-white px-3 2xsm:px-[32px] py-[16px] shadow-lg md:rounded-[16px]", className)}>
      <Tabs defaultValue="hotels" className="w-full">
        <TabsList className="bg-transparent flex justify-start gap-1">
          <TabsTrigger value="hotels" className="flex items-center gap-2">
            <Image src={bed} alt="bed_icon" width={24} height={24} />
            <span>{t?.tabs?.stays || 'Stays'}</span>
          </TabsTrigger>
          <TabsTrigger value="flights" className="flex items-center gap-2">
            <Image src={airplane} alt="airplane_icon" width={24} height={24} />
            <span>{t?.tabs?.flights || 'Flights'}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="flights">
          <SearchFlightsForm />
        </TabsContent>
        <TabsContent value="hotels">
          <SearchStaysForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}