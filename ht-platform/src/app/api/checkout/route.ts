import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error: {
        message: 'Cổng thanh toán trực tuyến chưa được kích hoạt. Vui lòng dùng luồng đăng ký tư vấn để được xác nhận an toàn.',
      },
    },
    { status: 503 },
  );
}
