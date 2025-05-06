"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import "./accordion.css";

export default function PolicyAccordion() {
  return (
    <div className="container mx-auto">
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1" className="mb-[20px] border-none">
          <AccordionTrigger className="trigger font-semibold text-[16px] hover:no-underline  data-[state=open]:bg-[#efeeee]">
            General Policies
          </AccordionTrigger>
          <AccordionContent>
            <Accordion type="multiple" className="inner-accordion">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="trigger2 hover:no-underline font-semibold">
                  General Policies
                </AccordionTrigger>
                <AccordionContent className="pl-[50px] pr-[45px]">
                  <ul className="text-xs list-disc ml-[15px]">
                    <li>
                      Student must provide a valid BC Learners Driver’s License
                      before any lesson.
                    </li>
                    <li>
                      Student must be dressed appropriately and wear proper
                      footwear (no heels).
                    </li>
                    <li>
                      All students have to be registered and paid in advance and
                      no later than the first lesson.
                    </li>
                    <li>
                      Vancastro Driving School, may cancel your scheduled
                      appointment for any unforeseen circumstances. For example,
                      instructor being sick, car breaking down, or poor road
                      conditions. Students will be notified as soon as possible.
                      The lesson will be rescheduled.
                    </li>
                    <li>
                      Vancastro Driving School can cancel your lesson with NO
                      refunds if the student is suspected of being under the
                      influence of alcohol, drugs, or using foul, abusive, or
                      aggressive language.
                    </li>
                    <li>
                      If a student causes a crash and found at fault by ICBC
                      then deductible amount as per Insurance Policy will have
                      to be paid by the student.
                    </li>
                    <li>
                      If students are being disrespectful, threatening, or
                      posing any danger the lesson will be cancelled with no
                      refund and will be banned from returning to the school.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-none">
                <AccordionTrigger className="trigger2 hover:no-underline font-semibold">
                  Late
                </AccordionTrigger>
                <AccordionContent className="pl-[50px] text-xs  pr-[45px]">
                  If you are late beyond 15 Minutes, the instructor will leave
                  and you will be considered as a ‘NO SHOW’ lesson (no refund or
                  reschedule for that lesson).
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="mb-[20px] border-none">
          <AccordionTrigger className="trigger font-semibold text-[16px] hover:no-underline  data-[state=open]:bg-[#efeeee]">
            Cancellation & Refund Policies
          </AccordionTrigger>
          <AccordionContent>
            <Accordion type="multiple" className="inner-accordion">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="trigger2 hover:no-underline font-semibold">
                  Cancellations
                </AccordionTrigger>
                <AccordionContent className="pl-[50px] text-xs pr-[45px]">
                  <ul className="list-disc ml-[15px]">
                    <li>
                      To cancel the lesson, please give us a notice within 48
                      hours, otherwise, a cancellation fee of $30 will be
                      assessed. Same day or last minute cancellation will cost
                      full lesson fee or you will lose the lesson.
                    </li>
                    <li>
                      Class 5 - Automatic 30 min. lesson & car rental for road
                      test – $ ___
                    </li>
                  </ul>
                  <div className="font-semibold bg-[#f3b4b4] p-3 text-xs mt-[20px] max-w-[650px] rounded-sm">
                    <h3 className="mb-[8px]">DI Note</h3>
                    <p>
                      For canceling a road test appointment made by, VanCastro
                      Driving School, We require 72 hours of notice, as we must
                      notify ICBC. Failure to give Vancastro Driving School
                      sufficient notice may result in the student being charged
                      a $25 road test cancellation fee to ICBC.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-none">
                <AccordionTrigger className="trigger2 hover:no-underline font-semibold">
                  Refund
                </AccordionTrigger>
                <AccordionContent className="pl-[50px] text-xs  pr-[45px]">
                  <ul className="list-disc ml-[15px]">
                    <li>
                      There will be no refund for driving lessons regardless of
                      the outcome of the road test, all lessons purchased are
                      final sale and non-transferable.
                    </li>
                    <li>
                      Refunds will be paid for unused lessons provided notice is
                      received by Vancastro driving School, 48 hours prior to
                      the scheduled lesson(s). The cancellation fee will apply
                      to refunds requested within 48 hours of a scheduled
                      lesson.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-none">
                <AccordionTrigger className="trigger2 hover:no-underline font-semibold">
                  Fees
                </AccordionTrigger>
                <AccordionContent className="pl-[50px]  pr-[45px] text-xs">
                  <ul className="list-disc ml-[15px]">
                    <li>
                      Class 5 - Automatic, 90 minutes driving lesson – $__
                    </li>
                    <li>
                      Class 5 - Automatic 30 min. lesson & car rental for road
                      test – $ ___
                    </li>
                  </ul>
                  <div className="font-semibold bg-[#f3b4b4] p-3 text-xs mt-[20px] max-w-[650px] rounded-sm">
                    <h3 className="mb-[8px]">DI Note</h3>
                    <p>
                      ICBC Road test and licensing fees are not included. Prices
                      are subject to change without notice.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="mb-[20px] border-none">
          <AccordionTrigger className="trigger font-semibold text-[16px] hover:no-underline  data-[state=open]:bg-[#efeeee]">
            Roles & Expectations
          </AccordionTrigger>
          <AccordionContent>
            <Accordion type="multiple" className="inner-accordion">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="trigger2 hover:no-underline font-semibold">
                  Instructor Responsibilities
                </AccordionTrigger>
                <AccordionContent className="pl-[50px] text-xs pr-[45px]">
                  <ul className="list-disc ml-[15px]">
                    <li>
                      Instructors will behave courteously towards all persons
                      with whom he/she comes in contact when providing services.
                    </li>
                    <li>
                      When providing lessons driver instructors shall apply
                      themselves solely to the task and not engage in other
                      activities such as cell phone use, eating or any other
                      activities that are inappropriate or distracting to the
                      learner driver.
                    </li>
                    <li>
                      Instructors will comply with the Motor Vehicle Act and its
                      regulation and any other relevant applicable law.
                    </li>
                    <li>
                      Instructors will treat all persons equally and with
                      dignity and respect.
                    </li>
                    <li>
                      Instructors will conduct themselves professionally and
                      will strive to strengthen and uphold public confidence in
                      the driver training industry.
                    </li>
                    <li>
                      Instructors will support road safety and the provision of
                      driver licensing services to British Columbians.
                    </li>
                    <li>
                      Instructors will protect the privacy of customers and
                      safeguard any customer records they possess or control in
                      accordance with the Personal Information Protection Act
                      (PIPA).
                    </li>
                    <li>
                      Instructors will act with honesty and integrity
                      recognizing they are in a position of trust and authority.
                      Instructors are aware of all road rules and regulations
                      and licenses are all current.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-none">
                <AccordionTrigger className="trigger2 hover:no-underline font-semibold">
                  Student expectations
                </AccordionTrigger>
                <AccordionContent className="pl-[50px] text-xs  pr-[45px]">
                  <ul className="list-disc ml-[15px]">
                    <li>
                      Student must provide a valid BC Learners Driver’s License
                      before any lesson.
                    </li>
                    <li>
                      Student must be dressed appropriately and wear proper
                      footwear (no heels).
                    </li>
                    <li>
                      All students have to be registered and paid in advance and
                      no later than the first lesson.
                    </li>
                    <li>
                      Vancastro Driving School, may cancel your scheduled
                      appointment for any unforeseen circumstances. For example,
                      instructor being sick, car breaking down, or poor road
                      conditions. Students will be notified as soon as possible.
                      The lesson will be rescheduled.
                    </li>
                    <li>
                      Vancastro Driving School can cancel your lesson with NO
                      refunds if the student is suspected of being under the
                      influence of alcohol, drugs, or using foul, abusive, or
                      aggressive language.
                    </li>
                    <li>
                      If a student causes a crash and found at fault by ICBC
                      then deductible amount as per Insurance Policy will have
                      to be paid by the student.
                    </li>
                    <li>
                      Student must be dressed appropriately and wear proper
                      footwear (no heels).
                    </li>
                    <li>
                      If students are being disrespectful, threatening, or
                      posing any danger the lesson will be cancelled with no
                      refund and will be banned from returning to the school.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="mb-[20px] border-none">
          <AccordionTrigger className="trigger font-semibold text-[16px] hover:no-underline  data-[state=open]:bg-[#efeeee]">
            Covid 19 Policies
          </AccordionTrigger>
          <AccordionContent>
            <Accordion type="multiple" className="inner-accordion">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="trigger2 hover:no-underline font-semibold">
                  Health and Safety protocols
                </AccordionTrigger>
                <AccordionContent className="pl-[50px] text-xs pr-[45px]">
                  <ul className="list-disc ml-[15px]">
                    <li>
                      Vancastro Driving School will ensure all touch surfaces
                      have been disinfected before and after each lesson.
                    </li>
                    <li>
                      Mask or face coverings are not required however students
                      are free to use them and also request the instructor to
                      wear one if they so desire.
                    </li>
                    <li>
                      Students will be asked general health questions before the
                      lesson and the instructors reserves the right to cancel
                      the lesson if they deem the student to not be fit to do
                      the lesson.
                    </li>
                    <li>
                      The instructor reserves the right and discretion to cancel
                      a lesson for any health or suspected health reason or
                      concern.
                    </li>
                    <li>
                      If a student has been diagnosed with COVID-19, suspected
                      of having it, or been ordered to self-isolate or
                      quarantine by a public health authority they must inform
                      the school as soon as possible.
                    </li>
                    <li>
                      In the event of local/community outbreaks Vancastro
                      driving school reserves the right to cancel/postpone
                      lessons which will be rescheduled for a later date.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
