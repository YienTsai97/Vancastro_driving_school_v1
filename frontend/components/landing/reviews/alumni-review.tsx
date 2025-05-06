import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { AlumniData, AlumniDataType } from "./alumni-data"
import { AlumniReviewCard } from "./alumni-review-card"



export const AlumniReview = () => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="pt-10 m-auto w-[80%]"
      plugins={[
        Autoplay({
          delay: 2500,
        })
      ]}>
      <CarouselContent>
        {AlumniData.map((alumni: AlumniDataType, index) => (
          <AlumniReviewCard key={index} data={alumni} index={index} />
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
