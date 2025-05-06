"use client";
import { LessonType } from "@/types/lesson.type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import moment from "moment";
import { useEffect, useState } from "react";
import StudentLessonList from "../student-lesson-list";

type Props = {
  lessons: LessonType[] | undefined;
};

export default function StudentLessonTab({ lessons }: Props) {
  const [filteredLessons, setFilteredLessons] = useState<LessonType[]>([]);

  useEffect(() => {
    const today = new Date();
    if (lessons) {
      const filteredLessons: LessonType[] = [];

      lessons.forEach((lesson) => {
        const momentToday = moment(today).format("ddd MMM DD YYYY");
        const stringDate = moment(lesson.startTime)
          .tz("America/Vancouver")
          .format("ddd MMM DD YYYY");

        if (stringDate === momentToday) {
          filteredLessons.push(lesson);
        }
      });
      setFilteredLessons(filteredLessons);
    }
  }, [lessons]);

  return (
    <>
      <Tabs defaultValue="today" className="w-full">
        <TabsList className="border-b border-gray-200 mb-6">
          <TabsTrigger
            value="today"
            className="pb-2 px-4 text-gray-500 
              data-[state=active]:border-b-2 data-[state=active]:border-black font-medium data-[state=active]:text-black transition-all ease-in-out duration-150"
          >
            Today
          </TabsTrigger>
          <TabsTrigger
            value="all"
            className="pb-2 px-4 text-gray-500 font-medium data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:text-black transition-all ease-in-out duration-150"
          >
            All
          </TabsTrigger>
        </TabsList>
        <TabsContent value="today">
          <StudentLessonList lessons={filteredLessons} />
        </TabsContent>
        <TabsContent value="all" className="w-full">
          <StudentLessonList lessons={lessons} />
        </TabsContent>
      </Tabs>
    </>
  );
}
