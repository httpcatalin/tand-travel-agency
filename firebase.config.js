import { initializeApp, getApps } from 'firebase/app';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);


// console.log("Firebase initialized with config:", {
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
// });

export const setupRecaptcha = (auth, containerId, onVerify, onExpired) => {
    try {

        if (window.recaptchaVerifier) {
            try {
                window.recaptchaVerifier.clear();
            } catch (e) {
                console.error('Error clearing existing recaptcha:', e);
            }
        }

        window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
            size: 'invisible',
            callback: () => {
                console.log('reCAPTCHA verified');
                if (onVerify) onVerify();
            },
            'expired-callback': () => {
                console.log('reCAPTCHA expired');
                if (onExpired) onExpired();
            }
        });

        return window.recaptchaVerifier;
    } catch (error) {
        console.error('Error setting up reCAPTCHA:', error);
        throw error;
    }
};

export { app, auth };