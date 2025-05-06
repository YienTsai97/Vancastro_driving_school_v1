import ContactFooter from "./contact-footer";
import LocationFooter from "./location-footer";
import LogoFooter from "./logo-footer";
import VanCastroFooter from "./vancastro-footer";

export default function Footer() {
  return (
    <footer className="bg-[#2F2F2F]">
      {/* footer contents (contact/location/vancastro) */}
      <div className="sm:container p-[25px] flex-col mx-auto py-[21px] relative lg:flex lg:flex-row-reverse lg:justify-between gap-[78px]">
        <div className="mb-[36px] lg:mb-0 lg:items-center">
          <LogoFooter />
        </div>
        <div className="text-white space-y-[36px] lg:flex lg:gap-[78px] lg:items-baseline">
          <ContactFooter />
          <LocationFooter />
          <VanCastroFooter />
        </div>
      </div>
      {/* copyright */}
      <div className="pt-[16px] border-t-[1px] sm:container pb-[25px] px-[25px] mx-auto">
        <ul className="text-white text-[14px] space-y-[12px] lg:flex  lg:space-y-0 lg:justify-end">
          <li className="lg:border-r-[1px] px-0 lg:px-[30px]">
            Copyright Policy
          </li>
          <li className="lg:border-r-[1px] px-0 lg:px-[30px] ">
            Terms and Conditions
          </li>
          <li className=" pl-0 lg:pl-[30px] ">Site Map</li>
        </ul>
      </div>
    </footer>
  );
}
