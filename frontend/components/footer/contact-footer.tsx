import { Phone } from "lucide-react";
import Link from "next/link";

export default function ContactFooter() {
  return (
    <div>
      <h4 className="font-bold mb-[6px]">Contact</h4>
      <ul className="text-sm space-y-[16px]">
        <li className="space-y-[12px]">
          <span className="font-bold">Phone</span>
          <Link
            href={
              "https://api.whatsapp.com/send?phone=16046009173,17786805613&text=Hello,%20I%20was%20browsing%20vancastro%20website%20and%20would%20like%20to%20know%20more%20about%20your%20services"
            }
            className="hover:text-[#FFCE47] flex gap-[12px] items-center"
            target="_blank"
          >
            <Phone />
            +1 604-600-9173
          </Link>
          <Link
            href={
              "https://api.whatsapp.com/send?phone=16046009173,17786805613&text=Hello,%20I%20was%20browsing%20vancastro%20website%20and%20would%20like%20to%20know%20more%20about%20your%20services"
            }
            className="hover:text-[#FFCE47] flex gap-[12px] items-center"
            target="_blank"
          >
            <Phone />
            +1 778-680-5613
          </Link>
        </li>
        <li className="lg:flex gap-1">
          <p className="font-bold">Email: </p>
          <Link
            className="hover:text-[#FFCE47]"
            href="mailto:Vancastrodrivingschool@gmail.com"
          >
            Vancastrodrivingschool@gmail.com
          </Link>
        </li>
        <li className="lg:flex gap-1">
          <p className="font-bold">Working hours: </p>
          Monday to Friday 8a.m. - 6p.m.
        </li>
      </ul>
    </div>
  );
}
