"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";
import { SearchAirportDropdown } from "@/components/SearchAirportDropdown";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SelectTrip } from "@/components/SelectTrip";
import { SelectClass } from "@/components/SelectClass";
import { AddPromoCode } from "@/components/AddPromoCode";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setFlightForm,
} from "@/reduxStore/features/flightFormSlice";

import airports from "@/data/airports.json";
import swap from "@/public/icons/swap.svg";

function SearchFlightsForm({ searchParams = {} }) {
  const classPlaceholders = {
    economy: "Economy",
    premium_economy: "Premium Economy",
    business: "Business",
    first: "First class",
  };
  const dispatch = useDispatch();


  const adultsOptions = Array.from({ length: 10 }, (_, i) => (i + 1).toString());
  const childrenOptions = Array.from({ length: 5 }, (_, i) => (i).toString());

  let searchParamsObj = {};
  if (Object.keys(searchParams).length > 0) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (key === "passenger" || key === "filters") {
        searchParamsObj[key] = JSON.parse(value);
        continue;
      }
      searchParamsObj[key] = value;
    }
  }
  useEffect(() => {
    if (Object.keys(searchParams).length > 0) {
      dispatch(setFlightForm(searchParamsObj));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const flightFormData = useSelector((state) => state.flightForm.value);

  function handleSubmit(e) {
    e.preventDefault();

    if (searchForEmptyValues(flightFormData)) {
      alert(
        "Please fill all the required fields. Asterisk (*) indicates 'required'"
      );
      return;
    }
    if (flightFormData.adult <= 0) {
      alert("Please select at least one passenger");
      return;
    }
    if (flightFormData.adult > 10) {
      alert("Maximum number for adults is 10");
      return;
    }
    if (flightFormData.children > 4) {
      alert("Maximum number for children is 4");
      return;
    }

    e.target.submit();
  }

  function searchForEmptyValues(obj) {
    const optionals = ["promocode"];
    for (const [key, value] of Object.entries(obj)) {
      if (optionals.includes(key)) {
        continue;
      }
      if (key === "returnDate" && value == "") {
        if (obj.trip === "oneway") continue;
      }
      if (value === "") {
        return true;
      }
    }
    return false;
  }

  function totalPassenger() {
    return flightFormData.adult + flightFormData.children;
  }

  return (
    <>
      <form
        id="flightform"
        method={"get"}
        action="/hotels/123/book"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="from" value={flightFormData.from} />
        <input type="hidden" name="to" value={flightFormData.to} />
        <input
          type="hidden"
          name="departureAirportCode"
          value={flightFormData.departureAirportCode}
        />
        <input
          type="hidden"
          name="arrivalAirportCode"
          value={flightFormData.arrivalAirportCode}
        />
        <input
          type="hidden"
          name="departDate"
          value={flightFormData.departDate}
        />
        <input
          type="hidden"
          name="returnDate"
          value={flightFormData.returnDate}
        />
        <input
          type="hidden"
          value={flightFormData.adult}
          form="flightform"
          name="adult"
        />
        <input
          type="hidden"
          value={flightFormData.children}
          form="flightform"
          name="children"
        />
        <input
          type="hidden"
          value={flightFormData.class}
          form="flightform"
          name="class"
        />
        <input
          type="hidden"
          value={JSON.stringify(flightFormData.filters)}
          form="flightform"
          name="filters"
        />

        <div className="my-[20px] grid gap-[24px] lg:grid-cols-2 xl:grid-cols-[2fr_1fr_repeat(2,_2fr)]">
          <div className="relative justify-between flex h-[48px] w-full items-center gap-[4px] rounded-[8px] border-2 border-primary">
            <span className="absolute -top-[8px] left-[16px] z-10 inline-block bg-white px-[4px] leading-none">
              From <span className={"text-red-600"}>*</span> - to{" "}
              <span className={"text-red-600"}>*</span>
            </span>

            <div className="h-full w-[45%]">
              <SearchAirportDropdown
                name={"from"}
                codeName={"departureAirportCode"}
                airports={airports}
                className="h-full w-full text-start"
              />
            </div>
            <button
              onClick={() =>
                dispatch(
                  setFlightForm({
                    ...flightFormData,
                    from: flightFormData.to,
                    to: flightFormData.from,
                    departureAirportCode: flightFormData.arrivalAirportCode,
                    arrivalAirportCode: flightFormData.departureAirportCode,
                  })
                )
              }
              aria-label={"swap airport names"}
              role={"button"}
              type={"button"}
              className="flex h-full items-center justify-center w-[10%] rounded-lg hover:bg-slate-400/20 transition-all transition-[duration:.4s]"
            >
              <Image
                alt=""
                className="min-h-[16px] min-w-[16px]"
                width={18}
                height={22}
                src={swap}
              />
            </button>

            <div className="h-full w-[45%]">
              <SearchAirportDropdown
                airports={airports}
                className="h-full w-full text-start"
                name={"to"}
                codeName={"arrivalAirportCode"}
              />
            </div>
          </div>

          <div className="relative rounded-[8px] border-2 border-primary">
            <span className="absolute -top-[8px] left-[16px] z-10 inline-block bg-white px-[4px] leading-none">
              Trip <span className={"text-red-600"}>*</span>
            </span>
            <div className="h-full">
              <SelectTrip />
            </div>
          </div>
          <div
            className={
              "relative flex h-[48px] w-full items-center gap-[4px] rounded-[8px] border-2 border-primary"
            }
          >
            <span className="absolute -top-[8px] left-[16px] z-10 inline-block bg-white px-[4px] leading-none">
              Depart <span className={"text-red-600"}>*</span> - Return{" "}
              {flightFormData.trip === "roundtrip" && (
                <span className={"text-red-600"}>*</span>
              )}
            </span>

            <DatePickerWithRange
              name={"depart&return"}
              className={"h-full w-full border-0"}
            />
          </div>

          <div className="relative flex h-[48px] items-center gap-[4px] rounded-[8px] border-2 border-primary">
            <span className="absolute -top-[8px] left-[16px] z-10 inline-block bg-white px-[4px] leading-none">
              Passenger <span className={"text-red-600"}>*</span> - Class{" "}
              <span className={"text-red-600"}>*</span>
            </span>
            <Popover>
              <PopoverTrigger
                asChild
                className="h-full w-full justify-start rounded-lg"
              >
                <Button className="font-normal" variant={"ghost"}>
                  {`${totalPassenger()} ${
                    totalPassenger() > 1
                      ? "people"
                      : "person"
                  }, ${classPlaceholders[flightFormData.class]}`}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Card className="p-3 bg-primary/30 border-primary border-2 mb-3">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle>Class</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="border-2 border-primary rounded-lg">
                      <SelectClass />
                    </div>
                  </CardContent>
                </Card>
                <Card className="p-3 bg-primary/30 border-primary border-2">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle>Passenger</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-col flex gap-3 justify-center">
                    <Label>
                      Adult (max 10):
                      <select
                        value={+flightFormData.adult}
                        onChange={(e) => {
                          dispatch(
                            setFlightForm({
                              adult: +e.currentTarget.value,
                            })
                          );
                        }}
                        className="p-2 rounded-sm leading-none block mt-1">
                        {adultsOptions.map((option, index) => (
                          <option key={index} value={option} className="h-full">
                            {option}
                          </option>
                        ))}
                      </select>
                    </Label>
                    <Label>
                      Children (max 4):
                      <select
                        value={+flightFormData.children}
                        onChange={(e) => {
                          dispatch(
                            setFlightForm({
                              children: +e.target.value,
                            })
                          );
                        }}
                        className="p-2 rounded-sm leading-none block mt-1">
                        {childrenOptions.map((option, index) => (
                          <option key={index} value={option} className="h-full">
                            {option}
                          </option>
                        ))}
                      </select>
                    </Label>
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex flex-wrap justify-end gap-[24px]">
          <Button type="submit" className="gap-1">
            <Image
              width={24}
              height={24}
              src={"/icons/paper-plane-filled.svg"}
              alt={"paper_plane_icon"}
            />
            <span>Confirm</span>
          </Button>
        </div>
      </form>
    </>
  );
}

export { SearchFlightsForm };
