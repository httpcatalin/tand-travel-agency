import { Nav } from "@/components/sections/Nav";
import { SearchFlightsAndStaysFormShortcut } from "@/components/pages/home/sections/SearchFlightsAndStaysFormShortcut";
import { PopularTrips } from "@/components/pages/home/sections/PopularTrips";
import { BookHotels } from "@/components/pages/hotels/sections/BookHotels";
import { FindFlightAndHotelcards } from "@/components/pages/home/sections/FindFlightAndHotelCards";
import { Reviews } from "@/components/pages/home/sections/Reviews";
import { Footer } from "@/components/sections/Footer";
import Image from "next/image";
import { translations } from "@/lib/translations";
import { headers } from "next/headers";

export default async function HomePage({ searchParams }) {
  const headersList = await headers();
  const acceptLanguage = (await headersList.get("accept-language")) || "";
  const preferredLanguage = acceptLanguage.split(",")[0].split("-")[0];
  const lang =
    searchParams?.lang ||
    (["en", "ro", "ru"].includes(preferredLanguage) ? preferredLanguage : "");

  const t = translations[lang];

  return (
    <>
      <header className="relative mb-20">
        <Nav
          type="home"
          className="absolute z-10 left-0 top-0"
          searchParams={searchParams}
        />
        <section className="flex relative h-[600px] w-full items-center bg-home-header">
          <Image
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=70&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="home-header"
            fill
            sizes="(max-width: 640px) 50vw, 90vw"
            className="object-cover -z-10 object-[center_40%]"
            loading="eager"
            priority
          />
          <div className="w-full text-center text-white">
            <h2 className="leading-[5rem] text-2xl font-bold md:text-[2rem] lg:text-[2.8125rem]">
              {t.helpingOthers}
            </h2>
            <h1 className="text-[3rem] md:tracking-[.15em] font-bold uppercase md:text-[4rem] lg:text-[5rem]">
              {t.liveAndTravel}
            </h1>
            <p className="text-[1rem] font-semibold lg:text-[1.25rem]">
              {t.specialOffers}
            </p>
          </div>
        </section>
        <SearchFlightsAndStaysFormShortcut
          className="relative left-1/2 top-full w-[90%] -translate-x-1/2 -translate-y-[30%]"
          lang={lang}
        />
      </header>

      <main className="mx-auto w-[90%]">
        <BookHotels lang={lang} />
        {/* <PopularTrips lang={lang} /> */}
        {/* <FindFlightAndHotelcards lang={lang} /> */}
        <Reviews lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
