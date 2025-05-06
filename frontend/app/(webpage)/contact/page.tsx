import { ContactForm } from "@/components/planning-body/plans-contact/contact-form";
import ContactSocialmedia from "@/components/planning-body/plans-contact/contact-socialmedia";
import contactMap from "@/public/assets/contactMap.webp";
import ContactOurStory1 from "@/public/assets/contactOurStory1.webp";
import ContactOurStory2 from "@/public/assets/contactOurStory2.webp";
import contactProfile1 from "@/public/assets/contactProfile1.webp";
import contactProfile2 from "@/public/assets/contactProfile2.webp";
import fbIcon from "@/public/assets/fbIcon.svg";
import instagramIcon from "@/public/assets/instagramIcon.svg";
import wa from "@/public/assets/wa.svg";
import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Contact() {
  return (
    <>
      {/* Hero */}
      <div className="w-screen h-[527px] bg-[#2f2f2f] bg-gradient-to-b from-[#2f2f2f] to-[#6e6e6e] flex flex-col justify-center gap-[35px] text-center px-6">
        <h1 className="text-[18px] md:text-[38px] lg:text-[48px] font-bold text-white">
          About VanCastro Driving School
        </h1>
        <div className="text-[14px] md:text-[18px] lg:text-[24px] font-medium text-[#D9D9D9]">
          <h5>Your trusted partner in driving education since 2020.</h5>
          <h5>We're committed to creating safe and confident drivers.</h5>
        </div>
      </div>
      {/* Our Story */}
      <div className="w-screen bg-[#F7F7F7] py-[90px] px-6 md:px-[90px] flex flex-col lg:flex-row gap-10">
        <div className="flex lg:flex-row-reverse gap-5 justify-between lg:w-[50%]">
          <div className="h-max w-max lg:self-end gap-5">
            <div className="lg:hidden py-3 text-[24px] md:text-[38px] w-fit font-bold leading-[28px] md:leading-[42px] border-t-[#FFCE47] border-t-[4px]">
              <h2>Our</h2>
              <h2>Story</h2>
            </div>
            <Image src={ContactOurStory2} width={294} alt="our-story-2" className="rounded-2xl" />
          </div>
          <div className="h-max w-max self-end">
            <Image src={ContactOurStory1} width={376} height={478} alt="our-story-1" className="rounded-2xl" />
          </div>
        </div>
        <div className="flex flex-col justify-between gap-5">
          <h5 className="text-[14px] md:text-[18px] text-[#525252] font-medium">
            With over 4 years of experience, VanCastro Driving School has helped thousands of students become skilled and responsible drivers. Our certified instructors are passionate about road safety and driver education.
          </h5>
          <div className="w-full md:columns-2 gap-5 items-end">
            <div className="text-center bg-white shadow-md mb-5 p-5 rounded-lg w-full min-w-[180px]">
              <h3 className="text-[18px] md:text-[30px]">100+</h3>
              <p className="text-[14px] text-[#525252]">Google reviews</p>
            </div>
            <div className="text-center bg-white shadow-md mb-5 md:mb-0 p-5 rounded-lg w-full min-w-[180px]">
              <h3 className="text-[18px] md:text-[30px]">95%</h3>
              <p className="text-[14px] text-[#525252]">Pass rate</p>
            </div>
            <div className="text-center bg-white shadow-md mb-5 p-5 rounded-lg w-full min-w-[180px]">
              <h3 className="text-[18px] md:text-[30px]">200+</h3>
              <p className="text-[14px] text-[#525252]">Student Trained</p>
            </div>
            <div className="text-center bg-white shadow-md mb-5 md:mb-0 p-5 rounded-lg w-full min-w-[180px]">
              <h3 className="text-[18px] md:text-[30px]">5</h3>
              <p className="text-[14px] text-[#525252]">locations</p>
            </div>
          </div>
        </div>
      </div>
      {/* Our Coach */}
      <div className="w-screen py-[90px] px-6 lg:px-[90px] flex flex-col gap-10">
        <h2 className="w-full text-[24px] md:text-[38px]/[38px] lg:text-[48px]/[48px] font-bold text-center">
          Our coach
        </h2>
        <h3 className="text-[18px] font-medium text-center">
          We are committed we will provide professional knowledge and lesson for you !
        </h3>
        <div className="mx-auto w-[150px] h-[6px] bg-gradient-to-r from-[#FFCE47] via-[#feba03] to-[#FFCE47]"></div>
        <div className="flex flex-col max-w-[1000px] self-center md:flex-row gap w-full bg-[#f4f2eb] rounded-[100px] overflow-hidden">
          <Image src={contactProfile1} alt="our-story-2" className="w-full md:w-[250px] h-[200px] md:h-full object-cover object-[65%_35%] overflow-hidden" />
          <div className="md:w-full flex flex-col gap-6 px-8 py-4 self-center">
            <div>
              <h5 className="text-[24px] lg:text-[28px] font-bold pb-2">
                Anderson
              </h5>
              <Link
                href={
                  "https://api.whatsapp.com/send?phone=16046009173,17786805613&text=Hello,%20I%20was%20browsing%20vancastro%20website%20and%20would%20like%20to%20know%20more%20about%20your%20services"
                }
                className="hover:text-[#FFCE47] flex gap-3 items-center text-[14px] lg:text-[18px]"
                target="_blank"
              >
                <Image width="30" height="30" src={wa} alt="whatsapp logo" />
                +1 604 600 9173
              </Link>
            </div>
            <p className="text-[14px] lg:text-[18px] pb-7 md:pb-0">
              With experience in training in Brazil and Canada, Anderson started out taking care of the administrative side of VanCastro and over time began to admire how happy and fulfilled Anderson had become with the birth and growth of VanCastro. In a short time, she decided to study to also acquire her license to also become an Instructor Driver. Andresa also has over 25 years driving experience. If you have a challenge, Andresa is the woman to call.
            </p>
          </div>
        </div>
        <div className="flex flex-col max-w-[1000px] self-center md:flex-row gap w-full bg-[#f4f2eb] rounded-[100px] overflow-hidden">
          <Image src={contactProfile2} alt="our-story-2" className="w-full md:w-[250px] h-[200px] md:h-full object-cover object-[65%_35%] overflow-hidden" />
          <div className="md:w-full flex flex-col gap-6 px-8 py-4 self-center">
            <div>
              <h5 className="text-[24px] lg:text-[28px] font-bold pb-2">
                Andresa
              </h5>
              <Link
                href={
                  "https://api.whatsapp.com/send?phone=16046009173,17786805613&text=Hello,%20I%20was%20browsing%20vancastro%20website%20and%20would%20like%20to%20know%20more%20about%20your%20services"
                }
                className="hover:text-[#FFCE47] flex gap-3 items-center text-[14px] lg:text-[18px]"
                target="_blank"
              >
                <Image width="30" height="30" src={wa} alt="whatsapp logo" />
                +1 778 680 5613
              </Link>
            </div>
            <p className="text-[14px] lg:text-[18px] pb-7 md:pb-0">
              With experience in training in Brazil and Canada, Andresa started out taking care of the administrative side of VanCastro and over time began to admire how happy and fulfilled Anderson had become with the birth and growth of VanCastro. In a short time, she decided to study to also acquire her license to also become an Instructor Driver. Andresa also has over 25 years driving experience. If you have a challenge, Andresa is the woman to call.
            </p>
          </div>
        </div>
      </div>
      {/* Need help with the ICBC Knowledge Test? */}
      <div className="w-screen bg-[#F7F7F7] py-[90px] md:px-[90px] flex flex-col gap-10">
        <div className="w-full text-[24px] md:text-[38px]/[38px] lg:text-[48px]/[54px] font-bold text-center flex flex-col">
          <h2>Need help with the</h2>
          <h2>ICBC Knowledge Test?</h2>
        </div>
        <h3 className="text-[18px] font-medium text-center">
          Connect with Our Partner!
        </h3>
        <div className="w-fit mx-auto p-3 md:p-[48px] bg-white shadow-lg rounded-xl flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h4 className="text-[14px] lg:text-[20px] font-bold">Phone</h4>
            <Link
              href={"tel:+1236-513-2741"}
              className="hover:text-[#FFCE47] flex gap-2"
            >
              <Phone />
              +1 (236)-513-2741
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-[14px] lg:text-[20px] font-bold">Email</h4>
            <Link
              className="hover:text-[#FFCE47]"
              href="mailto:icbcknowledgetestmaterial@gmail.com"
            >
              icbcknowledgetestmaterial@gmail.com
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-[14px] md:text-[20px] font-bold">Social Media</h4>
            <div className="flex gap-3">
              <Link
                href={
                  "https://www.facebook.com/ICBCKnowledgeTestMaterial/"
                }
                target="_blank"
              >
                <Image width={47} height={47} src={fbIcon} alt="facebook" />
              </Link>
              <Link
                href={"https://www.instagram.com/vancastro_drivingschool/"}
                target="_blank"
              >
                <Image width={47} height={47} src={instagramIcon} alt="instagram" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Contact Us */}
      <div className="w-screen py-[90px] lg:px-[90px] flex flex-col gap-5 lg:gap-10">
        <h2 className="w-full text-[24px] md:text-[38px]/[38px] lg:text-[48px]/[48px] font-bold text-center px-6 md:px-0">
          Contact Us
        </h2>
        <h3 className="text-[18px] font-medium text-center px-6 md:px-0">
          We are committed we will provide professional knowledge and lesson for you !
        </h3>
        <div className="mx-auto w-[150px] h-[6px] bg-gradient-to-r from-[#FFCE47] via-[#feba03] to-[#FFCE47]"></div>
        <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-[60px] items-center lg:justify-center">
          <Image src={contactMap} alt="location" className="max-w-[750px] max-h-[440px] w-full h-auto rounded-2xl object-cover object-[60%_40%]" />
          <div className="w-fit flex flex-col gap-10 px-6 md:px-0">
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-col md:flex-row lg:flex-col gap-[10px]">
                <div className="w-full flex flex-col gap-[8px] text-[16px]">
                  <h4 className="text-[20px] md:text-[24px] font-bold">Contact us</h4>
                  <p className="flex gap-2">
                    <span className="font-bold">Working hour:</span>
                    8am - 6pm, Mon to Fri
                  </p>
                  <p className="flex gap-2 flex-wrap">
                    <span className="font-bold">Email:</span>
                    <Link
                      className="hover:text-[#FFCE47]"
                      href="mailto:Vancastrodrivingschool@gmail.com"
                    >
                      Vancastrodrivingschool@gmail.com
                    </Link>
                  </p>
                </div>
                <div className="w-full flex flex-col gap-[10px] pl-0 md:pl-16 lg:pl-0">
                  <h4 className="text-[20px] md:text-[24px] font-bold">Number</h4>
                  <div className="flex flex-col gap-[8px] text-[16px]">
                    <Link
                      href={
                        "https://api.whatsapp.com/send?phone=16046009173,17786805613&text=Hello,%20I%20was%20browsing%20vancastro%20website%20and%20would%20like%20to%20know%20more%20about%20your%20services"
                      }
                      className="hover:text-[#FFCE47] flex gap-6 items-center"
                      target="_blank"
                    >
                      <Image width={32} height={32} src={wa} alt="whatsapp logo" />
                      +1 (778)680-5613
                    </Link>
                    <Link
                      href={
                        "https://api.whatsapp.com/send?phone=16046009173,17786805613&text=Hello,%20I%20was%20browsing%20vancastro%20website%20and%20would%20like%20to%20know%20more%20about%20your%20services"
                      }
                      className="hover:text-[#FFCE47] flex gap-6 items-center"
                      target="_blank"
                    >
                      <Image width={32} height={32} src={wa} alt="whatsapp logo" />
                      +1 604-600-9173
                    </Link>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row lg:flex-col-reverse gap-[10px] ">
                <div className="flex flex-col gap-[10px]">
                  <h4 className="text-[20px] md:text-[24px] font-bold">Service location</h4>
                  <div className="flex flex-col gap-[8px] text-[16px]">
                    <p>Burnaby</p>
                    <p>Vancouver</p>
                    <p>North Vancouver</p>
                  </div>
                </div>
                <div className=" flex flex-col gap-[10px] md:pl-40 lg:pl-0">
                  <h4 className="text-[20px] md:text-[24px] font-bold">Social media</h4>
                  <ContactSocialmedia />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Question ? */}
      <div className="w-screen  bg-[#F7F7F7] py-[64px] px-6 lg:px-[90px] flex flex-col gap-10 items-center">
        <div className=" w-full text-[24px] md:text-[38px]/[38px] lg:text-[48px]/[54px] font-bold text-center hidden md:flex md:flex-col">
          <h2>Question ?</h2>
          <h2>Let us know !</h2>
        </div>
        <h3 className="md:hidden text-[18px] text-[#2F2F2F] font-bold text-center">
          We're happy to hear from you !
        </h3>
        <div className=" max-w-[630px] w-full">
          <ContactForm />
        </div>
      </div>
    </>
  )
}
