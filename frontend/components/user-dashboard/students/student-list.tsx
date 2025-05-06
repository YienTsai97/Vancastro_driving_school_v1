"use client";

import { Input } from "@/components/ui/input";
import { LessonType } from "@/types/lesson.type";
import { UserType } from "@/types/user.type";
import { redirect } from "next/navigation";

type Props = {
  students: (UserType & { lessons: LessonType[] })[];
};

export default function StudentList({ students }: Props) {
  return (
    <div className='w-full flex flex-col gap-4'>
      {/* Title and search */}
      <div className='w-full flex flex-col md:flex-row md:justify-start gap-3 md:gap-5'>
        <h2 className='w-full md:w-auto text-xl font-semibold text-center'>
          Students
        </h2>
        <Input
          type='text'
          className='w-full max-w-lg'
          placeholder='Search by student name'
        />
      </div>

      {/* Student List */}
      {students.length === 0 ? (
        <p className='text-center text-zinc-500'>No students found.</p>
      ) : (
        <div className='flex flex-col gap-2'>
          {students.map((student) => {
            // Get last lesson date from the lessons array
            const lastLesson = [...student.lessons].sort(
              (a, b) =>
                new Date(b.startTime).getTime() -
                new Date(a.startTime).getTime()
            )[0];

            return (
              <div
                key={student.id}
                onClick={() => redirect(`/instructor/students/${student.id}`)}
                className='w-full flex flex-col gap-1 border-b border-zinc-200 px-3 py-1 cursor-pointer'
              >
                <div className='flex flex-col md:flex-row md:justify-between gap-1'>
                  <h3 className=''>
                    {student.firstName} {student.lastName}
                  </h3>
                  <p className='text-xs md:text-sm text-zinc-400'>
                    <span className='md:hidden'>Last lesson: </span>
                    {lastLesson
                      ? new Date(lastLesson.startTime).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )
                      : "No lessons"}
                  </p>
                </div>
                <div className='hidden md:block'>
                  <p className='text-xs text-zinc-400'>
                    {lastLesson && lastLesson.lessonType?.lessonName}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
