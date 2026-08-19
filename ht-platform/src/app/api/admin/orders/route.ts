import { NextResponse } from 'next/server';
import { updateOrder } from '@/lib/db';
import { hasAdminSession } from '@/lib/admin-session';

export async function PATCH(request: Request) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    if (typeof data.id !== 'string' || typeof data.status !== 'string') {
      return NextResponse.json({ error: 'Dữ liệu cập nhật không hợp lệ.' }, { status: 400 });
    }
    await updateOrder(data.id, data.status, typeof data.adminNote === 'string' ? data.adminNote : '');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update order:', error);
    return NextResponse.json({ error: 'Không thể cập nhật đơn.' }, { status: 500 });
  }
}
