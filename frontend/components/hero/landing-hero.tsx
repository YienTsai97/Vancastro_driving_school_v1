import Link from 'next/link'
import { Button } from "../ui/button"

export const LandingHero = () => {
  return (
    <div className="w-full h-[676px] relative overflow-hidden">

      <video autoPlay loop muted preload="none" className="absolute bottom-0 xl:bottom-[-65px] left-1/2 transform -translate-x-1/2 w-auto min-w-full h-auto min-h-[676px] object-cover">
        <source src="https://framerusercontent.com/assets/kzYOHEDdVO42MaFwzclp3L2vcUI.mp4" type="video/mp4" />
        <track
          src="/path/to/captions.vtt"
          kind="subtitles"
          srcLang="en"
          label="English"
        />
      </video>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <div className="h-[396px] flex flex-col justify-between">
          <div>
            <h1 className="align-middle leading-[70px] text-[64px] font-bold">Join Us</h1>
            <h1 className="align-middle leading-[70px] text-[64px] font-bold">On the Road.</h1>
            <p className="text-[18px] font-semibold">We're here to support you every step of the way.</p>
          </div>
          <Link href="/plans">
            <Button className="mx-auto p-0 w-[259px] h-[45px] bg-[#FFCE47] text-[#2F2F2F] text-[22.5px] font-bold hover:bg-[#FFDF94]"> View Plans</Button>
          </Link>
        </div>
      </div>

    </div >
  )
}
