import UserDashboardProfile from "@/components/user-dashboard/profile/user-profile";
import { getUserByClerkId } from "@/utils/userFetch";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function StudentDashboard() {
  const user = await currentUser();
  if (!user) {
    return <p>Loading...</p>;
  }

  const dashboardUser = await getUserByClerkId(user.id);

  if (!dashboardUser.id) {
    redirect("/new-user");
  }

  if (dashboardUser.role === "INSTRUCTOR") {
    return redirect("/instructor/dashboard");
  }

  return (
    <section className="w-full flex items-cente flex-col">
      <h1 className="font-bold text-[36px] p-6">Welcome back, {dashboardUser.firstName}!</h1>
      <UserDashboardProfile dashboardUser={dashboardUser} />
    </section>
  );
}
