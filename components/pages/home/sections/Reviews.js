import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReviewsCard } from "@/components/pages/home/ui/ReviewsCard";
import { reviews } from "@/data/reviews";
import { translations } from "@/lib/translations";

export function Reviews({ lang = 'en' }) {
  const t = translations[lang]?.reviews || translations.en.reviews;
  return (
    <section className="mx-auto mb-[80px]">
      <div className="mb-[20px] flex items-center justify-between max-md:flex-col max-md:gap-[16px] md:mb-[40px]">
        <SectionTitle
          title={t.title}
          subTitle={t.subtitle}
        />
        {/* <Button asChild variant={"outline"}>
          <Link scroll={false} href={"#"}>
            See All
          </Link>
        </Button> */}
      </div>
      <div className="flex flex-col h-[600px] gap-[16px] overflow-auto pb-5 md:flex-row md:h-auto md:gap-[30px] lg:gap-[40px] golobe-scrollbar">
        {reviews.map((review) => {
          const { id, link, describedComment, rate, reviewer, imgSrc } =
            review;

          return (
            <ReviewsCard
              key={id}
              link={link}
              describedComment={describedComment}
              rate={rate}
              reviewer={reviewer}
              imgSrc={imgSrc}
            />
          );
        })}
      </div>
    </section>
  );
}
