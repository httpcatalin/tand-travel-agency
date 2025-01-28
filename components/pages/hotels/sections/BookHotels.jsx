"use client"
import { BookingCard } from "@/components/BookingCard";
import { SectionTitle } from "@/components/SectionTitle";
import moment from "moment";

export function BookHotels() {

  const bestDeals = {
    destination1: {
      destination: "Melbourne",
      checkIn: new Date(2025, 0, 28),
      checkOut : new Date(2025, 0, 31),
      nights: 3,
      adults: 2,
      children: 0,
      price: 500
    },
    destination2: {
      destination: "Paris",
      checkIn: new Date(2025, 1, 2),
      checkOut : new Date(2025, 1, 5),
      nights: 3,
      adults: 2,
      children: 0,
      price: 400
    },
    destination3: {
      destination: "London",
      checkIn: new Date(2025, 1, 7),
      checkOut : new Date(2025, 1, 10),
      nights: 3,
      adults: 2,
      children: 0,
      price: 500
    },
    destination4: {
      destination: "Columbia",
      checkIn: new Date(2025, 1, 22),
      checkOut : new Date(2025, 1, 25),
      nights: 3,
      adults: 2,
      children: 0,
      price: 700
    },
  };

  function handleSubmit(e) {
    e.preventDefault();

    e.target.submit();
  };

  return (
    <section className="mb-[80px]">
      <div className="mx-auto mb-[20px] flex items-center justify-between max-md:flex-col max-md:gap-[16px] md:mb-[40px]">
        <SectionTitle
          title={ "Hot Deals" }
          subTitle={
            "Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the travel tools to get you to your destination."
          }
          className={ "flex-[0_0_50%]" }
        />
      </div>
      <div className="grid gap-[16px] sm:grid-cols-2 xl:grid-cols-4">
        {Object.values(bestDeals).map((deal, index) => (
          <form
            id="stayForm"
            key={index}
            action="/hotels/123/book"
            method="get"
            className="flex justify-center"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="destination" value={deal.destination} />
            <input
              type="hidden"
              name="checkIn"
              value={deal.checkIn}
            />
            <input
              type="hidden"
              name="checkOut"
              value={deal.checkOut}
            />
            <input type="hidden" name="nights" value={deal.nights} />
            <input type="hidden" name="adults" value={deal.adults} />
            <input type="hidden" name="children" value={deal.children} />
            <input type="hidden" name="price" value={deal.price} />

            <BookingCard
              bgImg={
                index === 0
                  ? "https://images.unsplash.com/photo-1565099824688-e93eb20fe622?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  : index === 1
                  ? "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  : index === 2
                  ? "https://images.unsplash.com/photo-1534974790529-3af7cf1c4075?q=80&w=1087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  : "https://images.unsplash.com/photo-1606298246186-08868ab77562?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              placeName={deal.destination}
              subTitle={`${moment(deal.checkIn).format(
                "MMM DD YYYY"
              )} - ${moment(deal.checkOut).format("MMM DD YYYY")}`}
              person={`Adults: ${deal.adults}`}
              cost={deal.price}
              btnTitle={"See Details"}
            />
          </form>
        ))}
      </div>
    </section>
  );
}
