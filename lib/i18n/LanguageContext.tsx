'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, TRANSLATIONS, Translations } from './translations';
export type { Locale };

export const SUPPORTED_LOCALES: { code: Locale; name: string; nativeName: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', dir: 'ltr' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', dir: 'ltr' },
];

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string) => string;
  isRtl: boolean;
  translations: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function applyDocumentAttributes(targetLocale: Locale) {
  if (typeof document !== 'undefined') {
    const isArabic = targetLocale === 'ar';
    document.documentElement.lang = targetLocale;
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  // Load locale preference on mount
  useEffect(() => {
    try {
      const match = document.cookie.match(/syo_locale=([a-z]{2})/);
      const saved = match ? match[1] : localStorage.getItem('syo_locale');
      if (saved && (saved === 'en' || saved === 'es' || saved === 'fr' || saved === 'pt' || saved === 'ar')) {
        const detected = saved as Locale;
        setLocaleState(detected);
        applyDocumentAttributes(detected);
      }
    } catch {
      // Fallback to default
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    applyDocumentAttributes(newLocale);
    try {
      document.cookie = `syo_locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      localStorage.setItem('syo_locale', newLocale);
    } catch {
      // Ignore if storage is unavailable
    }
  };

  // Nested translation resolver (e.g. t('nav.videoDownloader'))
  const t = (path: string): string => {
    const keys = path.split('.');
    let current: any = TRANSLATIONS[locale] || TRANSLATIONS.en;

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Fallback to English
        let fallback: any = TRANSLATIONS.en;
        for (const fKey of keys) {
          if (fallback && typeof fallback === 'object' && fKey in fallback) {
            fallback = fallback[fKey];
          } else {
            return path;
          }
        }
        return typeof fallback === 'string' ? fallback : path;
      }
    }

    return typeof current === 'string' ? current : path;
  };

  const isRtl = locale === 'ar';

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        t,
        isRtl,
        translations: TRANSLATIONS[locale] || TRANSLATIONS.en,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}