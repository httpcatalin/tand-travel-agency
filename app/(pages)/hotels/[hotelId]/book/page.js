'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { BreadcrumbUI } from "@/components/local-ui/breadcrumb";
import { HotelDetailsCard } from "@/components/pages/hotels.book/HotelDetailsCard";
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import { translations } from '@/lib/translations';

export default function BookingPage({ searchParams={} }) {
  const [lang, setLang] = useState('en');
  const t = translations[lang]?.bookingPage || translations.en.bookingPage;
  
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
      if (searchParams?.lang) {
        setLang(searchParams.lang);
      }
  }, [searchParams]);

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
          departDate: new Date(bookingData.flightData.departDate).toLocaleDateString("ro-MD").split(".").reverse().join("-"),
          returnDate: bookingData.flightData.returnDate ?
            new Date(bookingData.flightData.returnDate).toLocaleDateString("ro-MD").split(".").reverse().join("-") : null,
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
          checkIn: new Date(bookingData.stayData.checkIn).toLocaleDateString("ro-MD").split(".").reverse().join("-"),
          checkOut: new Date(bookingData.stayData.checkOut).toLocaleDateString("ro-MD").split(".").reverse().join("-"),
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
          localStorage.removeItem('flightBookingData');
          const { data: stayDataResponse } = await axios.post('/api/stays', {
            ...bookingData.stayData,
            userId: existingUser.id,
            databaseId: "19080eea390f805b8cd8f0ea17825ee2",
            status: "Active"
          });
          stayResponse = stayDataResponse.data;
          hotelRequests.push(stayResponse.id);
          localStorage.removeItem('stayBookingData');
        } catch (error) {
          console.error('Stay API error:', error.response?.data || error.message);
          throw error;
        }
      }

      if (bookingData.flightData) {
        try {
          localStorage.removeItem('stayBookingData');
          const { data: flightResponse } = await axios.post('/api/flight', {
            userId: existingUser.id,
            databaseId: "19080eea390f80318a79eb0dab0b15f9",
            ...bookingData.flightData
          });
          flightRequests.push(flightResponse.data.id);
          localStorage.removeItem('flightBookingData');
        } catch (flightData) {
          console.error('Flight API error:', flightData.response?.data || flightData.message);
          throw flightData;
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

      setSubmitStatus('success');
      router.push('/');

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
          <HotelDetailsCard
            lang={lang}
          />
        </div>

        <div className="h-min grow rounded-[12px] bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">{t.title}</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">{t.fullName}</label>
              <input
                {...register("fullName", {
                  required: (t.requiredErrors.fullName),
                  minLength: { value: 2, message: "Name must be at least 2 characters" }
                })}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="John Doe"
              />
              {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t.email}</label>
              <input
                {...register("email", {
                  required: (t.requiredErrors.email),
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
              <label className="block text-sm font-medium mb-2">{t.phone}</label>
              <input
                {...register("phone", {
                  required: (t.requiredErrors.phone),
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
                  {t.submitting}
                </div>
              ) : (t.confirm)}
            </button>

            {submitStatus === 'success' && (
              <p className="text-green-500 text-center">{t.success}</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-500 text-center">{t.error}</p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}