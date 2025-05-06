import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import car from "../../../public/assets/car.svg";
import clock from "../../../public/assets/clock.svg";
import world from "../../../public/assets/world.svg";

type Props = {
  name: string;
  src: StaticImageData;
};

export default function InstructorCard({ name, src }: Props) {
  return (
    <div>
      <Card className="border-[4px] border-[#FFCE47] py-[40px] px-[25px]">
        <CardHeader className="p-0 mb-[25px]">
          <CardDescription className="block mx-auto mb-[25px]">
            <Image src={src} height={230} width={230} alt="instructor image" style={{ width: "230px", height: "230px" }}
            />
          </CardDescription>
          <CardTitle className="text-2xl text-center">{name}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="mb-[25px] text-[14px]">
            <li className="flex items-center mb-[8px]">
              <Image
                src={car}
                alt=""
                width={30}
                height={30}
                className="mr-[6px]"
                style={{ width: "30px", height: "30px" }}
              />
              <div>25 years of experience</div>
            </li>
            <li className="flex items-center mb-[8px]">
              <Image
                src={world}
                alt=""
                width={30}
                height={30}
                className="mr-[6px]"
                style={{ width: "30px", height: "30px" }}
              />
              <div>English, Portuguese, Spanish</div>
            </li>
            <li className="flex items-center">
              <Image
                src={clock}
                alt=""
                width={30}
                height={30}
                className="mr-[6px]"
                style={{ width: "30px", height: "30px" }}
              />
              <div>Monday - Friday, 8a.m.-6p.m.</div>
            </li>
          </ul>
        </CardContent>
        <CardFooter className="w-full p-0">
          <Link
            href={
              "https://api.whatsapp.com/send?phone=16046009173,17786805613&text=Hello,%20I%20was%20browsing%20vancastro%20website%20and%20would%20like%20to%20know%20more%20about%20your%20services"
            }
            target="_blank"
            className="w-full"
          >
            <button className="bg-[#FFCE47] w-full text-black rounded-[10px] p-[11px] font-bold hover:bg-[#FFDF94] transition-all ease-in-out">
              Contact Us
            </button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
