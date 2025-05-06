import { Button } from "@/components/ui/button";
import PurchaseLessonForm from "@/components/user-dashboard/lesson/lesson-form/purchase-lesson-form/purchase-lesson-form";
import { LicenseClass } from "@/types/enums";
import { getContractById } from "@/utils/contractFetch";
import { getLessonTypes } from "@/utils/lessonTypeFech";
import { getUserByClerkId } from "@/utils/userFetch";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function PurchaseLessonPage() {
  const clerkUser = await currentUser();
  if (!clerkUser) return;
  // Fetch user data
  const userResponse = await getUserByClerkId(clerkUser.id);
  if (!userResponse) {
    return <p className='text-xl text-red-500'>Failed to load user data</p>;
  }

  const user = userResponse;

  // Fetch contract data if user has contract ID
  let licenseClass: LicenseClass | undefined;
  if (user.contractId) {
    const contractResponse = await getContractById(user.contractId);
    if (contractResponse && contractResponse.data) {
      licenseClass = contractResponse.data.licenseClass;
    } else {
      return (
        <section className='w-screen md:w-full h-screen flex flex-col justify-center items-center'>
          <p className='text-sm text-red-500'>Failed to load contract data</p>
        </section>
      );
    }
  } else {
    return (
      <section className='w-screen md:w-full h-screen flex flex-col justify-center items-center'>
        <p className='text-sm'>No contract found.</p>
        <p className='text-sm'>Please get a contract first.</p>
        <Link href={`/student/contract`} className='mt-3'>
          <Button variant={"outline"} className='bg-[#FECE46]  p-3'>
            Sign contract
          </Button>
        </Link>
      </section>
    );
  }

  // Fetch lesson types
  const lessonTypeRes = await getLessonTypes();
  if (!lessonTypeRes.data) {
    return <p className='text-xl text-red-500'>Failed to load lesson types</p>;
  }
  if (!Array.isArray(lessonTypeRes.data) || lessonTypeRes.data.length === 0) {
    return <p className='text-xl'>No lesson types available</p>;
  }

  // Filter lesson types by license class
  const lessonTypes = lessonTypeRes.data.filter(
    (lessonType) => lessonType.licenseClass === licenseClass
  );

  if (lessonTypes.length === 0) {
    return (
      <p className='text-xl'>No lesson types found for your license class</p>
    );
  }

  return (
    <div className='container mx-auto py-6 pb-10 px-5'>
      <div className='mb-6'>
        <h2 className='font-medium text-[24px] text-center md:text-left'>
          Purchase Lessons
        </h2>
      </div>
      <div>
        <PurchaseLessonForm
          userId={user.id}
          payers={user.payers}
          licenseClass={licenseClass}
          lessonTypes={lessonTypes}
        />
      </div>
    </div>
  );
}
