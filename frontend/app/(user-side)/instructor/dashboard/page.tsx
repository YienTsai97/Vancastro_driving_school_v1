import Calendar from "@/components/calendar/calendar";
import { getLessonsByInstructorId } from "@/utils/lessonFetch";
import { getUserByClerkId } from "@/utils/userFetch";
import { currentUser } from "@clerk/nextjs/server";

export default async function InstructorDashboard() {
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
    <section className="w-screen md:w-full h-screen">
      <div className="w-full fixed top-0 bg-white z-10">
        <h2 className="font-medium text-[24px] h-[64px] flex items-center justify-center sm:justify-start sm:pl-6" >
          Calendar
        </h2>
      </div>
      <div className="pt-[64px] w-full h-full md:w-[calc(100vw-275px)] overflow-hidden">
        <Calendar lessons={lessons} />
      </div>
    </section >
  );
}
