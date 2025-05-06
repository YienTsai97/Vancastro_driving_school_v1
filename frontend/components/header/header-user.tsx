"use client"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  useUser
} from '@clerk/nextjs';
import { LogIn } from "lucide-react";
import { useEffect, useState } from 'react';

type Prop = {
  userRole: string
}

export function HeaderUser({ userRole }: Prop) {
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useUser();


  useEffect(() => {
    setIsMounted(true);
  }, []);


  if (!isMounted) return null;

  return (
    <>
      <SignedOut>
        <div className='text-white font-semibold hover:text-"text-[#FFCE47] flex gap-4'>
          <LogIn className="text-white" />
          <SignInButton>Sign in</SignInButton>
        </div>
      </SignedOut>
      <SignedIn>
        {user &&
          <Avatar className="size-7" >
            <AvatarImage src={user.imageUrl} alt="User Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        }
      </SignedIn>
    </>
  );
}
