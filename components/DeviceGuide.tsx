'use client';

import React from 'react';
import { Smartphone, Laptop, Tablet, HardDrive } from 'lucide-react';

export default function DeviceGuide() {
  const devices = [
    {
      icon: Smartphone,
      title: 'iOS & iPhone (Safari)',
      desc: 'Tap Download to open the MP4 video. Tap the Share button in Safari, then choose "Save to Files" or "Save Video" to store directly in Photos.',
    },
    {
      icon: Smartphone,
      title: 'Android (Chrome / Samsung)',
      desc: 'Click Download or Direct MP4. The standard browser download manager saves the file directly into your device Downloads folder.',
    },
    {
      icon: Laptop,
      title: 'Windows PC & Mac',
      desc: 'Compatible with Chrome, Safari, Firefox, and Edge. Files save directly to your standard Downloads folder with full offline playback.',
    },
    {
      icon: Tablet,
      title: 'iPads & Android Tablets',
      desc: 'Direct in-browser media player support and one-click downloading for offline viewing during flights, commutes, or workouts.',
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#6001d2] text-xs font-semibold mb-3">
            <HardDrive className="w-3.5 h-3.5" />
            <span>Universal Device Support</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How to Save on Any Phone, Tablet, or PC
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            SaveYahoo produces standard H.264 MP4 and MP3 files supported natively by every modern OS with no app installations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {devices.map((d, i) => {
            const Icon = d.icon;
            return (
              <div key={i} className="p-5 rounded-xl border border-slate-200/90 bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-[#6001d2] flex items-center justify-center mb-3 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 mb-1.5">{d.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{d.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
