"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFlightForm } from "@/reduxStore/features/flightFormSlice";
import { translations } from "@/lib/translations";
import { useLanguage } from '@/app/context/LanguageProvider';
export function SearchAirportDropdown({
  className,
  airports,
  name,
  codeName,
}) {
  const dispatch = useDispatch();
  const flightFormData = useSelector((state) => state.flightForm.value);
  const { translations, isLoaded } = useLanguage();
  const t = isLoaded ? translations.flights.form : {};
  const oppositeCodeName = {
    arrivalAirportCode: "departureAirportCode",
    departureAirportCode: "arrivalAirportCode",
  };

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(airports);
  const [filter, setFilter] = useState(items);

  function handleChange(e) {
    const value = e.target.value;
    const filter = items.filter((item) =>
      (item.city + ", " + item.country)
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    setFilter(filter);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={className} asChild>
        <Button
          variant="ghost"
          className="justify-start line-clamp-1 font-normal text-xs sm:text-base py-2 h-auto min-h-[40px]"
        >
          {flightFormData[name] === "" ? t.select : flightFormData[name]}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[90vw] max-w-[320px]" align="start">
        <Input
          className="w-full mb-3"
          placeholder="Search..."
          onChange={handleChange}
        />
        <div className="max-h-[60vh] sm:h-80 overflow-auto golobe-scrollbar">
          <div>
            {Object.keys(filter).length < 1 ? (
              <div className="p-4 text-center text-sm">No results found</div>
            ) : (
              filter.map((obj) => {
                if (
                  flightFormData[oppositeCodeName[codeName]] === obj.iata_code
                ) {
                  return null;
                }
                return (
                  <div
                    key={obj.iata_code}
                    onClick={() => {
                      const data =
                        obj.city + ", " + obj.country === flightFormData[name]
                          ? {
                            [name]: "",
                            [codeName]: "",
                          }
                          : {
                            [name]: obj?.city + ", " + obj?.country,
                            [codeName]: obj?.iata_code,
                          };

                      dispatch(setFlightForm(data));

                      setOpen(false);
                    }}
                    className="cursor-pointer p-4 hover:bg-muted active:bg-muted/80 min-h-[44px] touch-manipulation"
                  >
                    <div className="text-sm">
                      {obj.city + ", " + obj.country} {"(" + obj.iata_code + ")"}
                    </div>
                    <small className="text-xs opacity-40 font-semibold line-clamp-1">
                      {obj.name}
                    </small>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};