import { FLightResult } from "@/components/pages/flights.search/sections/FlightResult";
import { auth } from "@/lib/auth";
import { getManyDocs, getOneDoc } from "@/lib/db/getOperationDB";
import { RATING_SCALE } from "@/lib/constants";
import { endOfDay, startOfDay } from "date-fns";
import _ from "lodash";
import { cookies } from "next/headers";
async function FLightResultPage({ searchParams }) {
  let flightResults = [];
  const session = await auth();
  const timezone = cookies().get("timezone")?.value || "UTC";
  if (Object.keys(searchParams).length > 0) {
    const departureAirportId = searchParams.departureAirportCode;
    const arrivalAirportId = searchParams.arrivalAirportCode;
    const totalPassengers = Object.values(
      JSON.parse(searchParams.passenger)
    ).reduce((acc, passenger) => acc + passenger, 0);
    const flightClass = searchParams.class;

    const d = new Date();

    let departDateStart = new Date(searchParams.departDate);
    departDateStart.setHours(d.getHours(), d.getMinutes());

    if (d.getDate() !== departDateStart.getDate()) {
      departDateStart = startOfDay(departDateStart);
    }
    const returnDate = Boolean(searchParams.returnDate)
      ? searchParams.returnDate
      : departDateStart;

    const departDateEnd = endOfDay(new Date(returnDate));
    flightResults = (
      await getManyDocs(
        "Flight",
        {
          expireAt: {
            $gte: departDateStart,
            $lte: departDateEnd,
          },
          originAirportId: departureAirportId,
          destinationAirportId: arrivalAirportId,
        },
        ["flights"]
      )
    ).filter((flight) => {
      const seats = flight.seats;
      const availableSeats = seats.filter(
        (seat) => seat.class === flightClass && seat.availability === true
      );
      return availableSeats.length >= totalPassengers;
    });
  }
  console.log(session?.user?.id);
  if (session?.user?.id) {
    const likedFlights = (
      await getOneDoc("User", { _id: session?.user?.id }, ["userDetails"])
    ).likes.flights;
    flightResults = flightResults.map((flight) => {
      const flightFilterQuery = {
        flightId: flight._id,
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
      const currentFlightReviews = await getManyDocs(
        "FlightReview",
        {
          airlineId: flight.stopovers[0].airlineId._id,
          departureAirportId: flight.originAirportId._id,
          arrivalAirportId: flight.destinationAirportId._id,
          airplaneModelName: flight.stopovers[0].airplaneId.model,
        },
        [
          flight.flightNumber + "_review",
          flight._id + "_review",
          "flightReviews",
        ]
      );
      const currentFlightRatingsSum = currentFlightReviews.reduce(
        (acc, review) => {
          return +acc + +review.rating;
        },
        0
      );

      const rating = +currentFlightRatingsSum / currentFlightReviews.length;

      return {
        ...flight,
        price: flight.price[searchParams.class].base,
        timezone,
        reviews: currentFlightReviews,
        totalReviews: currentFlightReviews.length,
        rating: currentFlightReviews.length ? rating.toFixed(1) : "N/A",
        ratingScale: RATING_SCALE[Math.floor(rating)] || "N/A",
        flightClass: searchParams.class,
      };
    })
  );

  if (flightResults?.error) {
    return (
      <div className={"text-center grow font-bold"}>{flightResults.error}</div>
    );
  }
  if (flightResults?.length < 1) {
    return <div className={"text-center grow font-bold"}>No data found</div>;
  }

  return <FLightResult flightResults={flightResults} />;
}

export default FLightResultPage;
