import { FLightResult } from "@/components/pages/flights.search/sections/FlightResult";
import { auth } from "@/lib/auth";
import { getManyDocs, getOneDoc } from "@/lib/db/getOperationDB";
import { ratingScale } from "@/data/ratingScale";
import { getUnixTime, fromUnixTime, startOfDay, endOfDay } from "date-fns";
import _ from "lodash";

async function FLightResultPage({ searchParams }) {
  let flightResults = [];
  const session = await auth();
  if (Object.keys(searchParams).length > 0) {
    const departureAirportId = searchParams.departureAirportCode;
    const arrivalAirportId = searchParams.arrivalAirportCode;
    const totalPassengers = Object.values(
      JSON.parse(searchParams.passenger)
    ).reduce((acc, passenger) => acc + passenger, 0);
    const flightClass = searchParams.class;
    const departDateStart = startOfDay(
      fromUnixTime(getUnixTime(new Date(searchParams.departDate)))
    );
    const departDateEnd = endOfDay(
      fromUnixTime(getUnixTime(new Date(searchParams.departDate)))
    );
    flightResults = (
      await getManyDocs("Flight", {
        departureDateTime: {
          $gte: departDateStart,
          $lte: departDateEnd,
        },
        originAirportId: departureAirportId,
        destinationAirportId: arrivalAirportId,
      })
    ).filter((flight) => {
      const seats = flight.seats;
      const availableSeats = seats.filter(
        (seat) => seat.class === flightClass && seat.availability === true
      );
      return availableSeats.length >= totalPassengers;
    });
  }

  if (session?.user?.id) {
    const likedFlights = (await getOneDoc("User", { _id: session?.user?.id }))
      .likes.flights;
    flightResults = flightResults.map((flight) => {
      const flightFilterQuery = {
        flightNumber: flight.flightNumber,
        flightClass: searchParams.class,
      };
      return {
        ...flight,
        liked: likedFlights.some((el) => _.isEqual(flightFilterQuery, el)),
      };
    });
  }

  // console.log(flightResults[0].stopovers[0].airlineId);
  flightResults = await Promise.all(
    flightResults.map(async (flight) => {
      const currentFlightReviews = await getManyDocs("FlightReview", {
        airlineId: flight.stopovers[0].airlineId._id,
        departureAirportId: flight.departureAirportId,
        arrivalAirportId: flight.arrivalAirportId,
      });

      const currentFlightRatingsSum = currentFlightReviews.reduce(
        (acc, review) => {
          return acc + review.rating;
        },
        0
      );

      const rating = currentFlightRatingsSum / currentFlightReviews.length;

      return {
        ...flight,
        price: flight.price[searchParams.class].base,
        reviews: currentFlightReviews,
        totalReviews: currentFlightReviews.length,
        rating: currentFlightReviews.length ? rating.toFixed(1) : "N/A",
        ratingScale: ratingScale[Math.floor(rating)] || "N/A",
        flightClass: searchParams.class,
      };
    })
  );

  if (flightResults?.error) {
    return <div className={"text-center font-bold"}>{flightResults.error}</div>;
  }
  if (flightResults?.length < 1) {
    return <div className={"text-center font-bold"}>No data found</div>;
  }

  return <FLightResult flightResults={flightResults} />;
}

export default FLightResultPage;
