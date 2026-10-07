'use client';

import React from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Footer() {
  const currentYear = 2026;
  const { translations, t } = useLanguage();
  const f = translations.footer;

  return (
    <footer className="bg-[#4d00a8] border-t border-[#3d0087] text-white/80 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <Link
              href="/"
              className="text-lg font-bold tracking-tight text-white flex items-center gap-2 group"
            >
              <span className="w-6 h-6 rounded bg-white text-[#6001d2] flex items-center justify-center font-black text-xs shadow-xs">
                Y!
              </span>
              <span className="font-extrabold tracking-tight">Save<span className="text-white/90 font-light">Yahoo</span></span>
            </Link>
            <p className="text-white/70 leading-relaxed text-xs">
              {f.description}
            </p>
          </div>

          {/* Tools */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              {f.mediaToolsTitle}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/video-downloader" className="hover:text-white transition-colors">
                  {t('nav.videoDownloader')}
                </Link>
              </li>
              <li>
                <Link href="/audio-converter" className="hover:text-white transition-colors">
                  {t('nav.audioConverter')}
                </Link>
              </li>
              <li>
                <Link href="/blog-reader" className="hover:text-white transition-colors">
                  {t('nav.blogReader')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Supported Formats */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              {f.supportedFormatsTitle}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/video-downloader" className="hover:text-white transition-colors">
                  Full HD 1080p & 720p MP4
                </Link>
              </li>
              <li>
                <Link href="/audio-converter" className="hover:text-white transition-colors">
                  320kbps Studio MP3 Audio
                </Link>
              </li>
              <li>
                <Link href="/blog-reader" className="hover:text-white transition-colors">
                  Clean Markdown & Reader PDF
                </Link>
              </li>
              <li>
                <Link href="#devices" className="hover:text-white transition-colors">
                  iOS, Android & Desktop Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              {f.complianceTitle}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/video-downloader#faq" className="hover:text-white transition-colors">
                  {f.terms}
                </Link>
              </li>
              <li>
                <Link href="/video-downloader#faq" className="hover:text-white transition-colors">
                  {f.privacy}
                </Link>
              </li>
              <li>
                <Link href="/video-downloader#faq" className="hover:text-white transition-colors">
                  {f.dmca}
                </Link>
              </li>
              <li>
                <Link
                  href="/secretadmin"
                  className="inline-flex items-center gap-1 text-white/50 hover:text-white transition-colors"
                  title="Team Administrator Gateway"
                >
                  <Lock className="w-3 h-3" />
                  <span>{f.admin}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/60">
          <div>
            &copy; {currentYear} {f.rights}
          </div>
          <div>
            {f.disclaimer}
          </div>
        </div>
      </div>
    </footer>
  );
}
