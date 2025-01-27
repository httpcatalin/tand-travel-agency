import { Button } from "@/components/ui/button";
import Link from "next/link";
export function BookingCard({
  bgImg,
  placeName,
  person,
  cost,
  subTitle,
  btnTitle,
}) {
  return (
    <div
      style={{
        backgroundImage: `url("${bgImg}")`,
      }}
      className="flex h-[420px] bg-secondary min-w-[250px] items-end rounded-[12px] bg-cover p-[24px]"
    >
      <div className="w-full">
        <div className="mb-[16px] flex items-end justify-between text-white">
          <div>
            <h4 className="text-[1.5rem] font-semibold">{placeName}</h4>
            <p className="text-[0.875rem]">{subTitle}</p>
            <p className="text-[0.875rem]">{person}</p>
          </div>
          <p className="whitespace-nowrap text-[1.5rem] font-semibold">
            $ {cost}
          </p>
        </div>
        <Button type="submit" className={"mx-auto w-full"}>
          <p>{btnTitle}</p>
        </Button>
      </div>
    </div>
  );
}
