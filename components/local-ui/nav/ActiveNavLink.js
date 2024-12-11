"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import routes from "@/data/routes.json";
export function ActiveNavLink({ className, ...props }) {
  const pathname = usePathname();

  const activeLink = (link) => {
    if (pathname.startsWith(link)) {
      return "border-b-4 border-primary";
    }
  };
  return (
    <div className={cn(className)} {...props}>
      <Button
        asChild
        variant={"link"}
        className={"text-inherit rounded-none h-[inherit]"}
      >
        <Link
          href={routes.flights.path}
          className={cn("inline-flex gap-2", activeLink(routes.flights.path))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 48 48"
            fill="none"
          >
            <path
              d="M17.4947 43.5H14.999C14.7483 43.4999 14.5015 43.437 14.2814 43.3169C14.0612 43.1969 13.8747 43.0235 13.7388 42.8128C13.6029 42.602 13.5221 42.3606 13.5036 42.1105C13.4851 41.8604 13.5297 41.6097 13.6331 41.3812L19.6762 28.0453L10.6022 27.8438L7.29279 31.8534C6.66185 32.6466 6.15841 33 4.87404 33H3.19404C2.92804 33.0086 2.6639 32.9529 2.424 32.8377C2.1841 32.7224 1.97551 32.5511 1.81591 32.3381C1.59279 32.0372 1.37341 31.5272 1.58716 30.7997L3.44529 24.1434C3.45935 24.0938 3.47622 24.0441 3.49497 23.9953C3.49591 23.9907 3.49591 23.9859 3.49497 23.9813C3.47561 23.9325 3.45902 23.8828 3.44529 23.8322L1.58529 17.1337C1.38372 16.4203 1.60404 15.9216 1.82529 15.6281C1.97386 15.431 2.16661 15.2715 2.38805 15.1624C2.60949 15.0533 2.85344 14.9977 3.10029 15L4.87404 15C5.8331 15 6.76404 15.4303 7.31154 16.125L10.5525 20.0672L19.6762 19.9322L13.635 6.61969C13.5314 6.39136 13.4867 6.14071 13.505 5.89065C13.5233 5.6406 13.6039 5.39911 13.7396 5.18827C13.8753 4.97743 14.0616 4.80396 14.2817 4.68373C14.5017 4.56349 14.7483 4.50033 14.999 4.5L17.5218 4.5C17.8738 4.50707 18.2197 4.59334 18.5337 4.75239C18.8478 4.91145 19.1219 5.1392 19.3359 5.41875L31.0593 19.6688L36.4753 19.5262C36.8718 19.5047 37.9706 19.4972 38.2247 19.4972C43.4053 19.5 46.499 21.1819 46.499 24C46.499 24.8869 46.1447 26.5313 43.7737 27.5775C42.374 28.1963 40.5065 28.5094 38.2228 28.5094C37.9715 28.5094 36.8756 28.5019 36.4734 28.4803L31.0584 28.3359L19.3059 42.5859C19.0918 42.8643 18.8178 43.0909 18.5043 43.2491C18.1908 43.4073 17.8458 43.4931 17.4947 43.5Z"
              fill="currentColor"
            />
          </svg>
          <span>{routes.flights.title}</span>
        </Link>
      </Button>
      <Button
        asChild
        variant="link"
        className={"text-inherit rounded-none h-[inherit]"}
      >
        <Link
          href={routes.hotels.path}
          className={cn("inline-flex gap-2", activeLink(routes.hotels.path))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M20.25 10.8141C19.7772 10.6065 19.2664 10.4996 18.75 10.5H5.25C4.73368 10.4995 4.22288 10.6063 3.75 10.8136C3.08166 11.1059 2.51294 11.5865 2.11336 12.1968C1.71377 12.8071 1.50064 13.5205 1.5 14.25V19.5C1.5 19.6989 1.57902 19.8897 1.71967 20.0303C1.86032 20.171 2.05109 20.25 2.25 20.25C2.44891 20.25 2.63968 20.171 2.78033 20.0303C2.92098 19.8897 3 19.6989 3 19.5V19.125C3.00122 19.0259 3.04112 18.9312 3.11118 18.8612C3.18124 18.7911 3.27592 18.7512 3.375 18.75H20.625C20.7241 18.7512 20.8188 18.7911 20.8888 18.8612C20.9589 18.9312 20.9988 19.0259 21 19.125V19.5C21 19.6989 21.079 19.8897 21.2197 20.0303C21.3603 20.171 21.5511 20.25 21.75 20.25C21.9489 20.25 22.1397 20.171 22.2803 20.0303C22.421 19.8897 22.5 19.6989 22.5 19.5V14.25C22.4993 13.5206 22.2861 12.8073 21.8865 12.1971C21.4869 11.5869 20.9183 11.1063 20.25 10.8141ZM17.625 3.75H6.375C5.67881 3.75 5.01113 4.02656 4.51884 4.51884C4.02656 5.01113 3.75 5.67881 3.75 6.375V9.75C3.75002 9.77906 3.75679 9.80771 3.76979 9.8337C3.78278 9.85969 3.80163 9.8823 3.82486 9.89976C3.84809 9.91721 3.87505 9.92903 3.90363 9.93428C3.93221 9.93953 3.96162 9.93806 3.98953 9.93C4.39896 9.81025 4.82341 9.74964 5.25 9.75H5.44828C5.49456 9.75029 5.53932 9.73346 5.57393 9.70274C5.60855 9.67202 5.63058 9.62958 5.63578 9.58359C5.67669 9.21712 5.85115 8.87856 6.12586 8.63256C6.40056 8.38656 6.75625 8.25037 7.125 8.25H9.75C10.119 8.25003 10.475 8.38606 10.75 8.63209C11.025 8.87812 11.1997 9.21688 11.2406 9.58359C11.2458 9.62958 11.2679 9.67202 11.3025 9.70274C11.3371 9.73346 11.3818 9.75029 11.4281 9.75H12.5747C12.621 9.75029 12.6657 9.73346 12.7003 9.70274C12.735 9.67202 12.757 9.62958 12.7622 9.58359C12.8031 9.21736 12.9773 8.87899 13.2517 8.63303C13.5261 8.38706 13.8815 8.25072 14.25 8.25H16.875C17.244 8.25003 17.6 8.38606 17.875 8.63209C18.15 8.87812 18.3247 9.21688 18.3656 9.58359C18.3708 9.62958 18.3929 9.67202 18.4275 9.70274C18.4621 9.73346 18.5068 9.75029 18.5531 9.75H18.75C19.1766 9.74979 19.6011 9.81057 20.0105 9.93047C20.0384 9.93854 20.0679 9.94 20.0965 9.93473C20.1251 9.92945 20.1521 9.91759 20.1753 9.90009C20.1986 9.88258 20.2174 9.8599 20.2304 9.83385C20.2433 9.8078 20.2501 9.7791 20.25 9.75V6.375C20.25 5.67881 19.9734 5.01113 19.4812 4.51884C18.9889 4.02656 18.3212 3.75 17.625 3.75Z"
              fill="currentColor"
            />
          </svg>
          <span>{routes.hotels.title}</span>
        </Link>
      </Button>
    </div>
  );
}
