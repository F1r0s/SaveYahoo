import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/auth/auth-service';

const SESSION_COOKIE_NAME = 'syo_admin_session';

export async function GET(req: NextRequest) {
  try {
    const cookieToken = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    const authHeader = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
    const token = cookieToken || authHeader;

    if (!token) {
      return NextResponse.json({ valid: false }, { status: 200 });
    }

    const user = await authService.verify(token);
    return NextResponse.json({ valid: !!user, user: user || null });
  } catch {
    return NextResponse.json({ valid: false }, { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { passkey, action } = body;

    const cookieToken = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    const directToken = body.token || cookieToken;

    if (action === 'verify') {
      const user = await authService.verify(directToken || '');
      return NextResponse.json({ valid: !!user, user: user || null });
    }

    if (action === 'logout') {
      if (directToken) {
        await authService.logout(directToken);
      }
      const response = NextResponse.json({ success: true });
      response.cookies.set(SESSION_COOKIE_NAME, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 0,
      });
      return response;
    }

    // Default action: Login
    const result = await authService.login(passkey || '');

    if (!result.success || !result.session) {
      return NextResponse.json(
        { success: false, message: result.message || 'Authentication failed' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      user: result.session.user,
      message: 'Authenticated successfully',
    });

    // Set secure HTTP-only cookie
    response.cookies.set(SESSION_COOKIE_NAME, result.session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
