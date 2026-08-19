'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface QuizResultProps {
  scores: {
    bmi: number;
    bmiCategory: string;
    bmr: number;
    tdee: number;
    sleepScore: number;
    sleepCategory: string;
    dailyCalories: number;
    recommendations: string[];
  };
}

export default function QuizResult({ scores }: QuizResultProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const overallScore = Math.round((scores.sleepScore + (scores.bmi >= 18.5 && scores.bmi <= 24.9 ? 100 : 70)) / 2);
  const strokeDashoffset = 283 - (283 * overallScore) / 100;

  return (
    <div className={`w-full max-w-4xl mx-auto p-6 transition-all duration-700 transform ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2">Kết Quả Đánh Giá Sức Khỏe</h2>
        <p className="text-gray-600">Dựa trên thông tin bạn cung cấp, dưới đây là phân tích chi tiết.</p>
      </div>

      <div className="flex justify-center mb-12">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="8" />
            <circle 
              cx="50" cy="50" r="45" fill="none" stroke="#0D9488" strokeWidth="8"
              strokeDasharray="283"
              strokeDashoffset={mounted ? strokeDashoffset : 283}
              className="transition-all duration-1500 ease-out"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="text-3xl font-bold text-teal-700">{overallScore}</span>
            <span className="block text-xs text-gray-500 uppercase tracking-wider mt-1">Điểm tổng</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Card className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-gray-700">Chỉ số BMI</h3>
              <p className="text-3xl font-bold text-teal-600 mt-1">{scores.bmi.toFixed(1)}</p>
            </div>
            <Badge variant="primary" className="bg-teal-50 text-teal-700 border-teal-200">{scores.bmiCategory}</Badge>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 mt-6 relative">
            <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: `${Math.min((scores.bmi / 40) * 100, 100)}%` }}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Thiếu cân</span>
            <span>Bình thường</span>
            <span>Thừa cân</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-gray-700">Điểm Giấc Ngủ</h3>
              <p className="text-3xl font-bold text-blue-600 mt-1">{scores.sleepScore}<span className="text-lg text-gray-400">/100</span></p>
            </div>
            <Badge variant="primary" className="bg-blue-50 text-blue-700 border-blue-200">{scores.sleepCategory}</Badge>
          </div>
          <ProgressBar value={scores.sleepScore} variant="secondary" className="mt-6" />
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-gray-700 mb-2">TDEE (Năng lượng tiêu hao)</h3>
          <p className="text-2xl font-bold text-gray-900">{Math.round(scores.tdee)} <span className="text-sm font-normal text-gray-500">kcal / ngày</span></p>
          <p className="text-sm text-gray-600 mt-2">Dựa trên BMR và mức độ vận động của bạn.</p>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-gray-700 mb-2">Mục tiêu Calories khuyến nghị</h3>
          <p className="text-2xl font-bold text-teal-600">{Math.round(scores.dailyCalories)} <span className="text-sm font-normal text-gray-500">kcal / ngày</span></p>
          <p className="text-sm text-gray-600 mt-2">Đã điều chỉnh theo mục tiêu sức khỏe của bạn.</p>
        </Card>
      </div>

      <div className="bg-teal-50 rounded-2xl p-8 mb-10">
        <h3 className="text-xl font-playfair font-bold text-teal-900 mb-6">Khuyến Nghị Cá Nhân Hóa</h3>
        <ul className="space-y-4">
          {scores.recommendations.map((rec, idx) => (
            <li key={idx} className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-200 text-teal-700 flex items-center justify-center text-sm font-bold mt-0.5 mr-3">✓</span>
              <span className="text-teal-900">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center bg-gradient-to-r from-teal-600 to-blue-600 p-8 rounded-2xl text-white shadow-lg">
        <h3 className="text-2xl font-playfair font-bold mb-4">Bắt Đầu Hành Trình Của Bạn</h3>
        <p className="mb-6 opacity-90 max-w-2xl mx-auto">Đăng ký chương trình để biến kết quả này thành khung bữa ăn, routine giấc ngủ và các buổi tinh chỉnh 1:1 theo quyền lợi đã công bố.</p>
        <Button size="lg" className="bg-white text-teal-700 hover:bg-gray-100 px-8 py-6 text-lg rounded-full font-semibold shadow-xl transition-transform hover:scale-105">
          Khám phá gói dịch vụ
        </Button>
        <p className="mt-4 text-sm opacity-75">Bạn có thể lưu lại kết quả này hoặc dùng làm điểm khởi đầu khi trao đổi với PrymaLab.</p>
      </div>
    </div>
  );
}
