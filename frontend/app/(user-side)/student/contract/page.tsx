import { currentUser } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/utils/userFetch";
import { getContractById } from "@/utils/contractFetch";
import { redirect } from "next/navigation";
import ContractForm from "@/components/user-dashboard/contract-form";

enum ContractStatus {
  ONGOING = "ONGOING",
  DONE = "DONE",
}

export default async function Page() {
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const user = await getUserByClerkId(clerkUser.id);
  if (!user) return null; 

  const contract = user.contractId ? await getContractById(user.contractId) : null;
  
  if (contract?.data?.status === ContractStatus.ONGOING) {
    redirect("/student/dashboard");
  }

  return (
    <div className="mx-14 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">License Course Registration</h2>
      {user && <ContractForm user={user} />}
    </div>
  );
}
