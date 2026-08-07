'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { ProgressBar } from '@/components/ui/ProgressBar';
import QuizResult from './QuizResult';
import {
  calculateBMI,
  calculateBMR,
  calculateTDEE,
  calculateSleepScore,
  getSleepScoreCategory,
  getBMICategory,
  generateHealthRecommendations
} from '@/lib/quiz-scoring';

export default function QuizEngine() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [scores, setScores] = useState<any>(null);

  const [answers, setAnswers] = useState({
    fullName: '',
    emailOrPhone: '',
    age: '',
    gender: '',
    weightKg: '',
    heightCm: '',
    targetGoal: '',
    activityLevel: '',
    averageSleepHours: 7,
    sleepLatencyMinutes: '',
    nightWakeups: '',
    screenTimeBeforeBed: '',
    caffeineIntake: '',
    sleepScheduleConsistency: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 8;

  const handleChange = (field: string, value: any) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      submitQuiz();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const submitQuiz = async () => {
    if (!answers.emailOrPhone) {
      alert('Vui lòng nhập Email hoặc Số điện thoại để nhận kết quả!');
      return;
    }

    setIsSubmitting(true);
    const age = Number(answers.age);
    const weight = Number(answers.weightKg);
    const height = Number(answers.heightCm);

    const genderMap: Record<string, 'MALE' | 'FEMALE' | 'OTHER'> = {
      'Nam': 'MALE',
      'Nữ': 'FEMALE',
      'Khác': 'OTHER',
    };
    const gender = genderMap[answers.gender] || 'OTHER';

    const activityMap: Record<string, import('@/lib/quiz-scoring').ActivityLevel> = {
      'Ít vận động': 'sedentary',
      'Vận động nhẹ': 'light',
      'Vận động vừa': 'moderate',
      'Vận động nhiều': 'active',
      'Vận động rất nhiều': 'very_active',
    };
    const activityLevel = activityMap[answers.activityLevel] || 'sedentary';

    const latencyMap: Record<string, number> = {
      '<15 phút': 10,
      '15-30 phút': 22,
      '30-60 phút': 45,
      '>60 phút': 75,
    };
    const wakeupsMap: Record<string, number> = {
      '0': 0,
      '1': 1,
      '2': 2,
      '3+': 3,
    };

    const bmi = calculateBMI(weight, height);
    const bmiCategory = getBMICategory(bmi);
    const bmr = calculateBMR(weight, height, age, gender);
    const tdee = calculateTDEE(bmr, activityLevel);

    const sleepAnswers: import('@/lib/quiz-scoring').SleepQuizAnswers = {
      durationHours: answers.averageSleepHours,
      latencyMinutes: latencyMap[answers.sleepLatencyMinutes] || 30,
      wakeupsPerNight: wakeupsMap[answers.nightWakeups] || 1,
      feelsRested: answers.nightWakeups === '0' || answers.nightWakeups === '1',
      usesScreensBeforeBed: answers.screenTimeBeforeBed !== 'Không',
      caffeineAfternoon: answers.caffeineIntake !== 'Không' && answers.caffeineIntake !== '1 ly',
      consistentSchedule: answers.sleepScheduleConsistency === 'Rất đều đặn' || answers.sleepScheduleConsistency === 'Khá đều',
    };

    const sleepScore = calculateSleepScore(sleepAnswers);
    const sleepCategory = getSleepScoreCategory(sleepScore);

    let dailyCalories = tdee;
    if (answers.targetGoal === 'Giảm mỡ') dailyCalories -= 500;
    if (answers.targetGoal === 'Tăng cơ') dailyCalories += 300;

    const recommendations = generateHealthRecommendations({
      bmi,
      bmiCategory,
      tdee,
      sleepScore,
      sleepCategory,
      dailyCalories,
    });

    const finalScores = {
      bmi,
      bmiCategory,
      bmr,
      tdee,
      sleepScore,
      sleepCategory,
      dailyCalories,
      recommendations,
    };

    try {
      await fetch('/api/admin/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: answers.fullName || 'Khách hàng ẩn danh',
          emailOrPhone: answers.emailOrPhone,
          bmi,
          bmiCategory,
          tdee,
          sleepScore,
          sleepCategory,
          goals: answers.targetGoal
        })
      });
    } catch (e) {
      console.error('Error saving lead:', e);
    }

    setScores(finalScores);
    setIsSubmitting(false);
    setIsComplete(true);
  };

  if (isComplete) {
    return <QuizResult scores={scores} />;
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-xl transition-all duration-300">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-teal-600">Bước {currentStep + 1} / {totalSteps}</span>
          <span className="text-sm text-gray-500">{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
        </div>
        <ProgressBar value={((currentStep + 1) / totalSteps) * 100} variant="primary" />
      </div>

      <div className="min-h-[400px] overflow-hidden relative">
        {currentStep === 0 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-2">Thông tin cơ bản</h2>
            <p className="text-gray-600 mb-6">Hãy cho chúng tôi biết một chút về bạn.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                <Input value={answers.fullName} onChange={(e) => handleChange('fullName', e.target.value)} placeholder="Nhập họ và tên" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tuổi</label>
                <Input type="number" value={answers.age} onChange={(e) => handleChange('age', e.target.value)} placeholder="Nhập tuổi" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
                <div className="flex gap-4">
                  {['Nam', 'Nữ', 'Khác'].map(gender => (
                    <button
                      key={gender}
                      onClick={() => handleChange('gender', gender)}
                      className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${answers.gender === gender ? 'border-teal-600 bg-teal-50 text-teal-700' : 'border-gray-200 hover:border-teal-300'}`}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-2">Chỉ số cơ thể</h2>
            <p className="text-gray-600 mb-6">Thông tin này giúp chúng tôi tính toán BMI và TDEE.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cân nặng (kg)</label>
                <Input type="number" value={answers.weightKg} onChange={(e) => handleChange('weightKg', e.target.value)} placeholder="Ví dụ: 65" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chiều cao (cm)</label>
                <Input type="number" value={answers.heightCm} onChange={(e) => handleChange('heightCm', e.target.value)} placeholder="Ví dụ: 170" />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-2">Mục tiêu sức khỏe</h2>
            <p className="text-gray-600 mb-6">Bạn mong muốn đạt được điều gì nhất?</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Giảm mỡ', 'Tăng cơ', 'Cải thiện giấc ngủ', 'Sức khỏe tổng quát', 'Duy trì cân nặng'].map(goal => (
                <Card 
                  key={goal}
                  className={`p-4 cursor-pointer border-2 transition-all ${answers.targetGoal === goal ? 'border-teal-600 bg-teal-50' : 'border-transparent hover:border-teal-300'}`}
                  onClick={() => handleChange('targetGoal', goal)}
                >
                  <span className={`font-semibold ${answers.targetGoal === goal ? 'text-teal-700' : 'text-gray-700'}`}>{goal}</span>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-2">Mức độ vận động</h2>
            <p className="text-gray-600 mb-6">Bạn thường vận động như thế nào trong tuần?</p>
            <div className="space-y-3">
              {['Ít vận động', 'Vận động nhẹ', 'Vận động vừa', 'Vận động nhiều', 'Vận động rất nhiều'].map(level => (
                <Card 
                  key={level}
                  className={`p-4 cursor-pointer border-2 transition-all ${answers.activityLevel === level ? 'border-teal-600 bg-teal-50' : 'border-transparent hover:border-teal-300'}`}
                  onClick={() => handleChange('activityLevel', level)}
                >
                  <span className={`font-semibold ${answers.activityLevel === level ? 'text-teal-700' : 'text-gray-700'}`}>{level}</span>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-2">Thói quen giấc ngủ</h2>
            <p className="text-gray-600 mb-6">Đánh giá chất lượng giấc ngủ của bạn.</p>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian ngủ trung bình (giờ)</label>
                <input 
                  type="range" min="4" max="12" step="0.5"
                  value={answers.averageSleepHours}
                  onChange={(e) => handleChange('averageSleepHours', e.target.value)}
                  className="w-full accent-blue-600"
                />
                <div className="text-center mt-2 font-semibold text-blue-700">{answers.averageSleepHours} giờ</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian vào giấc (phút)</label>
                <div className="grid grid-cols-2 gap-3">
                  {['<15', '15-30', '30-60', '>60'].map(val => (
                    <button
                      key={val}
                      onClick={() => handleChange('sleepLatencyMinutes', val)}
                      className={`py-2 px-3 rounded-xl border-2 transition-all ${answers.sleepLatencyMinutes === val ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-blue-300'}`}
                    >
                      {val} phút
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-2">Chất lượng giấc ngủ</h2>
            <p className="text-gray-600 mb-6">Các yếu tố ảnh hưởng đến giấc ngủ ban đêm.</p>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Số lần thức giấc giữa đêm</label>
                <div className="flex gap-3">
                  {['0', '1', '2', '3+'].map(val => (
                    <button
                      key={val}
                      onClick={() => handleChange('nightWakeups', val)}
                      className={`flex-1 py-2 px-3 rounded-xl border-2 transition-all ${answers.nightWakeups === val ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-blue-300'}`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian dùng màn hình trước khi ngủ</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Không', '<30 phút', '30-60 phút', '>1 tiếng'].map(val => (
                    <button
                      key={val}
                      onClick={() => handleChange('screenTimeBeforeBed', val)}
                      className={`py-2 px-3 rounded-xl border-2 transition-all ${answers.screenTimeBeforeBed === val ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-blue-300'}`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-2">Caffeine & Thói quen</h2>
            <p className="text-gray-600 mb-6">Lối sống hàng ngày của bạn.</p>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lượng caffeine mỗi ngày</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Không', '1 ly', '2-3 ly', '>3 ly'].map(val => (
                    <button
                      key={val}
                      onClick={() => handleChange('caffeineIntake', val)}
                      className={`py-2 px-3 rounded-xl border-2 transition-all ${answers.caffeineIntake === val ? 'border-teal-600 bg-teal-50 text-teal-700' : 'border-gray-200 hover:border-teal-300'}`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mức độ đều đặn của giờ ngủ</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Rất đều đặn', 'Khá đều', 'Không đều', 'Rất không đều'].map(val => (
                    <button
                      key={val}
                      onClick={() => handleChange('sleepScheduleConsistency', val)}
                      className={`py-2 px-3 rounded-xl border-2 transition-all ${answers.sleepScheduleConsistency === val ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-blue-300'}`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 7 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-2">Xác nhận thông tin</h2>
            <p className="text-gray-600 mb-6">Vui lòng kiểm tra lại thông tin của bạn.</p>
            <div className="bg-gray-50 p-6 rounded-xl space-y-3 text-sm mb-6">
              <p><strong>Họ và tên:</strong> {answers.fullName || 'Chưa nhập'}</p>
              <p><strong>Cân nặng / Chiều cao:</strong> {answers.weightKg}kg / {answers.heightCm}cm</p>
              <p><strong>Mục tiêu:</strong> {answers.targetGoal}</p>
              <p><strong>Vận động:</strong> {answers.activityLevel}</p>
              <p><strong>Thời gian ngủ:</strong> {answers.averageSleepHours} giờ</p>
            </div>
            
            <div className="bg-teal-50 border border-teal-100 p-6 rounded-xl">
              <label className="block text-sm font-medium text-teal-900 mb-2">Để nhận kết quả chi tiết và lộ trình sức khỏe, vui lòng để lại thông tin liên hệ:</label>
              <Input 
                value={answers.emailOrPhone} 
                onChange={(e) => handleChange('emailOrPhone', e.target.value)} 
                placeholder="Email hoặc Số điện thoại của bạn *" 
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-between pt-6 border-t border-gray-100">
        <Button 
          variant="outline" 
          onClick={handleBack} 
          disabled={currentStep === 0}
          className={currentStep === 0 ? 'opacity-0 pointer-events-none' : ''}
        >
          Quay lại
        </Button>
        <Button onClick={handleNext} disabled={isSubmitting} className="bg-teal-600 hover:bg-teal-700 text-white">
          {currentStep === totalSteps - 1 ? (isSubmitting ? 'Đang phân tích...' : 'Xem kết quả') : 'Tiếp theo'}
        </Button>
      </div>
    </div>
  );
}
