import Image from "next/image";
import Link from "next/link";
import fbIcon from "../../../public/assets/fbIcon.svg";
import instagramIcon from "../../../public/assets/instagramIcon.svg";
import whatsappIcon from "../../../public/assets/whatsappIcon.svg";
import youtubeIcon from "../../../public/assets/youtubeIcon.svg";

export default function ContactSocialmedia() {
  return (
    <ul className="flex gap-[16px] md:gap-[19px]">
      <li>
        <Link
          href={
            "https://www.facebook.com/p/Vancastro-Driving-School-100088028419878/"
          }
          target="_blank"
        >
          <Image width={40} height={40} src={fbIcon} alt="facebook" />
        </Link>
      </li>
      <li>
        <Link
          href={"https://www.instagram.com/vancastro_drivingschool/"}
          target="_blank"
        >
          <Image
            width={40}
            height={40}
            src={instagramIcon}
            alt="instagram"
          />
        </Link>
      </li>
      <li>
        <Link
          href={"https://www.youtube.com/@VanCastro_Driving_School"}
          target="_blank"
        >
          <Image
            width={40}
            height={40}
            src={youtubeIcon}
            alt="youtube"
          />
        </Link>
      </li>
      <li>
        <Link
          href={
            "https://api.whatsapp.com/send?phone=16046009173,17786805613&text=Hello,%20I%20was%20browsing%20vancastro%20website%20and%20would%20like%20to%20know%20more%20about%20your%20services"
          }
          target="_blank"
        >
          <Image
            width={40}
            height={40}
            src={whatsappIcon}
            alt="whatsapp"
          />
        </Link>
      </li>
    </ul>
  )
}
