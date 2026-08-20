import { CheckUserRole } from "@/components/features/check-user-role";
import { SidebarProvider } from "@/components/ui/sidebar";
import FixHamburgerBtn from "@/components/user-dashboard/dashboard-header/fix-hamburger-btn";
import StudentDashboardHeader from "@/components/user-dashboard/dashboard-header/student-dashboard-header";
import DashboardNavBar from "@/components/user-dashboard/navbar/dashboard-navbar";
import { getUserByClerkId } from "@/utils/userFetch";
import { currentUser } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import "../globals.css";

export const metadata: Metadata = {
  title: "Vancastro Driving School",
  description: "Vancastro Driving School Booking System",
};

export const dynamic = "force-dynamic";

export default async function UserDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  if (!user) {
    redirect("/");
  }

  const dashboardUser = await getUserByClerkId(user.id);
  if (!dashboardUser) {
    redirect("/new-user");
  }

  const userName = `${dashboardUser.firstName} ${dashboardUser.lastName}`;
  const userRole = dashboardUser.role;
  const userContractId = dashboardUser.contractId;

  // Check user Role and redirect if necessary
  const resolvedHeaders = await headers();
  const pathname = resolvedHeaders.get("x-pathname") || "";
  CheckUserRole(dashboardUser.role, pathname)

  return (
    <SidebarProvider>
      <section className="w-screen">
        {userRole === "INSTRUCTOR" ? (
          <FixHamburgerBtn />
        ) : (
          <StudentDashboardHeader />
        )}

        <div className="flex">
          <DashboardNavBar
            userName={userName}
            userRole={userRole}
            userContractId={userContractId}
          />
          <main className="w-full">
            {children}
          </main>
        </div>
      </section>
    </SidebarProvider>
  );
}
