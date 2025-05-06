import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import checkmark from "../../../public/assets/checkmark.svg";

type Props = {
  title: string;
  desc: string;
  price: string;
  time: string;
};

export default function PlanCard({ title, desc, price, time }: Props) {
  return (
    <Card className="border-[4px] border-[#FFCE47] relative">
      <CardHeader className="text-center">
        <CardDescription className="text-lg text-[#2F2F2F]">
          {desc}
        </CardDescription>
        <CardTitle className="text-3xl text-[#2F2F2F]">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center my-[26px]">
          <div className="bg-[#FFF5D8] p-1 rounded-full w-[120px] h-[120px] flex justify-center items-center text-4xl font-bold text-[#2F2F2F]">
            <h4>{price}</h4>
          </div>
        </div>
        <ul className="list-none text-xs mb-[26px]">
          <li className="flex mb-[7px] items-center">
            <Image
              width={10}
              height={10}
              src={checkmark}
              alt="checkmark logo"
              className="mr-[3px]"
              style={{ width: "10px", height: "10px" }}

            />
            <div>{time}</div>
          </li>
          <li className="flex mb-[7px] items-center">
            <Image
              width={10}
              height={10}
              src={checkmark}
              alt="checkmark logo"
              className="mr-[3px]"
              style={{ width: "10px", height: "10px" }}
            />
            <div>Include driving school car</div>
          </li>
          <li className="flex mb-[7px] items-center">
            <Image
              width={10}
              height={10}
              src={checkmark}
              alt="checkmark logo"
              className="mr-[3px]"
              style={{ width: "10px", height: "10px" }}
            />
            <div>Pick-up and Drop-off</div>
          </li>
          <li className="flex mb-[7px] items-center">
            <Image
              width={10}
              height={10}
              src={checkmark}
              alt="checkmark logo"
              className="mr-[3px]"
              style={{ width: "10px", height: "10px" }}
            />
            <div>Class 5 or Class 7 license</div>
          </li>
          <li className="flex">
            <Image
              width={10}
              height={10}
              src={checkmark}
              alt="checkmark logo"
              className="mr-[3px] mt-[2px]"
              style={{ width: "10px", height: "10px" }}
            />
            <div>
              Available at Vancouver, North Vancouver, Surrey and Burnaby
            </div>
          </li>
        </ul>
      </CardContent>
      <CardFooter className="w-full">
        <Link href="student/purchase-lessons" className="w-full">
          <button className="bg-[#FFCE47] w-full text-black rounded-[10px] p-[11px] font-bold hover:scale-105 transition-all ease-in-out">
            Register Now
          </button>
        </Link>
      </CardFooter>
    </Card>
  );
}
