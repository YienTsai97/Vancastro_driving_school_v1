"use client"
import Image from 'next/image'
import Link from 'next/link';
import { Button } from '../ui/button';
import { UserType } from '@/types/user.type';
import { ContractType } from '@/types/contract.type';
import Class from '@/components/user-dashboard/contractTexts/class';
import logo from "@/public/assets/logo.png";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {ChevronsLeft, ArrowDownToLine, Loader2} from "lucide-react"


export default function PdfField({student, contract}: {student: UserType, contract: ContractType | null}) {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generatePDF = async () => {
    if (!pdfRef.current) return;
    
    setIsLoading(true);
    
    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
    
      const canvas = await html2canvas(pdfRef.current, { scale: 2 }); 
      const imgData = canvas.toDataURL("image/png");
    
      const imgWidth = 210;
      const pageHeight = 297; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
      let heightLeft = imgHeight;
      let position = 0;
    
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
    
      pdf.save("contract.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const studentName = `${student.firstName} ${student.lastName}`

  if(!contract) return

  let dateObj;
  if (typeof contract.createdAt === "string") {
    dateObj = new Date(contract.createdAt);
  } else {
    dateObj = contract.createdAt; // assuming this is already a Date object
  }
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  
  const monthText = monthNames[dateObj.getMonth()];
  
  const date = ` ${dateObj.getDate()} ${monthText} ${dateObj.getFullYear()}`;

  return (
      <div>
        <div className ="flex justify-between">
          <Link href={"/student/dashboard"}>
            <Button>
              <ChevronsLeft /> Back to Dashboard
            </Button>
          </Link>
          <Button onClick={generatePDF} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <ArrowDownToLine className="mr-2" />
                Save as PDF
              </>
            )}
          </Button>
        </div>
        
        {contract? (
          <div ref={pdfRef}>
            <div className='w-full m-5'>
              <Image
                src={logo}
                height={50}
                width={100}
                alt="Vancastro"
                className='bg-black p-2 rounded-sm'
              />
                <div className='p-6'>
                  <h1 className ="text-center text-xl font-bold">VanCastro Driving School Policy Guide</h1>
                    {contract.licenseClass === "CLASS_5" && <p className ="text-center text-xl font-bold">Class 5</p>}
                    {contract.licenseClass === "CLASS_7" && <p className ="text-center text-xl font-bold">Class 7</p>}
                    {contract.licenseClass === "CLASS_4" && <p className ="text-center text-xl font-bold">Class 4</p>}
                    <div>
                    {contract.licenseClass === "CLASS_5" && <Class contract={contract.licenseClass} />} 
                    {contract.licenseClass === "CLASS_7" && <Class contract={contract.licenseClass} />}
                    {contract.licenseClass === "CLASS_4" && <p>Class 4</p>}
                </div>
              </div>
          <div className ="flex flex-col">
            <div className = "flex flex-row items-center">
              <p>Date:</p>
              <p> {date}</p>
            </div>
            <div className = "flex flex-row items-center">
              <p>Student Name:</p>
              <p> {studentName}</p>
            </div>
            <div className = "flex flex-row items-center">
                <p>Signature: </p>
                <Image
                  src={contract.signature}
                  height={300}
                  width={300}
                  alt="sign"
                />
            </div>
          </div>
            </div>
          </div>
        ) : (
          <>
            <p>Signature not available</p>
            <h2>Get new contract</h2>
            <Link href="/student/contract">
              <Button>
                Click here to get new contract
              </Button>
            </Link>
          </>
        )}
      </div>
  )
}