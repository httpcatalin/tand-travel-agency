"use client";
import * as React from "react";

import {
  SelectShadcn,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useDispatch, useSelector } from "react-redux";
import { setFlightForm } from "@/reduxStore/features/flightFormSlice";
import { translations } from "@/lib/translations";
import { useLanguage } from "@/app/context/LanguageProvider";

export function SelectClass({ flightClass }) {
  const { translations, isLoaded } = useLanguage();
  const t = isLoaded ? translations.flights.form : {};
  const dispatch = useDispatch();


  const getClassLabel = (classValue) => {
    return t.classLabels?.[classValue] || classValue;
  };

  const currentFlightForm = useSelector((state) => state.flightForm.value);
  const selectedClass = flightClass || currentFlightForm.class || "economy";

  return (
    <SelectShadcn
      value={selectedClass}
      onValueChange={(value) => {
        dispatch(setFlightForm({ class: value }));
      }}
    >
      <input value={selectedClass} name="flightClass" type="hidden" />
      <SelectTrigger className="focus:ring-transparent focus:ring-offset-0 bg-white hover:bg-slate-500/10 w-full h-full border-0">
        <SelectValue>
          {getClassLabel(selectedClass)}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className={"bg-primary"}>
        <SelectGroup>
          <SelectItem value="economy">{getClassLabel("economy")}</SelectItem>
          <SelectItem value="premium_economy">
            {getClassLabel("premium_economy")}
          </SelectItem>
          <SelectItem value="business">{getClassLabel("business")}</SelectItem>
          <SelectItem value="first">{getClassLabel("first")}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </SelectShadcn>
  );
}