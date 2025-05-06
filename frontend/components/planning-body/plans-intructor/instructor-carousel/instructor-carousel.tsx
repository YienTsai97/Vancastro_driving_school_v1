"use client";
import {
  DotButton,
  useDotButton,
} from "@/components/plans-plan/plans_components/carrousel/dot-button";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import man2 from "../../../../public/assets/man2.svg";
import woman2 from "../../../../public/assets/woman2.svg";
import "../../../plans-plan/plans_components/carrousel/carrousel.css";
import InstructorCard from "../instructor-card";

type PropType = {
  options?: EmblaOptionsType;
};

export default function InstructorCarousel({ options }: PropType) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <div className="embla">
      <div
        className="embla__viewport relative overflow-x-hidden overflow-y-visible"
        ref={emblaRef}
      >
        <div className="embla__container">
          {/* card1 */}
          <div className="embla__slide">
            <InstructorCard name="Anderson" src={man2} />
          </div>
          {/* card 2 */}
          <div className="embla__slide">
            <InstructorCard name="Andresa" src={woman2} />
          </div>
        </div>
      </div>
      <div className="embla__dots mb-[40px]">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={"embla__dot".concat(
              index === selectedIndex ? " embla__dot--selected" : ""
            )}
          />
        ))}
      </div>
    </div>
  );
}
