import StudentDetailCard from "@/components/user-dashboard/students/student-detail-card";
import { LicenseClass } from "@/types/enums";
import { InvoiceType } from "@/types/invoice.type";
import { LessonType } from "@/types/lesson.type";
import { UserType } from "@/types/user.type";
import { getContractById } from "@/utils/contractFetch";
import { getInvoicesByUserId } from "@/utils/invoiceFetch";
import { getLessonsByStudentId } from "@/utils/lessonFetch";
import { getUserById } from "@/utils/userFetch";

type Props = {
  params: {
    id: string;
  };
};

export type LessonStatusDataType = {
  60: {
    booking: number;
    finished: number;
  };
  90: {
    booking: number;
    finished: number;
  };
};

export default async function StudentDetail({ params }: Props) {
  // Fetch student data using the ID from params
  const studentId = Number(params.id as string);
  if (!studentId) {
    return <div>Student ID invalid</div>;
  }
  const student: UserType = await getUserById(studentId);
  if (!student) {
    return <div>Student not found</div>;
  }

  // Get contract data if the student has a contract
  let contractData: {
    class: LicenseClass | undefined;
    createdAt: string | Date | undefined;
  } | null = null;

  if (student.contractId) {
    const contractRes = await getContractById(student.contractId);
    if (contractRes.success) {
      contractData = {
        class: contractRes.data?.licenseClass,
        createdAt: contractRes.data?.createdAt,
      };
    }
  }

  // Get lessons data and calculate lesson status
  const lessonsRes = await getLessonsByStudentId(studentId);
  if (!lessonsRes.success) {
    return <div>Failed to fetch lessons</div>;
  }
  const lessons: LessonType[] = lessonsRes.data || [];

  let lessonStatusData: LessonStatusDataType = {
    60: {
      booking: 0,
      finished: 0,
    },
    90: {
      booking: 0,
      finished: 0,
    },
  };
  lessons.forEach((lesson) => {
    if (lesson.lessonType?.lessonLength === 60) {
      if (lesson.status === "PENDING") {
        lessonStatusData[60].booking += 1;
      } else if (lesson.status === "APPROVED") {
        lessonStatusData[60].finished += 1;
      }
    } else if (lesson.lessonType?.lessonLength === 90) {
      if (lesson.status === "PENDING") {
        lessonStatusData[90].booking += 1;
      } else if (lesson.status === "APPROVED") {
        lessonStatusData[90].finished += 1;
      }
    }
  });

  // Get invoices data
  const invoicesRes = await getInvoicesByUserId(studentId);
  if (!invoicesRes.success) {
    return <div>Failed to fetch invoices</div>;
  }
  const invoices: InvoiceType[] = invoicesRes.data || [];

  return (
    <div className='w-full p-4 md:p-6'>
      <StudentDetailCard
        student={student}
        contractData={contractData}
        lessonStatus={lessonStatusData}
        invoices={invoices}
      />
    </div>
  );
}
