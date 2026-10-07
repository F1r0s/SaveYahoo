'use client';

import React, { useState, useEffect } from 'react';
import { Globe, Save, Check, RefreshCw, CheckCircle2 } from 'lucide-react';
import { SUPPORTED_LOCALES, Locale } from '@/lib/i18n/LanguageContext';
import { TRANSLATIONS } from '@/lib/i18n/translations';

export default function AdminLanguageManager() {
  const [activeLang, setActiveLang] = useState<Locale>('ar');
  const [strings, setStrings] = useState<any>(TRANSLATIONS);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/admin/translations')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && data.translations) {
          setStrings(data.translations);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpdate = async (keyPath: string, newValue: string) => {
    setSaving(true);
    setStatusMsg(null);
    try {
      const res = await fetch('/api/admin/translations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locale: activeLang,
          key: keyPath,
          value: newValue,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg(`Saved update for [${activeLang}] ${keyPath}`);
      }
    } catch {
      setStatusMsg('Failed to persist translation.');
    } finally {
      setSaving(false);
    }
  };

  const currentDict = strings[activeLang] || TRANSLATIONS.en;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Multilingual Language Manager (i18n)
            </h3>
            <p className="text-xs text-slate-500">
              Manage and live-edit UI strings for English, Arabic (Cairo RTL), Spanish, French, and Portuguese.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
            {SUPPORTED_LOCALES.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setActiveLang(l.code)}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                  activeLang === l.code
                    ? 'bg-white text-[#6001d2] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {l.nativeName} ({l.code.toUpperCase()})
              </button>
            ))}
          </div>
        </div>

        {statusMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}
      </div>

      {/* Editor Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/60 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <Globe className="w-4 h-4 text-[#6001d2]" />
            <span>Active Language: {activeLang.toUpperCase()} {activeLang === 'ar' ? '(Cairo RTL)' : '(LTR)'}</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Persisted in Neon PostgreSQL</span>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-700">Navbar: Video Downloader</label>
            <input
              type="text"
              defaultValue={currentDict.nav?.videoDownloader || ''}
              onBlur={(e) => handleUpdate('nav.videoDownloader', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#6001d2]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Navbar: Audio MP3</label>
            <input
              type="text"
              defaultValue={currentDict.nav?.audioConverter || ''}
              onBlur={(e) => handleUpdate('nav.audioConverter', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#6001d2]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Hero: Main Headline</label>
            <input
              type="text"
              defaultValue={currentDict.hero?.defaultHeadline || ''}
              onBlur={(e) => handleUpdate('hero.defaultHeadline', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#6001d2]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Hero: Subheadline</label>
            <textarea
              rows={2}
              defaultValue={currentDict.hero?.defaultSubheadline || ''}
              onBlur={(e) => handleUpdate('hero.defaultSubheadline', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#6001d2]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Hero: Input Placeholder</label>
            <input
              type="text"
              defaultValue={currentDict.hero?.inputPlaceholder || ''}
              onBlur={(e) => handleUpdate('hero.inputPlaceholder', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#6001d2]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}