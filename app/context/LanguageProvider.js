'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from "@/lib/translations";

// Create the context
const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  translations: translations.en,
  isLoaded: false
});

// Language options
export const SUPPORTED_LANGUAGES = ['en', 'ro', 'ru'];
export const DEFAULT_LANGUAGE = 'en';

// Provider component
export function LanguageProvider({ children }) {
  // Initialize with default language
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Load language preference from localStorage on mount
  useEffect(() => {
    try {
      const storedLang = localStorage.getItem('preferredLanguage');
      if (storedLang && SUPPORTED_LANGUAGES.includes(storedLang)) {
        setLanguage(storedLang);
      } else {
        localStorage.setItem('preferredLanguage', DEFAULT_LANGUAGE);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);
  
  // Function to change language
  const changeLanguage = (newLang) => {
    if (!SUPPORTED_LANGUAGES.includes(newLang)) return;
    
    try {
      localStorage.setItem('preferredLanguage', newLang);
      setLanguage(newLang);
    } catch (error) {
      console.error("Error setting language:", error);
    }
  };

  // Get translations for current language
  const t = translations[language] || translations[DEFAULT_LANGUAGE];
  
  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage: changeLanguage,
      translations: t,
      isLoaded
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
}