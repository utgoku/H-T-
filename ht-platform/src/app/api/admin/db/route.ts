import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { hasAdminSession } from '@/lib/admin-session';

export async function GET() {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = await getDb();
    return NextResponse.json(db);
  } catch (error) {
    console.error('Failed to get db:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
