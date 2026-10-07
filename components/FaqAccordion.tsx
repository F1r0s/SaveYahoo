'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { translations } = useLanguage();
  const faqData = translations.faq;

  return (
    <section id="faq" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6001d2]/10 text-[#6001d2] text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQ & Guides</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {faqData.title}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {faqData.subtitle}
          </p>
        </div>

        <div className="space-y-3">
          {faqData.items.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between text-sm sm:text-base font-bold text-slate-900 hover:text-[#6001d2] transition-colors"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#6001d2]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
