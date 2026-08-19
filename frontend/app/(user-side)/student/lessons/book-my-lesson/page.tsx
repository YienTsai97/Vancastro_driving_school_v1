import { getAllAvailabilities, getInstructorsName } from "@/components/features/get-instructors-detail";
import BookingLessonForm from "@/components/user-dashboard/lesson/lesson-form/booking-lesson-form/booking-lesson-form";
import { LessonBookingType, LessonRequestData, LessonStatus, LessonType } from "@/types/lesson.type";
import { LessonTypeInterface } from "@/types/lessonType.type";
import { getInstructorsAvailabilityiesType, getInstructorsNameType } from "@/types/time.type";
import { TravelTimeType } from "@/types/travelTime.type";
import { getLessonsByStatus } from "@/utils/lessonFetch";
import { getLessonTypes } from "@/utils/lessonTypeFech";
import { getTravelTimes } from "@/utils/travelTimeFetch";
import { getInstructors, getUserByClerkId } from "@/utils/userFetch";
import { currentUser } from "@clerk/nextjs/server";
import { getInvoicesByUserId } from "@/utils/invoiceFetch";
import { getContractById } from '@/utils/contractFetch';
import type { ReactNode } from "react";

enum userRole {
  STUDENT = "STUDENT",
  INSTRUCTOR = "INSTRUCTOR",
}

function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 lg:px-6">
      <div className="mb-6">
        <h2 className="font-bold text-[32px] lg:text-[36px] tracking-tight">
          Book My Lesson
        </h2>
        <p className="mt-1 font-semibold text-[#777777]">
          Pick your class, instructor and location, then choose an available time slot.
        </p>
      </div>
      {children}
    </div>
  );
}

function Notice({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-[#EDEFEC] px-6 py-10 text-center">
      <p className="font-bold tracking-tight text-black">{title}</p>
      <p className="mt-1 font-semibold text-[#777777]">{description}</p>
    </div>
  );
}
const shortenLessonData = (lessons: LessonType[] | null): LessonBookingType[] => {
  if (!lessons) return []
  return lessons.map(({ startTime, endTime, studentId, instructorId, location }) => ({
    startTime,
    endTime,
    studentId,
    instructorId,
    location,
  }));
};

export default async function BookLessonPage() {
  const user = await currentUser();
  if (!user) {
    return (
      <PageShell>
        <Notice title="Loading" description="Preparing your booking form." />
      </PageShell>
    );
  }
  const dashboardUser = await getUserByClerkId(user.id);
  if (!dashboardUser) {
    return (
      <PageShell>
        <Notice
          title="Profile not found"
          description="Complete your profile before booking a lesson."
        />
      </PageShell>
    );
  }
  if (dashboardUser.role !== userRole.STUDENT) {
    return (
      <PageShell>
        <Notice
          title="Students only"
          description="This page is available to student accounts."
        />
      </PageShell>
    );
  }

  const invoice = await getInvoicesByUserId(dashboardUser.id);
  if (!invoice || !invoice.data || invoice.data.length === 0) {
    return (
      <PageShell>
        <Notice
          title="No invoice yet"
          description="Purchase a lesson package first. Your instructor will issue an invoice."
        />
      </PageShell>
    );
  }

  const invoiceId = invoice.data[0]?.id ?? 0;

  const contract = await getContractById(dashboardUser.contractId)
  const lessonType = contract?.data?.licenseClass
  if (!contract || !lessonType) {
    return (
      <PageShell>
        <Notice
          title="Contract required"
          description="Sign your contract before booking a lesson."
        />
      </PageShell>
    );
  }

  const lessonTypeApiResponse = await getLessonTypes()
  const lessonTypeData = (lessonTypeApiResponse.data as LessonTypeInterface[]) ?? null

  const lessonTypeFiltered = lessonTypeData.filter((lesson) => lesson.licenseClass === lessonType)
  if (lessonTypeFiltered.length === 0) {
    return (
      <PageShell>
        <Notice
          title="No classes available"
          description="There are no lesson types matching your license class yet."
        />
      </PageShell>
    );
  }

  const instructorsFullData = await getInstructors()
  const instructorsAvData = getAllAvailabilities(instructorsFullData) as getInstructorsAvailabilityiesType[]
  const instructorNameData = getInstructorsName(instructorsFullData) as getInstructorsNameType[]
  const travelTimeApiResponse = await getTravelTimes()
  const travelTimeData = (travelTimeApiResponse.data as TravelTimeType[]) ?? null
  const lessonsApiResponse = await getLessonsByStatus(LessonStatus.PENDING)
  const lessonsFullData = (lessonsApiResponse.data as LessonType[]) ?? null
  const lessonsPartialData = shortenLessonData(lessonsFullData) as LessonBookingType[]

  const initialNewLessonState: LessonRequestData = {
    studentId: dashboardUser.id,
    instructorId: 0,
    lessonTypeId: lessonTypeFiltered[0].id, 
    startTime: "",
    endTime: "",
    location: "",
    invoiceId: invoiceId || 0, 
    status: LessonStatus.PENDING,
  }

  return (
    <PageShell>
      <BookingLessonForm
        instructors={instructorNameData}
        availabilities={instructorsAvData}
        lessons={lessonsPartialData}
        initialNewLessonState={initialNewLessonState}
        lessonTypes={lessonTypeFiltered}
        travelTimes={travelTimeData}
      />
    </PageShell>
  )
}