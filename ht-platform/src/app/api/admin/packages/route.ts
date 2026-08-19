import { NextResponse } from 'next/server';
import { updatePackages } from '@/lib/db';
import { hasAdminSession } from '@/lib/admin-session';

export async function PUT(request: Request) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const packages = await updatePackages(data);
    return NextResponse.json({ success: true, packages });
  } catch (error) {
    console.error('Failed to update packages:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
