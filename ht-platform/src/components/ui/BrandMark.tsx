import Link from 'next/link';

interface BrandMarkProps {
  inverse?: boolean;
  compact?: boolean;
  className?: string;
}

export function BrandMark({ inverse = false, compact = false, className = '' }: BrandMarkProps) {
  return (
    <Link href="/" aria-label="PrymaLab - Trang chủ" className={`group inline-flex items-center gap-3 ${className}`}>
      <span className={`brand-symbol ${inverse ? 'brand-symbol-inverse' : ''}`} aria-hidden="true">
        <svg viewBox="0 0 48 48" role="presentation" className="h-full w-full">
          <path className="brand-monogram-stem" d="M15.5 35.5V13.5" />
          <path className="brand-monogram-bowl" d="M16 14h9.1c6.1 0 9.7 3.4 9.7 8.3 0 5-3.6 8.4-9.7 8.4H16" />
          <path className="brand-monogram-leaf" d="M26.2 25.8c4.8-.4 7.6-2.6 8.3-6.6-4.7.1-7.5 2.3-8.3 6.6Z" />
          <circle className="brand-monogram-pulse" cx="36.2" cy="12" r="2.15" />
        </svg>
      </span>
      {!compact && (
        <span className="flex min-w-0 flex-col">
          <span className={`whitespace-nowrap text-[1.02rem] font-extrabold leading-none tracking-[0.19em] ${inverse ? 'text-white' : 'text-[#153339]'}`}>
            PRYMA<span className={inverse ? 'text-[#d9f46f]' : 'text-[#0b8a78]'}>LAB</span>
          </span>
          <span className={`brand-tagline mt-1.5 whitespace-nowrap text-[0.47rem] font-bold uppercase tracking-[0.22em] ${inverse ? 'text-white/50' : 'text-[#718589]'}`}>
            Nutrition · Sleep · Rhythm
          </span>
        </span>
      )}
    </Link>
  );
}
