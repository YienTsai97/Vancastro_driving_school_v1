import Image from "next/image";
import brazil from "../../public/assets/brazil.svg.png";
import can from "../../public/assets/can.png";

import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

export default function Slider() {
  return (
    <>
      <Tabs defaultValue="english">
        <TabsList className="flex gap-2 bg-[#5C5C5C] p-1 rounded-full">
          <TabsTrigger
            value="english"
            className="flex text-white gap-1 p-1 items-center data-[state=active]:bg-white rounded-full data-[state=active]:text-black"
          >
            <Image width="25" src={can} height="25" alt="candalogo" /> EN
          </TabsTrigger>
          <TabsTrigger
            value="portuguese"
            className="flex text-white gap-1 p-1 items-center rounded-full data-[state=active]:bg-white  data-[state=active]:text-black data-[state=active]"
          >
            <Image
              width="25"
              src={brazil}
              height="25"
              alt="brazil logo"
              className="rounded-full"
            />{" "}
            PT
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
}
