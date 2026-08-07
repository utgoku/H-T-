import { NextResponse } from 'next/server';
// import { handleWebhookEvent } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const payload = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    // REAL STRIPE INTEGRATION
    // Once stripe is installed, uncomment the following line:
    // const event = handleWebhookEvent(payload, signature);
    // console.log(`Processed event: ${event.id}`);

    // MOCK IMPLEMENTATION
    console.log('Received Stripe Webhook payload length:', payload.length);
    console.log('Mock processing complete.');

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook Error:', error.message);
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 }
    );
  }
}
