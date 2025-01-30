import Image from "next/image";

import { SearchFlightsForm } from "@/components/sections/SearchFlightsForm";
import { SearchStaysForm } from "@/components/sections/SearchStaysForm";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";

import airplane from "@/public/icons/airplane-filled.svg";
import bed from "@/public/icons/bed-filled.svg";
import { translations } from "@/lib/translations";

export function SearchFlightsAndStaysFormShortcut({ className, lang = 'en' }) {

  const t = translations[lang]?.search || translations.en.search;

  return (
    <div className={cn("rounded-[8px] bg-white px-3 2xsm:px-[32px] py-[16px] shadow-lg md:rounded-[16px]", className)}>
      <Tabs defaultValue="hotels" className="w-full">
        <TabsList className="bg-transparent flex justify-start gap-1">
          <TabsTrigger value="hotels" className="flex items-center gap-2">
            <Image src={bed} alt="bed_icon" width={24} height={24} />
            <span>{t.tabs.stays}</span>
          </TabsTrigger>
          <TabsTrigger value="flights" className="flex items-center gap-2">
            <Image src={airplane} alt="airplane_icon" width={24} height={24} />
            <span>{t.tabs.flights}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="flights">
          <SearchFlightsForm lang={lang} searchTranslations={t.flights} />
        </TabsContent>
        <TabsContent value="hotels">
          <SearchStaysForm lang={lang} searchTranslations={t.stays} />
        </TabsContent>
      </Tabs>
    </div>
  );
}