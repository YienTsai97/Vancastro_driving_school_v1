import InstructorLessonTab from "@/components/user-dashboard/lesson/lesson-list/lesson-tab/instructor-lesson-tab";
import { LessonStatus } from "@/types/lesson.type";
import { getRecentApprovedLessonsByInstructorId } from "@/utils/lessonFetch";
import { getUserByClerkId } from "@/utils/userFetch";
import { currentUser } from "@clerk/nextjs/server";

export default async function InstructorLessons() {
  const user = await currentUser();

  if (!user) {
    return <p>Loading...</p>;
  }

  const instructor = await getUserByClerkId(user.id);

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  const res = await getRecentApprovedLessonsByInstructorId(instructor.id, {
    status: "APPROVED" as LessonStatus.APPROVED,
    from: today,
    page: 1,
    pageSize: 20,
  });

  let lessons;
  if (res.success) {
    lessons = await res.data;
  } else {
    console.error(res.message);
  }

  return (
    <div className="w-full">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-8">Lessons</h1>
        {/* Tabs */}

        <InstructorLessonTab lessons={lessons} />
      </div>
    </div>
  );
}
