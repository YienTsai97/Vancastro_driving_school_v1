
import TravelList from "@/components/user-dashboard/travel-time/travel-list";
import { getTravelTimes } from "@/utils/travelTimeFetch";

export default async function TraveTimes() {
  // Fetch All Traveltime Data
  let rawData = null;
  const res = await getTravelTimes();
  if (res.success) {
    rawData = await res.data;
  } else {
    console.error(res.message);
  }

  return (
    <section className="w-full h-screen">
      <div className="w-full fixed top-0 bg-white z-10">
        <h2 className="font-medium text-[24px] h-[64px] flex items-center justify-center sm:justify-start sm:pl-6" >
          Travel Time
        </h2>
      </div>
      <div className="pt-[64px] w-full h-full">
        <TravelList rawData={rawData || []} />
      </div>
    </section >
  );
}
