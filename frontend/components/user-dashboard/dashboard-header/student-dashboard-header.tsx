"use client";
import { useIsMobile } from '@/hooks/use-mobile';
import logo from '@/public/assets/logo.png';
import Image from 'next/image';
import { TriggerBubble } from './trigger-bubble';

export default function StudentDashboardHeader() {
  const isMobile = useIsMobile()
  // Don't show the header on desktop version
  if (!isMobile) return null;
  else return (
    < header
      className={"bg-[#2F2F2F] marker:w-full sticky top-0 z-10 h-[64px] flex justify-between px-6 py-1"} >
      <div className='w-full text-[24px] font-medium flex items-center'>
        <Image width="72" height="36" src={logo} alt="VanCastro logo" className='object-contain' />
      </div>
      <div className="flex items-center">
        <TriggerBubble isStudent={true} />
      </div>
    </header>
  );
}
