'use client';

import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import Link from 'next/link';
import { useLanguage } from '../../app/context/LanguageProvider'
const languageOptions = {
  en: {
    code: 'EN',
    label: 'English',
    flag: '/flags/en.svg'
  },
  ro: {
    code: 'RO',
    label: 'Română',
    flag: '/flags/ro.svg'
  },
  ru: {
    code: 'РУ',
    label: 'Русский',
    flag: '/flags/ru.svg'
  }
};

export function Nav({ className, type = "default" }) {
  const { language, setLanguage } = useLanguage();
  const types = {
    home: {
      nav: "rounded-[24px] px-[32px] text-white backdrop-blur-[2px]",
      logoFill: "white",
    },
    default: {
      nav: "relative bg-white text-secondary dark:bg-secondary",
      logoFill: "black",
    },
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    window.location.reload();
  };

  return (
    <nav className={cn(
      "flex h-[70px] w-full items-center justify-between px-[5%] shadow-lg lg:h-[90px]",
      types[type].nav,
      className
    )}>
      <div className="flex items-center gap-1.5 lg:gap-2">
        <a
          href="tel:+37360003050"
          className="flex items-center gap-1.5 lg:gap-2 hover:text-primary transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 lg:h-5 lg:w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span className="hidden md:block text-xs lg:text-sm font-medium">
            +373 60 003 050
          </span>
        </a>
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Link href="/">
          <Image
            src={logo}
            alt="Company Logo"
            width={120}
            height={50}
            className="w-[80px] md:w-[100px] lg:w-[120px] h-auto"
            priority
          />
        </Link>
      </div>

      <div className="relative">
        <select
          name="lang"
          value={language}
          onChange={handleLanguageChange}
          className="appearance-none bg-transparent border border-current/20 rounded-md 
                px-2 lg:px-3 py-1.5 pr-7 lg:pr-8 text-xs lg:text-sm font-medium 
                focus:outline-none focus:ring-2 focus:ring-primary/50
                hover:border-current transition-colors duration-200"
        >
          {Object.entries(languageOptions).map(([code, language]) => (
            <option
              key={code}
              value={code}
              className="flex items-center gap-2 text-black bg-white"
            >
              {language.code}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-1.5 lg:right-2 top-1/2 -translate-y-1/2 h-3 w-3 lg:h-4 lg:w-4 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </nav>
  );
}