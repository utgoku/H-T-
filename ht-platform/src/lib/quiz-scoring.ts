export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';

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
  if (heightCm <= 0 || weightKg <= 0) return 0;
  const heightM = heightCm / 100;
  return Number((weightKg / (heightM * heightM)).toFixed(1));
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Gầy';
  if (bmi < 24.9) return 'Bình thường';
  if (bmi < 29.9) return 'Thừa cân';
  if (bmi < 34.9) return 'Béo phì độ 1';
  if (bmi < 39.9) return 'Béo phì độ 2';
  return 'Béo phì độ 3';
}

export function calculateBMR(weightKg: number, heightCm: number, age: number, gender: 'MALE' | 'FEMALE' | 'OTHER'): number {
  // Mifflin-St Jeor Equation
  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (gender === 'MALE') {
    bmr += 5;
  } else {
    // Treat 'FEMALE' and 'OTHER' with the female modifier as a baseline if unknown
    bmr -= 161;
  }
  return Number(bmr.toFixed(0));
}

export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  const multipliers: Record<ActivityLevel, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };
  return Number((bmr * multipliers[activityLevel]).toFixed(0));
}

export function calculateSleepScore(answers: SleepQuizAnswers): number {
  let score = 0;

  // Duration Score (Max 25)
  if (answers.durationHours >= 7 && answers.durationHours <= 9) score += 25;
  else if (answers.durationHours >= 6 && answers.durationHours < 7) score += 18;
  else if (answers.durationHours > 9 && answers.durationHours <= 10) score += 15;
  else if (answers.durationHours >= 5 && answers.durationHours < 6) score += 10;
  else score += 5;

  // Latency Score (Max 25)
  if (answers.latencyMinutes <= 15) score += 25;
  else if (answers.latencyMinutes <= 30) score += 20;
  else if (answers.latencyMinutes <= 45) score += 10;
  else score += 5;

  // Quality Score based on wakeups (Max 25)
  if (answers.wakeupsPerNight === 0) score += 25;
  else if (answers.wakeupsPerNight === 1) score += 20;
  else if (answers.wakeupsPerNight === 2) score += 10;
  else score += 5;
  
  if (answers.feelsRested && score < 75) score += 5; // Bonus for feeling rested

  // Sleep Hygiene Score (Max 25)
  let hygieneScore = 25;
  if (answers.usesScreensBeforeBed) hygieneScore -= 10;
  if (answers.caffeineAfternoon) hygieneScore -= 8;
  if (!answers.consistentSchedule) hygieneScore -= 7;
  
  score += Math.max(0, hygieneScore);

  return Math.min(100, Math.max(0, score));
}

export function getSleepScoreCategory(score: number): string {
  if (score >= 90) return 'Xuất sắc';
  if (score >= 70) return 'Tốt';
  if (score >= 50) return 'Trung bình';
  if (score >= 30) return 'Cần cải thiện';
  return 'Kém';
}

export function calculateDailyCalories(tdee: number, goal: 'FAT_LOSS' | 'MUSCLE_GAIN' | 'SLEEP_RECOVERY' | 'GENERAL_WELLNESS' | 'WEIGHT_MAINTAIN'): number {
  switch (goal) {
    case 'FAT_LOSS':
      return tdee - 500; // 500 kcal deficit
    case 'MUSCLE_GAIN':
      return tdee + 300; // 300 kcal surplus
    case 'WEIGHT_MAINTAIN':
    case 'SLEEP_RECOVERY':
    case 'GENERAL_WELLNESS':
    default:
      return tdee;
  }
}

export function generateHealthRecommendations(scores: QuizScoreResult): string[] {
  const recs: string[] = [];

  // BMI Recommendations
  if (scores.bmi < 18.5) {
    recs.push('Bạn đang ở mức gầy. Hãy tăng cường lượng calo nạp vào từ các thực phẩm giàu dinh dưỡng và kết hợp tập luyện kháng lực để tăng cơ.');
  } else if (scores.bmi >= 25) {
    recs.push('Để giảm cân an toàn, hãy duy trì mức thâm hụt calo nhẹ (khoảng 300-500 kcal/ngày) và tăng cường hoạt động thể chất hàng ngày.');
  } else {
    recs.push('Tuyệt vời! Hãy tiếp tục duy trì chế độ dinh dưỡng cân bằng để giữ gìn vóc dáng hiện tại.');
  }

  // Sleep Recommendations
  if (scores.sleepScore < 50) {
    recs.push('Chất lượng giấc ngủ của bạn đang ở mức kém. Hãy hạn chế sử dụng thiết bị điện tử ít nhất 1 giờ trước khi ngủ và tạo không gian ngủ yên tĩnh.');
  } else if (scores.sleepScore < 70) {
    recs.push('Giấc ngủ của bạn ở mức trung bình. Cố gắng thiết lập giờ đi ngủ và thức dậy cố định mỗi ngày kể cả cuối tuần.');
  } else {
    recs.push('Bạn có thói quen ngủ rất tốt! Hãy duy trì chu kỳ này để cơ thể luôn tràn đầy năng lượng.');
  }

  return recs;
}
