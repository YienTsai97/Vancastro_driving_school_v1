import { Button } from "@/components/ui/button";
import StudentLessonTab from "@/components/user-dashboard/lesson/lesson-list/lesson-tab/student-lesson-tab";
import { getLessonsByStudentId } from "@/utils/lessonFetch";
import { getUserByClerkId } from "@/utils/userFetch";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function StudentLessons() {
  const user = await currentUser();

  if (!user) {
    return <p>Loading...</p>;
  }

  const student = await getUserByClerkId(user.id);

  const res = await getLessonsByStudentId(student.id);

  let lessons;
  if (res.success) {
    lessons = await res.data;
  } else {
    console.error(res.message);
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] md:min-h-screen">
      <div className="flex-1 bg-white h-fit">
        <div className="p-6">
          <h1 className='font-medium text-[24px] text-center md:text-left pb-6'>Lessons</h1>
          {/* Tabs */}
          <StudentLessonTab lessons={lessons} />
        </div>
      </div>

      {/* Footer Button */}
      <div className="p-6">
        <Button className="w-full py-6 bg-[#fcd34d] hover:bg-[#f7c948] text-black font-medium text-lg rounded-full">
          <Link href="lessons/book-my-lesson" className="w-full text-center">
            Book a new lesson
          </Link>
        </Button>
      </div>
    </div>
  );
}
