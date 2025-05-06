import { SidebarTrigger } from "@/components/ui/sidebar";
import hamburger from "@/public/assets/hamburger.svg";
import hamburgerBlack from "@/public/assets/hamburgerBlack.svg";
import Image from "next/image";

type Props = {
  isStudent: boolean
}

export const TriggerBubble = ({ isStudent }: Props) => {
  return (
    <SidebarTrigger >
      <Image
        width="40"
        height="40"
        src={isStudent ? hamburger : hamburgerBlack}
        alt="hamburger-menu"
      />
    </SidebarTrigger >
  )
}
