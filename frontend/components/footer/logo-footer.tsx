import Image from "next/image";
import Link from "next/link";
import fb from "../../public/assets/fb.svg";
import ig from "../../public/assets/ig.svg";
import logo from "../../public/assets/logo.png";
import wa from "../../public/assets/wa.svg";
import yt from "../../public/assets/yt.svg";

export default function LogoFooter() {
  return (
    <>
      <Link href="/">
        <Image
          width="201"
          height="102"
          src={logo}
          alt="VanCastro logo"
          className="lg:mt-[30px]"
        />
      </Link>

      <ul className="flex gap-2 lg:gap-0 lg:justify-between mt-[32px]">
        <li>
          <Link
            href={
              "https://www.facebook.com/p/Vancastro-Driving-School-100088028419878/"
            }
            target="_blank"
          >
            <Image width="40" height="40" src={fb} alt="facebook" />
          </Link>
        </li>
        <li>
          <Link
            href={"https://www.instagram.com/vancastro_drivingschool/"}
            target="_blank"
          >
            <Image width="40" height="40" src={ig} alt="instagram" />
          </Link>
        </li>
        <li>
          <Link
            href={"https://www.youtube.com/@VanCastro_Driving_School"}
            target="_blank"
          >
            <Image width="40" height="40" src={yt} alt="youtube" />
          </Link>
        </li>
        <li>
          <Link
            href={
              "https://api.whatsapp.com/send?phone=16046009173,17786805613&text=Hello,%20I%20was%20browsing%20vancastro%20website%20and%20would%20like%20to%20know%20more%20about%20your%20services"
            }
            target="_blank"
          >
            <Image width="40" height="40" src={wa} alt="whatsapp" />
          </Link>
        </li>
      </ul>
    </>
  );
}
