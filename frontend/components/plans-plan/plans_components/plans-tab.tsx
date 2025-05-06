"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import Image from "next/image";
import blackstar from "../../../public/assets/blackstar.svg";
import BeginnerCardsCarousel from "./carrousel/beginner-cards";
import SwitchCardsCarousel from "./carrousel/switch-cards";
import PlanCard from "./plan-card";

export default function PlanTab() {
  return (
    <div className="pt-[21px] flex justify-center">
      <Tabs defaultValue="beginner" className="w-[319px] md:w-full">
        <div className="flex justify-center w-full">
          <TabsList className="grid grid-cols-2 bg-[#2F2F2F] rounded-full p-1 text-white">
            <TabsTrigger
              value="beginner"
              className="data-[state=active]:bg-[#FFCE47] rounded-full data-[state=active]:font-bold data-[state=active]:text-[#2F2F2F] p-1"
            >
              Beginner
            </TabsTrigger>
            <TabsTrigger
              value="switch"
              className="data-[state=active]:bg-[#FFCE47] rounded-full data-[state=active]:font-bold data-[state=active]:text-[#2F2F2F] p-1"
            >
              Switch License
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="beginner">
          <div className="hidden md:flex justify-center mt-[57px] gap-[15px] pr-[90px] pl-[90px] mb-[130px]">
            <PlanCard
              desc="Hourly Lesson"
              title="1 Hour"
              price="$75"
              time="60 mins/lesson"
            />
            <div className="relative">
              <PlanCard
                desc="Best for Beginners"
                title="10 Lessons"
                price="$850"
                time="60 mins/lesson"
              />
              <div className="bg-[#FFCE47] top-[-16px] absolute flex py-2 px-3 rounded-full text-[#2F2F2F] font-bold left-1/2 transform -translate-x-1/2 items-center text-nowrap max-w-[219px] w-[60%] justify-center">
                <Image
                  src={blackstar}
                  alt="star logo"
                  width={20}
                  height={20}
                  style={{ width: "20px", height: "20px" }}
                  className="mr-1"
                />
                Most Popular
                <Image
                  src={blackstar}
                  alt="star logo"
                  width={20}
                  height={20}
                  style={{ width: "20px", height: "20px" }}
                  className="ml-1"
                />
              </div>
            </div>
            <PlanCard
              desc="90 mins class"
              title="3 Lessons"
              price="$250"
              time="90 mins/lesson"
            />
          </div>
          <div className="block md:hidden">
            <BeginnerCardsCarousel />
          </div>
        </TabsContent>
        <TabsContent value="switch">
          <div className="hidden md:flex justify-center mt-[57px] gap-[15px] pr-[90px] pl-[90px] mb-[130px]">
            <PlanCard
              desc="Hourly Lesson"
              title="1 Hour"
              price="$75"
              time="60 mins/lesson"
            />
            <div className="relative">
              <PlanCard
                desc="90 mins class"
                title="3 Lessons"
                price="$250"
                time="90 mins/lesson"
              />
              <div className="bg-[#FFCE47] top-[-16px] absolute flex py-2 px-3 rounded-full text-[#2F2F2F] font-bold left-1/2 transform -translate-x-1/2 items-center text-nowrap max-w-[219px] w-[60%] justify-center">
                <Image
                  src={blackstar}
                  alt="star logo"
                  width={20}
                  height={20}
                  style={{ width: "20px", height: "20px" }}
                  className="mr-1 fill-[#2F2F2F]"
                />
                Most Popular
                <Image
                  src={blackstar}
                  alt="star logo"
                  width={20}
                  height={20}
                  style={{ width: "20px", height: "20px" }}
                  className="ml-1"
                />
              </div>
            </div>
            <PlanCard
              desc="Road Test"
              title="Rental Car"
              price="$150"
              time="60 mins/lesson"
            />
          </div>
          <div className="block md:hidden">
            <SwitchCardsCarousel />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
