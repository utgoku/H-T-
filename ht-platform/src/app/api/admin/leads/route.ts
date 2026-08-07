import { NextResponse } from 'next/server';
import { addLead } from '@/lib/db';

export async function POST(request: Request) {
  try {
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
