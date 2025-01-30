"use client"

import { useEffect, useState } from "react";
import moment from "moment";
import Image from "next/image";
import { addDays } from "date-fns";
import CVKHotel from "@/public/images/CVK-hotel.jpg";
import location from "@/public/icons/location.svg";
import user from "@/public/icons/user.svg";
import building from "@/public/icons/building.svg";
import lineLeft from "@/public/icons/line-left.svg";
import lineRight from "@/public/icons/line-right.svg";

export function HotelDetailsCard() {
  const [stayData, setStayData] = useState(null);
  const [flightData, setFlightData] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);


      const destination = params.get("destination");
      const checkIn = params.get("checkIn");
      const checkOut = params.get("checkOut");
      const nights = params.get("nights");
      const adults1 = params.get("adults");
      const children1 = params.get("children");
      let price = "";


      if (checkIn && nights && destination && adults1 && children1) {
        let updatedCheckOut = "";
        if (checkOut) {
          updatedCheckOut = checkOut;
          price = params.get("price");
        } else {
          updatedCheckOut = addDays(new Date(checkIn), Number(nights)).toString();
        }
        const newStayData = {
          destination: destination,
          checkIn: checkIn,
          checkOut: updatedCheckOut,
          nights: parseInt(nights),
          adults: parseInt(adults1),
          children: parseInt(children1),
          price: parseInt(price),
        };

        console.log("New stayData:", newStayData);
        setStayData(newStayData);
        localStorage.setItem('stayBookingData', JSON.stringify(newStayData));

      }

      //flightData params
      const from = params.get("from");
      const to = params.get("to");
      const departureAirportCode = params.get("departureAirportCode");
      const arrivalAirportCode = params.get("arrivalAirportCode");
      const trip = params.get("trip");
      const departDate = params.get("departDate");
      let returnDate = "";
      if (trip === "roundtrip") {
        returnDate = params.get("returnDate");
      }
      let clasa = params.get("class");
      if (clasa === "premium_economy") {
        clasa = "premium economy"
      }
      const adults2 = params.get("adult");
      let children2 = params.get("children");
      if (!children2) children2 = 0;
      if (from && to && departureAirportCode && arrivalAirportCode && trip && departDate && clasa && adults2) {
        const newFlightData = {
          from: from,
          to: to,
          departureAirportCode: departureAirportCode,
          arrivalAirportCode: arrivalAirportCode,
          trip: trip,
          departDate: departDate,
          returnDate: returnDate,
          class: clasa,
          adult: parseInt(adults2),
          children: parseInt(children2),
        }
        console.log(newFlightData);
        setFlightData(newFlightData);

        localStorage.setItem('flightBookingData', JSON.stringify(newFlightData));
      }

    }
  }, []);

  const currentLocation = "Chisinau";

  return (
    <div>
      {stayData != null && (
        <div className="mb-[20px] shadow-lg rounded-[12px] bg-white px-[24px] py-[32px] shadow-small lg:mb-[30px] xl:mb-[40px]">
          <div className="mb-[24px] gap-6 flex-col items-baseline justify-between font-bold">
            <h3 className="font-tradeGothic text-base sm:text-lg md:text-xl lg:text-[1.5rem]">
              {currentLocation} - {stayData?.destination}
            </h3>
            {!isNaN(stayData?.price) && (
              <h3 className="font-tradeGothic text-base sm:text-lg md:text-xl lg:text-[1.5rem]">
                Price: {stayData?.price}$
              </h3>
            )}
          </div>

          <div className="mb-[40px] grid justify-between gap-[20px] md:flex">
            <div className="flex w-full items-center gap-[24px] rounded-[8px] border border-primary px-4 sm:px-6 md:px-[32px] py-[16px]">
              <Image
                height={40}
                width={60}
                src={CVKHotel}
                alt="hotel_image"
                className="h-[32px] sm:h-[36px] md:h-[40px] w-auto object-contain"
              />
              <div>
                <h3 className="mb-[8px] text-base sm:text-lg md:text-xl lg:text-[1.5rem] font-semibold">
                  {stayData?.adults} Adults
                </h3>
                <p className="flex items-center gap-3 text-xs sm:text-sm md:text-[0.875rem] font-medium">
                  <Image src={user} height={16} width={16} alt="user_icon" className="h-4 w-4" />
                  <span>{stayData?.children} Children</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 md:flex-row md:justify-center">
            <div className="text-center md:text-left">
              <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] font-semibold">
                {moment(stayData?.checkIn).format("ddd, MMM DD YYYY")}
              </p>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600">Check-In</p>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
              <Image
                src={lineLeft}
                width={36}
                height={36}
                className="w-[24px] sm:w-[30px] md:w-[36px] max-md:rotate-90 object-contain transition-all duration-300"
                alt="line_left"
              />
              <Image
                src={building}
                alt="building_icon"
                className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] md:w-[48px] md:h-[48px] object-contain transition-all duration-300"
                height={48}
                width={48}
              />
              <Image
                src={lineRight}
                className="w-[24px] sm:w-[30px] md:w-[36px] max-md:rotate-90 object-contain transition-all duration-300"
                width={36}
                height={36}
                alt="line_right"
              />
            </div>

            <div className="text-center md:text-left">
              <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] font-semibold">
                {moment(stayData?.checkOut).format("ddd, MMM DD YYYY")}
              </p>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600">Check-Out</p>
            </div>
          </div>

        </div>

      )}
      {flightData && (
        <div className="mb-[20px] shadow-lg rounded-[12px] bg-white px-[24px] py-[32px] shadow-small lg:mb-[30px] xl:mb-[40px]">
          <div className="mb-[24px] gap-6 flex-col items-baseline justify-between font-bold">
            <h3 className="font-tradeGothic text-base sm:text-lg md:text-xl lg:text-[1.5rem]">
              {flightData.from}, {flightData.departureAirportCode} - {flightData.to}, {flightData.arrivalAirportCode}
            </h3>
            <h3 className="font-tradeGothic text-base sm:text-lg md:text-xl lg:text-[1.5rem]">
              Class: {flightData.class.charAt(0).toUpperCase() + flightData.class.slice(1)}
            </h3>
            <h3 className="font-tradeGothic text-base sm:text-lg md:text-xl lg:text-[1.5rem]">
              Trip: {flightData.trip.charAt(0).toUpperCase() + flightData.trip.slice(1)}
            </h3>
          </div>

          <div className="mb-[40px] grid justify-between gap-[20px] md:flex">
            <div className="flex w-30% items-center gap-[24px] rounded-[8px] border border-primary px-4 sm:px-6 md:px-[32px] py-[16px]">
              <Image
                height={40}
                width={60}
                src={CVKHotel}
                alt="hotel_image"
                className="h-[32px] sm:h-[36px] md:h-[40px] w-auto object-contain"
              />
              <div>
                <h3 className="mb-[8px] text-base sm:text-lg md:text-xl lg:text-[1.5rem] font-semibold">
                  {flightData.adult} Adults
                </h3>
                <p className="flex items-center gap-3 text-xs sm:text-sm md:text-[0.875rem] font-medium">
                  <Image src={user} height={16} width={16} alt="user_icon" className="h-4 w-4" />
                  <span>{flightData.children} Children</span>
                </p>
              </div>
            </div>
          </div>

          <div
            className={`flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 ${flightData.trip === "roundtrip" ? "md:flex-row md:justify-center" : "md:flex-row"
              }`}
          >
            <div className="text-center md:text-left">
              <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] font-semibold">
                {moment(flightData.departDate).format("ddd, MMM DD YYYY")}
              </p>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600">Departure Date</p>
            </div>

            {flightData.trip === "roundtrip" && (
              <>
                <div className="flex items-center gap-6 sm:gap-8 md:flex-row lg:gap-12">
                  <Image
                    src={lineLeft}
                    width={36}
                    height={36}
                    className="w-[24px] sm:w-[30px] md:w-[36px] max-md:rotate-90 object-contain transition-all duration-300"
                    alt="line_left"
                  />

                  <Image
                    src={building}
                    alt="building_icon"
                    className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] md:w-[48px] md:h-[48px] object-contain transition-all duration-300"
                    height={48}
                    width={48}
                  />

                  <Image
                    src={lineRight}
                    className="w-[24px] sm:w-[30px] md:w-[36px] max-md:rotate-90 object-contain transition-all duration-300"
                    width={36}
                    height={36}
                    alt="line_right"
                  />

                </div>
                <div className="text-center md:text-left">
                  <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] font-semibold">
                    {moment(flightData.returnDate).format("ddd, MMM DD YYYY")}
                  </p>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600">Return Date</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}