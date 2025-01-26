import Image from "next/image";
<<<<<<< HEAD
import { addDays } from "date-fns";
=======

>>>>>>> parent of d636e8b (minor changes)
import CVKHotel from "@/public/images/CVK-hotel.jpg";
import location from "@/public/icons/location.svg";
import building from "@/public/icons/building.svg";
import lineLeft from "@/public/icons/line-left.svg";
import lineRight from "@/public/icons/line-right.svg";

export function HotelDetailsCard() {
<<<<<<< HEAD
  const [stayData, setStayData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("stayFormData");
    if (data) {
      const parsedData = JSON.parse(data);
      const updatedCheckOut = addDays(new Date(parsedData.checkIn), parsedData.nights).toString();
      setStayData({
        ...parsedData,
        checkOut: updatedCheckOut,
      });
    }
  }, []);

  const currentLocation = "Chisinau";

  return (
    <div className="mb-[20px] shadow-lg rounded-[12px] bg-white px-[24px] py-[32px] shadow-small lg:mb-[30px] xl:mb-[40px]">
      <div className="mb-[24px] gap-6 flex items-baseline justify-between font-bold">
        <h3 className="font-tradeGothic text-base sm:text-lg md:text-xl lg:text-[1.5rem]">
          {currentLocation} - {stayData?.destination}
=======
  return (
    <div className="mb-[20px] shadow-lg rounded-[12px] bg-white px-[24px] py-[32px] shadow-small lg:mb-[30px] xl:mb-[40px]">
      <div className="mb-[24px] gap-6 flex items-baseline justify-between font-bold">
        <h3 className="font-tradeGothic text-[1.5rem]">
          Superior room - 1 double bed or 2 twin beds
>>>>>>> parent of d636e8b (minor changes)
        </h3>
        <p className="text-[2rem] leading-3 text-tertiary">
          $240
          <span className="text-[1rem]">/night</span>
        </p>
      </div>
      <div className="mb-[24px] flex justify-between font-bold">
        <h4 className="font-tradeGothic text-[1.25rem]">Return Wed, Dec 8</h4>
        <p className="font-medium opacity-75">2h 28m</p>
      </div>

      <div className="mb-[40px] grid justify-between gap-[20px] md:flex">
        <div className="flex w-full items-center gap-[24px] rounded-[8px] border border-primary px-4 sm:px-6 md:px-[32px] py-[16px]">
          <Image
            height={40}
            width={60}
            src={CVKHotel}
            alt="hotel_image"
            className="h-[32px] sm:h-[36px] md:h-[40px] w-auto object-contain"
          />
          <div>
<<<<<<< HEAD
            <h3 className="mb-[8px] text-base sm:text-lg md:text-xl lg:text-[1.5rem] font-semibold">
              {stayData?.adults} Adults
            </h3>
            <p className="flex items-center gap-3 text-xs sm:text-sm md:text-[0.875rem] font-medium">
              <Image src={user} height={16} width={16} alt="user_icon" className="h-4 w-4" />
              <span>{stayData?.children} Children</span>
=======
            <h3 className="mb-[8px] text-[1.5rem] font-semibold">
              CVK Park Bosphorus Hotel Istanbul
            </h3>
            <p className="flex gap-1 text-[0.875rem] font-medium">
              <Image
                src={location}
                height={16}
                width={16}
                alt="location_icon"
              />
              <span>Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437</span>
>>>>>>> parent of d636e8b (minor changes)
            </p>
          </div>
        </div>
      </div>
<<<<<<< HEAD

      <div className="grid grid-rows-5 items-center gap-[20px] sm:gap-[30px] md:flex md:justify-center lg:gap-[80px]">
        <div className="text-center md:text-left">
          <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] font-semibold">
            {moment(stayData?.checkIn).format("ddd, MMM DD YYYY")}
=======
      <div className="grid grid-rows-5 items-center gap-[40px] md:flex md:justify-center lg:gap-[80px]">
        <div>
          <p className="text-[1rem] font-semibold lg:text-[1.5rem]">
            Thursday, Dec 8
>>>>>>> parent of d636e8b (minor changes)
          </p>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600">Check-In</p>
        </div>

        <div className="row-span-3 flex h-max items-center justify-center gap-4 sm:gap-6 md:flex-col md:gap-8 lg:flex-row lg:gap-[32px] w-full max-w-[300px] mx-auto md:w-auto">
          <Image
            src={lineLeft}
            width={36}
            height={36}
            className="w-[24px] sm:w-[30px] md:w-[36px] md:h-[120px] lg:h-[36px] max-md:rotate-90 object-contain transition-all duration-300"
            alt="line_left"
          />
          <Image
            src={building}
            alt="building_icon"
            className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] md:w-[48px] md:h-[48px] object-contain transition-all duration-300"
            height={48}
            width={48}
          />
          <Image
            src={lineRight}
            className="w-[24px] sm:w-[30px] md:w-[36px] md:h-[120px] lg:h-[36px] max-md:rotate-90 object-contain transition-all duration-300"
            width={36}
            height={36}
            alt="line_right"
          />
        </div>
<<<<<<< HEAD

        <div className="text-center md:text-left">
          <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] font-semibold">
            {moment(stayData?.checkOut).format("ddd, MMM DD YYYY")}
          </p>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600">Check-Out</p>
=======
        <div>
          <p className="font-semibold lg:text-[1.5rem]">Friday, Dec 9</p>{" "}
          <p className="max-lg:text-[0.75rem]">Check-Out</p>
>>>>>>> parent of d636e8b (minor changes)
        </div>
      </div>
    </div>
  );
}