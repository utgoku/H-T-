'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Moon, Salad, Sparkles, Sun } from 'lucide-react';

type Recommendation = {
  label: string;
  summary: string;
  action: string;
  tone: string;
};

function getRecommendation(score: number): Recommendation {
  if (score < 58) {
    return {
      label: 'Cần tái tạo nhịp nền',
      summary: 'Cơ thể có thể đang thiếu một nhịp sinh hoạt ổn định để phục hồi tốt.',
      action: 'Ưu tiên giờ thức dậy cố định và một bữa sáng đủ đạm trong 7 ngày.',
      tone: '#f97316',
    };
  }

  if (score < 76) {
    return {
      label: 'Có nền tảng, cần tinh chỉnh',
      summary: 'Bạn đã có vài thói quen tốt nhưng dinh dưỡng và giấc ngủ chưa hỗ trợ nhau đều đặn.',
      action: 'Giữ giờ ăn tối ổn định và tạo 30 phút hạ nhịp trước khi ngủ.',
      tone: '#0d9488',
    };
  }

  return {
    label: 'Nhịp sống đang khá cân bằng',
    summary: 'Nền tảng hiện tại tốt. Bước tiếp theo là theo dõi xu hướng thay vì chỉ nhìn từng ngày.',
    action: 'Duy trì lịch hiện tại và ghi nhận năng lượng sau khi thức dậy trong 7 ngày.',
    tone: '#2563eb',
  };
}

export default function RhythmCheck() {
  const [sleepHours, setSleepHours] = useState(6.5);
  const [mealRhythm, setMealRhythm] = useState(3);
  const [morningEnergy, setMorningEnergy] = useState(3);

  const score = useMemo(() => {
    const sleepScore = Math.max(30, 100 - Math.abs(sleepHours - 7.5) * 18);
    const mealScore = 28 + mealRhythm * 14;
    const energyScore = 25 + morningEnergy * 15;
    return Math.round(sleepScore * 0.45 + mealScore * 0.3 + energyScore * 0.25);
  }, [mealRhythm, morningEnergy, sleepHours]);

  const recommendation = getRecommendation(score);

  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-[#dfe6e2] bg-white shadow-[0_28px_90px_-45px_rgba(19,48,53,0.32)] lg:grid-cols-[1.05fr_0.95fr]">
      <div className="p-6 sm:p-9 lg:p-11">
        <div className="mb-8 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8f7f2] text-[#0b7f72]">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0b7f72]">Mô phỏng tương tác</p>
            <h3 className="text-lg font-semibold text-[#153339]">Ba tín hiệu để chọn câu hỏi tiếp theo</h3>
          </div>
        </div>

        <div className="space-y-7">
          <label className="block">
            <span className="mb-3 flex items-center justify-between gap-3 text-sm font-semibold text-[#27474c]">
              <span className="flex items-center gap-2"><Moon className="h-4 w-4 text-[#315fca]" aria-hidden="true" /> Thời lượng ngủ</span>
              <span className="rounded-full bg-[#edf3ff] px-3 py-1 text-[#315fca]">{sleepHours.toFixed(1)} giờ</span>
            </span>
            <input
              aria-label="Số giờ ngủ trung bình"
              className="rhythm-range w-full"
              type="range"
              min="4"
              max="10"
              step="0.5"
              value={sleepHours}
              onChange={(event) => setSleepHours(Number(event.target.value))}
            />
            <span className="mt-2 flex justify-between text-xs text-[#829397]"><span>4 giờ</span><span>10 giờ</span></span>
          </label>

          <label className="block">
            <span className="mb-3 flex items-center justify-between gap-3 text-sm font-semibold text-[#27474c]">
              <span className="flex items-center gap-2"><Salad className="h-4 w-4 text-[#0b8a78]" aria-hidden="true" /> Mức đều đặn của bữa ăn</span>
              <span className="rounded-full bg-[#e8f7f2] px-3 py-1 text-[#0b7f72]">{mealRhythm}/5</span>
            </span>
            <input
              aria-label="Mức đều đặn của bữa ăn"
              className="rhythm-range w-full"
              type="range"
              min="1"
              max="5"
              step="1"
              value={mealRhythm}
              onChange={(event) => setMealRhythm(Number(event.target.value))}
            />
            <span className="mt-2 flex justify-between text-xs text-[#829397]"><span>Thất thường</span><span>Rất ổn định</span></span>
          </label>

          <label className="block">
            <span className="mb-3 flex items-center justify-between gap-3 text-sm font-semibold text-[#27474c]">
              <span className="flex items-center gap-2"><Sun className="h-4 w-4 text-[#e6a530]" aria-hidden="true" /> Năng lượng khi thức dậy</span>
              <span className="rounded-full bg-[#fff7df] px-3 py-1 text-[#9a6812]">{morningEnergy}/5</span>
            </span>
            <input
              aria-label="Mức năng lượng khi thức dậy"
              className="rhythm-range w-full"
              type="range"
              min="1"
              max="5"
              step="1"
              value={morningEnergy}
              onChange={(event) => setMorningEnergy(Number(event.target.value))}
            />
            <span className="mt-2 flex justify-between text-xs text-[#829397]"><span>Uể oải</span><span>Sảng khoái</span></span>
          </label>
        </div>
      </div>

      <div className="relative flex flex-col justify-between overflow-hidden bg-[#112f35] p-6 text-white sm:p-9 lg:p-11">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#1c8e83]/25 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -left-16 h-60 w-60 rounded-full bg-[#315fca]/20 blur-3xl" aria-hidden="true" />

        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8ed7cb]">Điểm gợi ý Pryma</p>
          <div className="mt-6 flex items-end gap-3">
            <output className="font-[family-name:var(--font-display)] text-7xl font-semibold leading-none tracking-tight" aria-live="polite">
              {score}
            </output>
            <span className="pb-2 text-sm text-white/55">/ 100</span>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full transition-[width,background-color] duration-500"
              style={{ width: `${score}%`, backgroundColor: recommendation.tone }}
            />
          </div>

          <h4 className="mt-8 text-xl font-semibold">{recommendation.label}</h4>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/68">{recommendation.summary}</p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8ed7cb]">Một việc nên thử ngay</p>
            <p className="mt-2 text-sm leading-6 text-white/85">{recommendation.action}</p>
          </div>
        </div>

        <div className="relative mt-8">
          <Link
            href="/quiz"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#d9f46f] px-6 text-sm font-bold text-[#153339] transition hover:bg-[#e5fa8d] focus-visible:outline-[#d9f46f] sm:w-auto"
          >
            Làm Pryma Baseline <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <p className="mt-3 max-w-md text-xs leading-5 text-white/45">Thang gợi ý nội bộ: thời lượng ngủ 45%, nhịp ăn 30%, năng lượng sáng 25%. Đây không phải thang đo lâm sàng hay chẩn đoán y khoa.</p>
        </div>
      </div>
    </div>
  );
}
