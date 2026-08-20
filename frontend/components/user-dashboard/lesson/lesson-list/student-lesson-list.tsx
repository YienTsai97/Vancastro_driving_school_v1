"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { LessonStatus, LessonType } from "@/types/lesson.type";
import { updateLesson } from "@/utils/lessonFetch";

import moment from "moment-timezone";

type Props = {
  lessons: LessonType[] | undefined;
};

export default function StudentLessonList({ lessons }: Props) {
  const handleCancelLesson = async (lessonId: number) => {
    const confirmed = confirm("Are you sure?")
    if (!confirmed) return;
    const res = await updateLesson(lessonId, { status: LessonStatus.CANCELLED });
    if (res.success) {
      toast({
        title: "Success",
        description: "Lesson cancelled successfully",
        variant: "success",
      });
      window.location.reload()
    } else {
      toast({
        title: "Error",
        description: res.message,
        variant: "destructive",
      });
    }
  }
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
            className={
              `pb-4 border-b border-gray-200 
              ${lesson.status === LessonStatus.CANCELLED && "opacity-50"}`
            }
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
                  <Button className="w-fit self-end" onClick={() => handleCancelLesson(lesson.id)} disabled={lesson.status !== LessonStatus.PENDING}>
                    {lesson.status === LessonStatus.PENDING ? "Cancel the Lesson" : "Lesson Cancelled"}
                  </Button>

                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))
      )}
    </div>
  );
}
