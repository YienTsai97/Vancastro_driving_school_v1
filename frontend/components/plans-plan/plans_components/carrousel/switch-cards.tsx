"use client";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import star from "../../../../public/assets/star.svg";
import PlanCard from "../plan-card";
import "./carrousel.css";
import { DotButton, useDotButton } from "./dot-button";

type PropType = {
  options?: EmblaOptionsType;
};

export default function SwitchCardsCarousel({ options }: PropType) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  return (
    <div className="embla">
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container">
          {/* card1 */}
          <div className="embla__slide mt-[30px]">
            <PlanCard
              desc="90 mins class"
              title="3 Lessons"
              price="$250"
              time="90 mins/lesson"
            />
            <div className="bg-[#2F2F2F] top-[-16px] absolute flex p-2 rounded-full text-[#FFCE47] font-bold right-[70px] items-center">
              <Image
                src={star}
                alt="star logo"
                width={20}
                height={20}
                className="mr-1"
              />
              Most Popular
              <Image
                src={star}
                alt="star logo"
                width={20}
                height={20}
                className="ml-1"
              />
            </div>
          </div>
          {/* card 2 */}
          <div className="embla__slide  mt-[30px]">
            <PlanCard
              desc="Hourly Lesson"
              title="1 Hour"
              price="$75"
              time="60 mins/lesson"
            />
          </div>
          {/* card 3 */}
          <div className="embla__slide  mt-[30px]">
            <PlanCard
              desc="Road Test"
              title="Rental Car"
              price="$150"
              time="60 mins/lesson"
            />
          </div>
        </div>
      </div>
      <div className="embla__dots mb-[100px]">
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
