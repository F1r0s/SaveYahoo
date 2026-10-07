'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, DownloadCloud, Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage, SUPPORTED_LOCALES, Locale } from '@/lib/i18n/LanguageContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#6001d2] border-b border-[#5000b8] shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element Brand Zone */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-white flex items-center gap-2 group"
          >
            <span className="w-8 h-8 rounded-lg bg-white text-[#6001d2] flex items-center justify-center font-black text-sm group-hover:bg-purple-50 transition-colors shadow-xs">
              Y!
            </span>
            <span className="font-extrabold tracking-tight">Save<span className="text-white/90 font-light">Yahoo</span></span>
          </Link>

          {/* Zone 2: Clean consumer navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-white/85">
            <Link href="/video-downloader" className="hover:text-white transition-colors">
              {t('nav.videoDownloader')}
            </Link>
            <Link href="/audio-converter" className="hover:text-white transition-colors">
              {t('nav.audioConverter')}
            </Link>
            <Link href="/blog-reader" className="hover:text-white transition-colors">
              {t('nav.blogReader')}
            </Link>
            <Link href="#how-it-works" className="hover:text-white transition-colors">
              {t('nav.howItWorks')}
            </Link>
            <Link href="#faq" className="hover:text-white transition-colors">
              {t('nav.faq')}
            </Link>
          </nav>

          {/* Zone 3: Language Selector & Quick Action */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switcher Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 rounded-lg transition-colors"
                aria-label="Select language"
              >
                <Globe className="w-3.5 h-3.5 text-white" />
                <span>{SUPPORTED_LOCALES.find((l) => l.code === locale)?.nativeName || 'English'}</span>
                <ChevronDown className="w-3 h-3 text-white/70" />
              </button>

              {langDropdownOpen && (
                <div className="absolute end-0 mt-1.5 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-50 animate-in fade-in-50 duration-150">
                  {SUPPORTED_LOCALES.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => {
                        setLocale(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-start px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                        locale === l.code
                          ? 'bg-purple-50 text-[#6001d2] font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{l.nativeName}</span>
                      {locale === l.code && <Check className="w-3.5 h-3.5 text-[#6001d2]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#downloader"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#6001d2] bg-white hover:bg-purple-50 rounded-lg shadow-sm transition-all whitespace-nowrap active:scale-95"
            >
              <DownloadCloud className="w-4 h-4 text-[#6001d2]" />
              <span>{t('nav.quickPaste')}</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-white hover:bg-white/15 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#5000b8] bg-[#5000b8] text-white px-4 pt-3 pb-5 space-y-2">
          {/* Mobile Language Selector */}
          <div className="pb-3 mb-2 border-b border-white/10 flex items-center justify-between px-3">
            <span className="text-xs font-semibold text-white/70">Language / اللغة</span>
            <div className="flex items-center gap-1">
              {SUPPORTED_LOCALES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLocale(l.code)}
                  className={`px-2 py-1 text-xs rounded font-medium transition-colors ${
                    locale === l.code
                      ? 'bg-white text-[#6001d2] font-bold'
                      : 'bg-white/15 text-white hover:bg-white/25'
                  }`}
                >
                  {l.code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <Link
            href="/video-downloader"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-white/90 hover:text-white hover:bg-white/10"
          >
            {t('nav.videoDownloader')}
          </Link>
          <Link
            href="/audio-converter"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-white/90 hover:text-white hover:bg-white/10"
          >
            {t('nav.audioConverter')}
          </Link>
          <Link
            href="/blog-reader"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-white/90 hover:text-white hover:bg-white/10"
          >
            {t('nav.blogReader')}
          </Link>
          <Link
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-white/90 hover:text-white hover:bg-white/10"
          >
            {t('nav.howItWorks')}
          </Link>
          <Link
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-white/90 hover:text-white hover:bg-white/10"
          >
            {t('nav.faq')}
          </Link>

          <div className="pt-2">
            <a
              href="#downloader"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-[#6001d2] bg-white hover:bg-purple-50 rounded-lg shadow-sm"
            >
              <DownloadCloud className="w-4 h-4 text-[#6001d2]" />
              <span>{t('nav.quickPaste')}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
