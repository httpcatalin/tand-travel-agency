'use client';

import { LanguageProvider } from '../../app/context/LanguageProvider';

export function LanguageProviderWrapper({ children }) {
    return <LanguageProvider>{children}</LanguageProvider>;
}