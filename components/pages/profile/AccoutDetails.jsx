import { Button } from "@/components/ui/button";
import { TabContentMockup } from "@/components/pages/profile/ui/TabContentMockup";
import { ChangeNamePopup } from "@/components/pages/profile/ui/changeNamePopup";
import { VerifyEmailBtn } from "./ui/VerifyEmailBtn";
import { cookies } from "next/headers";
import { ChangePasswordPopup } from "./ui/ChangePasswordPopup";
import { ChangePhonePopup } from "./ui/ChangePhonePopup";
import { ChangeAddressPopup } from "./ui/ChangeAddressPopup";
import { ChangeDateOfBirthPopup } from "./ui/ChangeDateOfBirthPopup";
export function AccoutDetails({ userDetails }) {
  const sendAgainAt = cookies().get("sai")?.expires?.toISOString();
  const accountDetails = {
    name: userDetails.firstname + " " + userDetails.lastname,
    emails: userDetails.emails,
    phone: userDetails?.phone,
    address: userDetails?.address,
    dateOfBirth: userDetails?.dateOfBirth,
  };
  return (
    <TabContentMockup title={ "Account" }>
      <div className={ "bg-white flex flex-col gap-3 p-5 shadow-md rounded-2" }>
        <div>
          <h4 className="opacity-75">Name</h4>
          <div className="flex items-center justify-between">
            <p className="text-[1.25rem] font-semibold">{ accountDetails.name }</p>
            <ChangeNamePopup firstname={ userDetails.firstname } lastname={ userDetails.lastname } />
          </div>
        </div>
        <div>
          <h4 className="opacity-75">Email</h4>
          <div className={ "flex flex-col gap-3 items-start md:flex-row md:justify-between md:items-center" }>
            { accountDetails?.emails.map((item) => {
              return (
                <div key={ item.email } className="text-[1.25rem] font-semibold">
                  { item.email }{ " " }
                  { item.primary === true && (
                    <span className={ "text-sm" }>(primary)</span>
                  ) }{ " " }
                  { item.emailVerifiedAt === null && (
                    <VerifyEmailBtn email={ item.email } sendAgainAt={ sendAgainAt } />
                  ) }
                </div>
              );
            }) }
            <div className="flex gap-2">
              <Button variant={ "outline" } className={ "gap-1 p-2 h-auto" }>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.523438 7C0.523438 3.42888 3.42888 0.523438 7 0.523438C10.5711 0.523438 13.4766 3.42888 13.4766 7C13.4766 10.5711 10.5711 13.4766 7 13.4766C3.42888 13.4766 0.523438 10.5711 0.523438 7ZM7.52344 9.5V7.52344H9.5C9.63882 7.52344 9.77196 7.46829 9.87013 7.37013C9.96829 7.27196 10.0234 7.13882 10.0234 7C10.0234 6.86118 9.96829 6.72804 9.87013 6.62987C9.77196 6.53171 9.63882 6.47656 9.5 6.47656H7.52344V4.5C7.52344 4.36118 7.46829 4.22804 7.37013 4.12987C7.27196 4.03171 7.13882 3.97656 7 3.97656C6.86118 3.97656 6.72804 4.03171 6.62987 4.12987C6.53171 4.22804 6.47656 4.36118 6.47656 4.5V6.47656H4.5C4.36118 6.47656 4.22804 6.53171 4.12987 6.62987C4.03171 6.72804 3.97656 6.86118 3.97656 7C3.97656 7.13882 4.03171 7.27196 4.12987 7.37013C4.22804 7.46829 4.36118 7.52344 4.5 7.52344H6.47656V9.5C6.47656 9.63882 6.53171 9.77196 6.62987 9.87013C6.72804 9.96829 6.86118 10.0234 7 10.0234C7.13882 10.0234 7.27196 9.96829 7.37013 9.87013C7.46829 9.77196 7.52344 9.63882 7.52344 9.5Z"
                    fill="black"
                    stroke="#4C4850"
                    strokeWidth="0.046875"
                  />
                </svg>
                <span className="sm:inline hidden">Add another account</span>
              </Button>
              <Button variant={ "outline" } className={ "gap-1 p-2 h-auto" }>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.3559 0.679881L13.3558 0.679847C13.3123 0.632016 13.2595 0.593507 13.2007 0.566647C13.1419 0.539788 13.0782 0.525136 13.0135 0.523577C12.9489 0.522017 12.8846 0.533583 12.8245 0.557575C12.7645 0.581567 12.7099 0.617487 12.6641 0.663164L12.6641 0.663185L12.2776 1.04783C12.2351 1.09031 12.2112 1.14792 12.2112 1.20798C12.2112 1.26803 12.2351 1.32563 12.2775 1.36812C12.2775 1.36812 12.2775 1.36812 12.2776 1.36813L12.6319 1.72186L12.632 1.72191C12.653 1.74306 12.678 1.75985 12.7056 1.7713C12.7332 1.78275 12.7627 1.78864 12.7925 1.78864C12.8224 1.78864 12.8519 1.78275 12.8795 1.7713C12.907 1.75985 12.9321 1.74306 12.9531 1.72191L12.9532 1.72183L13.33 1.34686M13.3559 0.679881L13.33 1.34686M13.3559 0.679881C13.5287 0.869013 13.5124 1.16473 13.3301 1.34683M13.3559 0.679881L13.3301 1.34683M13.33 1.34686L13.3301 1.34683M13.33 1.34686C13.3301 1.34685 13.3301 1.34684 13.3301 1.34683M5.85472 7.46035L5.8547 7.46037C5.82335 7.49159 5.80056 7.53036 5.78853 7.57294L5.78822 7.57404L5.78819 7.57403L5.5274 8.3508C5.52245 8.36773 5.52213 8.38568 5.52647 8.40278C5.53085 8.42001 5.53979 8.43574 5.55236 8.44831C5.56493 8.46088 5.58066 8.46983 5.59789 8.4742C5.61499 8.47854 5.63294 8.47822 5.64987 8.47328L6.42601 8.21248L6.4271 8.21212L6.4271 8.21214C6.46969 8.20011 6.50846 8.17732 6.53968 8.14597L6.5397 8.14595L12.1709 2.50415C12.1709 2.50414 12.1709 2.50412 12.1709 2.50411C12.2186 2.45585 12.2454 2.3907 12.2454 2.32282C12.2454 2.25494 12.2187 2.1898 12.1709 2.14154L5.85472 7.46035ZM5.85472 7.46035L11.496 1.82911C11.5443 1.78091 11.6098 1.75385 11.678 1.75385C11.7463 1.75385 11.8117 1.78091 11.8601 1.82911L12.1709 2.14149L5.85472 7.46035Z"
                    fill="black"
                    stroke="#4C4850"
                    strokeWidth="0.046875"
                  />
                  <path
                    d="M11.0731 5.05188L7.26406 8.86844C7.11684 9.01602 6.9359 9.12553 6.73688 9.1875L5.9275 9.45844C5.73542 9.51268 5.53234 9.51473 5.3392 9.46436C5.14606 9.414 4.96985 9.31305 4.82871 9.17191C4.68758 9.03078 4.58662 8.85456 4.53626 8.66142C4.4859 8.46828 4.48794 8.26521 4.54219 8.07312L4.81313 7.26375C4.87492 7.06478 4.98421 6.88385 5.13156 6.73656L8.94812 2.92688C8.98311 2.89193 9.00694 2.8474 9.01662 2.7989C9.02629 2.75041 9.02136 2.70014 9.00247 2.65445C8.98357 2.60875 8.95154 2.56969 8.91044 2.5422C8.86934 2.51471 8.82101 2.50002 8.77156 2.5H2.25C1.78587 2.5 1.34075 2.68437 1.01256 3.01256C0.684375 3.34075 0.5 3.78587 0.5 4.25V11.75C0.5 12.2141 0.684375 12.6592 1.01256 12.9874C1.34075 13.3156 1.78587 13.5 2.25 13.5H9.75C10.2141 13.5 10.6592 13.3156 10.9874 12.9874C11.3156 12.6592 11.5 12.2141 11.5 11.75V5.22844C11.5 5.17899 11.4853 5.13066 11.4578 5.08956C11.4303 5.04846 11.3912 5.01643 11.3456 4.99753C11.2999 4.97864 11.2496 4.97371 11.2011 4.98338C11.1526 4.99306 11.1081 5.01689 11.0731 5.05188Z"
                    fill="black"
                  />
                </svg>
                <span className="sm:inline hidden">Change</span>
              </Button>
            </div>
          </div>
        </div>
        <div>
          <h4 className="opacity-75">Password</h4>
          <div className="flex items-center justify-between">
            <p className="font-semibold">✦✦✦✦✦✦✦</p>
            <ChangePasswordPopup />
          </div>
        </div>
        <div>
          <h4 className="opacity-75">Phone</h4>
          <div className="flex items-center justify-between">
            <p className="text-[1.25rem] font-semibold">
              { accountDetails.phone ?? "N/A" }
            </p>
            <ChangePhonePopup />
          </div>
        </div>
        <div>
          <h4 className="opacity-75">Address</h4>
          <div className="flex items-center justify-between">
            <p className="text-[1.25rem] font-semibold">
              { accountDetails.address ?? "N/A" }
            </p>
            <ChangeAddressPopup />
          </div>
        </div>
        <div>
          <h4 className="opacity-75">Date of birth</h4>
          <div className="flex items-center justify-between">
            <p className="text-[1.25rem] font-semibold">
              { accountDetails.dateOfBirth ?? "N/A" }
            </p>
            <ChangeDateOfBirthPopup />
          </div>
        </div>
      </div>
    </TabContentMockup>
  );
}
