'use client';

import { FormEvent, Suspense, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, LockKeyhole, MessageCircle, ShieldCheck } from 'lucide-react';
import { Navigation } from '@/components/ui/Navigation';
import { Footer } from '@/components/ui/Footer';
import { SERVICE_PACKAGES } from '@/lib/constants';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const requestedSlug = searchParams.get('package') || 'transformation';
  const selectedPackage = useMemo(
    () => {
      const aliases: Record<string, string> = {
        transformation: 'transformation-30-days',
        elite: 'elite-care-90-days',
      };
      const normalizedSlug = aliases[requestedSlug] || requestedSlug;
      return SERVICE_PACKAGES.find((item) => item.slug === normalizedSlug || item.id === normalizedSlug) || SERVICE_PACKAGES[0];
    },
    [requestedSlug],
  );
  const [form, setForm] = useState({ name: '', phone: '', email: '', note: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const formatPrice = (value: number) => new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const orderResponse = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: selectedPackage.slug,
          packageName: selectedPackage.name,
          customerName: form.name,
          customerPhone: form.phone,
        }),
      });

      if (!orderResponse.ok) throw new Error('Không thể ghi nhận yêu cầu lúc này.');

      await fetch('/api/admin/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: `Đăng ký ${selectedPackage.name}`,
          message: form.note || `Khách hàng muốn được tư vấn và xác nhận thanh toán cho gói ${selectedPackage.name}.`,
        }),
      });

      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError('Hệ thống chưa ghi nhận được yêu cầu. Vui lòng thử lại hoặc liên hệ trực tiếp PrymaLab.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#f4f7f2] text-[#153339]">
        <Navigation />
        <main className="mx-auto flex min-h-[88vh] max-w-3xl items-center px-5 pb-16 pt-32 sm:px-8">
          <section className="w-full rounded-[2.25rem] border border-[#dce5e0] bg-white p-7 text-center shadow-[0_30px_80px_-48px_rgba(18,56,62,0.5)] sm:p-12">
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e7f7f1] text-[#0b8a78]">
              <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
            </span>
            <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.18em] text-[#0b7f72]">Yêu cầu đã được ghi nhận</p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl">PrymaLab sẽ liên hệ để xác nhận lộ trình.</h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#667b7f]">
              Đây chưa phải là giao dịch thanh toán. Đội ngũ sẽ xác nhận nhu cầu, quyền lợi và phương thức thanh toán phù hợp trước khi kích hoạt chương trình.
            </p>
            <div className="mx-auto mt-8 max-w-md rounded-2xl bg-[#f3f6f1] p-5 text-left">
              <div className="flex items-center justify-between gap-5 text-sm">
                <span className="text-[#718589]">Lộ trình</span>
                <span className="font-bold">{selectedPackage.name}</span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-5 border-t border-[#dce5e0] pt-3 text-sm">
                <span className="text-[#718589]">Mức đầu tư</span>
                <span className="font-bold text-[#0b7f72]">{formatPrice(selectedPackage.price)}</span>
              </div>
            </div>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#cddad5] px-6 text-sm font-bold text-[#27474c]">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Về trang chủ
              </Link>
              <Link href="/quiz" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#153339] px-6 text-sm font-bold text-white">
                Xem lại đánh giá <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7f2] text-[#153339]">
      <Navigation />
      <main className="mx-auto max-w-[82rem] px-5 pb-24 pt-32 sm:px-8 lg:pt-40">
        <div className="mb-10 max-w-3xl">
          <p className="section-kicker">Xác nhận lộ trình</p>
          <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-6xl">Bắt đầu bằng một cuộc trao đổi rõ ràng.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#657a7e]">Để lại thông tin, PrymaLab sẽ xác nhận nhu cầu và hướng dẫn thanh toán phù hợp. Bạn chưa bị tính phí ở bước này.</p>
        </div>

        <div className="grid gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <aside className="rounded-[2rem] bg-[#153339] p-7 text-white shadow-[0_35px_80px_-50px_rgba(18,56,62,0.95)] sm:p-9">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#8ed7cb]">Bạn đang chọn</p>
            <h2 className="mt-4 text-3xl font-semibold">{selectedPackage.name}</h2>
            <p className="mt-2 text-sm leading-6 text-white/58">{selectedPackage.durationDays} ngày đồng hành theo nhịp sống cá nhân.</p>
            <p className="mt-7 text-3xl font-bold">{formatPrice(selectedPackage.price)}</p>
            <div className="my-7 h-px bg-white/10" />
            <ul className="space-y-3">
              {selectedPackage.features.slice(0, 5).map((feature) => (
                <li key={feature} className="flex gap-3 text-sm leading-6 text-white/75">
                  <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#d9f46f] text-[#153339]"><Check className="h-2.5 w-2.5" strokeWidth={3} /></span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-3 border-t border-white/10 pt-6 text-xs text-white/60">
              <span className="flex items-center gap-2"><LockKeyhole className="h-4 w-4 text-[#8ed7cb]" /> Không thu tiền ở bước này</span>
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#d9f46f]" /> Xác nhận quyền lợi trước thanh toán</span>
              <span className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-[#9cb7ff]" /> Có người thật hỗ trợ</span>
            </div>
          </aside>

          <section className="rounded-[2rem] border border-[#dce5e0] bg-white p-6 shadow-[0_30px_80px_-55px_rgba(18,56,62,0.45)] sm:p-9 lg:p-10">
            <div className="mb-8">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#0b7f72]">Thông tin liên hệ</p>
              <h2 className="mt-3 text-2xl font-semibold">PrymaLab nên liên hệ với bạn thế nào?</h2>
            </div>
            {error && <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm leading-6 text-red-700">{error}</div>}
            <form onSubmit={submit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-bold text-[#36545a]">Họ và tên
                  <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="mt-2 min-h-12 w-full rounded-xl border border-[#d4dfda] bg-[#fbfcfa] px-4 font-normal outline-none transition focus:border-[#0b8a78] focus:bg-white" placeholder="Nguyễn Minh Anh" />
                </label>
                <label className="text-sm font-bold text-[#36545a]">Số điện thoại
                  <input required inputMode="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="mt-2 min-h-12 w-full rounded-xl border border-[#d4dfda] bg-[#fbfcfa] px-4 font-normal outline-none transition focus:border-[#0b8a78] focus:bg-white" placeholder="09xx xxx xxx" />
                </label>
              </div>
              <label className="block text-sm font-bold text-[#36545a]">Email
                <input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="mt-2 min-h-12 w-full rounded-xl border border-[#d4dfda] bg-[#fbfcfa] px-4 font-normal outline-none transition focus:border-[#0b8a78] focus:bg-white" placeholder="ban@email.com" />
              </label>
              <label className="block text-sm font-bold text-[#36545a]">Điều bạn muốn PrymaLab hiểu thêm
                <textarea value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} className="mt-2 min-h-32 w-full resize-y rounded-xl border border-[#d4dfda] bg-[#fbfcfa] px-4 py-3 font-normal leading-6 outline-none transition focus:border-[#0b8a78] focus:bg-white" placeholder="Mục tiêu, lịch sinh hoạt hoặc điều bạn đang gặp khó khăn..." />
              </label>
              <label className="flex gap-3 rounded-2xl bg-[#f3f6f1] p-4 text-xs leading-5 text-[#667b7f]">
                <input required type="checkbox" className="mt-0.5 h-4 w-4 accent-[#0b8a78]" />
                Tôi đồng ý để PrymaLab liên hệ về lộ trình đã chọn và xử lý thông tin theo chính sách bảo mật.
              </label>
              <button disabled={isSubmitting} className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#153339] px-7 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#0b7f72] disabled:cursor-not-allowed disabled:opacity-60">
                {isSubmitting ? 'Đang ghi nhận...' : 'Gửi yêu cầu tư vấn'} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f4f7f2]" />}>
      <CheckoutContent />
    </Suspense>
  );
}
