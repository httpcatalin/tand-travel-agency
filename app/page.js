import { Nav } from "@/components/sections/Nav";
import { SearchFlightsAndStaysFormShortcut } from "@/components/pages/home/sections/SearchFlightsAndStaysFormShortcut";
import { BookHotels } from "@/components/pages/hotels/sections/BookHotels";
import { Reviews } from "@/components/pages/home/sections/Reviews";
import { Footer } from "@/components/sections/Footer";
import Image from "next/image";
import { translations } from "@/lib/translations";
import Hero from '@/components/hero/hero'
export default function HomePage() {


  return (
    <>
      <header className="relative mb-20">
        <Nav
          type="home"
          className="absolute z-10 left-0 top-0"
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
          <Hero />
        </section>
        <SearchFlightsAndStaysFormShortcut
          className="relative left-1/2 top-full w-[90%] -translate-x-1/2 -translate-y-[30%]"
        />
      </header>

      <main className="mx-auto w-[90%]">
        <BookHotels />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}