import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import calendar from "../../../public/assets/calendar.png";
import medal from "../../../public/assets/medal.png";
import qna from "../../../public/assets/qna.png";
import sign from "../../../public/assets/sign.png";

export default function ChooseUsCard() {
  return (
    <div className="pt-[44px] pb-[35px] lg:pt-[81px] lg:pb-[81px]">
      <div className="text-center text-4xl font-bold sm:block">
        <h2>Why choose us?</h2>
      </div>
      <div className="grid grid-cols-2 gap-[22px] py-[35px] px-[22px] text-center lg:grid-cols-4 lg:gap-[40px] lg:px-[90px]">
        {/* Card 1 */}
        <div>
          <Card className="w-full h-full transition-all hover:scale-110 flex flex-col justify-between p-[20px]">
            <CardHeader className="lg:text-[26px] text-[14px] h-full p-0">
              <CardTitle>Flexible Scheduling</CardTitle>
              <CardDescription className="h-full self-center flex items-center">
                <Image
                  width={126}
                  height={80}
                  src={calendar}
                  alt="calendar image"
                  className="object-contain m-auto"
                  style={{ width: "126px", height: "80px" }}
                />
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 text-[10px] lg:text-[18px]">
              <p>Choose times and locations that suit you with a plan.</p>
            </CardContent>
          </Card>
        </div>
        {/* Card 2 */}
        <div>
          <Card className="p-[20px] w-full h-full transition-all hover:scale-110 flex flex-col justify-between">
            <CardHeader className="lg:text-[26px] h-full p-0">
              <CardTitle>Bilingual Support</CardTitle>
              <CardDescription className="h-full self-center flex items-center">
                <Image
                  width={126}
                  height={86}
                  src={qna}
                  alt="q&a image"
                  className="object-contain m-auto"
                  style={{ width: "126px", height: "86px" }}
                />
              </CardDescription>
            </CardHeader>
            <CardContent className="text-[10px] lg:text-[18px] p-0">
              <p>Learn in Portuguese or English with our bilingual coaches.</p>
            </CardContent>
          </Card>
        </div>
        {/* Card 3 */}
        <div>
          <Card className=" p-[20px] w-full h-full transition-all hover:scale-110 flex flex-col justify-between">
            <CardHeader className="lg:text-[26px] h-full p-0">
              <CardTitle>Mock Test & Scheduling</CardTitle>
              <CardDescription className="h-full self-center flex items-center">
                <Image
                  width={100}
                  height={100}
                  src={sign}
                  alt="sign image"
                  className="object-contain mx-auto my-[15px]"
                />
              </CardDescription>
            </CardHeader>
            <CardContent className="text-[10px] lg:text-[18px] p-0">
              <p>Build confidence with a mock test and Road Test support.</p>
            </CardContent>
          </Card>
        </div>
        {/* Card 4 */}
        <div>
          <Card className="w-full h-full transition-all hover:scale-110 flex flex-col justify-between p-[20px]">
            <CardHeader className="lg:text-[26px] h-full p-0">
              <CardTitle>High Success Rate</CardTitle>
              <CardDescription className="h-full self-center flex items-center">
                <Image
                  width={128}
                  height={86}
                  src={medal}
                  alt="medal image"
                  className="object-contain m-auto"
                  style={{ width: "128px", height: "86px" }}
                />
              </CardDescription>
            </CardHeader>
            <CardContent className="text-[10px] lg:text-[18px] p-0">
              <p>Build confidence with a mock test and Road Test support.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
