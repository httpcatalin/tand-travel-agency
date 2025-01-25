'use client';

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
    <main className="mx-auto mb-[80px] mt-[40px] w-[95%] text-secondary">
      <BreadcrumbUI />
      <div className="mt-[30px] flex gap-[20px] max-lg:flex-col lg:gap-[30px] xl:gap-[40px]">
        <div>
          <HotelDetailsCard />
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