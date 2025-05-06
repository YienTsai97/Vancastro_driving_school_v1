import { redirect } from "next/navigation";

export const CheckUserRole = (userRole: string, pathname: string) => {
  const isStudent = pathname.startsWith("/student")
  const isInstructor = pathname.startsWith("/instructor")

  // Check userRole
  if (userRole === "STUDENT" && isInstructor) {
    return redirect("/student/dashboard")
  } else if (userRole === "INSTRUCTOR" && isStudent) {
    return redirect("/instructor/dashboard")
  }
}
