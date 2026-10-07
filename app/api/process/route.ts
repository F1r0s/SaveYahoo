import { NextRequest, NextResponse } from 'next/server';
import { brightcoveService } from '@/lib/download/brightcove-service';
import { ytDlpExtractor } from '@/lib/download/ytdlp-service';
import { downloadParserService } from '@/lib/download/parser-service';
import { SAMPLE_YAHOO_ITEMS } from '@/lib/download/samples';

export interface ProcessUrlRequest {
  url: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ProcessUrlRequest;
    const rawUrl = body?.url?.trim();

    if (!rawUrl) {
      return NextResponse.json({ success: false, error: 'Please provide a valid Yahoo URL' }, { status: 400 });
    }

    let cleanUrl = rawUrl;
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = `https://${cleanUrl}`;
    }

    // 1. Check local instant presets
    const presetMatch = SAMPLE_YAHOO_ITEMS.find(
      (p) =>
        cleanUrl.toLowerCase().includes(p.id) ||
        cleanUrl.toLowerCase().includes(p.category.toLowerCase()) ||
        cleanUrl.toLowerCase().includes(p.url.toLowerCase())
    );
    if (presetMatch && (cleanUrl.includes('sample') || cleanUrl.includes('demo') || cleanUrl.includes('preset'))) {
      return NextResponse.json({
        success: true,
        source: 'preset',
        available: true,
        data: presetMatch,
      });
    }

    // 2. Perform automated Brightcove master.m3u8 manifest extraction & validation
    try {
      const bcResult = await brightcoveService.extract(cleanUrl);
      if (bcResult.success && bcResult.data) {
        return NextResponse.json({
          success: true,
          source: 'brightcove-extractor',
          available: true,
          data: bcResult.data,
        });
      }
    } catch {
      // Continue to next extraction method
    }

    // 3. Fallback to yt-dlp extraction
    try {
      const ytdlpResult = await ytDlpExtractor.extract(cleanUrl, 10000);
      if (ytdlpResult.success && ytdlpResult.data) {
        return NextResponse.json({
          success: true,
          source: 'ytdlp-engine',
          available: true,
          data: ytdlpResult.data,
        });
      }
    } catch {
      // Continue to synthesized metadata
    }

    // 4. Synthesize verified reader & offline video options
    const fallbackResult = await downloadParserService.parseUrl(cleanUrl);
    if (fallbackResult.success && fallbackResult.data) {
      return NextResponse.json({
        success: true,
        source: 'smart-parser',
        available: true,
        data: fallbackResult.data,
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: fallbackResult.error || 'Could not process media stream from this URL',
      },
      { status: 422 }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server processing error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
