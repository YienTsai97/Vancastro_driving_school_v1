"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { LicenseClass } from "@/types/enums";
import { LessonTypeInterface } from "@/types/lessonType.type";
import { PayerRequestData, PayerType } from "@/types/payer.types";
import { PurchaseItemRequestData, PurchaseStatus } from "@/types/purchase.type";
import { createPayerInDb } from "@/utils/payerFetch";
import { createPurchase } from "@/utils/purchaseFetch";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "../lesson-form.css";
import LessonTypeCard from "./lesson-type-card";

type Props = {
  userId: number;
  payers: Partial<PayerType>[];
  licenseClass: LicenseClass;
  lessonTypes: LessonTypeInterface[];
};

export default function PurchaseLessonForm({
  userId,
  payers,
  licenseClass,
  lessonTypes,
}: Props) {
  const router = useRouter();
  const [quantities, setQuantities] = useState<{
    [lessonTypeId: number]: number;
  }>({});
  const [payerId, setPayerId] = useState<number | "new_payer" | null>(null);
  const [newPayer, setNewPayer] = useState<Partial<PayerRequestData>>({});

  const classNumberStr = licenseClass.replace("CLASS_", "");

  const handleChange = (id: number, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [id]: quantity }));
  };

  const getSelectedLessonNamebyId = (inputId: number): string => {
    const lesson = lessonTypes.find(
      (lessontype) => lessontype.id === Number(inputId)
    );
    if (!lesson) return "";
    //Road Test
    if (lesson.lessonName === "Road Test") {
      return `${lesson.lessonName}`;
    }
    //Package
    if (lesson.count > 1) {
      return `${lesson.lessonLength} min - ${lesson.count} Lessons Package`;
    }
    return `${lesson.lessonLength} min ${lesson.lessonName}`;
  };

  const getQtySum = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  const getTotalPrice = () => {
    return lessonTypes.reduce((total, lesson) => {
      const quantity = quantities[lesson.id] || 0;
      return total + lesson.price * quantity;
    }, 0);
  };

  const handlePurchaseLessons = async (e: React.FormEvent) => {
    e.preventDefault();
    // Create purchase items
    const purchaseItems: PurchaseItemRequestData[] = [];
    for (const [key, value] of Object.entries(quantities)) {
      const lessonTypeId = Number(key);
      const lessonType = lessonTypes.find(
        (lessonType) => lessonType.id === lessonTypeId
      );
      if (!lessonType) {
        continue;
      }
      const unitPrice = lessonType.price * value;

      const purchaseItem = {
        lessonTypeId,
        quantity: value,
        unitPrice,
      };
      purchaseItems.push(purchaseItem);
    }

    // Send requests
    try {
      let payerIdToUse = payerId;
      // Send request to create payer if payerId is "new_payer"
      if (payerId === "new_payer") {
        if (
          !newPayer.firstName ||
          !newPayer.lastName ||
          !newPayer.email ||
          !newPayer.phone ||
          !newPayer.streetAddress ||
          !newPayer.city ||
          !newPayer.province ||
          !newPayer.postalCode ||
          !newPayer.country
        ) {
          console.error("All fields are required");
          return;
        }
        const payerRequestBody: PayerRequestData = {
          userId,
          firstName: newPayer.firstName!,
          lastName: newPayer.lastName!,
          email: newPayer.email!,
          phone: newPayer.phone!,
          streetAddress: newPayer.streetAddress!,
          city: newPayer.city!,
          province: newPayer.province!,
          postalCode: newPayer.postalCode!,
          country: newPayer.country!,
        };
        const payerRes = await createPayerInDb(payerRequestBody);
        if (!payerRes.success) {
          console.error("Failed to create new payer", payerRes.message);
          return;
        }
        payerIdToUse = payerRes.data?.id!;
      }

      // Send request to create purchase

      // Prepare request body for purchase
      const requestBody = {
        userId,
        payerId: payerIdToUse,
        licenseClass,
        status: PurchaseStatus.PENDING,
        purchaseItems,
      };

      const res = await createPurchase(requestBody);
      if (!res.success) {
        console.error("Failed to purchase lessons", res.message);
      }
      if (res.success) {
        toast({
          variant: "success",
          description: "Lessons purchased successfully",
        });
        setTimeout(() => {
          router.push("/student/lessons");
        }, 1500);
      }
    } catch (error) {
      console.error("Error purchasing lessons", error);
    }
  };

  return (
    <div>
      <form className='flex flex-col gap-5' onSubmit={handlePurchaseLessons}>
        <div className='flex m-auto text-sm text-white font-medium text-center p-1 bg-[#2f2f2f] rounded-full w-fit'>
          <div className='bg-[#FECE46] text-[#2f2f2f] px-4 py-2 rounded-full'>
            Class {classNumberStr} Review
          </div>
        </div>

        <div className='md:columns-2 gap-5'>
          {lessonTypes.map((lessonType) => (
            <LessonTypeCard
              key={lessonType.id}
              lessonType={lessonType}
              quantity={quantities[lessonType.id] || 0}
              handleChange={handleChange}
            />
          ))}
        </div>

        {getTotalPrice() != 0 && (
          <Drawer>
            <DrawerTrigger className='fixed right-7 bottom-7 size-14 rounded-full bg-[#FFCE47] z-10 shadow-md'>
              <div className=' relative size-full flex justify-center items-center'>
                <div className='absolute top-0 right-0 size-6 rounded-full font-semibold text-white bg-red-500'>
                  {getQtySum()}
                </div>
                <ShoppingCart className='text-white size-7 pr-1' />
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className='gap-4 p-6'>
                <DrawerTitle className='text-center'>
                  Purchase Information
                </DrawerTitle>
                <DrawerDescription></DrawerDescription>
                <div className='flex flex-col gap-2'>
                  {Object.entries(quantities).map(
                    ([lessonTypeId, quantity]) => (
                      <p
                        key={lessonTypeId}
                        className='flex justify-between text-left items-end border-b-2'
                      >
                        {getSelectedLessonNamebyId(Number(lessonTypeId))}{" "}
                        <span className='font-semibold'> {quantity}</span>
                      </p>
                    )
                  )}
                </div>
                <DrawerTitle className='text-center'>
                  Purchase Payer
                </DrawerTitle>
                <DrawerDescription></DrawerDescription>
                <div className='flex flex-col gap-2'>
                  {payers.map((payer) => (
                    <p
                      key={payer.id}
                      className='flex gap-4 text-left items-end border-b-2'
                    >
                      <input
                        type='radio'
                        name='payer'
                        id={`payer_${payer.id}`}
                        value={payer.id}
                        onChange={(e) => setPayerId(Number(e.target.value))}
                      />
                      <label htmlFor={`payer_${payer.id}`}>
                        {payer.firstName} {payer.lastName}
                      </label>
                    </p>
                  ))}
                  <p className='flex gap-4 text-left items-end border-b-2'>
                    <input
                      type='radio'
                      name='payer'
                      id='new_payer'
                      value='new_payer'
                      onChange={(e) => setPayerId("new_payer")}
                    />
                    <label htmlFor='new_payer'>Create a new payer</label>
                  </p>
                  {payerId === "new_payer" && (
                    <div className='flex flex-col gap-2'>
                      <div className='flex gap-2'>
                        <Input
                          type='text'
                          name='firstName'
                          placeholder='First Name'
                          className='border-2 border-gray-300 rounded-lg p-2'
                          onChange={(e) =>
                            setNewPayer({
                              ...newPayer,
                              firstName: e.target.value,
                            })
                          }
                        />
                        <Input
                          type='text'
                          name='lastName'
                          placeholder='Last Name'
                          className='border-2 border-gray-300 rounded-lg p-2'
                          onChange={(e) =>
                            setNewPayer({
                              ...newPayer,
                              lastName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <Input
                        type='text'
                        name='email'
                        placeholder='Email'
                        className='border-2 border-gray-300 rounded-lg p-2'
                        onChange={(e) =>
                          setNewPayer({ ...newPayer, email: e.target.value })
                        }
                      />
                      <Input
                        type='text'
                        name='phone'
                        placeholder='Phone Number'
                        className='border-2 border-gray-300 rounded-lg p-2'
                        onChange={(e) =>
                          setNewPayer({ ...newPayer, phone: e.target.value })
                        }
                      />
                      <Input
                        type='text'
                        name='streetAddress'
                        placeholder='Street Address'
                        className='border-2 border-gray-300 rounded-lg p-2'
                        onChange={(e) =>
                          setNewPayer({
                            ...newPayer,
                            streetAddress: e.target.value,
                          })
                        }
                      />
                      <div className='flex gap-2'>
                        <Input
                          type='text'
                          name='city'
                          placeholder='City'
                          className='border-2 border-gray-300 rounded-lg p-2'
                          onChange={(e) =>
                            setNewPayer({ ...newPayer, city: e.target.value })
                          }
                        />
                        <Input
                          type='text'
                          name='province'
                          placeholder='Province'
                          className='border-2 border-gray-300 rounded-lg p-2'
                          onChange={(e) =>
                            setNewPayer({
                              ...newPayer,
                              province: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className='flex gap-2'>
                        <Input
                          type='text'
                          name='postalCode'
                          placeholder='Postal Code'
                          className='border-2 border-gray-300 rounded-lg p-2'
                          onChange={(e) =>
                            setNewPayer({
                              ...newPayer,
                              postalCode: e.target.value,
                            })
                          }
                        />
                        <Input
                          type='text'
                          name='country'
                          placeholder='Country'
                          className='border-2 border-gray-300 rounded-lg p-2'
                          onChange={(e) =>
                            setNewPayer({
                              ...newPayer,
                              country: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              </DrawerHeader>
              <DrawerFooter className='p-6'>
                <div className='flex items-end justify-end gap-2 py-2'>
                  <h3 className='pb-1'>Total Price</h3>
                  <h3 className='font-semibold text-[24px]'>
                    $ {getTotalPrice().toFixed(2)}
                  </h3>
                </div>
                <Button
                  type='submit'
                  onClick={handlePurchaseLessons}
                  className='bg-[#FFCE47] text-[#2F2F2F] text-[20px] shadow-sm hover:bg-[#feba03] hover:text-black font-semibold w-full h-[35px] lg:h-[45px] mb-3 '
                >
                  Purchase
                </Button>
                <DrawerClose>
                  <div className='w-full text-[20px] font-semibold h-[35px] lg:h-[45px] border-[2px] shadow-sm border-slate-200 rounded-lg'>
                    Cancel
                  </div>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
      </form>
    </div>
  );
}
