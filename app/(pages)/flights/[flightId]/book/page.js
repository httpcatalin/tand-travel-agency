import { BreadcrumbUI } from "@/components/local-ui/breadcrumb";
import { FareCard } from "@/components/FareCard";
import { FlightScheduleCard } from "@/components/FlightScheduleCard";
import { AuthenticationCard } from "@/components/AuthenticationCard";
import { ChoosePaymentCard } from "@/components/pages/flights.book/ChoosePaymentCard";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import Link from "next/link";

import { getFlightByIdCached } from "@/lib/db/catchedData/getOperationDBCatched";
import { getFlightReviews } from "@/lib/db/getOperationDB";
import { auth } from "@/lib/auth";
import { subDays, format } from "date-fns";
export default async function FlightBookPage({ params }) {
  const flightDetails = await getFlightByIdCached(params.flightId);
  const flightReviews = await getFlightReviews({ flightId: params.flightId });
  const isLoggedIn = !!(await auth())?.user;
  const flightInfo = {
    id: flightDetails._id,
    airplaneName: flightDetails.airplane.name,
    totalPrice: Object.values(flightDetails.price)
      .reduce((prev, curr) => +prev + +curr, 0)
      .toFixed(2),
    rating: flightReviews.length
      ? (
          flightReviews.reduce((prev, curr) => prev + curr.rating, 0) /
          flightReviews.length
        ).toFixed(1)
      : "N/A",
    reviews: flightReviews.length,
    imgSrc:
      "https://images.unsplash.com/photo-1551882026-d2525cfc9656?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  const halfPaymentChargingDate = format(
    subDays(new Date(flightDetails.departureDateTime), 3),
    "MMM d, yyyy"
  );

  return (
    <>
      <main className="mx-auto mb-[80px] mt-[40px] w-[90%] text-secondary">
        <BreadcrumbUI />

        <div className="mt-[30px] flex gap-[20px] max-lg:flex-col-reverse lg:gap-[30px] xl:gap-[40px]">
          <div>
            <FlightScheduleCard flightDetails={flightDetails} />
            <div className="mb-[20px] rounded-[12px] bg-white p-[16px] shadow-lg lg:mb-[30px] xl:mb-[40px]">
              <RadioGroup defaultValue="Pay_in_full">
                <Label className="flex rounded-[12px] justify-between p-[16px] has-[[data-state='checked']]:bg-primary grow items-center gap-[32px]">
                  <div>
                    <p className="font-bold mb-2">Pay in full</p>
                    <p className="text-[0.875rem]">
                      Pay the total and you are all set
                    </p>
                  </div>
                  <RadioGroupItem
                    className="data-[state='checked']:text-white border-2 data-[state='checked']:border-white"
                    value="Pay_in_full"
                  />
                </Label>
                <Label className="flex rounded-[12px] justify-between p-[16px] has-[[data-state='checked']]:bg-primary grow items-center gap-[32px]">
                  <div>
                    <p className="font-bold mb-2">Pay part now, part later</p>
                    <p className="text-[0.875rem]">
                      Pay ${parseFloat(flightInfo.totalPrice / 2)} now, and the
                      rest ($
                      {parseFloat(flightInfo.totalPrice / 2)}) will be
                      automatically charged to the same payment method on{" "}
                      {halfPaymentChargingDate}. No extra fees.
                    </p>
                  </div>
                  <RadioGroupItem
                    className="data-[state='checked']:text-white border-2 data-[state='checked']:border-white"
                    value="Pay_part"
                  />
                </Label>
              </RadioGroup>
              <p className="p-[16px]">
                <Link href="/" className="underline">
                  More info
                </Link>
              </p>
            </div>

            <div className="rounded-12px bg-white p-16px shadow-small">
              {isLoggedIn ? <ChoosePaymentCard /> : <AuthenticationCard />}
            </div>
          </div>
          <div className="h-min flex-grow rounded-12px bg-white p-24px shadow-small">
            <FareCard
              name={flightInfo.airplaneName}
              price={flightDetails.price}
              reviews={flightInfo.reviews}
              rating={flightInfo.rating}
              imgSrc={flightInfo.imgSrc}
              type={"Economy"}
            />
          </div>
        </div>
      </main>
    </>
  );
}
