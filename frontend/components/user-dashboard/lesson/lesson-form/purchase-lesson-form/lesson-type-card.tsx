'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Counter from '@/components/ui/counter';
import { cn } from '@/lib/utils';
import { LessonTypeInterface } from '@/types/lessonType.type';
import { Check, CircleCheckBig, Clock } from 'lucide-react';
import { useState } from 'react';

type Props = {
  lessonType: LessonTypeInterface;
  quantity: number;
  handleChange: (id: number, quantity: number) => void;
};

export default function LessonTypeCard({
  lessonType,
  quantity,
  handleChange,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  // Format duration if it exists
  const formattedDuration = lessonType.lessonLength
    ? `${lessonType.lessonLength} min`
    : null;

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 border-2 mb-5",
        quantity > 0 ? "border-primary shadow-md" : "border-transparent hover:border-gray-200",
        isHovered && "shadow-lg transform -translate-y-1"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <div className='flex gap-2'>
            {formattedDuration && (
              <div className="flex items-center text-[12px] px-3 py-1 gap-1 bg-[#FFCE47] rounded-full">
                {lessonType.lessonName !== "Road Test" ?
                  <>
                    <Clock size={16} />
                    {formattedDuration}
                  </>
                  :
                  <p>{lessonType.lessonName}</p>
                }

              </div>
            )}
            {lessonType.count > 1 && (
              <div className="flex items-center text-sm px-3 py-1 gap-1 bg-[#FFCE47] rounded-full">
                Package
              </div>
            )}
          </div>
          {quantity > 0 && (
            <span className="flex items-center text-sm gap-1 text-[#777777]">
              <Check size={16} /> Selected
            </span>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-4 space-y-4 text-primary">
        <div className="flex items-center justify-between text-[20px] md:text-[18px] font-medium ">
          <div className='flex gap-2'>
            {lessonType.count > 1 && (
              <h2>{lessonType.count}</h2>
            )}
            <h2>{lessonType.lessonName}</h2>
          </div>
          <h2 className="flex items-center">
            ${lessonType.price.toFixed(2)}
          </h2>
        </div>
        <div className='text-[14px] md:text-[16px]'>
          {lessonType.lessonName === "Road Test" &&
            <p className='flex gap-2 items-center' >
              <CircleCheckBig className='size-4' /> {lessonType.lessonLength} min warm up / refresher
              {/* of your previous lesson */}
            </p>
          }
          <p className='flex gap-2 items-center'>
            <CircleCheckBig className='size-4' />
            Include driving school car
          </p>
          <p className='flex gap-2 items-center'>
            <CircleCheckBig className='size-4' />
            Pick-up and Drop-off
          </p>
          {lessonType.lessonName === "Road Test" &&
            <p className='flex gap-2 items-center'>
              <CircleCheckBig className='size-4' />
              ICBC testing fee not included
            </p>
          }
        </div>
      </CardContent>

      <CardFooter className="pt-2 bg-muted/30">
        <div className="w-full flex items-center justify-between">
          <div className="text-sm font-medium">
            {quantity > 0 ? `${quantity} selected` : "Select quantity"}
          </div>
          <Counter
            amount={quantity}
            handleAmount={(amount) => handleChange(lessonType.id, amount)}
          />
        </div>
      </CardFooter>
    </Card >
  );
}