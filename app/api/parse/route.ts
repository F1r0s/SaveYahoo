import { NextRequest, NextResponse } from 'next/server';
import { downloadParserService } from '@/lib/download/parser-service';
import { ytDlpExtractor } from '@/lib/download/ytdlp-service';
import { brightcoveService } from '@/lib/download/brightcove-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { url } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ success: false, error: 'Please provide a valid URL.' }, { status: 400 });
    }

    const cleanUrl = url.trim();

    // 1. If it's a known preset or direct preset match, serve it quickly
    const presets = downloadParserService.getSamplePresets();
    const presetMatch = presets.find(
      (p) => p.url.toLowerCase() === cleanUrl.toLowerCase() || (cleanUrl.includes('sample') && cleanUrl.includes(p.id))
    );
    if (presetMatch) {
      return NextResponse.json({ success: true, data: presetMatch });
    }

    // 2. Try direct Brightcove player & manifest extraction
    try {
      const bcResult = await brightcoveService.extract(cleanUrl);
      if (bcResult.success && bcResult.data) {
        return NextResponse.json({ success: true, data: bcResult.data });
      }
    } catch {
      // Continue to yt-dlp
    }

    // 3. Try live yt-dlp extraction on the server
    try {
      const live = await ytDlpExtractor.extract(cleanUrl, 10000);
      if (live.success && live.data) {
        return NextResponse.json({ success: true, data: live.data });
      }
    } catch {
      // Continue to fallback parser
    }

    // 4. Fallback to synthesized metadata
    const result = await downloadParserService.parseUrl(cleanUrl);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal parsing error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function GET() {
  const samples = downloadParserService.getSamplePresets();
  return NextResponse.json({ success: true, presets: samples });
}
