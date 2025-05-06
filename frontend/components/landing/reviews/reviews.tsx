"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { GoogleReview } from "./google-review"
import { VideoReview } from "./video-review"

export const Reviews = () => {
  const [alumniComp, setAlumniComp] = useState(false)
  const [googleComp, setGoogleComp] = useState(true)
  const [videoComp, setVideoComp] = useState(false)


  return (
    <div className="py-[120px]">
      <h2 className="text-center text-4xl md:text-[48px] font-bold pb-[70px]">Check Out Real Reviews</h2>
      <div className="m-auto h-fit ">
        <menu className=" flex m-auto text-[21.6px] text-[white] font-medium text-center px-[9px] py-[6px] bg-[#2f2f2f] rounded-full w-fit">
          {/* <Button
            className={`${alumniComp ? "bg-[#FECE46] text-[#2f2f2f]" : "bg-[#2f2f2f]"} px-[9px] py-[6px] rounded-full hover:bg-[#2f2f2f] hover:text-[#FECE46]`}
            onClick={() => { setAlumniComp(() => true); setGoogleComp(() => false); setVideoComp(() => false) }}
          >
            Alumni Review
          </Button> */}
          <Button
            className={`${googleComp ? "bg-[#FECE46] text-[#2f2f2f]" : "bg-[#2f2f2f]"} px-[9px] py-[6px] rounded-full hover:bg-[#2f2f2f] hover:text-[#FECE46]`}
            onClick={() => { setAlumniComp(() => false); setGoogleComp(() => true); setVideoComp(() => false) }}>
            Google Review
          </Button>
          <Button
            className={`${videoComp ? "bg-[#FECE46] text-[#2f2f2f]" : "bg-[#2f2f2f]"} px-[9px] py-[6px] rounded-full hover:bg-[#2f2f2f] hover:text-[#FECE46]`}
            onClick={() => { setAlumniComp(() => false); setGoogleComp(() => false); setVideoComp(() => true) }}>
            Video Review
          </Button>
        </menu>

        {/* {alumniComp && <AlumniReview />} */}
        {googleComp && <GoogleReview />}
        {videoComp && <VideoReview />}
      </div>
    </div >
  )
}
