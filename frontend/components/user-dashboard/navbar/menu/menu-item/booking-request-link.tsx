"use client"
import clickboard from "@/public/assets/dashboard/clickboard.svg";
import clickboardBlack from "@/public/assets/dashboard/clickboardBlack.svg";
import { LessonStatus } from "@/types/lesson.type";
import { getLessonsByStatus } from "@/utils/lessonFetch";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import useSWR from 'swr';

type Props = {
  handleClick: () => false | void
}

export default function BookingRequestLink({ handleClick }: Props) {
  const currentPath = usePathname();
  const [hoverBookingRequest, setHoverBookingRequest] = useState<boolean>(false);
  const pendingLessons = async () => await getLessonsByStatus(LessonStatus.PENDING);
  const { data } = useSWR(`${process.env.API_URL}/api/v1/lessons/status/pending`, pendingLessons);
  const pendingLessonsCount = (data?.data?.length ?? 0);

  return (
    <Link
      href="booking-request"
      onClick={handleClick}
      className={`flex gap-4 px-5 py-4 ${currentPath === "/instructor/booking-request" ? "font-bold text-black bg-[#EDEFEC] rounded-full" : "font-semibold"
        } hover:text-black`}
      onMouseEnter={() => setHoverBookingRequest(true)}
      onMouseLeave={() => setHoverBookingRequest(false)}
    >
      <Image
<<<<<<< HEAD
        src={currentPath === "/instructor/booking-request" || hoverBookingRequest ? clickboardBlack.src : clickboard.src}
        width={18}
        height={18}
        className="sideBar-Icon"
=======
        width={18}
        height={18}
        src={currentPath === "/instructor/booking-request" || hoverBookingRequest ? clickboardBlack.src : clickboard.src}
        style={{ width: "18px", height: "18px" }}
>>>>>>> 7c68c1b9aa034dfde0f13899edb79a213b69c3e2
        alt="clickboard"
      />
      {pendingLessonsCount > 0 ?
        <div className="flex  items-center gap-1">
          <p className="tracking-tight">Booking Requests</p>
          <p className="bg-[#E67C73] size-[18px] rounded-full text-[11px] text-white text-center">{pendingLessonsCount}</p>
        </div>
        :
        <p>Booking Requests</p>
      }
    </Link >
  )
}
