"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setStayForm } from "@/reduxStore/features/stayFormSlice";

import { cn } from "@/lib/utils";
import { translations } from "@/lib/translations";

export function Combobox({ className, searchResult, propertyName, lang = "en" }) {
  const t = translations[lang]?.stays.form || translations.en.stays.form;
  const dispatch = useDispatch();
  
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(searchResult);
  const [filter, setFilter] = useState(items);

  const stayFormData = useSelector((state) => state.stayForm.value); 
  const value = propertyName === "country" ? useSelector((state) => state.stayForm.value.country) : useSelector((state) => state.stayForm.value.city) || "";

  useEffect(() => {
    dispatch(
      setStayForm({
        destination: stayFormData.city + ", " + stayFormData.country,
      })
    );
  }, [stayFormData.city]);

  function handleChange(e) {
    const value = e.target.value;
    const filter = items.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setFilter(filter);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={cn("text-left", className)} asChild>
        <Button
          variant="ghost"
          className="justify-start line-clamp-1 font-normal"
        >
          {value === "" ? t.destinationPlaceholder : value}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="center">
        <Input
          className="w-full mb-3"
          placeholder={t.searchPlaceholder}
          onChange={handleChange}
        />
        <div className="h-80 overflow-auto">
          <div>
            {filter.length < 1 ? (
              <div className="p-4 text-center text-sm">{t.noResultsFound}</div>
            ) : (
              filter.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if ( propertyName === "country" ){
                      dispatch(
                        setStayForm({
                          country: item === value ? "" : item,
                        })
                      );
                    } else {
                      dispatch(
                        setStayForm({
                          city: item === value ? "" : item,
                        })
                      );
                    }
                    setOpen(false);
                  }}
                  className="flex cursor-pointer items-center justify-between p-4 hover:bg-muted"
                >
                  <div className="text-sm">{item}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}