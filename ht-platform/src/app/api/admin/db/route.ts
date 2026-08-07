import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const db = await getDb();
    return NextResponse.json(db);
  } catch (error) {
    console.error('Failed to get db:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
