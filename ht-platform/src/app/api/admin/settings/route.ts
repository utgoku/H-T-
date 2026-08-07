import { NextResponse } from 'next/server';
import { updateSettings } from '@/lib/db';

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const settings = await updateSettings(data);
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error('Failed to update settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
