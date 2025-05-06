"use client";
import { minDriverAge } from "@/components/features/date-input-select-check";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserCreateType, UserType } from "@/types/user.type";
import { createPayerInDb } from "@/utils/payerFetch";
import { createUser } from "@/utils/userFetch";
import { useEffect, useState } from "react";
import "./new-user-form.css";

interface ClerkUser {
  clerkId: string;
  email: string;
}
enum LicenseClass {
  CLASS_4 = "CLASS_4",
  CLASS_5 = "CLASS_5",
  CLASS_7 = "CLASS_7",
  NO_LICENSE = "NO_LICENSE",
}

export default function NewUserForm({ clerkUser }: { clerkUser: ClerkUser }) {
  const [newUserForm, setNewUserForm] = useState<Partial<UserType>>({
    clerkId: clerkUser.clerkId,
    firstName: "",
    lastName: "",
    phone: "",
    email: clerkUser.email,
    language: "",
    streetAddress: "",
    unitNumber: "",
    city: "",
    province: "",
    postalCode: "",
    country: "",
    dateOfBirth: new Date().toISOString().split("T")[0],
    licenseNumber: undefined,
    licenseClass: undefined,
    emergencyContactNumber: "",
    emergencyContactName: "",
  });
  // Add validation error state
  const [licenseNumberError, setLicenseNumberError] = useState<string | null>(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Special handling for license class
    if (name === "licenseClass") {
      setNewUserForm((prevState) => ({
        ...prevState,
        [name]: (value as LicenseClass) || undefined,
      }));
      return;
    }

    // Special handling for dateOfBirth
    if (name === "dateOfBirth") {
      setNewUserForm((prevState) => ({
        ...prevState,
        [name]: value || "",
      }));
      return;
    }

    // Handle license number with validation
    if (name === "licenseNumber") {
      // Clear previous errors
      setLicenseNumberError(null);

      // Ensure input is numeric and within appropriate range
      if (value) {
        const numValue = Number(value);

        // Validate license number format based on license class
        if (isNaN(numValue) || !validateLicenseNumber(numValue)) {
          setLicenseNumberError("Invalid license number format");

          // Still update form but keep as string to preserve user input
          setNewUserForm((prevState) => ({
            ...prevState,
            [name]: value ? Number(value) : undefined,
          }));
          return;
        }

        setNewUserForm((prevState) => ({
          ...prevState,
          [name]: numValue,
        }));
      } else {
        setNewUserForm((prevState) => ({
          ...prevState,
          [name]: undefined,
        }));
      }
      return;
    }

    // Default handling for other fields
    setNewUserForm((prevState) => ({
      ...prevState,
      [name]: value || "",
    }));
  };

  useEffect(() => {
    if (newUserForm.licenseClass === LicenseClass.NO_LICENSE) {
      setNewUserForm((prevState) => ({
        ...prevState,
        licenseNumber: 0
      }))
    }
  }, [newUserForm.licenseClass])

  // License number validation helper function
  const validateLicenseNumber = (licenseNumber: number): boolean => {
    // License number should be a positive integer
    if (licenseNumber <= 0 || !Number.isInteger(licenseNumber)) {
      return false;
    }

    // License number should be between 7-9 digits based on standards
    const licenseString = licenseNumber.toString();
    if (licenseString.length < 7 || licenseString.length > 9) {
      return false;
    }

    // Additional validation rules based on license class if needed
    if (newUserForm.licenseClass) {
      switch (newUserForm.licenseClass) {
        case LicenseClass.CLASS_4:
        case LicenseClass.CLASS_5:
        case LicenseClass.CLASS_7:
        case LicenseClass.NO_LICENSE:
          // Add specific rules for each license class if needed
          return true;
        default:
          return true;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Ensure required fields before submission
    if (validateForm()) {
      const response = await createUser({
        ...newUserForm,
        role: newUserForm.role ? newUserForm.role : "", // Ensure role is a string
      } as UserCreateType);
      if (response) {
        // Create payer in the database
        const payerResponse = await createPayerInDb({
          userId: response.id,
          firstName: newUserForm.firstName,
          lastName: newUserForm.lastName,
          email: newUserForm.email,
          phone: newUserForm.phone,
          streetAddress: newUserForm.streetAddress,
          city: newUserForm.city,
          province: newUserForm.province,
          postalCode: newUserForm.postalCode,
          country: newUserForm.country,
        });
        if (payerResponse) {
          handleClearUser();
          window.location.href = "/student/contract"; //just changed dashboard to contract
        }
      } else {
        console.error("Failed to create user");
      }
    }
  };

  const validateForm = () => {
    // Validate license number if license class is selected
    if (
      newUserForm.licenseClass && newUserForm.licenseClass !== LicenseClass.NO_LICENSE &&
      (!newUserForm.licenseNumber || licenseNumberError)
    ) {
      setLicenseNumberError("Valid license number is required");
      return false;
    }

    // Check if license number is provided without a license class
    if (newUserForm.licenseNumber && !newUserForm.licenseClass) {
      setLicenseNumberError("Please select a license class");
      return false;
    }

    // Additional validation rules can be added here
    return true;
  };

  const handleClearUser = () => {
    setNewUserForm({
      clerkId: clerkUser.clerkId,
      firstName: "",
      lastName: "",
      phone: "",
      language: "",
      email: clerkUser.email,
      streetAddress: "",
      unitNumber: "",
      city: "",
      province: "",
      postalCode: "",
      country: "",
      dateOfBirth: new Date().toISOString().split("T")[0],
      licenseNumber: undefined,
      licenseClass: undefined,
      emergencyContactNumber: "",
      emergencyContactName: "",
    });
    setLicenseNumberError(null);
  };

  return (
    <div className="m-auto w-[700px] pt-6 new-user-form">
      <div className="text-center text-[28px] font-medium">
        <h1>Welcome New User</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-[25px] md:gap-[20px] px-[15px] py-[20px] lg:px-[36px] lg:py-[24px] rounded-2xl h-full"
      >
        <label>Personal Profile</label>
        <div>
          <Input
            type='text'
            name='firstName'
            value={newUserForm.firstName}
            onChange={handleChange}
            placeholder='First Name'
            required
          />
          <Input
            type='text'
            name='lastName'
            value={newUserForm.lastName}
            onChange={handleChange}
            placeholder='Last Name'
            required
          />
        </div>
        <div>
          <Input
            type='tel'
            inputMode='numeric'
            pattern='\d{10}'
            maxLength={10}
            name='phone'
            value={newUserForm.phone}
            onChange={handleChange}
            placeholder='Phone'
            required
          />
          <div>
            <select
              name='language'
              id='language'
              value={newUserForm.language}
              onChange={handleChange}
              required
            >
              <option value='' className='text-gray-500' disabled>
                Language
              </option>
              <option value='english' key='english'>
                English
              </option>
              <option value='português' key='português'>
                Português
              </option>
            </select>
          </div>
          <Input
            type='date'
            name='dateOfBirth'
            max={minDriverAge()}
            value={newUserForm.dateOfBirth}
            onChange={handleChange}
            placeholder='Date of Birth'
            required
          />
        </div>

        <label>Address</label>
        <div>
          <Input
            type='text'
            name='streetAddress'
            value={newUserForm.streetAddress}
            onChange={handleChange}
            placeholder='Street Address'
            required
          />
          <Input
            type='text'
            name='unitNumber'
            value={newUserForm.unitNumber}
            onChange={handleChange}
            placeholder="Unit Number (optional)"
          />
          <Input
            type='text'
            name='city'
            value={newUserForm.city}
            onChange={handleChange}
            placeholder='City'
            required
          />
        </div>
        <div>
          <Input
            type='text'
            name='province'
            value={newUserForm.province}
            onChange={handleChange}
            placeholder='Province'
            required
          />
          <Input
            type='text'
            name='postalCode'
            pattern='[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d'
            value={newUserForm.postalCode}
            onChange={handleChange}
            placeholder='Postal Code'
            required
          />
          <Input
            type='text'
            name='country'
            value={newUserForm.country}
            onChange={handleChange}
            placeholder='Country'
            required
          />
        </div>

        <label>License</label>
        <div>
          <div>
            <select
              name='licenseClass'
              id='licenseClass'
              value={newUserForm.licenseClass}
              onChange={handleChange}
              required
            >
              <option value='' className='text-gray-500' disabled>
                License Class
              </option>
              <option value={LicenseClass.CLASS_4} key={LicenseClass.CLASS_4}>
                Class 4
              </option>
              <option value={LicenseClass.CLASS_5} key={LicenseClass.CLASS_5}>
                Class 5
              </option>
              <option value={LicenseClass.CLASS_7} key={LicenseClass.CLASS_7}>
                Class 7
              </option>
              <option value={LicenseClass.NO_LICENSE} key={LicenseClass.NO_LICENSE}>
                No License
              </option>
            </select>
          </div>
          <div className="w-full license-number-container">
            <Input
              type='number'
              inputMode='numeric'
              name='licenseNumber'
              value={
                newUserForm.licenseNumber === undefined || newUserForm.licenseNumber == 0
                  ? ""
                  : newUserForm.licenseNumber
              }
              onChange={handleChange}
              placeholder="License Number"
              disabled={newUserForm.licenseClass === LicenseClass.NO_LICENSE}
              required={newUserForm.licenseClass !== LicenseClass.NO_LICENSE}
              min="1000000" // Minimum 7 digits
              max="99999999" // Maximum 8 digits
              className="w-full md:max-w-[276px]"
            />
            {licenseNumberError && (
              <div className='text-red-500 text-sm mt-1'>
                {licenseNumberError}
              </div>
            )}
          </div>
        </div>

        <label>Emergency Contact</label>
        <div>
          <Input
            type='text'
            name='emergencyContactName'
            value={newUserForm.emergencyContactName}
            onChange={handleChange}
            placeholder='Name'
            required
          />
          <Input
            type='tel'
            inputMode='numeric'
            pattern='\d{10}'
            maxLength={10}
            name='emergencyContactNumber'
            value={newUserForm.emergencyContactNumber}
            onChange={handleChange}
            placeholder='Phone'
            required
          />
        </div>

        <Button
          type='submit'
          className='bg-[#FFCE47] text-black lg:bg-[#333333] lg:text-[#FFF5D8] hover:bg-[#FFF5D8] lg:hover:bg-[#4e4330] text-[20px] font-bold w-full h-[35px] lg:h-[45px]'
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
