import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/Logo";
export function QuickLinks() {
  const links = {
    "Our Destination": [
      {
        name: "Canada",
        href: "/",
      },
      {
        name: "Alaska",
        href: "#",
      },
      {
        name: "France",
        href: "#",
      },
      {
        name: "Iceland",
        href: "#",
      },
    ],
    "Our Activity": [
      {
        name: "Northern Lights",
        href: "#",
      },
      {
        name: "Cruising & Sailing",
        href: "#",
      },
      {
        name: "Multi-activities",
        href: "#",
      },
      {
        name: "Kayaing",
        href: "#",
      },
    ],
    "Travel Blogs": [
      {
        name: "Bali Travel Guide",
        href: "#",
      },
      {
        name: "Srilanka Travel Guide",
        href: "#",
      },
      {
        name: "Peru Travel Guide",
        href: "#",
      },
    ],
    "About Us": [
      {
        name: "Our Story",
        href: "#",
      },
      {
        name: "Work with Us",
        href: "#",
      },
    ],
    Contact: [
      {
        name: "Contact Us",
        href: "#",
      },
    ],
  };

  return (
<<<<<<< HEAD
    <section className=" overflow-hidden relative z-10 mx-auto mb-10 w-[90%] md:w-[85%] lg:w-[75%] max-w-7xl px-4 md:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-[140px]">
        <div className="flex-shrink-0 w-full lg:w-auto">
          <Logo
            className="mb-6 h-8 md:h-10 w-fit"
            worldFill="white"
            otherFill="black"
          />

          <div className="space-y-4 md:space-y-6 text-secondary">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2 group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:text-primary transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+40691234567" className="text-sm md:text-base hover:text-primary transition-colors duration-200">
                  +40 69 123 456
                </a>
              </div>
              <div className="text-xs md:text-sm text-gray-600 pl-7 space-y-1">
                <p>Monday - Friday: 9:00 - 18:00</p>
                <p>Saturday: 9:00 - 14:00</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            <div className="flex items-center gap-2 group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:text-primary transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:contact@domain.com" className="text-sm md:text-base hover:text-primary transition-colors duration-200 break-all">
                contact@domain.com
              </a>
            </div>

            <div className="flex items-start gap-2 group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1 group-hover:text-primary transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <address className="not-italic text-xs md:text-sm leading-relaxed">
                147 Stefan Cel Mare<br />
                Chisinau, Moldova
              </address>
            </div>
          </div>

          <div className="mt-6 flex gap-4 text-secondary">
            <Link
              href="https://www.facebook.com/share/15pMHTjtRH/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200 p-2 -m-2"
            >
              <Image
                src={"/icons/facebook-black.svg"}
                height={24}
                width={24}
                alt="calender_icon"
              />
            </Link>
            <Link
              href="https://www.instagram.com/tandtravel.md?igsh=MXMwb3c5N2hmdTltMw=="
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200 p-2 -m-2"
            >
              <Image
                src={"/icons/instagram-black.svg"}
                height={24}
                width={24}
                alt="calender_icon"
              />
            </Link>
          </div>
        </div>

        <div className="flex-grow w-full h-[300px] md:h-[400px] lg:h-[500px]">
          <GoogleMapComponent />
=======
    <section className="relative z-10 mx-auto mb-[80px] flex w-[90%] gap-[40px] max-sm:flex-col sm:gap-[140px]">
      <div>
        <Logo
          className={"mb-[24px] block h-[40px] w-fit"}
          worldFill={"white"}
          otherFill={"black"}
        />
        <div className="flex gap-[12px] text-secondary">
          <Link
            aria-label={"Link to Facebook.com"}
            href={"https://www.facebook.com"}
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 10.0503C1 14.5248 4.24975 18.2455 8.5 19V12.4998H6.25V10H8.5V7.99975C8.5 5.74975 9.94975 4.50025 12.0002 4.50025C12.6497 4.50025 13.3503 4.6 13.9998 4.69975V7H12.85C11.7498 7 11.5 7.54975 11.5 8.25025V10H13.9L13.5002 12.4998H11.5V19C15.7502 18.2455 19 14.5255 19 10.0503C19 5.0725 14.95 1 10 1C5.05 1 1 5.0725 1 10.0503Z"
                fill="currentColor"
              />
            </svg>
          </Link>
          <Link
            aria-label={"Link to Twitter.com"}
            href={"https://www.twitter.com"}
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
            >
              <path
                d="M19.7029 4.26137C19.0071 4.5697 18.2596 4.77803 17.4737 4.8722C18.2846 4.38703 18.8912 3.62342 19.1804 2.72387C18.4186 3.17636 17.5849 3.49486 16.7154 3.66553C16.1307 3.04125 15.3563 2.62747 14.5124 2.48843C13.6684 2.34938 12.8022 2.49286 12.0481 2.89658C11.2941 3.30029 10.6944 3.94167 10.3422 4.72112C9.99003 5.50057 9.90503 6.37449 10.1004 7.2072C8.55682 7.1297 7.04677 6.72849 5.66827 6.02962C4.28977 5.33075 3.07362 4.34983 2.09875 3.15053C1.76542 3.72553 1.57375 4.3922 1.57375 5.1022C1.57338 5.74136 1.73078 6.37073 2.03198 6.93448C2.33319 7.49822 2.76888 7.9789 3.30042 8.33387C2.68398 8.31425 2.08114 8.14769 1.54208 7.84803V7.89803C1.54202 8.79448 1.85211 9.66335 2.41974 10.3572C2.98736 11.051 3.77756 11.5271 4.65625 11.7047C4.0844 11.8595 3.48486 11.8823 2.90292 11.7714C3.15083 12.5427 3.63375 13.2172 4.28406 13.7005C4.93437 14.1837 5.71951 14.4515 6.52958 14.4664C5.15444 15.5459 3.45616 16.1314 1.70792 16.1289C1.39823 16.129 1.08881 16.1109 0.78125 16.0747C2.55581 17.2157 4.62153 17.8212 6.73125 17.8189C13.8729 17.8189 17.7771 11.9039 17.7771 6.77387C17.7771 6.6072 17.7729 6.43887 17.7654 6.2722C18.5248 5.72301 19.1803 5.04295 19.7013 4.26387L19.7029 4.26137Z"
                fill="currentColor"
              />
            </svg>
          </Link>
          <Link
            aria-label={"Link to Youtube.com"}
            href={"https://www.youtube.com"}
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
            >
              <g clipPath="url(#clip0_400_3200)">
                <path
                  d="M19.5829 5.56962C19.4696 5.16564 19.249 4.79991 18.9445 4.51128C18.6314 4.21379 18.2477 4.00098 17.8295 3.89295C16.2645 3.48045 9.99454 3.48045 9.99454 3.48045C7.38065 3.45071 4.7674 3.58151 2.16954 3.87212C1.75136 3.98813 1.36834 4.20569 1.05454 4.50545C0.746204 4.80212 0.522871 5.16795 0.406204 5.56878C0.125949 7.07857 -0.0102189 8.61157 -0.000462243 10.1471C-0.0104622 11.6813 0.125371 13.2138 0.406204 14.7255C0.520371 15.1246 0.742871 15.4888 1.05204 15.783C1.3612 16.0771 1.7462 16.2896 2.16954 16.4021C3.75537 16.8138 9.99454 16.8138 9.99454 16.8138C12.6118 16.8436 15.2283 16.7128 17.8295 16.4221C18.2477 16.3141 18.6314 16.1013 18.9445 15.8038C19.2489 15.5152 19.4693 15.1494 19.582 14.7455C19.8696 13.2362 20.0094 11.7026 19.9995 10.1663C20.0212 8.62345 19.8815 7.08259 19.5829 5.56878V5.56962ZM8.0012 13.0005V7.29462L13.2179 10.148L8.0012 13.0005Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_400_3200">
                  <rect
                    width="20"
                    height="20"
                    fill="white"
                    transform="translate(0 0.147217)"
                  />
                </clipPath>
              </defs>
            </svg>
          </Link>
          <Link
            aria-label={"Link to Instagram.com"}
            href={"https://www.instagram.com"}
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
            >
              <path
                d="M9.49787 7.66546C7.93707 7.66546 6.66333 8.9392 6.66333 10.5C6.66333 12.0608 7.93707 13.3345 9.49787 13.3345C11.0587 13.3345 12.3324 12.0608 12.3324 10.5C12.3324 8.9392 11.0587 7.66546 9.49787 7.66546ZM17.9994 10.5C17.9994 9.32621 18.01 8.16305 17.9441 6.99138C17.8782 5.63046 17.5677 4.42264 16.5725 3.42747C15.5752 2.43017 14.3695 2.12184 13.0086 2.05592C11.8348 1.99 10.6717 2.00063 9.5 2.00063C8.32621 2.00063 7.16305 1.99 5.99138 2.05592C4.63046 2.12184 3.42264 2.4323 2.42747 3.42747C1.43017 4.42477 1.12184 5.63046 1.05592 6.99138C0.99 8.16517 1.00063 9.32833 1.00063 10.5C1.00063 11.6717 0.99 12.837 1.05592 14.0086C1.12184 15.3695 1.4323 16.5774 2.42747 17.5725C3.42477 18.5698 4.63046 18.8782 5.99138 18.9441C7.16517 19.01 8.32833 18.9994 9.5 18.9994C10.6738 18.9994 11.837 19.01 13.0086 18.9441C14.3695 18.8782 15.5774 18.5677 16.5725 17.5725C17.5698 16.5752 17.8782 15.3695 17.9441 14.0086C18.0121 12.837 17.9994 11.6738 17.9994 10.5ZM9.49787 14.8613C7.08437 14.8613 5.13655 12.9135 5.13655 10.5C5.13655 8.08649 7.08437 6.13868 9.49787 6.13868C11.9114 6.13868 13.8592 8.08649 13.8592 10.5C13.8592 12.9135 11.9114 14.8613 9.49787 14.8613ZM14.0378 6.97862C13.4743 6.97862 13.0193 6.52356 13.0193 5.96006C13.0193 5.39655 13.4743 4.94149 14.0378 4.94149C14.6013 4.94149 15.0564 5.39655 15.0564 5.96006C15.0565 6.09386 15.0303 6.22639 14.9792 6.35004C14.9281 6.4737 14.853 6.58605 14.7584 6.68067C14.6638 6.77528 14.5515 6.8503 14.4278 6.90143C14.3041 6.95256 14.1716 6.97879 14.0378 6.97862Z"
                fill="currentColor"
              />
            </svg>
          </Link>
>>>>>>> parent of d636e8b (minor changes)
        </div>
      </div>
      <div className="grid grow justify-start gap-[24px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {Object.entries(links).map((link, i) => {
          return (
            <div
              key={link[0]}
              className="text-[0.875rem] font-medium text-secondary/70"
            >
              <h3 className="mb-[16px] font-bold text-secondary">{link[0]}</h3>
              <div className="flex flex-col gap-3">
                {link[1].map((item) => {
                  return (
                    <div key={item.name}>
                      <Link
                        aria-label={"Link to " + item.name}
                        href={item.href}
                        className="text-[0.875rem] hover:underline inline font-medium text-secondary/70"
                      >
                        {item.name}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
