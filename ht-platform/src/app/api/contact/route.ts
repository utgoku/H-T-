import { NextRequest, NextResponse } from 'next/server';
import { AppError, ErrorCode, createApiErrorResponse } from '@/lib/errors';
import { isValidEmail } from '@/lib/utils';
import { ContactFormData, ApiResponse } from '@/types';

// Simple in-memory rate limiting for demo
const rateLimits = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const lastSubmission = rateLimits.get(ip);

    if (lastSubmission && now - lastSubmission < 60000) {
      throw new AppError('Quá nhiều yêu cầu, vui lòng thử lại sau 1 phút', ErrorCode.ERR_RATE_LIMITED, 429);
    }

    const body = await req.json() as ContactFormData;
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      throw new AppError('Vui lòng điền đầy đủ tên, email và tin nhắn', ErrorCode.ERR_VALIDATION_FAILED, 400);
    }

    if (!isValidEmail(email)) {
      throw new AppError('Định dạng email không hợp lệ', ErrorCode.ERR_VALIDATION_FAILED, 400);
    }

    rateLimits.set(ip, now);

    // Simulate sending email
    console.log(`[Email Service] Gửi tin nhắn từ ${name} (${email}): ${subject}`);
    console.log(`[Email Service] Nội dung: ${message}`);

    const response: ApiResponse<string> = {
      success: true,
      data: 'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.',
    };

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof AppError) {
      return createApiErrorResponse(error);
    }
    const unhandledError = new AppError(
      'Lỗi hệ thống khi gửi tin nhắn liên hệ',
      ErrorCode.ERR_INTERNAL_SERVER,
      500
    );
    return createApiErrorResponse(unhandledError);
  }
}
