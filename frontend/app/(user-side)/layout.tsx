import { CheckUserRole } from "@/components/features/check-user-role";
import { SidebarProvider } from "@/components/ui/sidebar";
import FixHamburgerBtn from "@/components/user-dashboard/dashboard-header/fix-hamburger-btn";
import StudentDashboardHeader from "@/components/user-dashboard/dashboard-header/student-dashboard-header";
import DashboardNavBar from "@/components/user-dashboard/navbar/dashboard-navbar";
import { InvoiceStatus } from "@/types/invoice.type";
import { LessonStatus } from "@/types/lesson.type";
import { TransactionType } from '@/types/transaction.type';
import { getInvoicesByUserId } from "@/utils/invoiceFetch";
import { getLessonsByStudentId } from "@/utils/lessonFetch";
import { getTransactionById } from "@/utils/transactionFetch";
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

async function calculateAvailableLessons(userId: number) {
  const invoices = await getInvoicesByUserId(userId);

  const paidInvoices = invoices.data?.filter(
    (invoice) =>
      invoice.status === InvoiceStatus.PAID ||
      invoice.status === InvoiceStatus.PARTIALLY_PAID
  );

  let totalPaid = 0;
  if (paidInvoices && paidInvoices.length > 0) {
    for (const invoice of paidInvoices) {
      const transaction = await getTransactionById(invoice.id);
      if (transaction.data && typeof transaction.data === 'object' && 'amount' in transaction.data) {
        const transactionData = transaction.data as TransactionType;
        totalPaid += transactionData.amount || 0;
      }
    }
  }

  const lessons = await getLessonsByStudentId(userId);
  const completedLessons =
    lessons.data?.filter(
      (lesson) => lesson.status === LessonStatus.COMPLETED
    ) || [];
  const completedLessonsDuration = completedLessons.reduce((acc, lesson) => {
    return acc + (lesson.lessonType?.lessonLength || 0);
  }, 0);
  const lessonDuration = lessons.data?.[0]?.lessonType?.lessonLength ?? 0;
  const lessonPrice = lessons.data?.[0]?.lessonType?.price ?? 0;

  return totalPaid > (completedLessonsDuration / lessonDuration) * lessonPrice
    ? Math.floor(
      ((totalPaid - (completedLessonsDuration / lessonDuration) * lessonPrice) /
        lessonPrice) *
      lessonDuration
    )
    : 0;
}

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

  const availableLessons =
    userRole === "STUDENT"
      ? await calculateAvailableLessons(dashboardUser.id)
      : 0;

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
