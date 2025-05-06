import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import "./accordion.css";

export default function FaqAccordion() {
  return (
    <div className="container mx-auto">
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1" className="mb-[20px] border-none">
          <AccordionTrigger className="trigger font-semibold text-[16px] hover:no-underline  data-[state=open]:bg-[#efeeee]">
            Knowledge Test
          </AccordionTrigger>
          <AccordionContent>
            <Accordion type="multiple" className="inner-accordion">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="trigger2 hover:no-underline font-semibold">
                  Booking & Preparation
                </AccordionTrigger>
                <AccordionContent className="pl-[50px] pr-[45px] text-xs">
                  <ul className="list-disc ml-[15px]">
                    <li>
                      Where can I book my knowledge test?Book Knowledge Test by
                      ICBC. Click <a href="">here.</a>
                    </li>

                    <li>
                      How can I study for my knowledge test? Book download PDF{" "}
                      <a href="">here.</a>
                    </li>
                    <li>
                      Practice questions download PDF <a href="">here.</a>
                    </li>
                    <li>
                      Can I have a translator with me? Yes. Find more
                      professional approvedICBC Translators in this list. Click{" "}
                      <a href="">here.</a>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-none">
                <AccordionTrigger className="trigger2 hover:no-underline font-semibold">
                  Test Details
                </AccordionTrigger>
                <AccordionContent className="pl-[50px] text-xs  pr-[45px]">
                  <ul className="list-disc ml-[15px]">
                    <li>
                      <span className="font-bold">Knowledge Test Time:</span>{" "}
                      The test takes around 35 minutes for Class 5 and Class 7
                      licenses.
                    </li>
                    <li>
                      <span className="font-bold">Number of Questions:</span>{" "}
                      There are 50 questions, and you need to answer at least 40
                      correctly to pass.
                    </li>
                    <li>
                      <span className="font-bold">
                        Retesting After Failure:
                      </span>{" "}
                      You can retake the test after 7 days if needed, with no
                      limits on attempts.
                    </li>
                    <li>
                      <span className="font-bold">Cost:</span> The test costs
                      $15.00 (subject to change)
                    </li>
                    <li>
                      <span className="font-bold">Required Documents:</span>{" "}
                      Bring your permit (work/study) or PR card, passport or
                      BCID, and any prior driver’s license you hold.
                    </li>
                    <li>
                      <span className="font-bold">
                        Surrendering Previous License:
                      </span>{" "}
                      You must hand over your old license, as holding two is not
                      permitted in Canada.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="mb-[20px] border-none">
          <AccordionTrigger className="trigger font-semibold text-[16px] hover:no-underline  data-[state=open]:bg-[#efeeee]">
            Road Test
          </AccordionTrigger>
          <AccordionContent>
            <Accordion type="multiple" className="inner-accordion">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="trigger2 hover:no-underline font-semibold">
                  Test Details
                </AccordionTrigger>
                <AccordionContent className="pl-[50px] text-xs pr-[45px]">
                  <ul className="list-disc ml-[15px]">
                    <li>
                      <span className="font-bold">Road Test Booking:</span>{" "}
                      Schedule your road test <a href="">here</a>.
                    </li>
                    <li>
                      <span className="font-bold">Test Duration:</span> 35
                      minutes total (5 min pre-trip, 25 min driving, 5 min
                      feedback).
                    </li>
                    <li>
                      <span className="font-bold">
                        Recommended ICBC Locations:
                      </span>{" "}
                      North Vancouver/Marine Drive, Vancouver/Kingsway,
                      Burnaby/Lougheed.
                    </li>
                    <li>
                      <span className="font-bold">Translator:</span> Translators
                      are not allowed; only the examiner and driver are in the
                      car.
                    </li>
                    <li>
                      <span className="font-bold">Use own car:</span> Allowed if
                      all lights, controls, and tires are in good condition.
                    </li>
                    <li>
                      <span className="font-bold">Fees:</span> $35.00 for Class
                      7 / $50.00 for Class 5
                    </li>
                    <li>
                      <span className="font-bold">Required Documents:</span>{" "}
                      Bring permit (work/study) or PR card, passport or BCID,
                      and any previous licenses.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="mb-[20px] border-none">
          <AccordionTrigger className="trigger font-semibold text-[16px] hover:no-underline  data-[state=open]:bg-[#efeeee]">
            I have a driver license from another country, can I use it?
          </AccordionTrigger>
          <AccordionContent className="bg-white">
            <p className="pl-[50px] text-xs pr-[45px] inner-accordion  py-[30px] ">
              You can drive for up to 90 days with a driver’s license from
              another country. To do so, you must have a valid license from your
              home country, and if it’s not in English, you’ll need a certified
              translation provided by an ICBC-approved translator.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="mb-[20px] border-none">
          <AccordionTrigger className="trigger font-semibold text-[16px] hover:no-underline  data-[state=open]:bg-[#efeeee]">
            Where will I be picked up for my driving lesson?
          </AccordionTrigger>
          <AccordionContent className="bg-white">
            <p className="pl-[50px] text-xs pr-[45px] inner-accordion  py-[30px]">
              Our instructors can pick you up from your bus or SkyTrain station.
              If you have other requests, please discuss them with your
              instructor—they may be able to accommodate you. Additional charges
              may apply for locations outside the city boundaries.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="mb-[20px] border-none">
          <AccordionTrigger className="trigger font-semibold text-[16px] hover:no-underline  data-[state=open]:bg-[#efeeee]">
            Method of payment
          </AccordionTrigger>
          <AccordionContent className="bg-white">
            <p className="pl-[50px] text-xs pr-[45px] inner-accordion  py-[30px] ">
              Cash or E-transfer at School{" "}
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6" className="mb-[20px] border-none">
          <AccordionTrigger className="trigger font-semibold text-[16px] hover:no-underline  data-[state=open]:bg-[#efeeee]">
            What lessons do we provide?
          </AccordionTrigger>
          <AccordionContent className="bg-white">
            <p className="pl-[50px] text-xs pr-[45px] inner-accordion py-[30px] ">
              We offer driving lessons for Class5, Class7 and Road testing
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
