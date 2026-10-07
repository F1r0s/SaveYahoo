import React from 'react';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
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
  title: 'SaveYahoo — High-Speed Yahoo Video, Audio & Blog Downloader',
  description: 'Download high-definition 1080p Yahoo Videos, extract studio-quality 320kbps MP3 audio, and save Yahoo blogs and news articles in clean reader formats.',
  openGraph: {
    title: 'SaveYahoo — High-Speed Yahoo Video, Audio & Blog Downloader',
    description: 'Download high-definition 1080p Yahoo Videos, extract studio-quality 320kbps MP3 audio, and save Yahoo blogs and news articles.',
    type: 'website',
    url: 'https://www.saveyahoo.ai.studio',
    siteName: 'SaveYahoo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaveYahoo — High-Speed Yahoo Video, Audio & Blog Downloader',
    description: 'Download high-definition 1080p Yahoo Videos, extract studio-quality 320kbps MP3 audio, and save Yahoo blogs and news articles.',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-[#6001d2]/15 selection:text-[#6001d2]">
      {/* Top Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* Main Hero Downloader Section */}
        <HeroDownloader />

        {/* Jump Navigation Bar (Single Line Controls) */}
        <div className="border-y border-slate-200 bg-slate-50/70 py-3 hidden sm:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#downloader" className="hover:text-[#6001d2] transition-colors">
              Downloader Tool
            </a>
            <span className="text-slate-300">·</span>
            <a href="#how-it-works" className="hover:text-[#6001d2] transition-colors">
              How to Save
            </a>
            <span className="text-slate-300">·</span>
            <a href="#features" className="hover:text-[#6001d2] transition-colors">
              Features
            </a>
            <span className="text-slate-300">·</span>
            <a href="#devices" className="hover:text-[#6001d2] transition-colors">
              Devices
            </a>
            <span className="text-slate-300">·</span>
            <a href="#troubleshooting" className="hover:text-[#6001d2] transition-colors">
              Supported Links
            </a>
            <span className="text-slate-300">·</span>
            <a href="#faq" className="hover:text-[#6001d2] transition-colors">
              FAQ
            </a>
          </div>
        </div>

        {/* 4-Step Process Section */}
        <div id="how-it-works">
          <HowItWorks />
        </div>

        {/* Bento Grid Feature Capabilities */}
        <div id="features">
          <FeatureGrid />
        </div>

        {/* Cross-Device Compatibility Guide */}
        <div id="devices">
          <DeviceGuide />
        </div>

        {/* Troubleshooting & Supported URLs */}
        <div id="troubleshooting">
          <Troubleshooting />
        </div>

        {/* Quick Convert Callout */}
        <section className="py-12 bg-gradient-to-r from-[#1f0049] via-[#6001d2] to-[#4e00a8] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Ready to Save Your Favorite Yahoo Videos or Articles?
            </h2>
            <p className="text-xs sm:text-sm text-purple-100 max-w-xl mx-auto leading-relaxed">
              Paste any link from Yahoo News, Finance, Sports, or Lifestyle above to download in original high-definition or extract clean audio in seconds.
            </p>
            <div className="pt-2">
              <a
                href="#downloader"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-md transition-all active:scale-95"
              >
                <span>Paste URL Now</span>
                <ArrowRight className="w-4 h-4 text-[#6001d2]" />
              </a>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <div id="faq">
          <FaqAccordion />
        </div>

        {/* Legal & Compliance Notice */}
        <div id="compliance">
          <LegalNotice />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
