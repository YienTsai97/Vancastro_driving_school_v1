import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { LessonType } from "@/types/lesson.type";
import { LessonStatus } from '@/types/lesson.type';

import moment from "moment-timezone";

type Props = {
  lessons: LessonType[] | undefined;
};

export default function StudentLessonList({ lessons }: Props) {
  return (
    <div className="w-full">
      {!lessons ? (
        <></>
      ) : lessons.length === 0 ? (
        <div>No lessons scheduled for today</div>
      ) : (
        lessons.map((lesson) => (
          <Accordion
            key={lesson.id}
            type="single"
            collapsible
            className="pb-4 border-b border-gray-200"
          >
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="p-0 hover:no-underline">
                <div className="w-full text-left">
                  <div className="text-2xl font-bold">{`${moment(
                    lesson.startTime
                  ).format("MMM DD h:mm a")} ~ ${moment(lesson.endTime).format(
                    "h:mm a"
                  )}`}</div>
                  <div className="text-gray-600">{lesson.location}</div>
                  <strong className={`
                      ${lesson.status === LessonStatus.CANCELLED && "text-red-500"}
                      ${lesson.status === LessonStatus.APPROVED && "text-green-500"}
                      ${lesson.status === LessonStatus.PENDING && "text-black"}
                      `}>{lesson.status}</strong>
                </div>
              </AccordionTrigger>
              <AccordionContent className="border-solid border-t-[1px] border-gray-200 py-4 flex flex-col gap-2">
                <div className="flex justify-between">
                  <div className="w-fit flex flex-col justify-end gap-2">
                    <p>
                      Instructor:
                      <Button variant="secondary" className="ml-2">
                        {lesson.instructor?.firstName}{" "}
                        {lesson.instructor?.lastName}
                      </Button>
                    </p>
                    <p>Lesson: {lesson.lessonType?.lessonName}</p>
                    <p>
                      Time: {moment(lesson.startTime).format("h:mm a")} ~{" "}
                      {moment(lesson.endTime).format("h:mm a")}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p>
                    Status: <strong className="">{lesson.status}</strong>
                  </p>
                  <Button className="w-fit self-end">Cancel the Lesson</Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))
      )}
    </div>
  );
}
