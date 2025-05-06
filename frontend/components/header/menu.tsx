"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavMenu() {
  const currentPath = usePathname();
  const isUserDashboard = currentPath.startsWith("/student") || currentPath.startsWith("/instructor");
  const isDashboardHover = isUserDashboard ? "hover:text-black" : "hover:text-[#FFCE47]";

  return (
    <>
      <Link
        href="/"
        className={`${currentPath === "/" ? "font-bold text-[#FFCE47] " : "font-semibold"
          } ${isDashboardHover}`}
      >
        Home
      </Link>
      <Link
        href="/plans"
        className={`${currentPath === "/plans" ? "font-bold text-[#FFCE47] " : "font-semibold"} ${isDashboardHover}`}
      >
        Plans
      </Link>
      <Link
        href="/faqs"
        className={`${currentPath === "/faqs" ? "font-bold text-[#FFCE47] " : "font-semibold"} ${isDashboardHover}`}
      >
        FAQs
      </Link>
      <Link
        href="/contact"
        className={`${currentPath === "/contact" ? "font-bold text-[#FFCE47] " : "font-semibold"} ${isDashboardHover}`}
      >
        Contact
      </Link>
    </>
  );
}
