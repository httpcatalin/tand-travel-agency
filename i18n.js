import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            // English translations
            "welcome": "Welcome",
            // Add more translations as needed
        },
    },
    ro: {
        translation: {
            // Romanian translations
            "welcome": "Bine ai venit",
            // Add more translations as needed
        },
    },
    ru: {
        translation: {
            // Russian translations
            "welcome": "Добро пожаловать",
            // Add more translations as needed
        },
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en', // default language
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;