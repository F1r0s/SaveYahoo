import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroDownloader from '@/components/HeroDownloader';
import HowItWorks from '@/components/HowItWorks';
import FeatureGrid from '@/components/FeatureGrid';
import DeviceGuide from '@/components/DeviceGuide';
import Troubleshooting from '@/components/Troubleshooting';
import FaqAccordion from '@/components/FaqAccordion';
import LegalNotice from '@/components/LegalNotice';

export const metadata: Metadata = {
  title: 'Yahoo Blog & Article Reader Mode — Clean Markdown & PDF Archival',
  description: 'Convert and save Yahoo Lifestyle, News, Tech, and Finance stories into clean, ad-free Markdown, standalone HTML, and printable PDF documents for offline research.',
};

export default function BlogReaderPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-[#6001d2]/15 selection:text-[#6001d2]">
      <Navbar />

      <main className="flex-1">
        <HeroDownloader
          defaultFormat="blog"
          headline="Yahoo Blog & Article Reader Mode (Ad-Free Archival)"
          subheadline="Strip away popups, banners, and autoplay scripts. Save Yahoo stories in formatted Markdown (.md), clean offline HTML, or printable reader PDFs."
        />

        <div className="border-y border-slate-200 bg-slate-50/70 py-3 hidden sm:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#downloader" className="hover:text-[#6001d2] transition-colors">Reader Tool</a>
            <span className="text-slate-300">·</span>
            <a href="#how-it-works" className="hover:text-[#6001d2] transition-colors">How to Archive</a>
            <span className="text-slate-300">·</span>
            <a href="#features" className="hover:text-[#6001d2] transition-colors">Export Formats</a>
            <span className="text-slate-300">·</span>
            <a href="#devices" className="hover:text-[#6001d2] transition-colors">Tablet & eReader Guide</a>
            <span className="text-slate-300">·</span>
            <a href="#faq" className="hover:text-[#6001d2] transition-colors">FAQ</a>
          </div>
        </div>

        <div id="how-it-works">
          <HowItWorks />
        </div>

        <div id="features">
          <FeatureGrid />
        </div>

        <div id="devices">
          <DeviceGuide />
        </div>

        <div id="troubleshooting">
          <Troubleshooting />
        </div>

        <div id="faq">
          <FaqAccordion />
        </div>

        <div id="compliance">
          <LegalNotice />
        </div>
      </main>

      <Footer />
    </div>
  );
}
