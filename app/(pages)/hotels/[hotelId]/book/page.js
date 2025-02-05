'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { BreadcrumbUI } from "@/components/local-ui/breadcrumb";
import { HotelDetailsCard } from "@/components/pages/hotels.book/HotelDetailsCard";
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';

export default function BookingPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
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
      }

      const { data: userData } = await axios.get('/api/test');

      let existingUser = null;
      let flightRequests = [];
      let hotelRequests = [];

      if (userData.data) {
        existingUser = userData.data.find(user =>
          user.properties.Email.email === data.email &&
          user.properties['Phone Number'].phone_number === data.phone
        );

        if (existingUser) {
          flightRequests = existingUser.properties["Flight Requests"]?.relation?.map(item => item.id) || [];
          hotelRequests = existingUser.properties["Hotel Requests"]?.relation?.map(item => item.id) || [];
        }
      }

      if (!existingUser) {
        const { data: newUser } = await axios.post('/api/test', {
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          flightRequests: [],
          hotelRequests: []
        });
        existingUser = newUser;
        existingUser.id = newUser.data.id;
      }

      let stayResponse = null;
      if (bookingData.stayData) {
        try {
          const { data: stayDataResponse } = await axios.post('/api/stays', {
            ...bookingData.stayData,
            userId: existingUser.id,
            databaseId: "19080eea390f805b8cd8f0ea17825ee2",
            status: "Active"
          });
          stayResponse = stayDataResponse.data;
          hotelRequests.push(stayResponse.id);
        } catch (error) {
          console.error('Stay API error:', error.response?.data || error.message);
          throw error;
        }
      }

      if (bookingData.flightData) {
        try {
          const { data: flightResponse } = await axios.post('/api/flight', {
            userId: existingUser.id,
            databaseId: "19080eea390f80318a79eb0dab0b15f9",
            ...bookingData.flightData
          });
          flightRequests.push(flightResponse.data.id);

          // const calendarData = {
          //   databaseId: "19080eea390f819bb0f4dbf598e1c256",
          //   userId: existingUser.id,
          //   name: data.fullName,
          //   date: bookingData.flightData.departDate,
          //   flightRequests: [flightResponse.data.id],
          //   from: bookingData.flightData.from,
          //   to: bookingData.flightData.to,
          //   hotelRequests: stayResponse ? [stayResponse.id] : []
          // };

          // const calendarResponse = await axios.post('/api/calendar', calendarData);
          // console.log('Calendar API response:', calendarResponse.data);

        } catch (calendarError) {
          console.error('Calendar API error:', calendarError.response?.data || calendarError.message);
          throw calendarError;
        }

      } else if (bookingData.stayData) {
        try {
          // const calendarData = {
          //   databaseId: "19080eea390f819bb0f4dbf598e1c256",
          //   userId: existingUser.id,
          //   name: `Hotel for ${data.fullName} at ${bookingData.stayData.destination}`,
          //   date: bookingData.stayData.checkIn,
          //   from: bookingData.stayData.from,
          //   flightRequests: [],
          //   hotelRequests: stayResponse ? [stayResponse.id] : []
          // };

          // const calendarResponse = await axios.post('/api/calendar', calendarData);
          // console.log('Calendar API response:', calendarResponse.data);

        } catch (calendarError) {
          console.error('Calendar API error:', calendarError.response?.data || calendarError.message);
          throw calendarError;
        }
      }

      try {
        await axios.put(`/api/test/${existingUser.id}`, {
          flightRequests: flightRequests,
          hotelRequests: hotelRequests
        });
      } catch (updateError) {
        console.error('User update error:', updateError.response?.data || updateError.message);
        throw updateError;
      }

      localStorage.removeItem('stayBookingData');
      localStorage.removeItem('flightBookingData');
      setSubmitStatus('success');
      // router.push('/');

    } catch (error) {
      console.error('Submission error:', error.response?.data || error.message);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
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
              className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-colors duration-200 disabled:opacity-50 flex items-center justify-center"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <FaSpinner className="animate-spin mr-2" />
                  Submitting...
                </div>
              ) : "Book Now"}
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