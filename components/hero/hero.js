'use client';
import React from 'react'
import { useState, useEffect } from 'react';
import { useLanguage } from '../../app/context/LanguageProvider'
import { translations } from "@/lib/translations";

const Hero = () => {
    const { language } = useLanguage();
    const t = translations[language] || translations.en;

    return (
        <div className="w-full text-center text-white">
            <h2 className="leading-[5rem] text-2xl font-bold md:text-[2rem] lg:text-[2.8125rem]">
                {t.helpingOthers}
            </h2>
            <h1 className="text-[3rem] md:tracking-[.15em] font-bold uppercase md:text-[4rem] lg:text-[5rem]">
                {t.liveAndTravel}
            </h1>
            <p className="text-[1rem] font-semibold lg:text-[1.25rem]">
                {t.specialOffers}
            </p>
        </div>
    )
}

export default Hero