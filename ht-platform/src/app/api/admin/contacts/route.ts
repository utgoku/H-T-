import { NextResponse } from 'next/server';
import { addContact, updateContact } from '@/lib/db';
import { hasAdminSession } from '@/lib/admin-session';
import { allowRequest, requestIp } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    if (!allowRequest(`contact:${requestIp(request)}`, 5, 10 * 60_000)) {
      return NextResponse.json({ error: 'Vui lòng thử lại sau ít phút.' }, { status: 429 });
    }
    const data = await request.json();
    
    // Basic validation
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const contact = await addContact({
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      subject: data.subject || '',
      message: data.message
    });

    return NextResponse.json({ success: true, contact }, { status: 201 });
  } catch (error) {
    console.error('Failed to submit contact:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const data = await request.json();
    if (typeof data.id !== 'string' || typeof data.status !== 'string') {
      return NextResponse.json({ error: 'Dữ liệu cập nhật không hợp lệ.' }, { status: 400 });
    }
    await updateContact(data.id, data.status, typeof data.adminNote === 'string' ? data.adminNote : '');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update contact:', error);
    return NextResponse.json({ error: 'Không thể cập nhật liên hệ.' }, { status: 500 });
  }
}
