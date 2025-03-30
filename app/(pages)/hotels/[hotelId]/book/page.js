'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { BreadcrumbUI } from "@/components/local-ui/breadcrumb";
import { HotelDetailsCard } from "@/components/pages/hotels.book/HotelDetailsCard";
import axios from 'axios';
import { FaSpinner, FaCheck, FaMobileAlt, FaEnvelope, FaUser, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import { translations } from '@/lib/translations';
import { useLanguage } from '@/app/context/LanguageProvider';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { auth } from '@/firebase.config';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function BookingPage({ searchParams = {} }) {
  const { translations, isLoaded } = useLanguage();
  const t = isLoaded ? translations.bookingPage : {};
  const recaptchaContainerRef = useRef(null);
  const isDev = process.env.NEXT_PUBLIC_APP_MODE === 'dev';

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationStep, setVerificationStep] = useState(isDev ? 'verified' : 'initial');
  const [verificationError, setVerificationError] = useState('');
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [cooldown, setCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);

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

    setTimeout(() => {
      setContentLoaded(true);
    }, 1000);

    if (isDev && phoneNumber === '') {
      setPhoneNumber('+37368123456');
      setValue('phone', '+37368123456');
    }

    return () => {
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
          window.recaptchaVerifier = null;
        } catch (e) {
          console.error('Error clearing recaptcha:', e);
        }
      }
    };
  }, [isDev, setValue]);

  useEffect(() => {
    let interval;
    if (cooldown && cooldownTime > 0) {
      interval = setInterval(() => {
        setCooldownTime(time => {
          if (time <= 1) {
            setCooldown(false);
            clearInterval(interval);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [cooldown, cooldownTime]);

  const setupRecaptcha = () => {
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (e) {
        console.error('Error clearing existing recaptcha:', e);
      }
    }

    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: () => {
        console.log('reCAPTCHA verified');
      },
      'expired-callback': () => {
        setVerificationError(t.errors?.recaptchaFailed || 'reCAPTCHA expired, please try again');
      }
    });

    return window.recaptchaVerifier;
  };

  const handleSendVerificationCode = async () => {
    if (isDev) {
      setVerificationStep('verified');
      setValue('phone', phoneNumber);
      return;
    }

    if (!phoneNumber) {
      setVerificationError(t.errors?.invalidPhone || 'Please enter a valid phone number');
      return;
    }


    if (cooldown) {
      const waitMessage = t.errors?.waitBeforeTrying?.replace('{seconds}', cooldownTime) ||
        `Please wait ${cooldownTime} seconds before trying again.`;
      setVerificationError(waitMessage);
      return;
    }

    try {
      setIsLoading(true);

      const recaptchaVerifier = setupRecaptcha();

      // console.log("Sending verification to:", phoneNumber);
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);

      setConfirmationResult(confirmation);
      setVerificationStep('codeSent');
      setVerificationError('');
      setValue('phone', phoneNumber);
    } catch (error) {
      console.error('Error sending verification code:', error);

      if (error.code === 'auth/too-many-requests') {
        setCooldown(true);
        setCooldownTime(60);
        setVerificationError(t.errors?.tooManyAttempts || 'Too many verification attempts. Please wait 60 seconds before trying again.');
      } else if (error.code === 'auth/invalid-phone-number') {
        setVerificationError(t.errors?.invalidPhoneFormat || 'Invalid phone number format. Please check and try again.');
      } else if (error.code === 'auth/missing-verification-code') {
        setVerificationError(t.errors?.codeRequired || 'Verification code is required.');
      } else if (error.code === 'auth/invalid-verification-code') {
        setVerificationError(t.errors?.invalidCode || 'Invalid verification code. Please check and try again.');
      } else if (error.code === 'auth/captcha-check-failed') {
        setVerificationError(t.errors?.recaptchaFailed || 'reCAPTCHA verification failed. Please refresh and try again.');
      } else if (error.code === 'auth/quota-exceeded') {
        setVerificationError(t.errors?.quotaExceeded || 'Service quota exceeded. Please try again later.');
      } else {
        setVerificationError(`${t.errors?.failedToSend || 'Failed to send code:'} ${error.message}`);
      }

      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
          window.recaptchaVerifier = null;
        } catch (e) {
          console.error('Error clearing recaptcha after error:', e);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDigitChange = (index, value) => {
    if (value === '' || /^[0-9]$/.test(value)) {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);
      setVerificationCode(newDigits.join(''));

      if (value !== '' && index < 5) {
        document.getElementById(`digit-${index + 1}`).focus();
      }
    }
  };

  const handleDigitKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && digits[index] === '') {
      document.getElementById(`digit-${index - 1}`).focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    if (/^\d{6}$/.test(pastedData)) {
      const newDigits = pastedData.split('');
      setDigits(newDigits);
      setVerificationCode(pastedData);
    }
  };

  const handleVerifyCode = async () => {
    if (isDev) {
      setVerificationStep('verified');
      return;
    }

    if (!verificationCode || verificationCode.length !== 6) {
      setVerificationError(t.errors?.enter6Digits || 'Please enter the 6-digit verification code');
      return;
    }

    try {
      setIsLoading(true);

      if (!confirmationResult) {
        throw new Error(t.errors?.sessionExpired || 'Verification session expired. Please request a new code.');
      }

      await confirmationResult.confirm(verificationCode);
      setVerificationStep('verified');
      setVerificationError('');
    } catch (error) {
      console.error('Error verifying code:', error);

      if (error.code === 'auth/invalid-verification-code') {
        setVerificationError(t.errors?.enterInvalidCode || 'The verification code you entered is invalid. Please try again.');
      } else if (error.code === 'auth/code-expired') {
        setVerificationError(t.errors?.codeExpired || 'This verification code has expired. Please request a new one.');
      } else {
        setVerificationError(`${t.errors?.failedToVerify || 'Failed to verify code:'} ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    if (verificationStep !== 'verified' && !isDev) {
      setVerificationError(t.verification?.pleaseVerify || 'Please verify your phone number before submitting');
      return;
    }

    setIsSubmitting(true);
    setIsLoading(true);

    try {
      const stayDataStr = localStorage.getItem('stayBookingData');
      const flightDataStr = localStorage.getItem('flightBookingData');

      let stayData = stayDataStr ? JSON.parse(stayDataStr) : null;
      let flightData = flightDataStr ? JSON.parse(flightDataStr) : null;

      if (flightData) {
        flightData = {
          ...flightData,
          departDate: new Date(flightData.departDate).toLocaleDateString("ro-MD").split(".").reverse().join("-"),
          returnDate: flightData.returnDate ?
            new Date(flightData.returnDate).toLocaleDateString("ro-MD").split(".").reverse().join("-") : null,
          Trip: flightData.trip || 'Round Trip',
          from: flightData.from || `${flightData.departureAirportCode}`,
          to: flightData.to || `${flightData.arrivalAirportCode}`,
          class: flightData.class || 'economy',
          adult: parseInt(flightData.adult) || 0,
          children: parseInt(flightData.children) || 0
        };
      }

      if (stayData) {
        stayData = {
          ...stayData,
          checkIn: new Date(stayData.checkIn).toLocaleDateString("ro-MD").split(".").reverse().join("-"),
          checkOut: new Date(stayData.checkOut).toLocaleDateString("ro-MD").split(".").reverse().join("-"),
          nights: parseInt(stayData.nights) || 1,
          adults: parseInt(stayData.adults) || 1,
          children: parseInt(stayData.children) || 0
        };
      }


      const userResponse = await axios.get('/api/test');
      const userData = userResponse.data;

      let existingUser = null;
      let flightRequests = [];
      let hotelRequests = [];

      if (userData.data) {
        existingUser = userData.data.find(user =>
          user.properties.Email.email === data.email &&
          user.properties['Phone Number'].phone_number === phoneNumber
        );

        if (existingUser) {
          flightRequests = existingUser.properties["Flight Requests"]?.relation?.map(item => item.id) || [];
          hotelRequests = existingUser.properties["Hotel Requests"]?.relation?.map(item => item.id) || [];
        }
      }


      if (!existingUser) {
        const newUserResponse = await axios.post('/api/test', {
          name: data.fullName,
          email: data.email,
          phone: phoneNumber,
          flightRequests: [],
          hotelRequests: []
        });

        existingUser = newUserResponse.data;
        existingUser.id = newUserResponse.data.data.id;
      }


      if (stayData) {
        const stayResponse = await axios.post('/api/stays', {
          ...stayData,
          userId: existingUser.id,
          databaseId: "19080eea390f805b8cd8f0ea17825ee2",
          status: "Active"
        });

        hotelRequests.push(stayResponse.data.data.id);
      }


      if (flightData) {
        const flightResponse = await axios.post('/api/flight', {
          userId: existingUser.id,
          databaseId: "19080eea390f80318a79eb0dab0b15f9",
          ...flightData,
          status: "Active"
        });

        flightRequests.push(flightResponse.data.data.id);
      }


      await axios.put(`/api/test/${existingUser.id}`, {
        flightRequests: flightRequests,
        hotelRequests: hotelRequests
      });


      localStorage.removeItem('stayBookingData');
      localStorage.removeItem('flightBookingData');

      setSubmitStatus('success');


      setTimeout(() => {
        router.push('/');
      }, 1500);

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  const showSkeletons = !contentLoaded || !isLoaded;

  return (
    <main className="mx-auto mb-[80px] mt-[40px] w-[95%] text-secondary">
      <div className={`mt-[30px] flex gap-[20px] max-lg:flex-col lg:gap-[30px] xl:gap-[40px]`} style={{
        transition: 'opacity 0.1s ease-in-out',
        opacity: showSkeletons ? 0.8 : 1
      }}>
        <div>
          {showSkeletons ? (
            <div className="mb-[20px] shadow-lg rounded-[12px] bg-white px-[24px] py-[32px] shadow-small lg:mb-[30px] xl:mb-[40px]"
              style={{ animation: 'pulse 1.5s ease-in-out 0.5s infinite' }}>
              <div className="mb-[24px] gap-6 flex-col items-baseline justify-between font-bold">
                <Skeleton height={28} width="80%" className="mb-3" enableAnimation={false} />
                <Skeleton height={28} width="60%" enableAnimation={false} />
              </div>

              <div className="mb-[40px] grid justify-between gap-[20px] md:flex">
                <div className="flex w-full items-center gap-[24px] rounded-[8px] border border-gray-200 px-4 sm:px-6 md:px-[32px] py-[16px]">
                  <Skeleton height={40} width={60} className="h-[40px] w-[60px]" enableAnimation={false} />
                  <div className="w-full">
                    <Skeleton height={24} width="70%" className="mb-[8px]" enableAnimation={false} />
                    <Skeleton height={16} width="40%" enableAnimation={false} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 md:flex-row md:justify-center">
                <div className="text-center md:text-left">
                  <Skeleton height={24} width={120} className="mb-2" enableAnimation={false} />
                  <Skeleton height={16} width={80} enableAnimation={false} />
                </div>

                <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
                  <Skeleton height={8} width={36} className="md:rotate-0 max-md:rotate-90" enableAnimation={false} />
                  <Skeleton height={48} width={48} circle enableAnimation={false} />
                  <Skeleton height={8} width={36} className="md:rotate-0 max-md:rotate-90" enableAnimation={false} />
                </div>

                <div className="text-center md:text-left">
                  <Skeleton height={24} width={120} className="mb-2" enableAnimation={false} />
                  <Skeleton height={16} width={80} enableAnimation={false} />
                </div>
              </div>
            </div>
          ) : (
            <HotelDetailsCard />
          )}
        </div>

        <motion.div
          className="h-min grow rounded-[12px] bg-white p-6 shadow-lg"
        >
          {showSkeletons ? (
            <div className="space-y-6" style={{ animation: 'pulse 1.5s ease-in-out 0.5s infinite' }}>
              <Skeleton height={36} width="80%" className="mb-6" enableAnimation={false} />

              <div className="space-y-2">
                <div className="flex items-center">
                  <Skeleton circle width={18} height={18} className="mr-2" enableAnimation={false} />
                  <Skeleton width={100} height={18} enableAnimation={false} />
                </div>
                <Skeleton height={48} enableAnimation={false} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Skeleton circle width={18} height={18} className="mr-2" enableAnimation={false} />
                  <Skeleton width={120} height={18} enableAnimation={false} />
                </div>
                <Skeleton height={48} enableAnimation={false} />
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Skeleton circle width={18} height={18} className="mr-2" enableAnimation={false} />
                  <Skeleton width={110} height={18} enableAnimation={false} />
                </div>

                <div className="phone-input-skeleton">
                  <Skeleton height={48} enableAnimation={false} />
                </div>

                <Skeleton height={48} enableAnimation={false} />

                <div className="text-center">
                  <Skeleton width={220} height={14} enableAnimation={false} />
                </div>
              </div>

              <Skeleton height={50} enableAnimation={false} />
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6">{t.title || 'Complete Your Booking'}</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-1">
                  <label className="flex items-center text-sm font-medium mb-2">
                    <FaUser className="mr-2 text-primary" />
                    {t.fullName || 'Full Name'}
                  </label>
                  <motion.div
                    whileTap={{ scale: 0.99 }}
                  >
                    <input
                      {...register("fullName", {
                        required: (t?.requiredErrors?.fullName || 'Full name is required'),
                        minLength: {
                          value: 2,
                          message: t.validation?.nameMinLength || "Name must be at least 2 characters"
                        }
                      })}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                      placeholder="John Doe"
                    />
                  </motion.div>
                  <AnimatePresence>
                    {errors.fullName && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-sm text-red-500 mt-1"
                      >
                        {errors.fullName.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-1">
                  <label className="flex items-center text-sm font-medium mb-2">
                    <FaEnvelope className="mr-2 text-primary" />
                    {t.email || 'Email Address'}
                  </label>
                  <motion.div
                    whileTap={{ scale: 0.99 }}
                  >
                    <input
                      {...register("email", {
                        required: (t.requiredErrors?.email || 'Email is required'),
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: t.validation?.invalidEmail || "Invalid email address"
                        }
                      })}
                      type="email"
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                      placeholder="john@example.com"
                    />
                  </motion.div>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-sm text-red-500 mt-1"
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-1">
                  <label className="flex items-center text-sm font-medium mb-2">
                    <FaMobileAlt className="mr-2 text-primary" />
                    {t.phone || 'Phone Number'}
                  </label>

                  <AnimatePresence mode="wait">
                    {verificationStep === 'initial' && (
                      <motion.div
                        key="phone-input"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <div className="phone-input-container">
                          <PhoneInput
                            international
                            defaultCountry="MD"
                            value={phoneNumber}
                            onChange={setPhoneNumber}
                            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                            placeholder="Enter phone number"
                          />
                        </div>

                        <div id="recaptcha-container"></div>

                        <motion.button
                          type="button"
                          onClick={handleSendVerificationCode}
                          disabled={isLoading || !phoneNumber || cooldown}
                          whileHover={!isLoading && phoneNumber && !cooldown ? { scale: 1.02 } : {}}
                          whileTap={!isLoading && phoneNumber && !cooldown ? { scale: 0.98 } : {}}
                          className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 flex items-center justify-center"
                        >
                          {isLoading ? (
                            <div className="flex items-center">
                              <FaSpinner className="animate-spin mr-2" />
                              {t.verification?.sending || 'Sending...'}
                            </div>
                          ) : cooldown ? (
                            `${t.verification?.waitTime || 'Try again in'} ${cooldownTime}${t.verification?.seconds || 's'}`
                          ) : (
                            t.verification?.sendCode || 'Send Verification Code'
                          )}
                        </motion.button>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs text-blue-500 italic mt-2 text-center"
                        >
                          <FaInfoCircle className="inline mr-1" />
                          {t.verification?.infoMessage || "You'll receive a verification code on your phone"}
                        </motion.div>
                      </motion.div>
                    )}

                    {verificationStep === 'codeSent' && (
                      <motion.div
                        key="code-verification"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <motion.div
                          initial={{ backgroundColor: "#f0fff4", scale: 1 }}
                          animate={{ backgroundColor: "#ffffff", scale: 1 }}
                          transition={{ duration: 1.5 }}
                          className="mb-2 p-3 border border-green-200 rounded-md"
                        >
                          <p className="text-green-600 flex items-center">
                            <FaCheck className="mr-2" />
                            {t.verification?.codeSent || 'Verification code sent to'} {phoneNumber}
                          </p>
                        </motion.div>

                        <div className="flex justify-between mb-2">
                          <p className="text-sm text-gray-600">{t.verification?.enterCode || 'Enter the 6-digit code'}</p>
                          <button
                            type="button"
                            onClick={() => setVerificationStep('initial')}
                            className="text-sm text-primary hover:underline"
                          >
                            {t.verification?.changeNumber || 'Change number'}
                          </button>
                        </div>

                        <div className="flex justify-between gap-2">
                          {digits.map((digit, index) => (
                            <input
                              key={index}
                              id={`digit-${index}`}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              value={digit}
                              onChange={(e) => handleDigitChange(index, e.target.value)}
                              onKeyDown={(e) => handleDigitKeyDown(index, e)}
                              onPaste={handlePaste}
                              className="w-full aspect-square max-w-[50px] text-center font-bold text-xl px-0 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                            />
                          ))}
                        </div>

                        <motion.button
                          type="button"
                          onClick={handleVerifyCode}
                          disabled={isLoading || verificationCode.length !== 6}
                          whileHover={!isLoading && verificationCode.length === 6 ? { scale: 1.02 } : {}}
                          whileTap={!isLoading && verificationCode.length === 6 ? { scale: 0.98 } : {}}
                          className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 flex items-center justify-center"
                        >

                          {isLoading ? (
                            <div className="flex items-center">
                              <FaSpinner className="animate-spin mr-2" />
                              {t.verification?.verifying || 'Verifying...'}
                            </div>
                          ) : (t.verification?.verifyCode || 'Verify Code')}
                        </motion.button>
                      </motion.div>
                    )}

                    {verificationStep === 'verified' && (
                      <motion.div
                        key="verified"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center p-3 border border-green-200 bg-green-50 rounded-md text-green-600"
                      >
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 15
                          }}
                          className="mr-3 bg-green-100 p-2 rounded-full"
                        >
                          <FaCheck className="text-green-600" />
                        </motion.div>
                        <div>
                          <p className="font-medium">{t.verification?.phoneVerified || 'Phone number verified'}</p>
                          <p className="text-sm">{phoneNumber}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {verificationError && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-red-50 border border-red-200 rounded-md p-3 mt-2"
                      >
                        <p className="text-sm text-red-500 flex items-center">
                          <FaExclamationTriangle className="mr-2 text-red-400" />
                          {verificationError}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || (verificationStep !== 'verified' && !isDev)}
                  whileHover={!isSubmitting && (verificationStep === 'verified' || isDev) ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting && (verificationStep === 'verified' || isDev) ? { scale: 0.98 } : {}}
                  className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 flex items-center justify-center mt-6"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <FaSpinner className="animate-spin mr-2" />
                      {t.submitting || 'Processing...'}
                    </div>
                  ) : (t.confirm || 'Complete Booking')}
                </motion.button>

                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-green-50 border border-green-200 rounded-md p-3"
                    >
                      <p className="text-green-600 text-center">{t.success || 'Booking completed successfully!'}</p>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-red-50 border border-red-200 rounded-md p-3"
                    >
                      <p className="text-red-600 text-center">{t.error || 'There was an error processing your booking. Please try again.'}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </>
          )}
        </motion.div>
      </div>
      <style jsx global>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 0.8; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </main>
  );
}