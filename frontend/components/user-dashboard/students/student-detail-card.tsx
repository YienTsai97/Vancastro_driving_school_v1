import { LessonStatusDataType } from "@/app/(user-side)/instructor/students/[id]/page";
import { LicenseClass } from "@/types/enums";
import { InvoiceType } from "@/types/invoice.type";
import { UserType } from "@/types/user.type";
import { Car, DollarSign, Mail, Phone, ScrollText } from "lucide-react";

type Props = {
  student: UserType;
  contractData: {
    class: LicenseClass | undefined;
    createdAt: string | Date | undefined;
  } | null;
  lessonStatus: LessonStatusDataType;
  invoices: InvoiceType[];
};

export default function StudentDetailCard({
  student,
  contractData,
  lessonStatus,
  invoices,
}: Props) {
  const formatToDDMMYYYY = (isoString: string): string => {
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const formatPhoneNumber = (phone: string): string => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, "");
    // Format the phone number as (XXX) XXX-XXXX
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone; // Return the original phone number if it doesn't match the format
  };

  return (
    <div className='w-full flex flex-col gap-4 text-sm text-zinc-700'>
      {/* Student name and edit button */}
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <p className='text-base text-zinc-800'>#{student.id}</p>
          <h3 className='text-xl text-zinc-800'>
            {student.firstName} {student.lastName}
          </h3>
          <p className='text-xs text-zinc-400'>
            {student.city} {formatToDDMMYYYY(student.dateOfBirth)}
          </p>
        </div>

        {/* TODO: Add edit student page if necessary */}
        {/* <div>
          <Button variant='outline'>Edit profile</Button>
        </div> */}
      </div>

      {/* Email and phone */}
      <div className='flex flex-col gap-2'>
        <p className='flex gap-2'>
          <Mail className='w-5 h-5' />
          {student.email}
        </p>
        <p className='flex gap-2'>
          <Phone className='w-5 h-5' />
          {formatPhoneNumber(student.phone)}
        </p>
      </div>

      {/* Driving license */}
      <div className='flex flex-col gap-1'>
        <p className='font-semibold'>Driving license</p>
        <p>No. {student.licenseNumber}</p>
        <p>License class: {student.licenseClass.replace("_", " ")}</p>
      </div>

      {/* Lesson */}
      <div className='flex flex-col gap-2'>
        <p className='font-semibold flex gap-2'>
          <Car className='w-5 h-5' />
          Lesson
        </p>
        <div className='w-full flex flex-col gap-1'>
          <div className='flex justify-between'>
            <p>60 min</p>

            <p className='text-xs text-zinc-400'>
              <span className='text-sm text-zinc-700 font-semibold'>
                {lessonStatus[60].booking}
              </span>{" "}
              Booking{" "}
              <span className='text-sm text-zinc-700 font-semibold'>
                {lessonStatus[60].finished}
              </span>{" "}
              Finished{" "}
            </p>
          </div>
          <div className='flex justify-between'>
            <p>90 min</p>

            <p className='text-xs text-zinc-400'>
              <span className='text-sm text-zinc-700 font-semibold'>
                {lessonStatus[90].booking}
              </span>{" "}
              Booking{" "}
              <span className='text-sm text-zinc-700 font-semibold'>
                {lessonStatus[90].finished}
              </span>{" "}
              Finished{" "}
            </p>
          </div>
        </div>
      </div>

      {/* Invoice */}
      <div className='flex flex-col gap-2'>
        <p className='font-semibold flex gap-2 border-b border-zinc-200 pb-2'>
          <DollarSign className='w-5 h-5' />
          Invoice
        </p>
        <div className='flex flex-col'>
          {invoices.length > 0 ? (
            invoices.map((invoice) => {
              const paidAmount = invoice.invoiceTransactions.reduce(
                (acc, transaction) => acc + transaction.amount,
                0
              );
              return (
                <div key={invoice.id} className='flex flex-col gap-1 p-1'>
                  <div className='flex justify-between text-sm'>
                    <p>{invoice.invoiceNumber}</p>
                    <p>
                      ${paidAmount} / ${invoice.totalAmount}
                    </p>
                  </div>
                  <div className=''>
                    {invoice.lessons.map((lesson) => (
                      <div
                        key={lesson.lessonTypeId}
                        className='flex justify-between text-xs ms-4'
                      >
                        <p>
                          {lesson.lessonType?.lessonName}{" "}
                          {lesson.lessonType?.lessonLength} min
                        </p>
                        <p>${lesson.lessonType?.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <p className='text-xs text-zinc-400'>No invoice</p>
          )}
        </div>
      </div>

      {/* Contract */}
      <div className='flex flex-col gap-2'>
        <p className='font-semibold flex gap-2 border-b border-zinc-200 pb-2'>
          <ScrollText className='w-5 h-5' />
          Contract
        </p>
        <div className='w-full flex justify-between'>
          {contractData ? (
            <>
              <p>
                {contractData.class && contractData.class.replace("_", " ")}
              </p>
              <p>
                {typeof contractData.createdAt === "string"
                  ? formatToDDMMYYYY(contractData.createdAt)
                  : contractData.createdAt instanceof Date
                  ? formatToDDMMYYYY(contractData.createdAt.toISOString())
                  : "No contract created date available"}
              </p>
            </>
          ) : (
            <p className='text-xs text-zinc-400'>No contract</p>
          )}
        </div>
      </div>
    </div>
  );
}
