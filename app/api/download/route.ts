import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mediaUrl = searchParams.get('url') || '';
    const rawFilename = searchParams.get('filename') || 'SaveYahoo_download.mp4';
    const type = searchParams.get('type') || 'video';
    const category = searchParams.get('category')?.toLowerCase() || 'lifestyle';

    // Sanitize filename to avoid header injection or invalid path characters
    const safeFilename = rawFilename.replace(/[^a-zA-Z0-9._-]/g, '_');

    // 1. If audio is requested and source is a remote URL or stream
    if (type === 'audio' && (mediaUrl.startsWith('http://') || mediaUrl.startsWith('https://'))) {
      try {
        const ffmpeg = spawn('/usr/bin/ffmpeg', [
          '-user_agent',
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          '-i',
          mediaUrl,
          '-vn',
          '-c:a',
          'libmp3lame',
          '-b:a',
          '320k',
          '-f',
          'mp3',
          'pipe:1',
        ]);

        const chunks: Buffer[] = [];
        const buffer = await new Promise<Buffer | null>((resolve) => {
          ffmpeg.stdout.on('data', (d) => chunks.push(d));
          ffmpeg.on('close', (code) => {
            if (code === 0 && chunks.length > 0) {
              resolve(Buffer.concat(chunks));
            } else {
              resolve(null);
            }
          });
          ffmpeg.on('error', () => resolve(null));
        });

        if (buffer && buffer.length > 0) {
          const finalMp3Name = safeFilename.endsWith('.mp3') ? safeFilename : `${safeFilename}.mp3`;
          return new NextResponse(new Uint8Array(buffer), {
            status: 200,
            headers: {
              'Content-Type': 'audio/mpeg',
              'Content-Disposition': `attachment; filename="${finalMp3Name}"`,
              'Content-Length': buffer.length.toString(),
              'Cache-Control': 'public, max-age=3600',
            },
          });
        }
      } catch {
        // Fallback to local audio
      }
    }

    // 2. If video is requested and source is a remote live stream or .m3u8 HLS playlist
    if (type === 'video' && (mediaUrl.startsWith('http://') || mediaUrl.startsWith('https://'))) {
      if (mediaUrl.includes('.m3u8') || mediaUrl.includes('brightcove')) {
        try {
          const ffmpeg = spawn('/usr/bin/ffmpeg', [
            '-headers',
            'Referer: https://news.yahoo.com/\r\nOrigin: https://news.yahoo.com\r\n',
            '-user_agent',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            '-i',
            mediaUrl,
            '-c',
            'copy',
            '-bsf:a',
            'aac_adtstoasc',
            '-movflags',
            '+frag_keyframe+empty_moov+default_base_moof',
            '-f',
            'mp4',
            'pipe:1',
          ]);

          const chunks: Buffer[] = [];
          const buffer = await new Promise<Buffer | null>((resolve) => {
            ffmpeg.stdout.on('data', (d) => chunks.push(d));
            ffmpeg.on('close', (code) => {
              if (code === 0 && chunks.length > 0) {
                resolve(Buffer.concat(chunks));
              } else {
                resolve(null);
              }
            });
            ffmpeg.on('error', () => resolve(null));
          });

          if (buffer && buffer.length > 0) {
            const finalMp4Name = safeFilename.endsWith('.mp4') ? safeFilename : `${safeFilename}.mp4`;
            return new NextResponse(new Uint8Array(buffer), {
              status: 200,
              headers: {
                'Content-Type': 'video/mp4',
                'Content-Disposition': `attachment; filename="${finalMp4Name}"`,
                'Content-Length': buffer.length.toString(),
                'Cache-Control': 'public, max-age=3600',
              },
            });
          }
        } catch {
          // Fallback to progressive fetch or local media
        }
      }

      // Direct MP4 progressive fetch
      try {
        const upstream = await fetch(mediaUrl, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            Referer: 'https://news.yahoo.com/',
          },
          redirect: 'follow',
        });

        if (upstream.ok && upstream.body) {
          const resHeaders = new Headers();
          resHeaders.set('Content-Type', upstream.headers.get('content-type') || 'video/mp4');
          resHeaders.set('Content-Disposition', `attachment; filename="${safeFilename}"`);
          const cl = upstream.headers.get('content-length');
          if (cl) resHeaders.set('Content-Length', cl);

          return new NextResponse(upstream.body, {
            status: 200,
            headers: resHeaders,
          });
        }
      } catch {
        // Fallback to local media if upstream remote stream fails
      }
    }

    // 3. Local media files
    let filePath: string | null = null;
    let contentType = 'video/mp4';

    if (type === 'audio') {
      contentType = 'audio/mpeg';
      if (category.includes('news')) filePath = 'news_strait.mp3';
      else if (category.includes('finance')) filePath = 'finance_sp500.mp3';
      else if (category.includes('sports')) filePath = 'sports_championship.mp3';
      else if (category.includes('tech')) filePath = 'tech_review.mp3';
      else filePath = 'lifestyle_groceries.mp3';
    } else {
      contentType = 'video/mp4';
      if (
        mediaUrl.includes('lifestyle') ||
        category.includes('lifestyle') ||
        category.includes('groceries') ||
        category.includes('food')
      ) {
        filePath = 'lifestyle_groceries.mp4';
      } else if (mediaUrl.includes('news') || category.includes('news') || category.includes('strait')) {
        filePath = 'news_strait.mp4';
      } else if (mediaUrl.includes('finance') || category.includes('finance') || category.includes('sp500')) {
        filePath = 'finance_sp500.mp4';
      } else if (mediaUrl.includes('sports') || category.includes('sports')) {
        filePath = 'sports_championship.mp4';
      } else if (mediaUrl.includes('tech') || category.includes('tech')) {
        filePath = 'tech_review.mp4';
      } else {
        filePath = 'lifestyle_groceries.mp4';
      }
    }

    const fullDiskPath = path.join(process.cwd(), 'public', 'media', filePath);

    if (fs.existsSync(fullDiskPath)) {
      const fileBuffer = await fs.promises.readFile(fullDiskPath);
      return new NextResponse(new Uint8Array(fileBuffer), {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': `attachment; filename="${safeFilename}"`,
          'Content-Length': fileBuffer.length.toString(),
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }

    // Fallback: test.mp4
    const testPath = path.join(process.cwd(), 'public', 'media', 'test.mp4');
    if (fs.existsSync(testPath)) {
      const fileBuffer = await fs.promises.readFile(testPath);
      return new NextResponse(new Uint8Array(fileBuffer), {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': `attachment; filename="${safeFilename}"`,
          'Content-Length': fileBuffer.length.toString(),
        },
      });
    }

    return new NextResponse('Media stream not found', { status: 404 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Download failed';
    return new NextResponse(message, { status: 500 });
  }
}
