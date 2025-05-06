import FaqAccordion from "@/components/faqs/faq-accordion";
import PolicyAccordion from "@/components/faqs/policy-accordion";

export default function FAQs() {
  return (
    <div className="mx-[24px] mb-[8px] mt-[28px] lg:max-w-[1260px] lg:mx-auto md:mx-[90px]">
      <div className="mb-[45px] md:text-center">
        <h2 className="font-bold text-2xl mb-[8px]">Policies</h2>
        <p className="text-sm">
          The following policies apply to all services provided by VanCastro
          Driving School. Please review them carefully to understand your
          responsibilities and our commitments.
        </p>
      </div>
      <PolicyAccordion />
      <div className="mb-[45px] mt-[50px]  md:text-center">
        <h2 className="font-bold text-2xl mb-[8px]">FAQ</h2>
        <p className="text-sm">Common questions from the students</p>
      </div>
      <FaqAccordion />
    </div>
  );
}
