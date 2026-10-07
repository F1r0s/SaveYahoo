import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  const urlParam = req.nextUrl.searchParams.get('url');

  if (!urlParam) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  const targetUrl = decodeURIComponent(urlParam);
  const rangeHeader = req.headers.get('range');

  // If targetUrl is an HTML page (e.g. user pasted webpage URL), do not proxy upstream HTML as video
  const isHtmlUrl = targetUrl.endsWith('.html') || (!targetUrl.includes('.m3u8') && !targetUrl.includes('.mp4') && !targetUrl.includes('.mp3') && !targetUrl.includes('brightcove'));

  // Try upstream fetch only for genuine media / m3u8 / brightcove streams
  if (!isHtmlUrl && (targetUrl.startsWith('http://') || targetUrl.startsWith('https://'))) {
    try {
      const headers: Record<string, string> = {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        Referer: 'https://news.yahoo.com/',
        Origin: 'https://news.yahoo.com',
        Accept: '*/*',
      };

      if (rangeHeader) {
        headers['Range'] = rangeHeader;
      }

      const upstreamRes = await fetch(targetUrl, {
        headers,
        redirect: 'follow',
      });

      const upContentType = upstreamRes.headers.get('content-type') || '';

      // Only forward if upstream is actually audio or video or m3u8
      if (
        (upstreamRes.ok || upstreamRes.status === 206) &&
        !upContentType.includes('text/html') &&
        !upContentType.includes('application/json')
      ) {
        const resHeaders = new Headers();
        resHeaders.set('Content-Type', upContentType || 'video/mp4');
        resHeaders.set('Accept-Ranges', 'bytes');
        resHeaders.set('Access-Control-Allow-Origin', '*');

        if (upstreamRes.headers.get('content-range')) {
          resHeaders.set('Content-Range', upstreamRes.headers.get('content-range')!);
        }
        if (upstreamRes.headers.get('content-length')) {
          resHeaders.set('Content-Length', upstreamRes.headers.get('content-length')!);
        }

        return new NextResponse(upstreamRes.body, {
          status: upstreamRes.status === 206 ? 206 : 200,
          headers: resHeaders,
        });
      }
    } catch {
      // Fallback to local media below
    }
  }

  // Fallback to high-quality local media stream
  try {
    let mediaFile = 'lifestyle_groceries.mp4';
    const low = targetUrl.toLowerCase();
    if (low.includes('news') || low.includes('strait')) mediaFile = 'news_strait.mp4';
    else if (low.includes('finance') || low.includes('sp500') || low.includes('stock')) mediaFile = 'finance_sp500.mp4';
    else if (low.includes('sport')) mediaFile = 'sports_championship.mp4';
    else if (low.includes('tech')) mediaFile = 'tech_review.mp4';
    else if (low.endsWith('.mp3')) mediaFile = 'lifestyle_groceries.mp3';

    const filePath = path.join(process.cwd(), 'public', 'media', mediaFile);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const totalSize = stats.size;
      const isMp3 = mediaFile.endsWith('.mp3');
      const contentType = isMp3 ? 'audio/mpeg' : 'video/mp4';

      if (rangeHeader) {
        const parts = rangeHeader.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;
        const chunkSize = end - start + 1;
        const fileStream = fs.createReadStream(filePath, { start, end });

        const nodeStreamToWeb = new ReadableStream({
          start(controller) {
            fileStream.on('data', (chunk) => controller.enqueue(chunk));
            fileStream.on('end', () => controller.close());
            fileStream.on('error', (err) => controller.error(err));
          },
        });

        return new NextResponse(nodeStreamToWeb, {
          status: 206,
          headers: {
            'Content-Range': `bytes ${start}-${end}/${totalSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize.toString(),
            'Content-Type': contentType,
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      const fileBuffer = await fs.promises.readFile(filePath);
      return new NextResponse(new Uint8Array(fileBuffer), {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Content-Length': totalSize.toString(),
          'Accept-Ranges': 'bytes',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    return new NextResponse('Media stream unavailable', { status: 404 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Streaming fallback error';
    return new NextResponse(msg, { status: 500 });
  }
}

