import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserType } from "../../../types/user.type";

export default async function UserDashboardProfile({ dashboardUser }: { dashboardUser: UserType }) {
  return (
    <div className="w-full bg-white rounded-xl overflow-hidden">
      <div className="flex justify-between items-center p-6">
        <h2 className="text-2xl font-medium">
          {String(dashboardUser.role).charAt(0).toUpperCase() + String(dashboardUser.role).slice(1).toLowerCase()} Profile
        </h2>
        {String(dashboardUser.role) === "STUDENT" ? (
          dashboardUser.contractId ? (
            <Link href={`/student/contract/${dashboardUser.contractId}`}>
              <Button variant={"outline"} className="bg-[#FECE46] ">
                Show contract
              </Button>
            </Link>
          ) : (
            <Link href={`/student/contract`} target="_blank">
              <Button variant={"outline"} className="bg-[#FECE46] ">
                Sign contract
              </Button>
            </Link>
          )
        ) : null}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-[#FECE46] text-white rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6  " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            <div className="bg-gray-50 shadow-md rounded-lg p-4 space-y-3">
              <div className="flex flex-col border-b pb-2">
                <span className="text-gray-500 text-md">Full Name</span>
                <span className="text-gray-800 font-medium">{dashboardUser.firstName || "N/A"} {dashboardUser.lastName}</span>
              </div>
              <div className="flex flex-col border-b pb-2">
                <span className="text-gray-500 text-md">Date of Birth</span>
                <span className="text-gray-800 font-medium">
                  {new Date(dashboardUser.dateOfBirth).toISOString().split("T")[0] || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-[#FECE46] text-white rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="ml-4 text-lg font-semibold text-gray-800">Contact Information</h3>
            </div>

            <div className="bg-gray-50 shadow-md rounded-lg p-4 space-y-3 ">
              <div className="flex flex-col border-b pb-2">
                <span className="text-gray-500 ">Phone</span>
                <span className="text-gray-800 font-medium">{dashboardUser.phone || "N/A"}</span>
              </div>
              <div className="flex flex-col border-b pb-2">
                <span className="text-gray-500 ">Email</span>
                <span className="text-gray-800 font-medium">{dashboardUser.email || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* License Information */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-[#FECE46]  text-white rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
              </div>
              <h3 className="ml-4 text-lg font-semibold text-gray-800">License Information</h3>
            </div>

            <div className="bg-gray-50 shadow-md rounded-lg p-4 space-y-3">
              <div className="flex flex-col border-b pb-2">
                <span className="text-gray-500 ">License Number</span>
                <span className="text-gray-800 font-medium">{dashboardUser.licenseNumber || "N/A"}</span>
              </div>
              <div className="flex flex-col border-b pb-2">
                <span className="text-gray-500 ">License Class</span>
                <span className="text-gray-800 font-medium">
                  {dashboardUser.licenseClass ? (
                    <>
                      {dashboardUser.licenseClass === "CLASS_4" && "Class 4"}
                      {dashboardUser.licenseClass === "CLASS_5" && "Class 5"}
                      {dashboardUser.licenseClass === "CLASS_7" && "Class 7"}
                    </>
                  ) : (
                    "No License Information"
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-[#FECE46]  text-white rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="ml-4 text-lg font-semibold text-gray-800">Emergency Contact</h3>
            </div>

            <div className="bg-gray-50 shadow-md rounded-lg p-4 space-y-3">
              <div className="flex flex-col border-b pb-2">
                <span className="text-gray-500 ">Name</span>
                <span className="text-gray-800 font-medium">{dashboardUser.emergencyContactName || "N/A"}</span>
              </div>
              <div className="flex flex-col border-b pb-2">
                <span className="text-gray-500 ">Phone</span>
                <span className="text-gray-800 font-medium">{dashboardUser.emergencyContactNumber || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}