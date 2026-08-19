'use client';
import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  value: number;
  variant?: 'primary' | 'secondary' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  variant = 'primary',
  size = 'md',
  showLabel = false,
  animated = false,
  className = ''
}: ProgressBarProps) {
  const [currentValue, setCurrentValue] = useState(0);
  const clampedValue = Math.min(Math.max(value, 0), 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentValue(clampedValue);
    }, 100);
    return () => clearTimeout(timer);
  }, [clampedValue]);

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const variants = {
    primary: 'bg-[#0D9488]',
    secondary: 'bg-[#2563EB]',
    gradient: 'bg-gradient-to-r from-[#0D9488] to-[#2563EB]',
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm font-medium text-gray-700">{Math.round(currentValue)}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizes[size]}`}>
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out relative ${variants[variant]}`}
          style={{ width: `${currentValue}%` }}
        >
          {animated && (
            <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
              <div className="w-full h-full bg-white/20 -skew-x-12 translate-x-[-100%] animate-[shimmer_2s_infinite]" />
            </div>
          )}
        </div>
      </div>
      {animated && (
        <style dangerouslySetInnerHTML={{__html:`
          @keyframes shimmer {
            100% {
              transform: translateX(100%);
            }
          }
        `}} />
      )}
    </div>
  );
}
