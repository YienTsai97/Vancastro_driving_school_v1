"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { TriggerBubble } from "./trigger-bubble";

export default function FixHamburgerBtn() {
  const isMobile = useIsMobile()
  if (!isMobile) return null;
  return (
    <div className="fixed top-0 right-0 z-20 -translate-x-6 translate-y-[17px] transform">
      <TriggerBubble isStudent={false} />
    </div>
  )
}
