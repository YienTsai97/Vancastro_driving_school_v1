"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSidebar } from "@/components/ui/sidebar";
import car from "@assets/dashboard/car.svg";
import carBlack from "@assets/dashboard/carBlack.svg";
import invoice from "@assets/dashboard/invoice.svg";
import invoiceBlack from "@assets/dashboard/invoiceBlack.svg";
import profile from "@assets/dashboard/profile.svg";
import profileBlack from "@assets/dashboard/profileBlack.svg";
import { CalendarCog, LayoutDashboard, Settings, Timer, Users } from "lucide-react";
import Image from 'next/image';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import BookingRequestLink from "./menu-item/booking-request-link";

type Props = {
  isMobile: boolean
}

export const InstructorMenu = ({ isMobile }: Props) => {
  const currentPath = usePathname();
  const [hoverLessons, setHoverLessons] = useState<boolean>(false);
  const [hoverFinance, setHoverFinance] = useState<boolean>(false);
  const [hoverProfile, setHoverProfile] = useState<boolean>(false);
  const { toggleSidebar } = useSidebar()
  const handleClick = () => isMobile && toggleSidebar();

  return (
    <>
      <Link
        href="dashboard"
        onClick={handleClick}
        className={`flex gap-4 px-5 py-4 items-center ${currentPath === "/instructor/dashboard" ? "font-bold text-black bg-[#EDEFEC] rounded-full" : "font-semibold"
          } hover:text-black`}
      >
        <LayoutDashboard className="size-[20px]" /> Dashboard
      </Link>
      <BookingRequestLink handleClick={handleClick} />
      <Link
        href="students"
        onClick={handleClick}
        className={`flex gap-4 px-5 py-4 ${currentPath === "/instructor/students" ? "font-bold text-black bg-[#EDEFEC] rounded-full" : "font-semibold"
          } hover:text-black`}
      >
        <Users className="size-[20px]" />
        Students
      </Link>
      <Link
        href="lessons"
        onClick={handleClick}
        className={`flex gap-4 px-5 py-4 ${currentPath === "/instructor/lessons" ? "font-bold text-black bg-[#EDEFEC] rounded-full" : "font-semibold"
          } hover:text-black`}
        onMouseEnter={() => setHoverLessons(true)}
        onMouseLeave={() => setHoverLessons(false)}
      >
        <Image
          width={18}
          height={18}
          src={currentPath === "/instructor/lessons" || hoverLessons ? carBlack : car}
          style={{ width: "18px", height: "18px" }}
          alt="car"
        />
        Lessons
      </Link>
      <Link
        href="finance"
        onClick={handleClick}
        className={`flex gap-4 px-5 py-4 ${currentPath === "/instructor/finance" ? "font-bold text-black bg-[#EDEFEC] rounded-full" : "font-semibold"
          } hover:text-black`}
        onMouseEnter={() => setHoverFinance(true)}
        onMouseLeave={() => setHoverFinance(false)}
      >
        <Image
          width={18}
          height={18}
          src={currentPath === "/instructor/finance" || hoverFinance ? invoiceBlack : invoice}
          style={{ width: "18px", height: "18px" }}
          alt="finance"
        />
        Finance
      </Link>
      <Accordion type="multiple" className="w-full pl-5  pr-3  text-[#777777]">
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger
            className="flex items-center w-full gap-4 py-4 font-bold hover:text-black hover:no-underline"
          >
            <div className="flex gap-4 font-semibold items-center">
              <Settings className="size-[20px]" />Settings
            </div>
          </AccordionTrigger>
          <AccordionContent className={`flex flex-col pl-1 pr-5 text-[#777777] font-semibold `}>
            <Link
              href="profile"
              onClick={handleClick}
              className={`flex gap-4 pl-3 py-4 ${currentPath === "/instructor/profile" ? "font-bold text-black bg-[#EDEFEC] rounded-full" : "font-semibold"
                } hover:text-black`}
              onMouseEnter={() => setHoverProfile(true)}
              onMouseLeave={() => setHoverProfile(false)}
            >
              <Image
                width={18}
                height={18}
                src={currentPath === "/instructor/profile" || hoverProfile ? profileBlack : profile}
                style={{ width: "18px", height: "18px" }}
                alt="profile"
              />
              Profile
            </Link>
            <Link
              href="availability"
              onClick={handleClick}
              className={`flex gap-4 pl-3 py-4 ${currentPath === "/instructor/availability" ? "font-bold text-black bg-[#EDEFEC] rounded-full" : "font-semibold"
                } hover:text-black`}
            >
              <CalendarCog className="size-[20px]" />
              Availability
            </Link>
            <Link
              href="travel-time"
              onClick={handleClick}
              className={`flex gap-4 pl-3 py-4 ${currentPath === "/instructor/travel-time" ? "font-bold text-black bg-[#EDEFEC] rounded-full" : "font-semibold"
                } hover:text-black`}
            >
              <Timer className="size-[20px]" />
              Travel Time
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion >
    </>
  )
}
