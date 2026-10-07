'use client';

import React from 'react';
import { Video, Music, FileText, Zap, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function FeatureGrid() {
  const { translations } = useLanguage();
  const f = translations.features;

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {f.title}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          {f.subtitle}
        </p>
      </div>

      {/* Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Large Bento Card 1: Video */}
        <div className="md:col-span-2 bg-gradient-to-br from-white to-purple-50/40 p-7 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#6001d2] text-white flex items-center justify-center mb-5 shadow-sm">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {f.videoTitle}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
              {f.videoDesc}
            </p>
          </div>
          <div className="pt-6 mt-6 border-t border-purple-100 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
            <span>Adaptive Bitrates</span>
            <span aria-hidden="true">·</span>
            <span>AAC Audio Sync</span>
            <span aria-hidden="true">·</span>
            <span>Zero Watermarks</span>
          </div>
        </div>

        {/* Bento Card 2: Audio */}
        <div className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-5 shadow-sm">
              <Music className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {f.audioTitle}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {f.audioDesc}
            </p>
          </div>
          <div className="pt-6 mt-6 border-t border-slate-100 text-xs text-slate-500">
            <span>Studio Master 48kHz Quality</span>
          </div>
        </div>

        {/* Bento Card 3: Blog Reader */}
        <div className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-5 shadow-sm">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {f.blogTitle}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {f.blogDesc}
            </p>
          </div>
          <div className="pt-6 mt-6 border-t border-slate-100 text-xs text-slate-500">
            <span>Markdown · HTML · Printable PDF</span>
          </div>
        </div>

        {/* Large Bento Card 4: Performance & Privacy */}
        <div className="md:col-span-2 bg-white p-7 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">
                Zero Client Installs
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Everything executes safely inside your modern web browser. No browser extensions, sketchy APKs, or dangerous executable files required.
              </p>
            </div>

            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">
                Privacy-First Architecture
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We never store personal accounts, session cookies, or download histories on third-party tracking servers. Requests are processed on-demand.
              </p>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
            <span>HTTPS Encrypted</span>
            <span aria-hidden="true">·</span>
            <span>GDPR Compliant</span>
            <span aria-hidden="true">·</span>
            <span>Decoupled API Backend</span>
          </div>
        </div>
      </div>
    </section>
  );
}
