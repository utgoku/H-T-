import { NextRequest, NextResponse } from 'next/server';
import { AppError, ErrorCode, createApiErrorResponse } from '@/lib/errors';
import { MealPlan, MealItem, ApiResponse, MealType } from '@/types';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');

    if (!date) {
      throw new AppError('Vui lòng cung cấp ngày (date)', ErrorCode.ERR_VALIDATION_FAILED, 400);
    }

    // Demo meal items
    const breakfast: MealItem = { id: 'm1', mealPlanId: `mp-${date}`, name: 'Phở bò tái nạm', calories: 450, mealType: MealType.BREAKFAST, isCompleted: false };
    const lunch: MealItem = { id: 'm2', mealPlanId: `mp-${date}`, name: 'Cơm tấm sườn bì chả', calories: 600, mealType: MealType.LUNCH, isCompleted: false };
    const snack: MealItem = { id: 'm3', mealPlanId: `mp-${date}`, name: 'Sữa chua không đường', calories: 100, mealType: MealType.SNACK, isCompleted: false };
    const dinner: MealItem = { id: 'm4', mealPlanId: `mp-${date}`, name: 'Salad gà nướng', calories: 350, mealType: MealType.DINNER, isCompleted: false };

    const meals = [breakfast, lunch, snack, dinner];
    const totalCalories = meals.reduce((sum, item) => sum + item.calories, 0);

    const mealPlan: MealPlan = {
      id: `mp-${date}`,
      userId: 'demo-user-id',
      title: `Thực đơn ngày ${date}`,
      dayDate: new Date(date as string),
      totalCalories,
      items: meals,
      createdAt: new Date(),
    };

    const response: ApiResponse<MealPlan> = {
      success: true,
      data: mealPlan,
    };

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof AppError) {
      return createApiErrorResponse(error);
    }
    return createApiErrorResponse(new AppError('Lỗi tải danh sách bữa ăn', ErrorCode.ERR_INTERNAL_SERVER, 500));
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { itemId, isCompleted } = body;

    if (typeof itemId !== 'string' || typeof isCompleted !== 'boolean') {
      throw new AppError('Dữ liệu không hợp lệ', ErrorCode.ERR_VALIDATION_FAILED, 400);
    }

    // In a real app, update DB here
    const updatedItem: MealItem = {
      id: itemId,
      mealPlanId: 'mock-plan-id',
      name: 'Món ăn cập nhật',
      calories: 0,
      mealType: MealType.SNACK,
      isCompleted,
    };

    const response: ApiResponse<MealItem> = {
      success: true,
      data: updatedItem,
    };

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof AppError) {
      return createApiErrorResponse(error);
    }
    return createApiErrorResponse(new AppError('Lỗi cập nhật bữa ăn', ErrorCode.ERR_INTERNAL_SERVER, 500));
  }
}
