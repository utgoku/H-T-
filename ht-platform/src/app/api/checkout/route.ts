import { NextRequest, NextResponse } from 'next/server';
import { AppError, ErrorCode, createApiErrorResponse } from '@/lib/errors';
import { SERVICE_PACKAGES } from '@/lib/constants';
import { Order, ApiResponse, OrderStatus, PackageType, PaymentGateway } from '@/types';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { packageSlug, paymentMethod, cardInfo } = body;

    if (!packageSlug) {
      throw new AppError('Gói dịch vụ không được để trống', ErrorCode.ERR_VALIDATION_FAILED, 400);
    }

    // Look up package
    const selectedPackage = SERVICE_PACKAGES.find(p => p.slug === packageSlug);
    if (!selectedPackage) {
      throw new AppError('Gói dịch vụ không tồn tại', ErrorCode.ERR_ORDER_NOT_FOUND, 404);
    }

    if (!paymentMethod) {
      throw new AppError('Vui lòng chọn phương thức thanh toán', ErrorCode.ERR_VALIDATION_FAILED, 400);
    }

    // Generate mock transaction
    const transactionId = crypto.randomUUID();
    
    // Stripe placeholder integration here for future
    // const stripeSession = await stripe.checkout.sessions.create({ ... })

    const mockOrder: Order = {
      id: crypto.randomUUID(),
      userId: 'user-demo-id', // Placeholder
      packageType: selectedPackage.slug.replace('-', '_').toUpperCase() as PackageType,
      amount: selectedPackage.price,
      status: OrderStatus.COMPLETED,
      paymentGateway: PaymentGateway.STRIPE,
      transactionId,
      createdAt: new Date(),
    };

    const response: ApiResponse<Order> = {
      success: true,
      data: mockOrder,
    };

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof AppError) {
      return createApiErrorResponse(error);
    }
    const unhandledError = new AppError(
      'Lỗi hệ thống khi thanh toán',
      ErrorCode.ERR_INTERNAL_SERVER,
      500
    );
    return createApiErrorResponse(unhandledError);
  }
}
