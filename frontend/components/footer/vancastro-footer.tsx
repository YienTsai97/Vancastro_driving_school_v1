import Link from "next/link";

export default function VanCastroFooter() {
  return (
    <div>
      <h4 className="font-bold mb-[16px]">Vancastro</h4>
      <div className="text-sm flex flex-col space-y-[12px]">
        <Link href="/" className="hover:text-[#FFCE47]">
          Home
        </Link>
        <Link href="/plans" className="hover:text-[#FFCE47]">
          Plans
        </Link>
        <Link href="/faqs" className="hover:text-[#FFCE47]">
          FAQs
        </Link>
        <Link href="/contact" className="hover:text-[#FFCE47]">
          Contact
        </Link>
      </div>
    </div>
  );
}
