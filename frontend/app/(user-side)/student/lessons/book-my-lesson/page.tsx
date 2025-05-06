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

enum userRole {
  STUDENT = "STUDENT",
  INSTRUCTOR = "INSTRUCTOR",
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
    return <p>Loading...</p>;
  }
  const dashboardUser = await getUserByClerkId(user.id);
  if (!dashboardUser) return null
  if(dashboardUser.role !== userRole.STUDENT) return null


  const invoice = await getInvoicesByUserId(dashboardUser.id);
  if (!invoice || !invoice.data || invoice.data.length === 0) return null;
  
  const invoiceId = invoice.data[0]?.id ?? 0; 


  const contract = await getContractById(dashboardUser.contractId)
  if (!contract) return null

  const lessonType = contract.data?.licenseClass
  if (!lessonType) return null

  const lessonTypeApiResponse = await getLessonTypes()
  const lessonTypeData = (lessonTypeApiResponse.data as LessonTypeInterface[]) ?? null

  const lessonTypeFiltered = lessonTypeData.filter((lesson) => lesson.licenseClass === lessonType)

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
    <div>
      <h2 className="font-bold text-[36px]">Book My Lesson</h2>
      <div>
        <BookingLessonForm
          instructors={instructorNameData}
          availabilities={instructorsAvData}
          lessons={lessonsPartialData}
          initialNewLessonState={initialNewLessonState}
          lessonTypes={lessonTypeFiltered}
          travelTimes={travelTimeData}
        />
      </div>
    </div>
  )
}