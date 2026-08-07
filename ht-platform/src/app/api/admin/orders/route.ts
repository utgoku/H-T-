import { NextResponse } from 'next/server';
import { addOrder } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    if (!data.packageId || !data.customerName || !data.customerPhone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const order = await addOrder({
      packageId: data.packageId,
      packageName: data.packageName || data.packageId,
      customerName: data.customerName,
      customerPhone: data.customerPhone
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error('Failed to submit order:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
