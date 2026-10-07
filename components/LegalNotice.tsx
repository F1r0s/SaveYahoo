'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function LegalNotice() {
  return (
    <section className="py-10 bg-white border-t border-slate-200 text-xs text-slate-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
        <div className="flex items-center justify-center gap-1.5 text-slate-700 font-semibold">
          <ShieldCheck className="w-4 h-4 text-[#6001d2]" />
          <span>Fair Use & Disclaimer</span>
        </div>
        <p className="leading-relaxed">
          SaveYahoo is an independent educational web tool designed for personal offline study, news archiving, and fair-use research.
          SaveYahoo is not affiliated with, endorsed by, or sponsored by Yahoo Inc. All Yahoo trademarks, logos, and brand names are the property of their respective owners.
        </p>
      </div>
    </section>
  );
}
