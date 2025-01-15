import { ActiveNavLink } from "@/components/local-ui/nav/ActiveNavLink";
import { Logo } from "@/components/Logo";
import { AvatarWithName } from "@/components/local-ui/nav/AvatarWithName";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SideBar } from "@/components/local-ui/nav/SideBar";
import { cn, validateURL } from "@/lib/utils";

import { getOneDoc } from "@/lib/db/getOperationDB";
import routes from "@/data/routes.json";
export async function Nav({ className, type = "default", session, ...props }) {
  const isLoggedIn = !!session?.user;
  let nameOfUser, avatar;
  if (isLoggedIn) {
    const userData = await getOneDoc("User", { _id: session.user.id }, [
      "userDetails",
    ]);
    avatar = userData.profileImage;
    nameOfUser = userData.firstname + " " + userData.lastname;
  }
  const types = {
    home: {
      nav: "rounded-[24px] px-[32px] text-white backdrop-blur-[2px]",
      logoFill: "white", //valid color convention (hex, hsl, rgb, color name)
      btnFavorite: "text-inherit",
      btnSignup: "bg-white text-secondary hover:bg-white/90",
    },
    default: {
      nav: "relative bg-white text-secondary dark:bg-secondary",
      logoFill: "black", //valid color convention (hex, hsl, rgb, color name)
      btnFavorite: "text-inherit",
      btnSignup: "text-white bg-secondary hover:bg-secondary/90",
    },
  };

  return (
    <nav
      className={cn(
        "flex h-[70px] w-full items-center justify-end px-[5%] shadow-lg lg:h-[90px] lg:justify-between",
        types[type].nav,
        className
      )}
      {...props}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Logo className={"h-[36px] w-fit"} otherFill={types[type].logoFill} />
      </div>

    </nav>
  );
}
