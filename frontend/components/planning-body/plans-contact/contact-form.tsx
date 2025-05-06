import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../../ui/button";

export const ContactForm = () => {
  return (
    <form className="flex flex-col gap-[29px] md:gap-[25px] px-[15px] py-[20px] lg:px-[36px] lg:py-[24px] bg-[#2F2F2F] lg:bg-[#FFCE47] rounded-2xl w-full h-full">
      <Input
        className="bg-white h-[50px] lg:h-[56px] text-[15px] lg:text-[18px]"
        type="text"
        placeholder="Name"
      />
      <Input
        className="bg-white  h-[50px] lg:h-[56px] text-[15px] lg:text-[18px]"
        type="phone"
        placeholder="Phone"
      />
      <Input
        className="bg-white  h-[50px] lg:h-[56px] text-[15px] lg:text-[18px]"
        type="email"
        placeholder="Email"
      />
      <Textarea
        className="bg-white  h-[170px] lg:h-[200px] text-[15px] lg:text-[18px]"
        placeholder="Write message."
      />
      <Button className="bg-[#FFCE47] text-black lg:bg-[#333333] lg:text-[#FFF5D8] lg:hover:hover:bg-[#4e4330] text-[20px] font-bold w-full h-[50px] lg:h-[57px]">
        Submit
      </Button>
    </form>
  );
};
