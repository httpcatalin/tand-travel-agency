<<<<<<< HEAD
'use client';
=======
import { BreadcrumbUI } from "@/components/local-ui/breadcrumb";
import { FareCard } from "@/components/FareCard";
import { HotelDetailsCard } from "@/components/pages/hotels.book/HotelDetailsCard";
import { AuthenticationCard } from "@/components/AuthenticationCard";
import { ChoosePaymentCard } from "@/components/pages/flights.book/ChoosePaymentCard";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
>>>>>>> parent of d636e8b (minor changes)

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { BreadcrumbUI } from "@/components/local-ui/breadcrumb";
import { HotelDetailsCard } from "@/components/pages/hotels.book/HotelDetailsCard";

export default function BookingPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to submit');
      setSubmitStatus('success');
      setTimeout(() => router.push('/'), 2000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
<<<<<<< HEAD
    <main className="mx-auto mb-[80px] mt-[40px] w-[95%] text-secondary">
      <BreadcrumbUI />
      <div className="mt-[30px] flex gap-[20px] max-lg:flex-col lg:gap-[30px] xl:gap-[40px]">
        <div>
          <HotelDetailsCard />
=======
    <>
      <main className="mx-auto mb-[80px] mt-[40px] w-[95%] text-secondary">
        <BreadcrumbUI />

        <div className="mt-[30px] flex gap-[20px] max-lg:flex-col-reverse lg:gap-[30px] xl:gap-[40px]">
          <div>
            <HotelDetailsCard />
            <div className="mb-[20px] rounded-[12px] bg-white p-[16px] shadow-lg lg:mb-[30px] xl:mb-[40px]">
              <RadioGroup defaultValue="Pay_in_full">
                <Label className="flex rounded-[12px] justify-between p-[16px] has-[[data-state='checked']]:bg-primary grow items-center gap-[32px]">
                  <div>
                    <p className="font-bold mb-2">Pay in full</p>
                    <p className="text-[0.875rem]">
                      Pay the total and you are all set
                    </p>
                  </div>
                  <RadioGroupItem
                    className="data-[state='checked']:text-white border-2 data-[state='checked']:border-white"
                    value="Pay_in_full"
                  />
                </Label>
                <Label className="flex rounded-[12px] justify-between p-[16px] has-[[data-state='checked']]:bg-primary grow items-center gap-[32px]">
                  <div>
                    <p className="font-bold mb-2">Pay part now, part later</p>
                    <p className="text-[0.875rem]">
                      Pay $207.43 now, and the rest ($207.43) will be
                      automatically charged to the same payment method on Nov
                      14, 2022. No extra fees.
                    </p>
                  </div>
                  <RadioGroupItem
                    className="data-[state='checked']:text-white border-2 data-[state='checked']:border-white"
                    value="Pay_part"
                  />
                </Label>
              </RadioGroup>
              <p className="p-[16px]">
                <Link scroll={false} href="#" className="underline">
                  More info
                </Link>
              </p>
            </div>

            <div className="rounded-12px bg-white p-16px shadow-small">
              {isLoggedIn ? <ChoosePaymentCard /> : <AuthenticationCard />}
            </div>
          </div>
          <div className="h-min grow rounded-12px bg-white p-24px shadow-small">
            <FareCard
              type={"Hotel"}
              name={"Superior room - 1 double bed or 2 twin beds"}
              fare={fare}
              rating={"N/A"}
              reviews={0}
              imgSrc={
                "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
          </div>
>>>>>>> parent of d636e8b (minor changes)
        </div>

        <div className="h-min grow rounded-[12px] bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                {...register("fullName", {
                  required: "Name is required",
                  minLength: { value: 2, message: "Name must be at least 2 characters" }
                })}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="John Doe"
              />
              {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                type="email"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="john@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\+?[1-9]\d{1,14}$/,
                    message: "Invalid phone number"
                  }
                })}
                type="tel"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="+1234567890"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-colors duration-200 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Book Now"}
            </button>

            {submitStatus === 'success' && (
              <p className="text-green-500 text-center">Booking submitted successfully!</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-500 text-center">Something went wrong. Please try again.</p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}