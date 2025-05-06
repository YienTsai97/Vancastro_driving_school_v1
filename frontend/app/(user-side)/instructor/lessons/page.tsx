import InstructorLessonTab from "@/components/user-dashboard/lesson/lesson-list/lesson-tab/instructor-lesson-tab";
import { getLessonsByInstructorId } from "@/utils/lessonFetch";
import { getUserByClerkId } from "@/utils/userFetch";
import { currentUser } from "@clerk/nextjs/server";

export default async function InstructorLessons() {
  const user = await currentUser();

  if (!user) {
    return <p>Loading...</p>;
  }

  const instructor = await getUserByClerkId(user.id);

  const res = await getLessonsByInstructorId(instructor.id);

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
