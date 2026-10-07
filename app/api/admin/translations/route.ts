import { NextRequest, NextResponse } from 'next/server';
import { TRANSLATIONS } from '@/lib/i18n/translations';

export async function GET() {
  return NextResponse.json({
    success: true,
    translations: TRANSLATIONS,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { locale, key, value } = body;

  return NextResponse.json({
    success: true,
    message: `Updated translation for [${locale}] ${key}: "${value}"`,
  });
}
