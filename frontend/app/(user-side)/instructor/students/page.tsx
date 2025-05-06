import StudentList from "@/components/user-dashboard/students/student-list";
import { LessonType } from "@/types/lesson.type";
import { Role, UserType } from "@/types/user.type";
import { getLessonsByStudentId } from "@/utils/lessonFetch";
import { getUsers } from "@/utils/userFetch";

export default async function Students() {
  const users: UserType[] = await getUsers();
  console.log(users);

  if (!users) return <div>Loading...</div>;

  // TODO: Use this code after the enum is fixed
  // const students = users.filter((user) => user.role === Role.STUDENT);

  // TODO: Delete this code after the enum is fixed
  const students = users.filter((user) => user.role === "STUDENT");

  if (students.length === 0) {
    return <div className='text-center'>No students or instructors found.</div>;
  }

  // Get lessons of each student
  let studentsWithLessons: (UserType & { lessons: LessonType[] })[] = [];

  studentsWithLessons = await Promise.all(
    students.map(async (student) => {
      const lessons = await getLessonsByStudentId(student.id);
      return {
        ...student,
        lessons: lessons.success ? lessons.data || [] : [],
      };
    })
  );

  return (
    <div className='w-full p-4 md:p-6'>
      <StudentList students={studentsWithLessons} />
    </div>
  );
}
