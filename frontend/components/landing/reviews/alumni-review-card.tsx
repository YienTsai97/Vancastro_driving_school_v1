import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CarouselItem } from "@/components/ui/carousel"
import Image from "next/image"
import { AlumniDataType } from "./alumni-data"

type Props = {
  index: number
  data: AlumniDataType
}


export const AlumniReviewCard = ({ index, data }: Props) => {
  return (
    <CarouselItem className="md:basis-1/2 lg:basis-1/5 ">
      <div className="p-1 w-auto max-w-full min-w fit">
        <Card>
          <CardHeader className="flex flex-col gap-3">
            <CardTitle>
              <p>{index}: {data.name}</p>
              <p>Rating: {data.rating}</p>
            </CardTitle>
            <CardDescription className="flex flex-col gap-3">
              <p>{data.review.slice(0, 150)}</p>
              <Button variant="outline" className="w-full text-left">Read More...</Button>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Image fill src={data.imageUrl} alt={data.name} />
          </CardContent>
        </Card>
      </div>
    </CarouselItem >

  )
}
