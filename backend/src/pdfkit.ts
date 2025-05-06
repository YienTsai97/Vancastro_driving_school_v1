//Things needed to do
//Get data
// -Signature Base64 string
// -User (name & id) full name for name section, id for unique value to contract
// -Date of signature
// -Type of contract signed
//Delete PDF after downloading on the pdf folder?

export const generatePDF = () => {
  const PDFDocument = require("pdfkit");
  const fs = require("fs");

  const doc = new PDFDocument();

  //mockdata
  const user = "Juan"; // This is the User info (ex: name, id, last name)
  let contract = "Class5"; //This is the type of contract

  doc.pipe(
    fs.createWriteStream(`pdf/VanCastro${contract}Contract_${user}.pdf`)
  ); // store in directory and give uniquevalue to name

  //This is the header
  doc.font("Helvetica-Bold").fontSize(20);
  doc.text("VanCastro Driving School Policy Guide", { underline: "true" });
  doc.text("Class 4 Restricted and Unrestricted", {
    align: "center",
    underline: "true",
  });
  doc.moveDown();

  //instructor responsibilities
  doc.fontSize(10);
  doc.text("Instructors Responsibilities", { underline: "true" });
  doc.font("Helvetica");
  doc.text(
    "Instructors will behave courteously towards all persons with whom he/she comes in contact when providing services."
  );
  doc.text(
    "When providing lessons driver instructors shall apply themselves solely to the task and not engage in other activities such as cell phone use, eating or any other activities that are inappropriate or distracting to the learner driver. "
  );
  doc.text(
    "Instructors will comply with the Motor Vehicle Act and its regulation and any other relevant applicable law. "
  );
  doc.text(
    "Instructors will treat all persons equally and with dignity and respect. "
  );
  doc.text(
    "Instructors will conduct themselves professionally and will strive to strengthen and uphold public confidence in the driver training industry. "
  );
  doc.text(
    "Instructors will support road safety and the provision of driver licensing services to British Columbians. "
  );
  doc.text(
    "Instructors will protect the privacy of customers and safeguard any customer records they possess or control in accordance with the Personal Information Protection Act (PIPA). "
  );
  doc.text(
    "Instructors will act with honesty and integrity recognizing they are in a position of trust and authority. "
  );
  doc.text(
    "Instructors are aware of all road rules and regulations and licenses are all current.  "
  );
  doc.moveDown();

  doc.font("Helvetica-Bold");
  doc.text("Student Expectations ", { underline: "true" });
  doc.font("Helvetica");
  doc.text(
    "Student is mentally, and emotionally fit to undertake the driving lessons, and that their present driver’s license is valid for driving in BC, Canada for the duration of my driving lessons. "
  );
  doc.text(
    "Vancastro driving school services do not include road tests, however we can make an appointment on your behave for the road test. "
  );
  doc.text(
    "The student declares that they hold harmless VanCastro Driving School, of and from all claims, demand, losses, causes of action, damage, lawsuits, judgments, including reasonable attorneys’ fees and costs, arising out of or relating to any disputes arising out of any lawfully provided services. "
  );
  doc.text(
    "All lessons will be individual, one on one unless otherwise both parties agree between instructor and student for additional persons being in the vehicle, and their reason for attending the lesson. There will be a maximum of three people."
  );
  doc.moveDown();

  //changing data here
  //There's 3 types of contracts Class 7/ Class 5/ Class 4

  if (contract === "Class7") {
    //contract class 7 info
    doc.font("Helvetica-Bold");
    doc.text("Fees One Lesson", { underline: "true" });
    doc.font("Helvetica");
    doc.text("Class 7");
    doc.text(
      "- Automatic 60 minutes driving lesson (combo of 10 classes) – $ 850.00 + taxes"
    );
    doc.text(
      "• First class 20 minutes of theoretical review + 40 minutes driving time",
      { indent: 20 }
    );
    doc.text(
      "• Subsequent classes 10 minutes of theoretical review + 50 minutes driving time",
      { indent: 20 }
    );
    doc.text("- Automatic, 60 minutes driving lesson – $ 90.00 + taxes");
    doc.text(
      "• First class 20 minutes of theoretical review + 40 minutes driving time",
      { indent: 20 }
    );
    doc.text(
      "• Subsequent classes 10 minutes of theoretical review + 50 minutes driving time (theoretical review, just if necessary)",
      { indent: 20 }
    );
    doc.text("- Automatic, 90 minutes driving lesson – $ 100.00 + taxes");
    doc.text(
      "• First class 20 minutes of theoretical review + 70 minutes driving time",
      { indent: 20 }
    );
    doc.text(
      "• Subsequent classes 10 minutes of theoretical review + 80 minutes driving time (theoretical review, just if necessary)",
      { indent: 20 }
    );
    doc.text(
      "- Automatic 45 minutes lesson & car rental for road test – $ 150.00 + taxes"
    );
    doc.text(
      "• 45 minutes Warm-up to review and be prepared + rental car for road test",
      { indent: 20 }
    );
  }

  if (contract === "Class5") {
    //contract class 5 info
    doc.font("Helvetica-Bold");
    doc.text("Fees", { underline: "true" });
    doc.font("Helvetica");
    doc.text("Class 5");
    doc.text("- Automatic, 60 minutes driving lesson – $ 70.00 + taxes");
    doc.text(
      "• First class 20 minutes of theoretical review + 40 minutes driving time",
      { indent: 20 }
    );
    doc.text(
      "• Subsequent classes 10 minutes of theoretical review + 50 minutes driving time (theoretical review, just if necessary)",
      { indent: 20 }
    );
    doc.text("- Automatic, 90 minutes driving lesson – $ 90.00 + taxes");
    doc.text(
      "• First class 20 minutes of theoretical review + 70 minutes driving time",
      { indent: 20 }
    );
    doc.text(
      "• Subsequent classes 10 minutes of theoretical review + 80 minutes driving time (theoretical review, just if necessary)",
      { indent: 20 }
    );
    doc.text(
      "- Automatic 45 minutes lesson & car rental for road test – $ 150.00 + taxes"
    );
    doc.text(
      "• 45 minutes Warm-up to review and be prepared + rental car for road test",
      { indent: 20 }
    );
  }

  if (contract === "Class4") {
    //contract class 4 info
    doc.font("Helvetica-Bold");
    doc.text("Fees", { underline: "true" });
    doc.font("Helvetica");
    doc.text("Class 4 RESTRICTED");
    doc.text("- Automatic, 60 minutes driving lesson – $ 120.00 + taxes");
    doc.text(
      "• First class 20 minutes of pre trip inspection + 40 minutes driving time",
      { indent: 20 }
    );
    doc.text(
      "• Subsequent classes 10 minutes of theoretical review + 50 minutes driving time (theoretical review, just if necessary)",
      { indent: 20 }
    );
    doc.text("- Automatic, 90 minutes driving lesson – $ 150.00 + taxes");
    doc.text(
      "• First class 20 minutes of pre trip inspection + 70 minutes driving time",
      { indent: 20 }
    );
    doc.text(
      "• Subsequent classes 10 minutes of theoretical review + 80 minutes driving time (theoretical review, just if necessary)",
      { indent: 20 }
    );
    doc.text(
      "- Automatic 60 minutes lesson & car rental for road test – $ 250.00 + taxes"
    );
    doc.text(
      "• 20 minutes pre trip inspection review + 40 minutes Warm-up to review and be prepared + rental car for road test",
      { indent: 20 }
    );
    doc.moveDown();
    doc.text("Class 4 UNRESTRICTED (15 seats van not included)");
    doc.text("- Automatic, 60 minutes driving lesson – $ 120.00 + taxes");
    doc.text(
      "• First class 20 minutes of pre trip inspection + 40 minutes driving time",
      { indent: 20 }
    );
    doc.text(
      "• Subsequent classes 10 minutes of theoretical review + 50 minutes driving time (theoretical review, just if necessary)",
      { indent: 20 }
    );
    doc.text("- Automatic, 90 minutes driving lesson – $ 150.00 + taxes");
    doc.text(
      "• First class 20 minutes of pre trip inspection + 70 minutes driving time",
      { indent: 20 }
    );
    doc.text(
      "• Subsequent classes 10 minutes of theoretical review + 80 minutes driving time (theoretical review, just if necessary)",
      { indent: 20 }
    );
    doc.text(
      "- Automatic 60 minutes lesson & car rental for road test – $ 250.00 + taxes"
    );
    doc.text(
      "• 20 minutes pre trip inspection review + 40 minutes Warm-up to review and be prepared + rental car for road test",
      { indent: 20 }
    );
  }

  //static
  doc.text(
    "Note - ICBC Road test and licensing fees are not included. Prices are subject to change without notice. "
  );
  doc.moveDown();
  doc.font("Helvetica-Bold");
  doc.text("Cancellations", { underline: "true" });
  doc.font("Helvetica");
  doc.text(
    "To cancel the lesson, please give us a notice within 48 hours, otherwise, a cancellation fee of $30.00 will be assessed. Same day or last-minute cancellation will cost full lesson fee or you will lose the lesson. "
  );
  doc.text(
    "Note: For canceling a road test appointment made by, VanCastro Driving School, we require 72 hours of notice, as we must notify ICBC. Failure to give Vancastro Driving School sufficient notice may result in the student being charged a $25.00 road test cancellation fee to ICBC. "
  );
  doc.moveDown();

  doc.font("Helvetica-Bold");
  doc.text("Late", { underline: "true" });
  doc.font("Helvetica");
  doc.text(
    "If you are late beyond 15 Minutes, the instructor will leave and you will be considered as a ‘NO SHOW’ lesson (no refund or reschedule for that lesson). "
  );
  doc.moveDown();

  doc.font("Helvetica-Bold");
  doc.text("Refunds", { underline: "true" });
  doc.font("Helvetica");
  doc.text(
    "There will be no refund for driving lessons regardless of the outcome of the road test, all lessons purchased are final sale and non-transferable. "
  );
  doc.text(
    "Refunds will be paid for unused lessons provided notice is received by Vancastro driving School, 48 hours prior to the scheduled lesson(s). The cancellation fee will apply to refunds requested within 48 hours of a scheduled lesson."
  );
  doc.moveDown();

  doc.font("Helvetica-Bold");
  doc.text("General Policies", { underline: "true" });
  doc.font("Helvetica");
  doc.text(
    "Student must provide a valid BC Learners Driver’s License before any lesson. "
  );
  doc.text(
    "Student must be dressed appropriately and wear proper footwear (no heels). "
  );
  doc.text(
    "All students have to be registered and paid in advance and no later than the first lesson. "
  );
  doc.text(
    "Vancastro Driving School, may cancel your scheduled appointment for any unforeseen circumstances. For example, instructor being sick, car breaking down, or poor road conditions. Students will be notified as soon as possible. The lesson will be rescheduled. "
  );
  doc.text(
    "Vancastro Driving School can cancel your lesson with NO refunds if the student is suspected of being under the influence of alcohol, drugs, or using foul, abusive, or aggressive language."
  );
  doc.text(
    "If a student causes a crash and found at fault by ICBC then deductible amount as per Insurance Policy will have to be paid by the student. "
  );
  doc.text(
    "If students are being disrespectful, threatening, or posing any danger the lesson will be cancelled with no refund and will be banned from returning to the school. "
  );
  doc.text(
    "All lessons will be individual, one on one unless otherwise both parties agree between instructor and student for additional persons being in the vehicle, and their reason for attending the lesson. There will be a maximum of three people."
  );
  doc.text("I have read and understand the above policy guide. ");
  doc.moveDown();

  //mock data
  const date = "12/10/2025";
  doc.text(`Date: ${date}`);
  doc.text(`Student Name:  ${user}`);
  doc.text("Signature:");
  doc.text("Base 64 string signature ");
  doc.end();
};
