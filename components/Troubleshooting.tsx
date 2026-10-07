'use client';

import React from 'react';
import { AlertCircle, CheckCircle2, Link2, Sparkles } from 'lucide-react';

export default function Troubleshooting() {
  const supportedPatterns = [
    'news.yahoo.com/... (Breaking news, White House briefings, interviews)',
    'finance.yahoo.com/... (Earnings recaps, market broadcasts, CEO interviews)',
    'sports.yahoo.com/... (Game highlights, press conferences, player analysis)',
    'yahoo.com/lifestyle/... (Recipe guides, home budget hacks, wellness videos)',
    'tech.yahoo.com/... (Product reviews, tech analysis, AI coverage)',
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-3">
            <Link2 className="w-3.5 h-3.5" />
            <span>Supported Yahoo Domains</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Supported Links & Troubleshooting Tips
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Easily paste any article or video from the global Yahoo network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="p-6 bg-white rounded-xl border border-slate-200/90 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Supported Link Formats</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600">
              {supportedPatterns.map((p, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6001d2] mt-1.5 shrink-0" />
                  <span className="font-mono">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200/90 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#6001d2]" />
              <span>Quick Pro-Tips</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span><strong>Both Articles & Videos</strong>: Yahoo lifestyle and news pages often embed video clips. SaveYahoo extracts both the video player and reader text.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span><strong>Direct Downloads</strong>: If browser pop-up permissions block automatic downloads, use the "Direct MP4" / "Direct MP3" link right below the button.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span><strong>No Account Needed</strong>: SaveYahoo operates 100% free with no login or subscriptions required.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
