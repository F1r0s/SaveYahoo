'use client';

import React, { useState } from 'react';
import {
  Video,
  Music,
  FileText,
  Download,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Printer,
  Sparkles,
  Loader2,
  Play,
  X,
  Volume2,
  Check,
  Clipboard,
} from 'lucide-react';
import { ParsedYahooMedia, VideoStreamOption, AudioStreamOption, BlogExportOption } from '@/lib/types';
import {
  generateMarkdownBlob,
  generateCleanHtmlBlob,
  triggerBrowserDownload,
  downloadRealMediaFile,
  fireDownloadSuccessCelebration,
} from '@/lib/download/client-downloader';
import { generateArticlePdfBlob } from '@/lib/download/pdf-generator';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface DownloadResultCardProps {
  media: ParsedYahooMedia;
}

export default function DownloadResultCard({ media }: DownloadResultCardProps) {
  const [activeTab, setActiveTab] = useState<'video' | 'audio' | 'blog'>(
    media.primaryType === 'blog' ? 'blog' : 'video'
  );
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [completedFormat, setCompletedFormat] = useState<string | null>(null);
  const [showReaderPreview, setShowReaderPreview] = useState<boolean>(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);
  const [copiedStreamUrl, setCopiedStreamUrl] = useState<boolean>(false);

  const { translations } = useLanguage();
  const c = translations.card;

  const handleCopyStreamLink = async () => {
    const streamLink = media.previewVideoUrl || media.url;
    try {
      await navigator.clipboard.writeText(streamLink);
      setCopiedStreamUrl(true);
      setTimeout(() => setCopiedStreamUrl(false), 2500);
    } catch {
      // Fallback
    }
  };

  // Handle Video Download simulation with REAL file saving
  const handleDownloadVideo = async (stream: VideoStreamOption) => {
    const key = `video_${stream.quality}`;
    const safeTitle = media.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 36);
    const filename = `SaveYahoo_${safeTitle}_${stream.quality}.${stream.format}`;
    const targetUrl = stream.directUrl || media.previewVideoUrl || '';
    const downloadEndpoint = `/api/download?url=${encodeURIComponent(targetUrl)}&filename=${encodeURIComponent(filename)}&type=video&category=${encodeURIComponent(media.category)}`;

    if (completedFormat === key) {
      await downloadRealMediaFile(downloadEndpoint, filename);
      fireDownloadSuccessCelebration();
      return;
    }

    setDownloadingFormat(key);
    setDownloadProgress(25);
    setCompletedFormat(null);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(async () => {
            await downloadRealMediaFile(downloadEndpoint, filename);
            setDownloadingFormat(null);
            setCompletedFormat(key);
            fireDownloadSuccessCelebration();
          }, 200);
          return 100;
        }
        return prev + 35;
      });
    }, 120);
  };

  // Handle Audio Download simulation with REAL file saving
  const handleDownloadAudio = async (stream: AudioStreamOption) => {
    const key = `audio_${stream.quality}`;
    const safeTitle = media.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 36);
    const filename = `SaveYahoo_${safeTitle}_${stream.quality}.${stream.format}`;
    const targetUrl = stream.directUrl || media.previewAudioUrl || '';
    const downloadEndpoint = `/api/download?url=${encodeURIComponent(targetUrl)}&filename=${encodeURIComponent(filename)}&type=audio&category=${encodeURIComponent(media.category)}`;

    if (completedFormat === key) {
      await downloadRealMediaFile(downloadEndpoint, filename);
      fireDownloadSuccessCelebration();
      return;
    }

    setDownloadingFormat(key);
    setDownloadProgress(30);
    setCompletedFormat(null);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(async () => {
            await downloadRealMediaFile(downloadEndpoint, filename);
            setDownloadingFormat(null);
            setCompletedFormat(key);
            fireDownloadSuccessCelebration();
          }, 200);
          return 100;
        }
        return prev + 40;
      });
    }, 120);
  };

  // Handle Blog Download
  const handleDownloadBlog = async (exportOption: BlogExportOption) => {
    const key = `blog_${exportOption.format}`;
    setDownloadingFormat(key);
    setDownloadProgress(30);

    setTimeout(async () => {
      setDownloadProgress(100);
      const safeTitle = media.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 36);

      if (exportOption.format === 'markdown') {
        const blob = generateMarkdownBlob(media);
        triggerBrowserDownload(blob, `SaveYahoo_${safeTitle}_Reader.md`);
      } else if (exportOption.format === 'html') {
        const blob = generateCleanHtmlBlob(media);
        triggerBrowserDownload(blob, `SaveYahoo_${safeTitle}_Clean.html`);
      } else if (exportOption.format === 'txt') {
        const blob = new Blob(
          [
            `${media.title}\n\n${media.url}\n\nSummary:\n${media.blogContent?.summary || media.description}\n\n${(
              media.blogContent?.paragraphs || []
            ).join('\n\n')}`,
          ],
          { type: 'text/plain;charset=utf-8' }
        );
        triggerBrowserDownload(blob, `SaveYahoo_${safeTitle}_Notes.txt`);
      } else if (exportOption.format === 'pdf') {
        try {
          const pdfBlob = await generateArticlePdfBlob(media);
          triggerBrowserDownload(pdfBlob, `SaveYahoo_${safeTitle}_Document.pdf`);
        } catch {
          // Fallback if canvas/font fails
          const txtBlob = new Blob([`${media.title}\n\n${media.description}`], { type: 'text/plain' });
          triggerBrowserDownload(txtBlob, `SaveYahoo_${safeTitle}.txt`);
        }
      }

      setDownloadingFormat(null);
      setCompletedFormat(key);
      fireDownloadSuccessCelebration();
    }, 400);
  };

  const getFallbackVideo = (cat: string) => {
    const cl = (cat || '').toLowerCase();
    if (cl.includes('news') || cl.includes('strait')) return '/media/news_strait.mp4';
    if (cl.includes('finance') || cl.includes('sp500')) return '/media/finance_sp500.mp4';
    if (cl.includes('sport')) return '/media/sports_championship.mp4';
    if (cl.includes('tech')) return '/media/tech_review.mp4';
    return '/media/lifestyle_groceries.mp4';
  };

  const getFallbackAudio = (cat: string) => {
    const cl = (cat || '').toLowerCase();
    if (cl.includes('news') || cl.includes('strait')) return '/media/news_strait.mp3';
    if (cl.includes('finance') || cl.includes('sp500')) return '/media/finance_sp500.mp3';
    if (cl.includes('sport')) return '/media/sports_championship.mp3';
    if (cl.includes('tech')) return '/media/tech_review.mp3';
    return '/media/lifestyle_groceries.mp3';
  };

  const getVideoSrc = () => {
    if (!media.previewVideoUrl) return getFallbackVideo(media.category);
    if (media.previewVideoUrl.startsWith('http://') || media.previewVideoUrl.startsWith('https://')) {
      return `/api/stream?url=${encodeURIComponent(media.previewVideoUrl)}`;
    }
    return media.previewVideoUrl;
  };

  const getAudioSrc = () => {
    if (!media.previewAudioUrl) return getFallbackAudio(media.category);
    if (media.previewAudioUrl.startsWith('http://') || media.previewAudioUrl.startsWith('https://')) {
      return `/api/stream?url=${encodeURIComponent(media.previewAudioUrl)}`;
    }
    return media.previewAudioUrl;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden text-slate-900 transition-all">
      {/* Top Banner & Header info */}
      <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          {/* Media Player or Thumbnail Container */}
          {isPlayingVideo ? (
            <div className="md:col-span-5 relative rounded-lg overflow-hidden border border-slate-200 bg-black aspect-video flex items-center justify-center shadow-md">
              <video
                src={getVideoSrc()}
                poster={media.thumbnailUrl || '/media/lifestyle_groceries.jpg'}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
                onError={(e) => {
                  const el = e.currentTarget;
                  const fallback = getFallbackVideo(media.category);
                  if (el.src !== window.location.origin + fallback) {
                    el.src = fallback;
                    el.play().catch(() => {});
                  }
                }}
              />
              <button
                type="button"
                onClick={() => setIsPlayingVideo(false)}
                className="absolute top-2 right-2 px-2.5 py-1 bg-black/80 hover:bg-black text-white text-xs font-semibold rounded-md backdrop-blur-xs flex items-center gap-1.5 transition-colors z-20 shadow-md"
                title={c.closePreview}
              >
                <X className="w-3.5 h-3.5" />
                <span>{c.closePreview}</span>
              </button>
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-emerald-600/90 text-[10px] font-bold tracking-wider uppercase text-white shadow pointer-events-none z-20">
                {c.playingPreview}
              </div>
            </div>
          ) : (
            <div
              onClick={() => setIsPlayingVideo(true)}
              className="md:col-span-5 relative group rounded-lg overflow-hidden border border-slate-200 bg-slate-900 aspect-video flex items-center justify-center cursor-pointer shadow-xs hover:border-[#6001d2] transition-all"
            >
              {/* Fallback styling container */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#6001d2]/20 to-slate-900 flex items-center justify-center">
                <span className="text-white/20 font-bold text-4xl">Yahoo</span>
              </div>

              {/* Actual image with lazy loading */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={media.thumbnailUrl || '/media/lifestyle_groceries.jpg'}
                alt={media.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Overlay with prominent Play button */}
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 transform group-hover:scale-105 transition-transform">
                  <div className="w-13 h-13 rounded-full bg-[#6001d2] group-hover:bg-[#5000b8] text-white flex items-center justify-center shadow-lg ring-4 ring-white/30 backdrop-blur-xs transition-all">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                  <span className="text-xs font-bold text-white bg-black/60 px-3 py-1 rounded-full backdrop-blur-xs shadow-xs border border-white/20">
                    {c.watchPreview}
                  </span>
                </div>
              </div>

              {/* Duration or read time badge */}
              <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/80 text-[11px] font-mono font-medium text-white backdrop-blur-sm pointer-events-none">
                {media.duration ? media.duration : media.readTime || 'Full Media'}
              </div>

              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#6001d2] text-[10px] font-bold tracking-wider uppercase text-white shadow pointer-events-none">
                Yahoo {media.category}
              </div>
            </div>
          )}

          {/* Media Info & Metadata - Zero-Pill discipline */}
          <div className="md:col-span-7 space-y-2.5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="text-[#6001d2] font-bold">Yahoo {media.category}</span>
              <span aria-hidden="true">·</span>
              <span>{media.author}</span>
              <span aria-hidden="true">·</span>
              <span>{media.publishedDate}</span>
              {media.duration && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{media.duration}</span>
                </>
              )}
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {media.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
              {media.description}
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-3 text-xs">
              <button
                type="button"
                onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                className="inline-flex items-center gap-1.5 font-bold text-[#6001d2] hover:text-[#4e00a8] bg-purple-50 hover:bg-purple-100 px-2.5 py-1 rounded-md transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isPlayingVideo ? c.closePreview : c.watchPreview}</span>
              </button>

              <span className="text-slate-300">|</span>

              <button
                type="button"
                onClick={handleCopyStreamLink}
                className="inline-flex items-center gap-1.5 font-medium text-slate-600 hover:text-[#6001d2] bg-slate-100 hover:bg-purple-50 px-2 py-0.5 rounded transition-colors"
                title="Copy direct M3U8 stream URL to clipboard"
              >
                {copiedStreamUrl ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Copied M3U8!</span>
                  </>
                ) : (
                  <>
                    <Clipboard className="w-3.5 h-3.5" />
                    <span>Copy M3U8 Stream</span>
                  </>
                )}
              </button>

              <span className="text-slate-300">|</span>

              <a
                href={media.url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-slate-500 hover:text-[#6001d2] transition-colors"
              >
                <span>{c.originalLink}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <span className="text-slate-300">|</span>

              <button
                type="button"
                onClick={() => setShowReaderPreview(!showReaderPreview)}
                className="inline-flex items-center gap-1 font-medium text-[#6001d2] hover:text-[#4e00a8]"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{showReaderPreview ? 'Hide Reader' : c.readerMode}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reader Mode Expander */}
      {showReaderPreview && (
        <div className="p-6 bg-amber-50/40 border-b border-amber-100/70 text-slate-800 transition-all">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-amber-200/50">
              <div className="flex items-center gap-2 text-amber-900 font-semibold text-sm">
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>{c.readerMode}</span>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleDownloadBlog({
                    format: 'pdf',
                    label: 'PDF',
                    description: '',
                    filesize: '',
                    readerOptimized: true,
                  })
                }
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-amber-900 bg-amber-100 hover:bg-amber-200 rounded transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
            </div>

            <div className="prose prose-slate max-w-none text-sm leading-relaxed">
              <p className="font-medium text-slate-900 bg-white p-3 rounded border border-amber-100">
                <strong>Summary:</strong> {media.blogContent?.summary || media.description}
              </p>

              {(media.blogContent?.paragraphs || [media.description]).map((para, idx) => (
                <div key={idx} className="my-3">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">
                    {(media.blogContent?.headings && media.blogContent.headings[idx]) ||
                      `Key Section ${idx + 1}`}
                  </h4>
                  <p className="text-slate-700">{para}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Format Selection Tab Bar */}
      <div className="px-5 sm:px-6 pt-4 border-b border-slate-200">
        <div className="flex items-center gap-2 overflow-x-auto pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('video')}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'video'
                ? 'bg-[#6001d2] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>{c.tabVideo}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('audio')}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'audio'
                ? 'bg-[#6001d2] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Music className="w-4 h-4" />
            <span>{c.tabAudio}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('blog')}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'blog'
                ? 'bg-[#6001d2] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{c.tabBlog}</span>
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="p-5 sm:p-6">
        {/* VIDEO TAB */}
        {activeTab === 'video' && (
          <div className="space-y-3">
            <div className="text-xs text-slate-500 font-medium pb-1 flex items-center justify-between">
              <span>{c.selectQuality}</span>
              <span className="text-emerald-600 font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> {c.highSpeedMirror}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 text-xs uppercase font-medium">
                    <th className="py-2.5 px-3">{c.quality}</th>
                    <th className="py-2.5 px-3">{c.resolution}</th>
                    <th className="py-2.5 px-3">{c.format}</th>
                    <th className="py-2.5 px-3">{c.fileSize}</th>
                    <th className="py-2.5 px-3">{c.audioTrack}</th>
                    <th className="py-2.5 px-3 text-right">{c.action}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {media.videoStreams.map((stream) => {
                    const key = `video_${stream.quality}`;
                    const isBusy = downloadingFormat === key;
                    const isDone = completedFormat === key;

                    return (
                      <tr key={stream.quality} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3 font-bold text-slate-900">
                          {stream.quality}
                          {stream.quality === '1080p' && (
                            <span className="ml-2 text-[10px] text-purple-700 font-semibold bg-purple-50 px-1.5 py-0.5 rounded">
                              Full HD
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-slate-600 font-mono text-xs tabular-nums">
                          {stream.resolution}
                        </td>
                        <td className="py-3 px-3 text-slate-600 uppercase text-xs font-medium">
                          {stream.format}
                        </td>
                        <td className="py-3 px-3 text-slate-900 font-semibold text-xs tabular-nums">
                          {stream.filesize}
                        </td>
                        <td className="py-3 px-3 text-xs text-emerald-600 font-medium">
                          {c.included}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => handleDownloadVideo(stream)}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all active:scale-95 ${
                              isDone
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                : 'bg-[#6001d2] hover:bg-[#4e00a8] text-white shadow-sm'
                            }`}
                          >
                            {isBusy ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>{downloadProgress}%</span>
                              </>
                            ) : isDone ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>{c.completedBtn}</span>
                              </>
                            ) : (
                              <>
                                <Download className="w-3.5 h-3.5" />
                                <span>{c.downloadBtn}</span>
                              </>
                            )}
                          </button>
                          <a
                            href={`/api/download?url=${encodeURIComponent(media.previewVideoUrl || '')}&filename=${encodeURIComponent(`SaveYahoo_${media.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 36)}_${stream.quality}.${stream.format}`)}&type=video&category=${encodeURIComponent(media.category)}`}
                            download={`SaveYahoo_${media.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 36)}_${stream.quality}.${stream.format}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-[10px] text-slate-400 hover:text-[#6001d2] mt-1 transition-colors"
                          >
                            Direct MP4
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* AUDIO TAB */}
        {activeTab === 'audio' && (
          <div className="space-y-4">
            {/* Audio Preview Player */}
            <div className="p-3.5 bg-purple-50/70 rounded-xl border border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#6001d2]">
                <Volume2 className="w-4 h-4" />
                <span>{c.audioPlayerTitle}</span>
              </div>
              <audio
                controls
                src={getAudioSrc()}
                className="w-full sm:w-80 h-8"
                onError={(e) => {
                  const el = e.currentTarget;
                  const fallback = getFallbackAudio(media.category);
                  if (el.src !== window.location.origin + fallback) {
                    el.src = fallback;
                  }
                }}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 text-xs uppercase font-medium">
                    <th className="py-2.5 px-3">{c.quality}</th>
                    <th className="py-2.5 px-3">{c.format}</th>
                    <th className="py-2.5 px-3">Sampling</th>
                    <th className="py-2.5 px-3">{c.fileSize}</th>
                    <th className="py-2.5 px-3 text-right">{c.action}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {media.audioStreams.map((stream) => {
                    const key = `audio_${stream.quality}`;
                    const isBusy = downloadingFormat === key;
                    const isDone = completedFormat === key;

                    return (
                      <tr key={stream.quality} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3 font-bold text-slate-900">
                          {stream.quality}
                          {stream.quality === '320kbps' && (
                            <span className="ml-2 text-[10px] text-amber-700 font-semibold bg-amber-50 px-1.5 py-0.5 rounded">
                              Studio
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-slate-600 uppercase text-xs font-medium">
                          {stream.format}
                        </td>
                        <td className="py-3 px-3 text-slate-600 font-mono text-xs tabular-nums">
                          {stream.sampleRate}
                        </td>
                        <td className="py-3 px-3 text-slate-900 font-semibold text-xs tabular-nums">
                          {stream.filesize}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => handleDownloadAudio(stream)}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all active:scale-95 ${
                              isDone
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                : 'bg-[#6001d2] hover:bg-[#4e00a8] text-white shadow-sm'
                            }`}
                          >
                            {isBusy ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>{downloadProgress}%</span>
                              </>
                            ) : isDone ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>{c.completedBtn}</span>
                              </>
                            ) : (
                              <>
                                <Download className="w-3.5 h-3.5" />
                                <span>{c.downloadBtn}</span>
                              </>
                            )}
                          </button>
                          <a
                            href={`/api/download?url=${encodeURIComponent(media.previewAudioUrl || '')}&filename=${encodeURIComponent(`SaveYahoo_${media.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 36)}_${stream.quality}.${stream.format}`)}&type=audio&category=${encodeURIComponent(media.category)}`}
                            download={`SaveYahoo_${media.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 36)}_${stream.quality}.${stream.format}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-[10px] text-slate-400 hover:text-[#6001d2] mt-1 transition-colors"
                          >
                            Direct MP3
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* BLOG & ARTICLE TAB */}
        {activeTab === 'blog' && (
          <div className="space-y-4">
            <div className="text-xs text-slate-500 font-medium pb-1 flex items-center justify-between">
              <span>{c.tabBlog}</span>
              <span className="text-emerald-600 font-medium">100% Ad-Free & Script-Free</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {media.blogExports.map((opt) => {
                const key = `blog_${opt.format}`;
                const isBusy = downloadingFormat === key;
                const isDone = completedFormat === key;

                return (
                  <div
                    key={opt.format}
                    className="p-4 rounded-lg border border-slate-200 hover:border-purple-300 bg-white hover:bg-purple-50/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-slate-900">{opt.label}</span>
                        <span className="text-xs font-mono text-slate-500 tabular-nums">
                          {opt.filesize}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mb-3">{opt.description}</p>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                      <span className="text-[11px] text-slate-400 uppercase font-semibold">
                        Format: .{opt.format}
                      </span>
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => handleDownloadBlog(opt)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all active:scale-95 ${
                          isDone
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        {isBusy ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <Download className="w-3.5 h-3.5" />
                        )}
                        <span>{isDone ? c.completedBtn : c.downloadBtn}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
