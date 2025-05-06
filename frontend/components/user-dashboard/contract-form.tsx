"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import logo from "@/public/assets/logo.png";
import { UserType } from "@/types/user.type";
import { createContract } from "@/utils/contractFetch";
import Image from "next/image";
import { useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import Class from "./contractTexts/class";

enum LicenseClass {
  CLASS_4 = "CLASS_4",
  CLASS_5 = "CLASS_5",
  CLASS_7 = "CLASS_7",
}

type formType = {
  userId: number;
  licenseClass: LicenseClass;
  signature: string;
};

export default function ContractForm({ user }: { user: UserType }) {
  const [formData, setFormData] = useState<formType>({
    userId: user.id,
    licenseClass: LicenseClass.CLASS_5,
    signature: "",
  });

  const [sigCanvas, setSigCanvas] = useState<SignatureCanvas | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    console.log(value);
    setFormData((prev) => ({
      ...prev,
      licenseClass: value as LicenseClass,
    }));
  };

  const handleSignatureClear = () => {
    if (sigCanvas) {
      sigCanvas.clear();
      setFormData((prev) => ({
        ...prev,
        signature: "",
      }));
    }
  };

  const handleSignatureEnd = () => {
    if (sigCanvas) {
      const signatureData = sigCanvas.toDataURL();
      setFormData((prev) => ({
        ...prev,
        signature: signatureData,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.signature) {
      alert("Please provide your signature");
      return;
    }

    const res = await createContract(formData);
    if (res) {
      window.location.href = "/student/dashboard";
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="course">License Course</Label>
          <select
            id="course"
            name="course"
            value={formData.licenseClass}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">--Please choose course you want to take--</option>
            <option value="CLASS_4">Class 4</option>
            <option value="CLASS_5">Class 5</option>
            <option value="CLASS_7">Class 7</option>
          </select>
        </div>

        <div className="space-y-2">
          <p>*Scroll to read</p>
          <div className="w-full h-52 overflow-auto border rounded-md">
            <Image
              src={logo}
              height={50}
              width={100}
              alt="Vancastro"
              className="bg-black p-2 rounded-sm"
            />
            <div className="p-6">
              <h1 className="text-center text-2xl font-bold">
                VanCastro Driving School Policy Guide
              </h1>
              {formData.licenseClass === "CLASS_5" && (
                <p className="text-center text-2xl font-bold">Class 5</p>
              )}
              {formData.licenseClass === "CLASS_7" && (
                <p className="text-center text-2xl font-bold">Class 7</p>
              )}
              {formData.licenseClass === "CLASS_4" && (
                <p className="text-center text-2xl font-bold">Class 4</p>
              )}
              <div>
                {formData.licenseClass === "CLASS_5" && (
                  <Class contract={formData.licenseClass} />
                )}
                {formData.licenseClass === "CLASS_7" && (
                  <Class contract={formData.licenseClass} />
                )}
                {formData.licenseClass === "CLASS_4" && <p>Class 4</p>}
              </div>
            </div>
            <Class contract={formData.licenseClass} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signature">Signature</Label>
          <div className="border border-gray-300 rounded-md p-2 bg-gray-50">
            <SignatureCanvas
              ref={(ref) => setSigCanvas(ref)}
              canvasProps={{
                className: "w-full h-40 bg-white border border-gray-200",
              }}
              onEnd={handleSignatureEnd}
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleSignatureClear}
              className="text-sm"
            >
              Clear Signature
            </Button>
          </div>
        </div>

        {formData.signature && (
          <div className="mt-2">
            <p className="text-sm text-green-600">✓ Signature captured</p>
          </div>
        )}

        <div className="pt-4">
          <Button type="submit" className="w-ful py-2 px-4 rounded-md">
            Submit Registration
          </Button>
        </div>
      </form>
    </>
  );
}
