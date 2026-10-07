'use client';

import React from 'react';
import { ClipboardCheck, Sparkles, SlidersHorizontal, HardDriveDownload } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function HowItWorks() {
  const { translations } = useLanguage();
  const hw = translations.howItWorks;

  const icons = [ClipboardCheck, Sparkles, SlidersHorizontal, HardDriveDownload];

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {hw.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {hw.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hw.steps.map((step, idx) => {
            const Icon = icons[idx] || HardDriveDownload;
            return (
              <div
                key={step.step}
                className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-mono text-[#6001d2]">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-purple-50 text-[#6001d2] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
