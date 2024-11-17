import { BreadcrumbUI } from "@/components/local-ui/breadcrumb";
import { FareCard } from "@/components/FareCard";
import { FlightScheduleCard } from "@/components/FlightScheduleCard";
import { AuthenticationCard } from "@/components/AuthenticationCard";
import { ChoosePaymentCard } from "@/components/pages/flights.book/ChoosePaymentCard";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import Link from "next/link";

import { getManyDocs, getOneDoc } from "@/lib/db/getOperationDB";
import { auth } from "@/lib/auth";
import { capitalize } from "@/lib/utils";
import { FLIGHT_CLASS_PLACEHOLDERS } from "@/lib/constants";
import { cookies } from "next/headers";
import { formatInTimeZone } from "date-fns-tz";
export default async function FlightBookPage({ params }) {
  const flightClass = cookies().get("fc")?.value || "economy";
  const timezone = cookies().get("timezone")?.value || "UTC";

  const flight = await getOneDoc("Flight", {
    flightNumber: params.flightId,
  });

  const price = flight.price[flightClass];

  const flightReviews = await getManyDocs("FlightReview", {
    airlineId: flight.stopovers[0].airlineId._id,
    departureAirportId: flight.originAirportId._id,
    arrivalAirportId: flight.destinationAirportId._id,
  });
  const isLoggedIn = !!(await auth())?.user;

  const flightInfo = {
    flightNumber: flight.flightNumber,
    airplaneName: flight.stopovers[0].airplaneId.model,
    price,
    totalPrice:
      Object.values(price).reduce((prev, curr) => +prev + +curr, 0) -
      +price.discount,
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

  const halfPaymentChargingDate = formatInTimeZone(
    flight.expireAt,
    timezone,
    "MMM d, yyyy"
  );

  return (
    <>
      <main className="mx-auto mb-[80px] mt-[40px] w-[90%] text-secondary">
        <BreadcrumbUI />

        <div className="mt-[30px] flex gap-[20px] max-lg:flex-col-reverse lg:gap-[30px] xl:gap-[40px]">
          <div>
            <div className={"mb-5"}>
              {flight.stopovers.map((stopover, index) => {
                const order = {
                  0: "order-1",
                  1: "order-3",
                };
                return (
                  <FlightScheduleCard
                    className={order[index]}
                    key={index}
                    flightScheduleDetails={{
                      ...stopover,
                      timezone,
                      price: price.base,
                    }}
                    variant={"book"}
                  />
                );
              })}
              {flight.stopovers.length > 1 && (
                <div
                  className={
                    "order-2 text-center bg-tertiary rounded-md text-white font-bold w-fit px-5 py-1 self-center"
                  }
                >
                  Layover{" "}
                  {minutesToHMFormat(
                    substractTimeInMins(
                      flight.stopovers[1].departureDateTime,
                      flight.stopovers[0].arrivalDateTime
                    )
                  )}
                </div>
              )}
            </div>
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
                      Pay ${parseFloat(flightInfo.totalPrice / 2).toFixed(2)}{" "}
                      now, and the rest ($
                      {parseFloat(flightInfo.totalPrice / 2).toFixed(2)}) will
                      be automatically charged to the same payment method on{" "}
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
                <Link href="#" className="underline">
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
              fare={{
                price: flightInfo.price,
                totalPrice: flightInfo.totalPrice,
              }}
              reviews={flightInfo.reviews}
              rating={flightInfo.rating}
              imgSrc={flightInfo.imgSrc}
              type={capitalize(FLIGHT_CLASS_PLACEHOLDERS[flightClass])}
            />
          </div>
        </div>
      </main>
    </>
  );
}
