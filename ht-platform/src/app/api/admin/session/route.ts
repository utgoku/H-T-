import { NextResponse } from 'next/server';
import {
  ADMIN_COOKIE_NAME,
  adminPasswordMatches,
  adminToken,
  hasAdminSession,
  isAdminConfigured,
} from '@/lib/admin-session';

export async function GET() {
  return NextResponse.json({
    configured: isAdminConfigured(),
    authenticated: await hasAdminSession(),
  });
}

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json({ error: 'Admin chưa được cấu hình trên máy chủ.' }, { status: 503 });
  }

  const { password } = await request.json().catch(() => ({ password: '' }));
  if (!adminPasswordMatches(password)) {
    return NextResponse.json({ error: 'Mật khẩu không chính xác.' }, { status: 401 });
  }

  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(ADMIN_COOKIE_NAME, adminToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(ADMIN_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
  return response;
}
