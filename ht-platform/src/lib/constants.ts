import { NavigationItem, ServicePackage } from '@/types';

export const APP_NAME = 'PrymaLab';
export const APP_DESCRIPTION = 'Nền tảng chăm sóc sức khỏe và giấc ngủ toàn diện, mang đến giải pháp cá nhân hóa cho từng khách hàng.';

export const BRAND_COLORS = {
  primary: '#0D9488',
  primaryDark: '#0F766E',
  secondary: '#2563EB',
  secondaryDark: '#1E3A8A',
  accent: '#F3F4F6',
  background: '#FFFFFF',
  textPrimary: '#111827',
  textSecondary: '#4B5563',
} as const;

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'pkg_starter',
    name: 'Pryma Start',
    slug: 'starter',
    price: 99000,
    currency: 'VND',
    durationDays: 7,
    features: [
      'Đánh giá chỉ số cơ thể BMI cơ bản',
      'Đánh giá chất lượng giấc ngủ sơ bộ',
      'Lên thực đơn gợi ý trong 7 ngày',
      'Hỗ trợ qua email'
    ],
  },
  {
    id: 'pkg_transformation_30',
    name: 'Pryma Reset 30',
    slug: 'transformation-30-days',
    price: 1490000,
    currency: 'VND',
    durationDays: 30,
    badge: 'Được lựa chọn nhiều nhất',
    isPopular: true,
    features: [
      'Đánh giá toàn diện chuyên sâu',
      'Thực đơn cá nhân hóa 30 ngày',
      'Lộ trình cải thiện giấc ngủ khoa học',
      'Tư vấn trực tiếp 1-1 với chuyên gia (2 buổi)',
      'Hỗ trợ qua Zalo/Chat 24/7',
      'Cập nhật tiến độ hàng tuần'
    ],
  },
  {
    id: 'pkg_elite_90',
    name: 'Pryma Signature 90',
    slug: 'elite-care-90-days',
    price: 3990000,
    currency: 'VND',
    durationDays: 90,
    features: [
      'Tất cả quyền lợi của Pryma Reset 30',
      'Thực đơn cá nhân hóa 90 ngày',
      'Lộ trình thay đổi vóc dáng & sinh học toàn diện',
      'Tư vấn trực tiếp 1-1 với chuyên gia (6 buổi)',
      'Phân tích biểu đồ giấc ngủ chuyên sâu',
      'Quản lý hồ sơ sức khỏe trọn đời',
      'Cam kết hoàn tiền nếu không hiệu quả'
    ],
  }
];

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Giới thiệu', href: '/gioi-thieu' },
  { label: 'Dịch vụ', href: '/dich-vu' },
  { label: 'Blog', href: '/blog' },
  { label: 'Liên hệ', href: '/lien-he' },
];

export const QUIZ_CONFIG = {
  totalSteps: 5,
  maxSleepScore: 100,
  maxBmiScore: 100,
};

export const FORMAT_CURRENCY = (amount: number, currency: string = 'VND'): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const BMI_CATEGORIES = {
  UNDERWEIGHT: 'Gầy',
  NORMAL: 'Bình thường',
  OVERWEIGHT: 'Thừa cân',
  OBESE_1: 'Béo phì độ 1',
  OBESE_2: 'Béo phì độ 2',
  OBESE_3: 'Béo phì độ 3',
} as const;

export const SLEEP_QUALITY_LABELS = [
  'Xuất sắc',
  'Tốt',
  'Trung bình',
  'Cần cải thiện',
  'Kém'
] as const;
