'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { BreadcrumbUI } from "@/components/local-ui/breadcrumb";
import { HotelDetailsCard } from "@/components/pages/hotels.book/HotelDetailsCard";
import axios from 'axios';
export default function BookingPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [bookingData, setBookingData] = useState({
    stayData: null,
    flightData: null
  });

  useEffect(() => {
    const stayData = localStorage.getItem('stayBookingData');
    const flightData = localStorage.getItem('flightBookingData');

    setBookingData({
      stayData: stayData ? JSON.parse(stayData) : null,
      flightData: flightData ? JSON.parse(flightData) : null
    });

  }, []);



  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log('Form data:', data);
      console.log('Initial booking data:', bookingData);

      if (bookingData.flightData) {
        bookingData.flightData = {
          ...bookingData.flightData,
          departDate: new Date(bookingData.flightData.departDate).toISOString().split('T')[0],
          returnDate: bookingData.flightData.returnDate ?
            new Date(bookingData.flightData.returnDate).toISOString().split('T')[0] : null,
          Trip: bookingData.flightData.trip || 'Round Trip',
          from: bookingData.flightData.from || `${bookingData.flightData.departureAirportCode}`,
          to: bookingData.flightData.to || `${bookingData.flightData.arrivalAirportCode}`,
          class: bookingData.flightData.class || 'economy',
          adult: parseInt(bookingData.flightData.adult) || 0,
          children: parseInt(bookingData.flightData.children) || 0
        };
        console.log('Processed flight data:', bookingData.flightData);
      }

      if (bookingData.stayData) {
        bookingData.stayData = {
          ...bookingData.stayData,
          checkIn: new Date(bookingData.stayData.checkIn).toISOString().split('T')[0],
          checkOut: new Date(bookingData.stayData.checkOut).toISOString().split('T')[0],
          nights: parseInt(bookingData.stayData.nights) || 1,
          adults: parseInt(bookingData.stayData.adults) || 1,
          children: parseInt(bookingData.stayData.children) || 0
        };
        console.log('Processed stay data:', bookingData.stayData);
      }

      const { data: userData } = await axios.get('/api/test');
      console.log('User data response:', userData);

      let existingUser = null;
      if (userData.data) {
        existingUser = userData.data.find(user =>
          user.properties.Email.email === data.email &&
          user.properties['Phone Number'].phone_number === data.phone
        );
        console.log('Found existing user:', existingUser);
      }

      if (!existingUser) {
        const createUserPayload = {
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          status: "Lead"
        };
        console.log('Creating new user with payload:', createUserPayload);

        const { data: newUser } = await axios.post('/api/test', createUserPayload);
        existingUser = newUser;
        console.log('New user created:', existingUser);
      }

      if (bookingData.stayData) {
        const stayPayload = {
          ...bookingData.stayData,
          userId: existingUser.id,
          databaseId: "19080eea390f805b8cd8f0ea17825ee2",
          status: "Active"
        };
        console.log('Creating stay booking with payload:', stayPayload);

        await axios.post('/api/stays', stayPayload);
        console.log('Stay booking created successfully');
      }

      if (bookingData.flightData) {
        const flightPayload = {
          userId: existingUser.id,
          databaseId: "19080eea390f80318a79eb0dab0b15f9",
          from: bookingData.flightData.from,
          to: bookingData.flightData.to,
          departureAirportCode: bookingData.flightData.departureAirportCode,
          arrivalAirportCode: bookingData.flightData.arrivalAirportCode,
          departDate: new Date(bookingData.flightData.departDate).toISOString().split('T')[0],
          returnDate: bookingData.flightData.returnDate ?
            new Date(bookingData.flightData.returnDate).toISOString().split('T')[0] : null,
          trip: bookingData.flightData.trip,
          class: bookingData.flightData.class,
          adult: parseInt(bookingData.flightData.adult),
          children: parseInt(bookingData.flightData.children)
        };

        console.log('Creating flight booking with payload:', flightPayload);

        try {
          const { data: flightResponse } = await axios.post('/api/flight', flightPayload);
          console.log('Flight API response:', flightResponse);
        } catch (error) {
          console.error('Flight API error:', error.response?.data);
          throw error;
        }
      }

      localStorage.removeItem('stayBookingData');
      localStorage.removeItem('flightBookingData');
      setSubmitStatus('success');
      router.push('/');

    } catch (error) {
      console.error('Submission error:', error.response?.data || error.message);
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