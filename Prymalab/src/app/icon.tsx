import { ImageResponse } from 'next/og';

export const size = {
  width: 64,
  height: 64,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          borderRadius: 18,
          background: 'linear-gradient(145deg, #173d43 0%, #0d2b31 100%)',
        }}
      >
        <svg width="52" height="52" viewBox="0 0 48 48" fill="none">
          <path d="M15.5 35.5V13.5" stroke="#fff" strokeWidth="2.65" strokeLinecap="round" />
          <path d="M16 14h9.1c6.1 0 9.7 3.4 9.7 8.3 0 5-3.6 8.4-9.7 8.4H16" stroke="#fff" strokeWidth="2.65" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M26.2 25.8c4.8-.4 7.6-2.6 8.3-6.6-4.7.1-7.5 2.3-8.3 6.6Z" fill="#8ed7cb" fillOpacity=".18" stroke="#8ed7cb" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="36.2" cy="12" r="2.15" fill="#d9f46f" />
        </svg>
      </div>
    ),
    size,
  );
}
