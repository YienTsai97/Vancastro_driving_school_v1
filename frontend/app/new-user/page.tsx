import NewUserForm from "@/components/user-dashboard/new-user/new-user-form";
import { currentUser } from "@clerk/nextjs/server";
import { getUserByClerkId } from '../../utils/userFetch';
import { redirect } from 'next/navigation';
import { getContractById } from '@/utils/contractFetch';

export default async function NewUserPage() {
  const clerkUser = await currentUser();
  
  if (!clerkUser) {
    redirect('/');
  }

  const userEmail = clerkUser.emailAddresses[0]?.emailAddress;
  if (!userEmail) {
    redirect('/');
  }

  let existingUser = null;
  try {
    existingUser = await getUserByClerkId(clerkUser.id);
  } catch (error) {
    console.log('Error fetching user', error);
  }

  let contract = null
  try{
    contract = await getContractById(existingUser?.data?.contractId);
  }catch (error) {
    console.log('Error fetching contract', error);
  }

  if (!existingUser?.data?.contractId && String(existingUser?.data?.role) === 'STUDENT') {
    redirect('/student/contract');
  }

  if(existingUser?.data?.contractId && String(contract?.data?.status) === "ONGOING" ) {
    redirect('/instructor/contract');
  }


  if (String(existingUser?.data?.role) === 'INSTRUCTOR') {
    redirect('/instructor/dashboard');
  }

  const userInfo = {
    clerkId: clerkUser.id,
    email: userEmail
  };

  return (
    <NewUserForm clerkUser={userInfo}/> 
  );
}