"use client";

import { option } from "@/data/selectInputOption";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { DatePicker } from "@/components/ui/DatePicker";
import { Combobox } from "@/components/local-ui/ComboBox";
import { AddPromoCode } from "@/components/AddPromoCode";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@//components/ui/card";
import { Input } from "@//components/ui/input";

import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setStayForm } from "@/reduxStore/features/stayFormSlice";

import { addDays } from "date-fns";

function SearchStaysForm({ searchParams = {} }) {
  const dispatch = useDispatch();

  const nightsOptions = Array.from({ length: 14 }, (_, i) => (i + 1).toString());
  const adultsOptions = Array.from({ length: 10 }, (_, i) => (i + 1).toString());
  const childrenOptions = Array.from({ length: 5 }, (_, i) => (i).toString());

  let staySearchParamsObj = {};
  if (Object.keys(searchParams).length > 0) {
    for (const [key, value] of Object.entries(searchParams)) {
      staySearchParamsObj[key] = value;
    }
  } else {
    staySearchParamsObj = {
      destination: "",
      checkIn: new Date().toString(),
      checkOut: addDays(new Date(), 1).toString(),
      nights: 3,
      adults: 2,
      children: 0,
      promocode: "",
    };
  }

  useEffect(() => {
    dispatch(setStayForm(staySearchParamsObj));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stayFormData = useSelector((state) => state.stayForm.value);
  console.log(stayFormData);

  function handleSubmit(e) {
    e.preventDefault();

    if (searchForEmptyValues(stayFormData)) {
      alert(
        "Please fill all the required fields. Asterisk (*) indicates 'required'"
      );
      return;
    }
    if (stayFormData.adults > 10) {
      alert("Maximum 10 adults are allowed");
      return;
    }
    if (stayFormData.children > 10) {
      alert("Maximum 10 children are allowed");
      return;
    }
    if (stayFormData.adults <= 0) {
      alert("Please select at least one adult");
      return;
    }
    if (stayFormData.children < 0) {
      alert("Please select non negative number for children");
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
      if (value === "") {
        return true;
      }
    }
    return false;
  }

  return (
    <form
      id="stayForm"
      method="get"
      action="/hotels/123/book"
      onSubmit={handleSubmit}
    >
      <input
        type="hidden"
        name="destination"
        value={stayFormData.destination}
      />

      <input type="hidden" name="checkIn" value={stayFormData.checkIn} />

      <input type="hidden" name="nights" value={stayFormData.nights} />

      <input type="hidden" name="adults" value={stayFormData.adults} />

      <input type="hidden" name="children" value={stayFormData.children} />

      <input type="hidden" name="promocode" value={stayFormData.promocode} />

      <div className="my-[20px] grid gap-[24px] lg:grid-cols-2 xl:grid-cols-[2fr_repeat(3,_1fr)]">
        <div className="relative flex h-[48px] w-full items-center gap-[4px] rounded-[8px] border-2 border-primary">
          <span className="absolute -top-[8px] left-[16px] z-10 inline-block bg-white px-[4px] leading-none">
            Enter Destination <span className={"text-red-600"}>*</span>
          </span>
          <div className="p-2">
            <Image
              alt=""
              width={24}
              height={24}
              src={"/icons/bed-filled.svg"}
            />
          </div>

          <div className="h-full grow">
            <Combobox searchResult={option} className={"h-full w-full"} />
          </div>
        </div>

        <div className="relative flex h-[48px] w-full items-center gap-[4px] rounded-[8px] border-2 border-primary">
          <span className="absolute -top-[8px] left-[16px] z-10 inline-block bg-white px-[4px] leading-none">
            Check in <span className={"text-red-600"}>*</span>
          </span>
          <div className="h-full grow">
            <DatePicker
              className={"h-full w-full rounded-[8px]"}
              date={stayFormData.checkIn}
              setDate={(date) => {
                dispatch(
                  setStayForm({
                    checkIn: date.toString(),
                  })
                );
              }}
            />
          </div>
          <div className="p-2">
            <Image
              src={"/icons/calender.svg"}
              height={24}
              width={24}
              alt="calender_icon"
            />
          </div>
        </div>
        <div
          className={
            "relative flex h-[48px] w-full items-center gap-[4px] rounded-[8px] border-2 border-primary"
          }
        >
          <span className="absolute -top-[8px] left-[16px] z-10 inline-block bg-white px-[4px] leading-none">
            Nights <span className={"text-red-600"}>*</span>
          </span>
          <div className="h-full flex items-center grow">
            {/* <DatePicker
              date={stayFormData.checkOut}
              setDate={(date) => {
                if (date == undefined) {
                  dispatch(
                    setStayForm({
                      checkOut: "",
                    })
                  );
                } else {
                  dispatch(
                    setStayForm({
                      checkOut: date.toString(),
                    })
                  );
                }
              }}
              className={"h-full w-full rounded-[8px]"}
            /> */}
            <select
              value={stayFormData.nights}
              onChange={(e) => {
                dispatch(
                  setStayForm({
                    nights: +e.target.value,
                  })
                );
              }}
              className="ml-5 leading-none">
              {nightsOptions.map((option, index) => (
                <option key={index} value={option} className="h-full">
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="p-2">
            <Image
              src={"/icons/bed-filled.svg"}
              height={24}
              width={24}
              alt="bed_filled_icon"
            />
          </div>
        </div>

        <div className="relative flex h-[48px] items-center gap-[4px] rounded-[8px] border-2 border-primary">
          <span className="absolute -top-[8px] left-[16px] z-10 inline-block bg-white px-[4px] leading-none">
            Adults <span className={"text-red-600"}>*</span> - Children{" "}
            <span className={"text-red-600"}>*</span>
          </span>
          <div className="h-full grow">
            <Popover>
              <PopoverTrigger
                asChild
                className="h-full w-full justify-start rounded-lg"
              >
                <Button className="font-normal justify-start" variant={"ghost"}>
                  {`${stayFormData.adults} Adults, ${stayFormData.children} Children`}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Card className="p-3 bg-primary/30 border-primary border-2 mb-3">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle>Adults </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <select
                      value={stayFormData.adults}
                      onChange={(e) => {
                        dispatch(
                          setStayForm({
                            adults: +e.target.value,
                          })
                        );
                      }}
                      className="w-10 ml-5 leading-none p-1">
                      {adultsOptions.map((option, index) => (
                        <option key={index} value={option} className="h-full">
                          {option}
                        </option>
                      ))}
                    </select>
                  </CardContent>
                </Card>
                <Card className="p-3 bg-primary/30 border-primary border-2">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle>Children </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-col flex gap-3">
                    <select
                      value={stayFormData.children}
                      onChange={(e) => {
                        dispatch(
                          setStayForm({
                            children: +e.target.value,
                          })
                        );
                      }}
                      className="w-10 ml-5 leading-none p-1">
                      {childrenOptions.map((option, index) => (
                        <option key={index} value={option} className="h-full">
                          {option}
                        </option>
                      ))}
                    </select>
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-[24px]">
        <Button type="submit" className="gap-1">
          <Image
            width={24}
            height={24}
            src={"/icons/building.svg"}
            alt={"search_icon"}
          />
          <span>Confirm</span>
        </Button>
      </div>
    </form>
  );
}

export { SearchStaysForm };
