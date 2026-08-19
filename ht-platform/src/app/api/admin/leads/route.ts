import { NextResponse } from 'next/server';
import { addLead, updateLead } from '@/lib/db';
import { hasAdminSession } from '@/lib/admin-session';
import { allowRequest, requestIp } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    if (!allowRequest(`lead:${requestIp(request)}`, 5, 10 * 60_000)) {
      return NextResponse.json({ error: 'Vui lòng thử lại sau ít phút.' }, { status: 429 });
    }
    const data = await request.json();
    
    // Basic validation
    if (!data.name || !data.emailOrPhone) {
      return NextResponse.json({ error: 'Missing required fields (name, emailOrPhone)' }, { status: 400 });
    }

    const lead = await addLead({
      name: data.name,
      emailOrPhone: data.emailOrPhone,
      bmi: data.bmi,
      bmiCategory: data.bmiCategory,
      tdee: data.tdee,
      sleepScore: data.sleepScore,
      sleepCategory: data.sleepCategory,
      goals: data.goals
    });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error('Failed to submit lead:', error);
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
    await updateLead(data.id, data.status, typeof data.adminNote === 'string' ? data.adminNote : '');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update lead:', error);
    return NextResponse.json({ error: 'Không thể cập nhật lead.' }, { status: 500 });
  }
}
