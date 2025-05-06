import { getAllAvailabilities, getInstructorsName } from "@/components/features/get-instructors-detail";
import { AvailabilityForm } from "@/components/user-dashboard/availability-form/availability-form";
import { getInstructorsAvailabilityiesType, getInstructorsNameType } from "@/types/time.type";
import { getInstructors } from "@/utils/userFetch";

// Define the correct type for InitialAvailabilityData
export default async function InstructorAvailability() {
  const instructorsFullData = await getInstructors()
  const instructorsAvData = getAllAvailabilities(instructorsFullData) as getInstructorsAvailabilityiesType[]
  const instructorNameData = getInstructorsName(instructorsFullData) as getInstructorsNameType[]

  return (
    <section className="w-full h-screen">
      <div className="w-full fixed top-0 bg-white z-10">
        <h2 className="font-medium text-[24px] h-[64px] flex items-center justify-center sm:justify-start sm:pl-6" >
          Lesson Availability
        </h2>
      </div>
      <div className="pt-[64px] w-full h-full">
        <AvailabilityForm
          instructors={instructorNameData}
          availabilities={instructorsAvData}
        />
      </div>
    </section >
  )
}


