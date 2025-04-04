"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFlightForm } from "@/reduxStore/features/flightFormSlice";
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
import { SelectTrip } from "@/components/SelectTrip";
import { SelectClass } from "@/components/SelectClass";
import airports from "@/data/airports.json";
import swap from "@/public/icons/swap.svg";
import { translations } from "@/lib/translations";
import { useLanguage } from "@/app/context/LanguageProvider";

function SearchFlightsForm({ searchParams = {} }) {
  const { translations, isLoaded, language } = useLanguage();
  const t = isLoaded ? translations.flights.form : {};

  const getClassName = (classType) => {
    if (!classType) return "";
    return t.classLabels?.[classType] || classType;
  };

  const dispatch = useDispatch();

  const adultsOptions = Array.from({ length: 10 }, (_, i) =>
    (i + 1).toString()
  );
  const childrenOptions = Array.from({ length: 5 }, (_, i) => i.toString());

  const flightFormData = useSelector((state) => state.flightForm.value);

  useEffect(() => {
    if (Object.keys(searchParams).length > 0) {
      const searchParamsObj = Object.fromEntries(
        Object.entries(searchParams).map(([key, value]) => [
          key,
          ["passenger", "filters"].includes(key) ? JSON.parse(value) : value,
        ])
      );
      dispatch(setFlightForm(searchParamsObj));
    }
  }, [dispatch, searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchForEmptyValues(flightFormData)) {
      alert(t.validation.fillRequired);
      return;
    }
    if (flightFormData.adult <= 0) {
      alert(t.validation.minPassenger);
      return;
    }
    if (flightFormData.adult > 10) {
      alert(t.validation.maxAdults);
      return;
    }
    if (flightFormData.children > 4) {
      alert(t.validation.maxChildren);
      return;
    }

    const langInput = e.target.querySelector('input[name="lang"]');
    if (langInput) {
      langInput.value = language || 'en';
    }

    e.target.submit();
  };

  const searchForEmptyValues = (obj) => {
    const optionals = ["promocode"];
    for (const [key, value] of Object.entries(obj)) {
      if (optionals.includes(key)) continue;
      if (key === "returnDate" && value === "" && obj.trip === "oneway")
        continue;
      if (value === "") return true;
    }
    return false;
  };

  const totalPassenger = () => {
    const adults = parseInt(flightFormData.adult) || 0;
    const children = parseInt(flightFormData.children) || 0;
    return adults + children;
  };

  return (
    <form
      id="flightform"
      method="get"
      action="/hotels/123/book"
      onSubmit={handleSubmit}
      className="px-3 md:px-0"
    >
      <input type="hidden" name="lang" value={language || 'en'} />

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
      <input type="hidden" name="adult" value={flightFormData.adult} />
      <input type="hidden" name="children" value={flightFormData.children} />
      <input type="hidden" name="class" value={flightFormData.class} />
      <input
        type="hidden"
        name="filters"
        value={JSON.stringify(flightFormData.filters)}
      />

      <div className="my-[15px] sm:my-[20px] grid gap-[16px] sm:gap-[24px] grid-cols-1 lg:grid-cols-2 xl:grid-cols-[2fr_1fr_repeat(2,_2fr)]">
        <div className="relative flex min-h-[56px] sm:min-h-[48px] w-full flex-col sm:flex-row items-center gap-[4px] rounded-[8px] border-2 border-primary">
          <span className="absolute -top-[8px] left-[16px] z-10 inline-block bg-white px-[4px] text-base sm:text-base leading-none">
            {t.from} <span className="text-red-600">{t.required}</span> - {t.to}{" "}
            <span className="text-red-600">{t.required}</span>
          </span>

          <SearchAirportDropdown
            name="from"
            codeName="departureAirportCode"
            airports={airports}
            className="h-full w-full sm:w-[45%]"
          />

          <button
            type="button"
            onClick={() => {
              dispatch(
                setFlightForm({
                  ...flightFormData,
                  from: flightFormData.to,
                  to: flightFormData.from,
                  departureAirportCode: flightFormData.arrivalAirportCode,
                  arrivalAirportCode: flightFormData.departureAirportCode,
                })
              );
            }}
            aria-label={t.swap}
            className="flex h-10 w-[10%] min-w-[40px] items-center justify-center rounded-lg transition-all hover:bg-slate-400/20 touch-manipulation"
          >
            <Image
              src={swap}
              alt=""
              width={18}
              height={22}
              className="min-h-[16px] min-w-[16px]"
            />
          </button>

          <SearchAirportDropdown
            name="to"
            codeName="arrivalAirportCode"
            airports={airports}
            className="h-full w-full sm:w-[45%]"
          />
        </div>

        <div className="relative rounded-[8px] min-h-[56px] sm:min-h-[48px] border-2 border-primary">
          <span className="absolute -top-[8px] left-[16px] z-10 inline-block bg-white px-[4px] text-base sm:text-base leading-none">
            {t.trip} <span className="text-red-600">{t.required}</span>
          </span>
          <SelectTrip />
        </div>

        <div className="relative flex min-h-[56px] sm:min-h-[48px] w-full items-center gap-[4px] rounded-[8px] border-2 border-primary">
          <span className="absolute -top-[8px] left-[16px] z-10 inline-block bg-white px-[4px] text-base sm:text-base leading-none">
            {t.depart} <span className="text-red-600">{t.required}</span> -{" "}
            {t.return}{" "}
            {flightFormData.trip === "roundtrip" && (
              <span className="text-red-600">{t.required}</span>
            )}
          </span>
          <DatePickerWithRange
            name="depart&return"
            className="h-full w-full border-0"
          />
        </div>

        <div className="relative flex min-h-[56px] sm:min-h-[48px] items-center gap-[4px] rounded-[8px] border-2 border-primary">
          <span className="absolute -top-[8px] left-[16px] z-10 inline-block bg-white px-[4px] text-base sm:text-base leading-none">
            {t.passenger} <span className="text-red-600">{t.required}</span> -{" "}
            {t.class} <span className="text-red-600">{t.required}</span>
          </span>
          <Popover>
            <PopoverTrigger
              asChild
              className="h-full w-full justify-start rounded-lg"
            >
              <Button variant="ghost" className="font-normal text-sm sm:text-base line-clamp-1">
                {`${totalPassenger()} ${totalPassenger() === 1
                  ? t.passengers.person
                  : t.passengers.people
                  }, ${getClassName(flightFormData.class)}`}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[90vw] max-w-[280px] sm:w-auto">
              <Card className="p-3 mb-3 border-2 border-primary bg-primary/30">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-base sm:text-lg">{t.class}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="border-2 border-primary rounded-lg">
                    <SelectClass
                      flightClass={getClassName(flightFormData.class)}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card className="p-3 border-2 border-primary bg-primary/30">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-base sm:text-lg">{t.passenger}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex flex-col gap-3">
                  <Label>
                    {t.passengers.adult}
                    <select
                      value={flightFormData.adult}
                      onChange={(e) =>
                        dispatch(setFlightForm({ adult: +e.target.value }))
                      }
                      className="p-2 mt-1 block w-full rounded-sm touch-manipulation"
                    >
                      {adultsOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </Label>
                  <Label>
                    {t.passengers.children}
                    <select
                      value={flightFormData.children}
                      onChange={(e) =>
                        dispatch(setFlightForm({ children: +e.target.value }))
                      }
                      className="p-2 mt-1 block w-full rounded-sm touch-manipulation"
                    >
                      {childrenOptions.map((option, index) => (
                        <option key={index} value={option}>
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

      <div className="flex flex-wrap justify-center sm:justify-end gap-[24px] mt-4 sm:mt-0">
        <Button type="submit" className="gap-1 w-full sm:w-auto min-h-[48px] px-6 touch-manipulation">
          <Image
            src="/icons/paper-plane-filled.svg"
            alt="paper_plane_icon"
            width={24}
            height={24}
          />
          <span>{t.confirm}</span>
        </Button>
      </div>
    </form>
  );
};

export { SearchFlightsForm };