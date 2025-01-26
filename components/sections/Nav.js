'use client';

import { useState, useEffect } from 'react';
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";
import Image from 'next/image';

const languageOptions = {
  en: {
    code: 'EN',
    label: 'English',
    flag: '/flags/ro.svg'
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

export function Nav({ className, type = "default", ...props }) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);
  }, []);

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
    localStorage.setItem('language', newLang);
  };

  return (
    <nav
      className={cn(
        "flex h-[70px] w-full items-center justify-between px-[5%] shadow-lg lg:h-[90px]",
        types[type].nav,
        className
      )}
      {...props}
    >
<<<<<<< HEAD
      {/* Phone Number */}
      <div className="flex items-center gap-1.5 lg:gap-2">
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
        <a
          href="tel:+37369123456"
          className="text-xs lg:text-sm font-medium hover:text-primary transition-colors duration-200"
        >
          +373 69 123 456
        </a>
      </div>

      {/* Logo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Logo className="h-[36px] w-fit" otherFill={types[type].logoFill} />
      </div>

      {/* Language Selector */}
      <div className="relative">
        <select
          value={language}
          onChange={handleLanguageChange}
          className="appearance-none bg-transparent border border-current/20 rounded-md 
                     px-2 lg:px-3 py-1.5 pr-7 lg:pr-8 text-xs lg:text-sm font-medium 
                     focus:outline-none focus:ring-2 focus:ring-primary/50
                     hover:border-current transition-colors duration-200"
        >
          {Object.entries(languageOptions).map(([code, lang]) => (
            <option
              key={code}
              value={code}
              className="flex items-center gap-2 text-black bg-white"
            >
              <Image
                src={lang.flag}
                alt={lang.label}
                width={16}
                height={16}
                className="inline-block mr-1"
              />
              {lang.code}
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
=======
      {/* menu */}
      <div className="lg:hidden">
        <SideBar isLoggedIn={isLoggedIn} />
        {/*small screen end*/}
      </div>
      {/* menu end*/}

      {/* big screen start */}
      <ActiveNavLink
        className={"hidden h-full lg:flex lg:items-center lg:gap-8"}
      />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Logo className={"h-[36px] w-fit"} otherFill={types[type].logoFill} />
      </div>

      {isLoggedIn === true ? (
        <div className="hidden lg:flex lg:items-center lg:gap-5">
          <Button
            className={cn("text-inherit p-2", types[type].btnFavorite)}
            variant={"link"}
          >
            <Link href={routes.favourites.path} className="gap-2 inline-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 max-h-6 w-6 max-w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{routes.favourites.title}</span>
            </Link>
          </Button>

          <div className="flex gap-2">
            <Button asChild variant="link" className={"gap-2 text-inherit"}>
              <AvatarWithName profileName={nameOfUser} profilePic={avatar} />
            </Button>
          </div>
        </div>
      ) : (
        <div className="hidden lg:flex lg:items-center lg:gap-[32px]">
          <Button asChild variant="link" className={"text-inherit"}>
            <Link href={routes.login.path}>{routes.login.title}</Link>
          </Button>
          <Button
            className={cn(
              "bg-black text-white hover:bg-gray-900",
              types[type].btnSignup
            )}
            asChild
          >
            <Link href={routes.signup.path}>{routes.signup.title}</Link>
          </Button>
        </div>
      )}

      {/* big screen end */}
>>>>>>> parent of d636e8b (minor changes)
    </nav>
  );
}