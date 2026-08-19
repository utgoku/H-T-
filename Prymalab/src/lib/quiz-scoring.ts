export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type EnergyEquationSex = 'MALE' | 'FEMALE';

export interface SleepQuizAnswers {
  durationHours: number;
  latencyMinutes: number;
  wakeupsPerNight: number;
  feelsRested: boolean;
  usesScreensBeforeBed: boolean;
  caffeineAfternoon: boolean;
  consistentSchedule: boolean;
}

export interface QuizScoreResult {
  bmi: number;
  bmiCategory: string;
  tdee: number;
  sleepScore: number;
  sleepCategory: string;
  dailyCalories: number;
}

export function calculateBMI(weightKg: number, heightCm: number): number {
  if (!Number.isFinite(heightCm) || !Number.isFinite(weightKg) || heightCm <= 0 || weightKg <= 0) return 0;
  const heightM = heightCm / 100;
  return Number((weightKg / (heightM * heightM)).toFixed(1));
}

export function getBMICategory(bmi: number): string {
  if (bmi <= 0) return 'Chưa đủ dữ liệu';
  if (bmi < 18.5) return 'Dưới khoảng tham chiếu';
  if (bmi < 25) return 'Trong khoảng tham chiếu';
  if (bmi < 30) return 'Trên khoảng tham chiếu';
  if (bmi < 35) return 'Béo phì độ 1';
  if (bmi < 40) return 'Béo phì độ 2';
  return 'Béo phì độ 3';
}

export function calculateBMR(weightKg: number, heightCm: number, age: number, sex: EnergyEquationSex): number {
  if (![weightKg, heightCm, age].every(Number.isFinite)) return 0;
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return Math.max(0, Math.round(base + (sex === 'MALE' ? 5 : -161)));
}

export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  const multipliers: Record<ActivityLevel, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };
  return Math.max(0, Math.round(bmr * multipliers[activityLevel]));
}

export function calculateEnergyRange(tdee: number) {
  return {
    low: Math.round((tdee * 0.9) / 50) * 50,
    high: Math.round((tdee * 1.1) / 50) * 50,
  };
}

/** Internal lifestyle signal; not a validated clinical sleep instrument. */
export function calculateSleepScore(answers: SleepQuizAnswers): number {
  let durationScore = 6;
  if (answers.durationHours >= 7 && answers.durationHours <= 9) durationScore = 30;
  else if ((answers.durationHours >= 6 && answers.durationHours < 7) || (answers.durationHours > 9 && answers.durationHours <= 10)) durationScore = 22;
  else if (answers.durationHours >= 5 && answers.durationHours < 6) durationScore = 14;

  let latencyScore = 5;
  if (answers.latencyMinutes <= 15) latencyScore = 20;
  else if (answers.latencyMinutes <= 30) latencyScore = 16;
  else if (answers.latencyMinutes <= 45) latencyScore = 10;

  let continuityScore = 4;
  if (answers.wakeupsPerNight === 0) continuityScore = 15;
  else if (answers.wakeupsPerNight === 1) continuityScore = 12;
  else if (answers.wakeupsPerNight === 2) continuityScore = 8;

  const restorationScore = answers.feelsRested ? 15 : 5;

  let routineScore = 20;
  if (answers.usesScreensBeforeBed) routineScore -= 6;
  if (answers.caffeineAfternoon) routineScore -= 7;
  if (!answers.consistentSchedule) routineScore -= 7;

  return Math.min(100, Math.max(0, durationScore + latencyScore + continuityScore + restorationScore + routineScore));
}

export function getSleepScoreCategory(score: number): string {
  if (score >= 80) return 'Nền tảng khá ổn định';
  if (score >= 65) return 'Có nền tảng, cần tinh chỉnh';
  if (score >= 45) return 'Có vài tín hiệu cần ưu tiên';
  return 'Nên xem lại nhịp phục hồi';
}

export function calculateDailyCalories(
  tdee: number,
  goal: 'FAT_LOSS' | 'MUSCLE_GAIN' | 'SLEEP_RECOVERY' | 'GENERAL_WELLNESS' | 'WEIGHT_MAINTAIN',
): number {
  if (goal === 'FAT_LOSS') return Math.round(tdee * 0.9);
  if (goal === 'MUSCLE_GAIN') return Math.round(tdee * 1.05);
  return Math.round(tdee);
}

export function generateHealthRecommendations(scores: QuizScoreResult, sleep?: SleepQuizAnswers): string[] {
  const recommendations: string[] = [];

  if (scores.bmi < 18.5) {
    recommendations.push('BMI đang dưới khoảng tham chiếu cho người trưởng thành. Đừng tự tăng năng lượng quá nhanh nếu bạn sụt cân không chủ ý hoặc có triệu chứng kéo dài.');
  } else if (scores.bmi >= 25) {
    recommendations.push('BMI là tín hiệu sàng lọc, không đo trực tiếp thành phần cơ thể. Hãy ưu tiên một thay đổi nhỏ có thể duy trì thay vì theo đuổi mức cắt giảm khắc nghiệt.');
  } else {
    recommendations.push('BMI đang trong khoảng tham chiếu người trưởng thành; vòng eo, thành phần cơ thể, bệnh nền và cảm nhận năng lượng vẫn cần được xem riêng.');
  }

  if (sleep?.durationHours && sleep.durationHours < 7) {
    recommendations.push('Thử bảo vệ một khung ngủ dài hơn trong 7 ngày, ưu tiên giờ thức dậy ổn định và tiến dần tới ít nhất 7 giờ mỗi đêm.');
  } else if (sleep && sleep.durationHours > 9) {
    recommendations.push('Ngủ trên 9 giờ có thể phù hợp trong một số giai đoạn. Nếu kéo dài kèm mệt mỏi ban ngày, bạn nên trao đổi với nhân viên y tế.');
  } else if (scores.sleepScore >= 65) {
    recommendations.push('Nền tảng giấc ngủ tương đối ổn. Hãy theo dõi xu hướng 7 ngày thay vì đánh giá chỉ từ một đêm.');
  } else {
    recommendations.push('Chọn một ưu tiên trong 7 ngày: giờ thức dậy ổn định, giảm ánh sáng màn hình hoặc tránh caffeine muộn.');
  }

  if (sleep?.latencyMinutes && sleep.latencyMinutes > 30) {
    recommendations.push('Thời gian vào giấc đang dài. Hãy tạo 30–60 phút hạ nhịp; nếu khó ngủ kéo dài hoặc ảnh hưởng ban ngày, nên tìm tư vấn chuyên môn.');
  } else if (sleep?.caffeineAfternoon) {
    recommendations.push('Thử chuyển caffeine về đầu ngày và quan sát thời gian vào giấc trong một tuần.');
  }

  return recommendations.slice(0, 3);
}
