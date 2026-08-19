import { NextResponse } from 'next/server';
import { updateSettings } from '@/lib/db';
import { hasAdminSession } from '@/lib/admin-session';

export async function PUT(request: Request) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const settings = await updateSettings(data);
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error('Failed to update settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
