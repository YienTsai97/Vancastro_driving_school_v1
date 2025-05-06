"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import man2 from "../../../public/assets/man2.svg";
import woman2 from "../../../public/assets/woman2.svg";
import InstructorCard from "./instructor-card";
import InstructorCarousel from "./instructor-carousel/instructor-carousel";

export default function PlanInstructor() {
  const isMobile = useIsMobile()
  return (
    <div className="w-full flex  flex-col justify-center items-center">
      <h2 className="hidden md:block font-bold text-center text-4xl mt-[60px] mb-[36px]">
        Expert Tutors Ready to Guide You!
      </h2>
      <div className="w-[339px] md:w-full">
        <h2 className="text-2xl font-bold text-center mt-[40px] mb-[30px] md:hidden">
          Expert Tutors
          <div>Ready to Guide You!</div>
        </h2>

        {!isMobile ? (
          <div className="flex gap-[105px] justify-center mb-[98px]">
            <InstructorCard name="Anderson" src={man2} />
            <InstructorCard name="Andresa" src={woman2} />
          </div>
        ) : (
          <InstructorCarousel />
        )}
      </div>
    </div>
  );
}
