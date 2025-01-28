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
export function SelectClass({ lang = "en" }) {
  const t = translations[lang]?.flights.form || translations.en.flights.form;
  const dispatch = useDispatch();
  const flightClass = useSelector((state) => state.flightForm.value.class);

  return (
    <SelectShadcn
      onValueChange={(value) => {
        dispatch(setFlightForm({ class: value }));
      }}
    >
      <input value={flightClass} name="flightClass" type="hidden" />
      <SelectTrigger className="focus:ring-transparent focus:ring-offset-0 bg-white hover:bg-slate-500/10 w-full h-full border-0 ">
        <SelectValue
          className="h-full"
          defaultValue={flightClass}
          placeholder={t.class[flightClass]}
        />
      </SelectTrigger>
      <SelectContent className={"bg-primary"}>
        <SelectGroup>
          <SelectItem value="economy">{t.classLabels.economy}</SelectItem>
          <SelectItem value="premium_economy">
            {t.classLabels.premium_economy}
          </SelectItem>
          <SelectItem value="business">{t.classLabels.business}</SelectItem>
          <SelectItem value="first">{t.classLabels.first}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </SelectShadcn>
  );
}
