"use client";
import { SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../../public/assets/logo.png";
import { HeaderUser } from "./header-user";
import NavMenu from "./menu";

type Props = {
  userRole: string
}

export default function Header({ userRole }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <header className="bg-[#2F2F2F] w-full sticky top-0 z-10">
      <div className="flex justify-between items-center px-[23px] lg:px-[90px] py-[21px] relative">
        <div>
          <Link href="/">
            <Image width={116} src={logo} alt="VanCastro logo" priority />
          </Link>
        </div>

        <div className="flex items-center">
          <div className="hidden lg:flex lg:items-center lg:gap-[57px]">
            <div className="text-white space-x-[53px]">
              <NavMenu />
            </div>
            <div>
              <SignedIn>
                <Popover>
                  <PopoverTrigger>
                    <HeaderUser userRole={userRole} />
                  </PopoverTrigger>
                  <PopoverContent className="w-fit mt-5 mr-16 bg-white rounded-lg  text-[16px] font-medium flex flex-col gap-4 px-5 py-4 border-2 border-[#2F2F2F]">
                    <Link
                      href={userRole === "INSTRUCTOR" ? "/instructor/dashboard" : "/student/dashboard"}
                      className={`flex items-center gap-4 hover:text-[#FFCE47]`}
                    >
                      <LayoutDashboard className='size-[20px]' />
                      <p>My Dashboard</p>
                    </Link>
                    <div className="flex gap-4 items-center hover:text-[#FFCE47]">
                      <LogOut className="size-[20px]" />
                      <SignOutButton>Log  out</SignOutButton>
                    </div>
                  </PopoverContent>
                </Popover>
              </SignedIn>
              <SignedOut>
                <HeaderUser userRole={userRole} />
              </SignedOut>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button onClick={handleToggle}>
              {isOpen ? (
                <X className="text-[#FFCE47]" size={24} />
              ) : (
                <Menu className="text-[#FFCE47]" size={24} />
              )}
            </button>
          </div>
        </div>
      </div>


      {isOpen && (
        <div className="lg:hidden absolute z-10 px-[35px] py-[22px] text-white flex flex-col w-full h-screen bg-[#2F2F2F] space-y-[30px]">
          <SignedIn>
            <Link
              className={`font-semibold hover:text-[#FFCE47] flex items-center gap-4`}
              href={userRole === "INSTRUCTOR" ? "/instructor/dashboard" : "/student/dashboard"}>
              <HeaderUser userRole={userRole} />
              <p>My Dashboard</p>
            </Link>
            <NavMenu />
            <div className="flex gap-4 text-left text-[16px] font-medium">
              <LogOut className="text-white" />
              <SignOutButton>Log  out</SignOutButton>
            </div>
          </SignedIn>
          <SignedOut>
            <NavMenu />
            <HeaderUser userRole={userRole} />
          </SignedOut>
        </div>
      )}
    </header>
  );
}