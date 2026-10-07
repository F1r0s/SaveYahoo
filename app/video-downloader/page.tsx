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
  title: 'Yahoo Video Downloader — Save HD 1080p MP4 Videos Free',
  description: 'Download Yahoo News, Sports, Finance, and Lifestyle video clips directly to your phone or computer in Full HD 1080p, 720p, and 480p MP4 formats.',
};

export default function VideoDownloaderPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-[#6001d2]/15 selection:text-[#6001d2]">
      <Navbar />

      <main className="flex-1">
        <HeroDownloader
          defaultFormat="video"
          headline="Yahoo Video Downloader (Full HD 1080p MP4)"
          subheadline="Download high-resolution video streams from Yahoo News, Yahoo Finance, Yahoo Sports, and Yahoo Lifestyle with one click. 100% free, no software required."
        />

        <div className="border-y border-slate-200 bg-slate-50/70 py-3 hidden sm:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#downloader" className="hover:text-[#6001d2] transition-colors">Downloader</a>
            <span className="text-slate-300">·</span>
            <a href="#how-it-works" className="hover:text-[#6001d2] transition-colors">How It Works</a>
            <span className="text-slate-300">·</span>
            <a href="#features" className="hover:text-[#6001d2] transition-colors">Supported Resolutions</a>
            <span className="text-slate-300">·</span>
            <a href="#devices" className="hover:text-[#6001d2] transition-colors">Device Guide</a>
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
