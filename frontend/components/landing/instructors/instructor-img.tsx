"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import man from "../../../public/assets/man.svg";
import woman from "../../../public/assets/woman.svg";

export default function InstructorImg() {
  gsap.registerPlugin(ScrollTrigger)
  const boxRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      boxRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "bounce.out",
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top 50%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);
  return (
    <div className="relative flex justify-center">
      <div className="relative w-[349px] rounded-t-full bg-white h-[217px] ">
        <div ref={boxRef} className="flex absolute bottom-[0px] items-end">
          <Image
            width={400}
            height={496}
            src={man}
            alt="man"
            className="h-[250px]"
          />
          <Image
            width={400}
            height={231}
            src={woman}
            alt="woman"
            className="h-[211px]"
          />
        </div>
      </div>
    </div>
  );
}
