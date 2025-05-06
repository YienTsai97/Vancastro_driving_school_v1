import { currentUser } from "@clerk/nextjs/server";
import { getUserByClerkId } from '@/utils/userFetch';
import PdfField from "@/components/user-dashboard/pdfField"
import { getContractById } from '@/utils/contractFetch';


export default async function page() {
  const clerkUser = await currentUser();
  if(!clerkUser) return
  const user = await getUserByClerkId(clerkUser.id)
  const contract = await getContractById(user.contractId);

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col justify-center">
      <h2 className="font-bold text-3xl text-center">Contract</h2>
      <div className='md:mx-[250px] shadow-xl p-10'>
          <PdfField
          contract = {contract.data || null}
          student = {user}
          />
        <p className ="font-bold text-md m-4">Contact us: (604) 900-9173 / vancastrodrivingschool@gmail.com</p>
    </div>
    </div>
  )
}
