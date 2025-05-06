import Image from "next/image";
import blueman from "../../../public/assets/blueman.svg";
import yellowman from "../../../public/assets/yellowman.svg";

export default function Partners() {
  return (
    <div className="flex flex-col items-center justify-center bg-[#EFEFEF] md:flex-row md:gap-[64px] md:pt-[83px] md:pb-[63px] md:px-[90px]">
      <div className="hidden md:block">
        <Image src={blueman} alt="man drawing" height={321} width={164} />
      </div>
      <div>
        <div className="text-center mt-[46px] mb-[27px]">
          <h3 className="text-[20px]">
            <span className="md:text-[#FFAE00] font-bold">Check out </span>
            our partner for
          </h3>
          <h2 className="hidden md:block text-[40px] font-bold mt-[34px] text-nowrap">
            Taking the{" "}
            <span className="text-[#5ABCFF]"> ICBC Knowledge Test </span>
            <div>Before Applying for a Class</div>
          </h2>
          <h2 className="text-[28px] font-bold text-[#5ABCFF] md:hidden">
            ICBC Knowledge Test
          </h2>
          <h3 className="text-[20px] md:hidden">Before applying for a Class</h3>
        </div>
        <div className="flex gap-[19px] mb-[27px] justify-center md:hidden">
          <Image src={blueman} alt="man drawing" height={196} width={100} />
          <Image src={yellowman} alt="man drawing" height={196} width={100} />
        </div>
        <div className="w-full px-[24px] mb-[46px] flex justify-center md:mt-[49px]">
          <button className="bg-[#FFCE47] w-full md:max-w-[294px] text-black rounded-[10px] p-[11px] font-bold hover:bg-[#FFDF94] transition-all ease-in-out">
            <a href="/contact">Contact Us</a>
          </button>
        </div>
      </div>
      <div className="hidden md:block">
        <Image src={yellowman} alt="man drawing" height={321} width={164} />
      </div>
    </div>
  );
}
