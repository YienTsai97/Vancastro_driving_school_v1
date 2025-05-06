import UserDashboardProfile from "@/components/user-dashboard/profile/user-profile";
import { getUserByClerkId } from "@/utils/userFetch";
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function InstructorDashboard() {
  const user = await currentUser();
  if (!user) {
    return <p>Loading...</p>;
  }

  const dashboardUser = await getUserByClerkId(user.id);
  if (!dashboardUser) {
    return redirect("/new-user");
  }
  if (dashboardUser.role === "STUDENT") {
    return redirect("/student/dashboard");
  }

  return (
    <section className="w-full h-screen">
      <div className=" w-full h-full">
        <UserDashboardProfile
          dashboardUser={dashboardUser}
        />
      </div>
    </section >
  )
}
