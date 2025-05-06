"use client"
import { useSidebar } from '@/components/ui/sidebar';
import car from '@/public/assets/dashboard/car.svg';
import carBlack from '@/public/assets/dashboard/carBlack.svg';
import contract from '@/public/assets/dashboard/contract.svg';
import contractBlack from '@/public/assets/dashboard/contractBlack.svg';
import invoice from '@/public/assets/dashboard/invoice.svg';
import invoiceBlack from '@/public/assets/dashboard/invoiceBlack.svg';
import profile from '@/public/assets/dashboard/profile.svg';
import profileBlack from '@/public/assets/dashboard/profileBlack.svg';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from 'react';

type Props = {
  studentContractId?: number | null
  isMobile: boolean
}

export const StudentMenu = ({ studentContractId, isMobile }: Props) => {
  const currentPath = usePathname();
  const [hoverDashboard, setHoverDashboard] = useState<boolean>(false);
  const [hoverLessons, setHoverLessons] = useState<boolean>(false);
  const [hoverInvoices, setHoverInvoices] = useState<boolean>(false);
  const [hoverContract, setHoverContract] = useState<boolean>(false);
  const { toggleSidebar } = useSidebar()
  const handleClick = () => isMobile && toggleSidebar();
  return (
    <>
      <Link
        href="/student/dashboard"
        onClick={handleClick}
        className={`flex gap-4 px-5 py-4 hover:text-black
          ${currentPath === "/student/dashboard" ? "font-bold text-black bg-[#EDEFEC] rounded-full" : "font-semibold"}`
        }
        onMouseEnter={() => setHoverDashboard(true)}
        onMouseLeave={() => setHoverDashboard(false)}
      >
        <Image
          width={18}
          height={18}
          src={currentPath === "/student/dashboard" || hoverDashboard ? profileBlack.src : profile.src}
          className="pl-[2px]"
          alt="profile"
        />
        Profile
      </Link>
      <Link
        href="/student/purchase-lessons"
        onClick={handleClick}
        className={`flex gap-4 px-5 py-4 items-center  hover:text-black
          ${currentPath === "/student/purchase-lessons" ? "font-bold text-black bg-[#EDEFEC] rounded-full" : "font-semibold"}`
        }
      >
        <ShoppingCart className='size-[20px]' />
        Purchase
      </Link>
      <Link
        href="/student/lessons"
        onClick={handleClick}
        className={`flex gap-4 px-5 py-4  hover:text-black
          ${currentPath === "/student/lessons" || currentPath === "/student/lessons/book-my-lesson" ? "font-bold text-black bg-[#EDEFEC] rounded-full" : "font-semibold"}`
        }
        onMouseEnter={() => setHoverLessons(true)}
        onMouseLeave={() => setHoverLessons(false)}
      >
        <Image
          width={18}
          height={18}
          src={currentPath === "/student/lessons" || hoverLessons ? carBlack.src : car.src}
          className="pl-[2px]"
          alt="car"
        />
        Lessons
      </Link>
      <Link
        href="/student/invoices"
        onClick={handleClick}
        className={`flex gap-4 px-5 py-4  hover:text-black
          ${currentPath === "/student/invoices" ? "font-bold text-black bg-[#EDEFEC] rounded-full" : "font-semibold"}`
        }
        onMouseEnter={() => setHoverInvoices(true)}
        onMouseLeave={() => setHoverInvoices(false)}
      >
        <Image
          width={18}
          height={18}
          src={currentPath === "/student/invoices" || hoverInvoices ? invoiceBlack.src : invoice.src}
          className="pl-[2px]"
          alt="invoice"
        />
        Invoices
      </Link>
      {studentContractId &&
        <Link
          href={`/student/contract/${studentContractId}`}
          onClick={handleClick}
          target="_blank"
          className={`flex gap-4 px-5 py-4 hover:text-black
            ${currentPath === "/student/contract" ? "font-bold text-black bg-[#EDEFEC] rounded-full" : "font-semibold"}`
          }
          onMouseEnter={() => setHoverContract(true)}
          onMouseLeave={() => setHoverContract(false)}
        >
          <Image
            width={20}
            height={26}
            src={currentPath === "/student/contract" || hoverContract ? contractBlack.src : contract.src}
            style={{ width: '20px', height: '26px' }}
            alt="contract"
          />
          Show Contract
        </Link>
      }
    </>
  )
}
