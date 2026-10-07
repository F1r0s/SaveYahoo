import { ParsedYahooMedia, VideoStreamOption, AudioStreamOption, BlogExportOption } from '../types';

export interface DownloadProgressState {
  isDownloading: boolean;
  progress: number; // 0 - 100
  downloadSpeed: string;
  currentSizeMb: string;
  totalSizeMb: string;
  statusText: string;
  finished: boolean;
  filename: string;
}

/**
 * Triggers a real browser file download using standard Blob and temporary <a> tag
 */
export function triggerBrowserDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 3000);
}

/**
 * Downloads a real playable MP4 video or MP3 audio file directly from the server
 */
export async function downloadRealMediaFile(downloadUrl: string, filename: string): Promise<void> {
  try {
    const res = await fetch(downloadUrl);
    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 4000);
      return;
    }
  } catch {
    // If fetch failed (e.g. cross-origin restriction), fallback to direct link
  }

  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = downloadUrl;
  a.download = filename;
  a.target = '_blank';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
  }, 3000);
}

/**
 * Generates clean formatted Markdown content from a parsed blog/article
 */
export function generateMarkdownBlob(item: ParsedYahooMedia): Blob {
  const frontmatter = `---
title: "${item.title.replace(/"/g, '\\"')}"
author: "${item.author}"
date: "${item.publishedDate}"
source_url: "${item.url}"
category: "${item.category}"
archived_by: "SaveYahoo (www.saveyahoo.ai.studio)"
---

# ${item.title}

> **Source**: [Yahoo ${item.category}](${item.url})  
> **Author**: ${item.author} · ${item.publishedDate}  
> **Archived For Offline Reading**: SaveYahoo Utility

---

## Executive Summary
${item.blogContent?.summary || item.description}

### Key Takeaways
${(item.blogContent?.keyPoints || []).map(p => `- ${p}`).join('\n')}

---

## Article Content

${(item.blogContent?.paragraphs || [item.description]).map((p, i) => `### ${(item.blogContent?.headings && item.blogContent.headings[i]) || `Section ${i + 1}`}\n\n${p}`).join('\n\n')}

---
*Archived using SaveYahoo — High Speed Yahoo Video, Audio and Blog Downloader.*
`;

  return new Blob([frontmatter], { type: 'text/markdown;charset=utf-8' });
}

/**
 * Generates an ad-free clean standalone HTML reader file
 */
export function generateCleanHtmlBlob(item: ParsedYahooMedia): Blob {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${item.title} — SaveYahoo Offline Reader</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.7;
      color: #1e293b;
      background: #f8fafc;
      margin: 0;
      padding: 40px 20px;
    }
    .container {
      max-width: 760px;
      margin: 0 auto;
      background: #ffffff;
      padding: 48px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;
    }
    .badge {
      display: inline-block;
      font-size: 12px;
      font-weight: 600;
      color: #6001d2;
      background: #f3e8ff;
      padding: 4px 10px;
      border-radius: 6px;
      margin-bottom: 16px;
    }
    h1 {
      font-size: 32px;
      line-height: 1.25;
      margin: 0 0 16px 0;
      color: #0f172a;
    }
    .meta {
      font-size: 14px;
      color: #64748b;
      margin-bottom: 24px;
      padding-bottom: 20px;
      border-bottom: 1px solid #e2e8f0;
    }
    .summary-box {
      background: #faf5ff;
      border-left: 4px solid #6001d2;
      padding: 16px 20px;
      border-radius: 4px;
      margin-bottom: 32px;
      font-size: 15px;
      color: #334155;
    }
    h2 {
      font-size: 20px;
      margin-top: 32px;
      color: #1e293b;
    }
    p {
      font-size: 16px;
      color: #334155;
      margin: 16px 0;
    }
    .footer {
      margin-top: 48px;
      padding-top: 24px;
      border-top: 1px solid #e2e8f0;
      font-size: 13px;
      color: #94a3b8;
      text-align: center;
    }
    @media print {
      body { background: white; padding: 0; }
      .container { box-shadow: none; border: none; padding: 0; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="badge">Yahoo ${item.category} · Archived with SaveYahoo</div>
    <h1>${item.title}</h1>
    <div class="meta">
      By <strong>${item.author}</strong> · Published ${item.publishedDate} · Source: <a href="${item.url}" target="_blank" style="color:#6001d2;">Original Yahoo Link</a>
    </div>

    <div class="summary-box">
      <strong>Overview:</strong> ${item.blogContent?.summary || item.description}
    </div>

    ${(item.blogContent?.paragraphs || [item.description])
      .map((p, i) => `<h2>${(item.blogContent?.headings && item.blogContent.headings[i]) || `Section ${i + 1}`}</h2><p>${p}</p>`)
      .join('')}

    <div class="footer">
      Archived by SaveYahoo (www.saveyahoo.ai.studio). Distributed for offline research and personal fair use.
    </div>
  </div>
</body>
</html>`;

  return new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
}

/**
 * Generates an MP4 media simulation blob containing metadata
 */
export function generateVideoPlaceholderBlob(item: ParsedYahooMedia, stream: VideoStreamOption): Blob {
  const binaryContent = `SaveYahoo_VIDEO_STREAM\nID:${item.id}\nTITLE:${item.title}\nFORMAT:${stream.format}\nQUALITY:${stream.quality}\nRESOLUTION:${stream.resolution}\nBITRATE:${stream.bitrate}\nSOURCE:${item.url}\nDATE:${new Date().toISOString()}\n[Simulated MP4 container with synchronized H.264/AAC audio-video payload ready for local playback]`;
  return new Blob([binaryContent], { type: 'video/mp4' });
}

/**
 * Generates an MP3 audio simulation blob with ID3 metadata
 */
export function generateAudioPlaceholderBlob(item: ParsedYahooMedia, stream: AudioStreamOption): Blob {
  const binaryContent = `SaveYahoo_AUDIO_STREAM_ID3v2\nID:${item.id}\nTITLE:${item.title}\nARTIST:${item.author}\nALBUM:Yahoo ${item.category} Audio Archives\nBITRATE:${stream.quality}\nFORMAT:${stream.format}\n[Simulated high-fidelity audio stream encoded with LAME MP3]`;
  return new Blob([binaryContent], { type: 'audio/mpeg' });
}

/**
 * Fires celebratory confetti safely on client side
 */
export async function fireDownloadSuccessCelebration() {
  try {
    if (typeof window !== 'undefined') {
      const confettiModule = await import('canvas-confetti');
      const confettiFn = (confettiModule as any).default || confettiModule;
      if (typeof confettiFn === 'function') {
        confettiFn({
          particleCount: 65,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#6001d2', '#9333ea', '#38bdf8', '#10b981'],
        });
      }
    }
  } catch {
    // Ignore if canvas isn't supported or fails to load
  }
}
