import {
  authenticateWithGoogle,
  authenticateWithFacebook,
} from "@/lib/actions";
import Image from "next/image";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
export function AuthenticateWith({ message }) {
  return (
    <>
      <div className={"relative h-auto"}>
        {message && (
          <span
            className={
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 text-sm inline-block bg-white px-3 py-[2pxs]"
            }
          >
            {message}
          </span>
        )}
        <Separator className="my-[40px]" />
      </div>
      <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-3">
        <form className="w-full" action={authenticateWithFacebook}>
          <Button className="w-full" variant={"outline"}>
            <Image
              src={"/icons/facebook.svg"}
              alt="facebook_icon"
              height={24}
              width={24}
            />
          </Button>
        </form>

        <form className="w-full" action={authenticateWithGoogle}>
          <Button className="w-full" type={"submit"} variant={"outline"}>
            <Image
              src={"/icons/google.svg"}
              alt={"google_icon"}
              height={24}
              width={24}
            />
          </Button>
        </form>

        <Button variant={"outline"}>
          <Image
            src={"/icons/apple.svg"}
            alt="apple_icon"
            height={24}
            width={24}
          />
        </Button>
      </div>
    </>
  );
}
