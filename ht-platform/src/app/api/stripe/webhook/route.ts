import { NextResponse } from 'next/server';
import { handleWebhookEvent } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Stripe webhook chưa được cấu hình.' }, { status: 503 });
  }

  try {
    const payload = await request.text();
    const signature = request.headers.get('stripe-signature');
    if (!signature) {
      return NextResponse.json({ error: 'Thiếu chữ ký Stripe.' }, { status: 400 });
    }

    const event = handleWebhookEvent(payload, signature);
    return NextResponse.json({ received: true, eventId: event.id });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Webhook không hợp lệ.' }, { status: 400 });
  }
}
