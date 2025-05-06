import planHero from "@/public/assets/planHero.webp"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"

export const PlanHero = () => {
  return (
    <div className="w-full h-[676px] relative overflow-hidden bg-black">

      <Image
        fill
        className="w-full h-auto min-h-[676px] object-cover opacity-100"
        src={planHero}
        alt="Background image of a driving course"
      />

      <div className="absolute top-1/2 left-1/2 sm:left-[90px] transform -translate-x-1/2 sm:-translate-x-0 -translate-y-1/2  text-white">
        <div className="w-[310px] sm:w-[500px] md:w-[80%] lg:w-[765px] h-[270px] md:h-[340px] flex flex-col justify-between items-center sm:items-start text-center sm:text-left">
          <h1
            className="align-middle leading-0 text-[28px] font-bold sm:text-[42px] md:text-[64px]  md:leading-[70px]" >
            Find the right course for your journey !
          </h1>
          <p
            className="text-[15px] md:text-[18px] font-normal w-full sm:w-[460px]">
            From beginner to advanced, we're here to guide you to confident driving, every step of the way.
          </p>
          <Link href="student/purchase-lessons">
            <Button
              className="mx-auto p-0 w-[201px] md:w-[259px] h-[45px] bg-[#FFCE47] text-[#2F2F2F] text-[15px] md:text-[22.5px] font-semibold md:font-bold hover:bg-[#FFDF94]">
              Booking Now
            </Button>
          </Link>
        </div>
      </div>

    </div >
  )
}
