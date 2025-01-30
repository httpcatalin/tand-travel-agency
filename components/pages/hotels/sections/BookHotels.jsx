import { BookingCard } from "@/components/BookingCard";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { translations } from "@/lib/translations";

import routes from "@/data/routes.json";
export function BookHotels({ lang = 'en' }) {
  const t = translations[lang]?.hotels || translations.en.hotels;

  return (
    <section className="mb-[80px]">
      <div className="mx-auto mb-[20px] flex items-center justify-between max-md:flex-col max-md:gap-[16px] md:mb-[40px]">
        <SectionTitle
          title={t.hotDeals}
          subTitle={t.hotDealsSubtitle}
          className="flex-[0_0_50%]"
        />
        {/* <Button asChild variant={ "outline" }>
          <Link scroll={ false } href={ "#" }>See all</Link>
        </Button> */}
      </div>
      <div className="grid gap-[16px] sm:grid-cols-2 xl:grid-cols-4">
        <BookingCard
          bgImg={
            "https://images.unsplash.com/photo-1565099824688-e93eb20fe622?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          placeName={"Melbourne"}
          subTitle={"1/06 - 4/06"}
          cost={700}
          btnHref={`${routes.hotels.path}/${123}/book`}
          btnTitle={t.seeDetails}
        />
        <BookingCard
          bgImg={
            "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          placeName={"Paris"}
          subTitle={"10/07 - 14/07"}
          cost={600}
          btnHref={`${routes.hotels.path}/${123}/book`}
          btnTitle={t.seeDetails}
        />
        <BookingCard
          bgImg={
            "https://images.unsplash.com/photo-1534974790529-3af7cf1c4075?q=80&w=1087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          placeName={"London"}
          subTitle={"29/05 - 01/06"}
          cost={350}
          btnHref={`${routes.hotels.path}/${123}/book`}
          btnTitle={t.seeDetails}
        />
        <BookingCard
          bgImg={
            "https://images.unsplash.com/photo-1606298246186-08868ab77562?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          placeName={"Columbia"}
          subTitle={"21/04 - 24/04"}
          cost={700}
          btnHref={`${routes.hotels.path}/${123}/book`}
          btnTitle={t.seeDetails}
        />
      </div>
    </section>
  );
}
