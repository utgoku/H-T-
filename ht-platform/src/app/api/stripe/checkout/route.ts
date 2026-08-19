import { NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ success: false, error: 'Stripe chưa được cấu hình.' }, { status: 503 });
  }

  try {
    const { packageSlug, customerEmail } = await request.json();
    if (!packageSlug || !customerEmail) {
      return NextResponse.json({ success: false, error: 'Thiếu gói dịch vụ hoặc email.' }, { status: 400 });
    }

    const sessionUrl = await createCheckoutSession(packageSlug, customerEmail);
    return NextResponse.json({ success: true, data: { sessionUrl } });
  } catch (error) {
    console.error('Checkout Session Error:', error);
    return NextResponse.json({ success: false, error: 'Không thể tạo phiên thanh toán.' }, { status: 500 });
  }
}
