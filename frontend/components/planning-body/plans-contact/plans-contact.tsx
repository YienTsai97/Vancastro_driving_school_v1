"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import Link from "next/link";
import emailIcon from "../../../public/assets/emailIcon.svg";
import locationIcon from "../../../public/assets/locationIcon.svg";
import phoneIcon from "../../../public/assets/phoneIcon.svg";
import planContact from "../../../public/assets/planContact.svg";
import { Button } from "../../ui/button";
import { ContactForm } from "./contact-form";
import ContactSocialmedia from "./contact-socialmedia";

export const PlansContact = () => {
  const isMobile = useIsMobile()
  return (
    <>
      {/* We're here to Help */}
      <div className="flex flex-col md:flex-row justify-between px-[16px] md:px-[90px] py-[30px] gap-[60px] md:gap-[90px] bg-[#FFCE47] text-center md:text-left items-center md:items-start">
        {!isMobile && (
          <Image
            src={planContact}
            alt="planContact"
            className="w-[201px] h-[233px] md:w-[274px] md:h-[318px] lg:w-[348px] lg:h-[404px] self-center"
          />
        )}
        <div className="flex flex-col justify-center items-center md:items-start gap-[26px] lg:gap-[78px] w-auto max-w-[655px] h-auto md:h-[404px] ">
          <div className="flex flex-col gap-[26px] px-[74px] md:px-0">
            <div>
              <h3 className="text-[20px] font-medium  lg:text-[26px] xl:text-[36px] xl:font-bold">
                We're Here to Help
              </h3>
              <h3 className="text-[30px] lg:text-[36px] font-bold">
                Let's Customize Your Driving Plan!
              </h3>
            </div>
            <div>
              {!isMobile ? (
                ""
              ) : (
                <p
                  className="text-[64px] font-bold text-white leading-none pt-[32px] mb-[16px]"
                  style={{ lineHeight: 0 }}
                >
                  “
                </p>
              )}
              <h5 className="text-[16px] md:text-[20px] lg:text-[24px] font-medium">
                Our courses are designed to fit the experience and ability level
                of each individual learner.
              </h5>
              {!isMobile ? (
                ""
              ) : (
                <p
                  className="text-[64px] font-bold text-white leading-none pt-[28px] mt-[16px]"
                  style={{ lineHeight: 0 }}
                >
                  ”
                </p>
              )}
            </div>
          </div>
          <div className="w-full">
            {!isMobile ? (
              ""
            ) : (
              <Image
                src={planContact}
                alt="planContact"
                className="w-[201px] h-[233px] m-auto"
              />
            )}
            <div className=" px-0 sm:px-[56px] md:px-0">
              <Link href={"/contact"}>
                <Button className="w-full lg:w-[292px] h-[50px] md:h-[47px] bg-[#2F2F2F] text-[#FFF5D8] text-[15px] lg:text-[20px] font-bold hover:bg-[#4e4330]">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Us */}
      <div className="flex flex-col lg:flex-row justify-between gap-0 lg:gap-[43px] bg-[#FFF5D8] items-center md:items-start lg:p-[90px]">
        <div className="bg-[#FFF5D8] flex flex-col justify-between px-[16px] py-[30px] sm:px-[90px] md:py-[60px] lg:px-[0px] lg:py-[0px] gap-[45px] w-full">
          <div className="text-center md:text-left flex flex-col gap-[11px]">
            <h3 className="text-[32px] lg:text-[40px] font-bold">Contact Us</h3>
            <p className="text-[16px] md:text-[20px] lg:text-[24px]">
              Monday to Friday from 8a.m.-6p.m.
            </p>
          </div>
          <ul className="flex flex-col gap-[19px] text-[14px] font-medium md:text-[20px] xl:text-[24px]  md:font-normal w-full  m-auto md:m-0">
            {!isMobile ? (
              <>
                <li className="flex gap-[33px] items-center bg-white md:bg-[#FFF5D8] p-[10px] md:p-0 rounded-2xl">
                  <Image width={40} height={40} src={phoneIcon} alt="phone" />
                  <Link
                    href={"tel:+1604-600-9173"}
                    className="hover:text-[#FFCE47]"
                  >
                    +1 604-600-9173
                  </Link>
                </li>
                <li className="flex gap-[33px] items-center bg-white md:bg-[#FFF5D8] p-[10px] md:p-0 rounded-2xl">
                  <Image width={40} height={40} src={phoneIcon} alt="phone" />
                  <Link
                    href={"tel:+1778-680-5613"}
                    className="hover:text-[#FFCE47]"
                  >
                    +1 778-680-5613
                  </Link>
                </li>
              </>
            ) : (
              <li className="flex gap-[33px] items-center bg-white md:bg-[#FFF5D8] p-[10px] md:p-0 rounded-2xl">
                <Image width={40} height={40} src={phoneIcon} alt="phone" />
                <div className="flex flex-col gap-1">
                  <p>+1 604-600-9173</p>
                  <p>+1 778-680-5613</p>
                </div>
              </li>
            )}
            <li className="flex gap-[33px] items-center bg-white md:bg-[#FFF5D8] p-[10px] md:p-0 rounded-2xl">
              <Image width={40} height={40} src={emailIcon} alt="email" />
              <Link
                className="hover:text-[#FFCE47]"
                href="mailto:vancastrodrivingschool@gmail.com"
              >
                Vancastrodrivingschool@gmail.com
              </Link>
            </li>
            <li className="flex gap-[33px] items-center bg-white md:bg-[#FFF5D8] p-[10px] md:p-0 rounded-2xl">
              <Image width={40} height={40} src={locationIcon} alt="location" />
              Vancouver, North Vancouver, Surrey, Burnaby
            </li>
          </ul>
          <div className=" flex flex-col items-center md:items-start text-center md:text-left gap-[19px] ">
            <h6 className=" text-[16px] sm:text-[24px] font-bold">
              Visit Our Social media
            </h6>
            <ContactSocialmedia />
          </div>
        </div>
        <h6 className="bg-white text-[20px] font-bold text-center lg:invisible px-[16px] pt-[30px] pb-[22px] lg:pb-0 lg:pt-0 lg:px-0 w-screen lg:w-0">
          We're happy to hear from you !
        </h6>
        <div className="bg-[#ffffff] lg:bg-[#FFF5D8] px-[16px] sm:px-[90px] lg:px-0 pb-[30px] lg:pb-0 w-full self-center">
          <ContactForm />
        </div>
      </div>
    </>
  );
};
