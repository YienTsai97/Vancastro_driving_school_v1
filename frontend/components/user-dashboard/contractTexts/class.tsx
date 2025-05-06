
export default function Class({contract} : {contract: string}) {

  return (
    <>
        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-700 mb-3 border-b pb-1">Instructors Responsibilities</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Instructors will behave courteously towards all persons with whom he/she comes in contact when providing services.</li>
            <li>When providing lessons driver instructors shall apply themselves solely to the task and not engage in other activities such as cell phone use, eating or any other activities that are inappropriate or distracting to the learner driver.</li>
            <li>Instructors will comply with the Motor Vehicle Act and its regulation and any other relevant applicable law.</li>
            <li>Instructors will treat all persons equally and with dignity and respect.</li>
            <li>Instructors will conduct themselves professionally and will strive to strengthen and uphold public confidence in the driver training industry.</li>
            <li>Instructors will support road safety and the provision of driver licensing services to British Columbians.</li>
            <li>Instructors will protect the privacy of customers and safeguard any customer records they possess or control in accordance with the Personal Information Protection Act (PIPA).</li>
            <li>Instructors will act with honesty and integrity recognizing they are in a position of trust and authority.</li>
            <li>Instructors are aware of all road rules and regulations and licenses are all current.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-700 mb-3 border-b pb-1">Student Expectations</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Student is mentally, and emotionally fit to undertake the driving lessons, and that their present driver&apos;s license is valid for driving in BC, Canada for the duration of my driving lessons.</li>
            <li>Vancastro driving school services do not include road tests, however we can make an appointment on your behave for the road test.</li>
            <li>The student declares that they hold harmless VanCastro Driving School, of and from all claims, demand, losses, causes of action, damage, lawsuits, judgments, including reasonable attorneys&apos; fees and costs, arising out of or relating to any disputes arising out of any lawfully provided services.</li>
            <li>All lessons will be individual, one on one unless otherwise both parties agree between instructor and student for additional persons being in the vehicle, and their reason for attending the lesson. There will be a maximum of three people.</li>
          </ul>
        </section>

        <section className="mb-6 text-sm">
          <h2 className="text-xl font-bold text-blue-700 mb-3 border-b pb-1">Fees One lesson</h2>
          <div className="pl-5">
            <h3 className="font-semibold text-lg mb-2">
              {contract === "CLASS_7" && <p>Class 7</p>}
              {contract === "CLASS_5" && <p>Class 5</p>}
              {contract === "CLASS_4" && <p>Class 4</p>}
            </h3>
            <ul className="list-disc pl-5 space-y-3" >
              <li>
                <p className="font-medium">
                Automatic 60 minutes driving lesson (combo of 10 classes) -
                {contract === "CLASS_7" && <>$ 850.00 + taxes</>}
                {contract === "CLASS_5" && <> $ 70.00 + taxes</>}
                </p>
                <ul className="list-disc pl-8 text-gray-700 text-sm">
                  <li>First class 20 minutes of theoretical review + 40 minutes driving time</li>
                  <li>Subsequent classes 10 minutes of theoretical review + 50 minutes driving time</li>
                </ul>
              </li>
              <li className = "text-sm">
                <p className="font-medium">Automatic, 60 minutes driving lesson – $ 90.00 + taxes</p>
                <ul className="list-disc pl-8 text-gray-700">
                  <li>First class 20 minutes of theoretical review + 40 minutes driving time</li>
                  <li>Subsequent classes 10 minutes of theoretical review + 50 minutes driving time (theoretical review, just if necessary)</li>
                </ul>
              </li>
              <li>
                <p className="font-medium">Automatic, 90 minutes driving lesson – $ 100.00 + taxes</p>
                <ul className="list-disc pl-8 text-gray-700">
                  <li>First class 20 minutes of theoretical review + 70 minutes driving time</li>
                  <li>Subsequent classes 10 minutes of theoretical review + 80 minutes driving time (theoretical review, just if necessary)</li>
                </ul>
              </li>
              <li>
                <p className="font-medium">Automatic 45 minutes lesson & car rental for road test – $ 150.00 + taxes</p>
                <ul className="list-disc pl-8 text-gray-700">
                  <li>45 minutes Warm-up to review and be prepared + rental car for road test</li>
                </ul>
              </li>
            </ul>
            <p className="mt-3 text-sm italic">Note - ICBC Road test and licensing fees are not included. Prices are subject to change without notice.</p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-700 mb-3 border-b pb-1">Cancellations</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>To cancel the lesson, please give us a notice within 48 hours, otherwise, a cancellation fee of $30.00 will be assessed. Same day or last-minute cancellation will cost full lesson fee or you will lose the lesson.</li>
            <li>Note: For canceling a road test appointment made by, VanCastro Driving School, we require 72 hours of notice, as we must notify ICBC. Failure to give Vancastro Driving School sufficient notice may result in the student being charged a $25.00 road test cancellation fee to ICBC.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-700 mb-3 border-b pb-1">Late</h2>
          <p className="pl-5 text-sm">If you are late beyond 15 Minutes, the instructor will leave and you will be considered as a 	&apos;NO SHOW	&apos; lesson (no refund or reschedule for that lesson).</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-700 mb-3 border-b pb-1">Refunds</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>There will be no refund for driving lessons regardless of the outcome of the road test, all lessons purchased are final sale and non-transferable.</li>
            <li>Refunds will be paid for unused lessons provided notice is received by Vancastro driving School, 48 hours prior to the scheduled lesson(s). The cancellation fee will apply to refunds requested within 48 hours of a scheduled lesson.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-700 mb-3 border-b pb-1">General Policies</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Student must provide a valid BC Learners Driver	&apos;s License before any lesson.</li>
            <li>Student must be dressed appropriately and wear proper footwear (no heels).</li>
            <li>All students have to be registered and paid in advance and no later than the first lesson.</li>
            <li>Vancastro Driving School, may cancel your scheduled appointment for any unforeseen circumstances. For example, instructor being sick, car breaking down, or poor road conditions. Students will be notified as soon as possible. The lesson will be rescheduled.</li>
            <li>Vancastro Driving School can cancel your lesson with NO refunds if the student is suspected of being under the influence of alcohol, drugs, or using foul, abusive, or aggressive language.</li>
            <li>If a student causes a crash and found at fault by ICBC then deductible amount as per Insurance Policy will have to be paid by the student.</li>
            <li>If students are being disrespectful, threatening, or posing any danger the lesson will be cancelled with no refund and will be banned from returning to the school.</li>
            <li>All lessons will be individual, one on one unless otherwise both parties agree between instructor and student for additional persons being in the vehicle, and their reason for attending the lesson. There will be a maximum of three people.</li>
          </ul>
        </section>
        </>
  );
}
