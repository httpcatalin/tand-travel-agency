import { SubscribeNewsletter } from "@/components/SubscribeNewsletter";
import { QuickLinks } from "@/components/QuickLinks";
import { Subscription } from "@/lib/db/models";
import { auth } from "@/lib/auth";
import Link from "next/link";

export async function Footer({ lang = 'en' }) {
  return (
    <footer className="relative pb-5">
      <SubscribeNewsletter lang={lang} />
      <QuickLinks lang={lang} />
    </footer>
  );
}