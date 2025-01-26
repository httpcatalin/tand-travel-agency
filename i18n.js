import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "home": {
                "helpingOthers": "Helping Others",
                "liveAndTravel": "Live & Travel",
                "specialOffers": "Special offers to suit your plan"
            }
        }
    },
    ro: {
        translation: {

            "home": {
                "helpingOthers": "Ajutăm Pe Alții",
                "liveAndTravel": "Să Trăiască și Să Călătorească",
                "specialOffers": "Oferte speciale pentru planul tău"
            }
        }
    },
    ru: {
        translation: {
            "home": {
                "helpingOthers": "Помогаем Другим",
                "liveAndTravel": "Жить и Путешествовать",
                "specialOffers": "Специальные предложения для вашего плана"
            }
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;