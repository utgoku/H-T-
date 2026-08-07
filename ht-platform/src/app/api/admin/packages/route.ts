import { NextResponse } from 'next/server';
import { updatePackages } from '@/lib/db';

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const packages = await updatePackages(data);
    return NextResponse.json({ success: true, packages });
  } catch (error) {
    console.error('Failed to update packages:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
