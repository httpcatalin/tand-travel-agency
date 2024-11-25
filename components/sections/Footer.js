import "server-only";
import { SubscribeNewsletter } from "@/components/SubscribeNewsletter";
import { QuickLinks } from "@/components/QuickLinks";
import { Subscription } from "@/lib/db/models";
import { auth } from "@/lib/auth";
import Link from "next/link";
export async function Footer() {
  const user = (await auth())?.user;
  let isSubscribed;
  if (user) {
    isSubscribed = (await Subscription.exists({ userId: user.id }))?.subscribed;
  }
  return (
    <footer className="relative pb-5">
      <SubscribeNewsletter isSubscribed={isSubscribed} />
      <QuickLinks />
      <div className="relative z-10 text-center font-medium">
        The UI design was taken from &nbsp;
        <Link
          aria-label={"Link to Figma Community"}
          className="inline text-white"
          href="https://www.figma.com/community/file/1182308758714734501/golobe-travel-agency-website"
          target="_blank"
          rel="noopener noreferrer"
        >
          Figma Community
        </Link>
      </div>
    </footer>
  );
}
