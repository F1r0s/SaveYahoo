import type { Metadata } from 'next';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'SaveYahoo',
  description: 'High-speed media and blog downloader for Yahoo. Save Yahoo Videos in HD 1080p, extract MP3 audio, and download Yahoo blogs and news articles in clean reader formats.',
  metadataBase: new URL('https://www.saveyahoo.ai.studio'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SaveYahoo',
    description: 'High-speed media and blog downloader for Yahoo. Save Yahoo Videos in HD 1080p, extract MP3 audio, and download Yahoo blogs and news articles in clean reader formats.',
    url: 'https://www.saveyahoo.ai.studio',
    siteName: 'SaveYahoo',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaveYahoo',
    description: 'High-speed media and blog downloader for Yahoo. Save Yahoo Videos in HD 1080p, extract MP3 audio, and download Yahoo blogs and news articles in clean reader formats.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans bg-white text-slate-900 antialiased min-h-screen" suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
