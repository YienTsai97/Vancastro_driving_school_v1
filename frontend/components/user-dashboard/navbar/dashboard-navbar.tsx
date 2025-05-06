"use client"
import { HeaderUser } from "@/components/header/header-user";
import NavMenu from "@/components/header/menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import logo from "@/public/assets/logo.png";
import logoBlack from "@/public/assets/logoBlack.png";
import { SignOutButton } from "@clerk/nextjs";
import { House, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TriggerBubble } from "../dashboard-header/trigger-bubble";
import { InstructorMenu } from "./menu/instructor-menu";
import { StudentMenu } from "./menu/student-menu";

type Prop = {
  userName: string,
  userRole: string,
  userContractId?: number | null
}

export default function DashboardNavBar({ userName, userRole, userContractId }: Prop) {
  const pathname = usePathname();
  const isContractPage = pathname.startsWith("/student/contract")
  const isStudent = pathname.startsWith("/student")
  const isInstructor = pathname.startsWith("/instructor")
  const isMobile = useIsMobile()

  //contract page doesn't show the sidebar - just hide it
  if (isContractPage) return null;
  else return (
    <>
      <Sidebar>
        <SidebarGroup className={`bg-white h-[100vh] p-0  ${isMobile ? "w-screen" : "w-auto"} flex flex-col gap-1`}>
          <SidebarHeader className="flex flex-row justify-between px-6 h-[64px] items-center">
            <Link href="dashboard">
              {userRole === "STUDENT" ?
                <Image width={72} height={36} src={logo.src} style={{ width: '72px', height: '36px' }}
                  alt="VanCastro logo" />
                :
                <Image width={72} height={36} src={logoBlack.src} style={{ width: '72px', height: '36px' }}
                  alt="VanCastro logo" />
              }
            </Link>
            <div>
              {isMobile &&
                <TriggerBubble isStudent={userRole === "STUDENT" && true} />
              }
            </div>
          </SidebarHeader>
          <SidebarContent className="w-full px-3 py-1 gap-0">
            <div className="px-4 py-5 flex gap-3 items-center">
              <HeaderUser userRole={userRole} />
              <p className="text-[18px] font-medium">{userName}</p>
            </div>
            <div className=" text-[#777777] flex flex-col w-full text-[15px]">
              {isStudent && <StudentMenu studentContractId={userContractId} isMobile={isMobile} />}
              {isInstructor && <InstructorMenu isMobile={isMobile} />}
            </div>
            <Accordion type="multiple" className="w-full pl-5 pr-3 text-[#777777]">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger
                  className="text-[15px] pb-8 hover:text-black hover:no-underline"
                >
                  <div className="flex gap-4 font-semibold items-center">
                    <House className="size-[20px] ml-[2px]" />
                    Main Menu
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-[#777777] flex flex-col w-full gap-8 px-10 pl-3 text-[15px]">
                  <NavMenu />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SidebarContent>
          <div className="flex gap-4 text-left text-[15px] font-medium mx-6 py-5 text-[#777777] border-t-[1px] border-[#E0E0E0]">
            <LogOut className="text-white" />
            <SignOutButton>Log  out</SignOutButton>
          </div>
        </SidebarGroup >
      </Sidebar >
    </>
  )
}
