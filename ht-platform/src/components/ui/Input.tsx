'use client';
import React, { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  icon,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || props.name || Math.random().toString(36).substring(7);

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          ref={ref}
          className={`
            w-full rounded-xl py-3 px-4 bg-white border outline-none transition-all duration-200
            ${icon ? 'pl-10' : ''}
            ${error 
              ? 'border-red-500 focus:ring-2 focus:ring-red-500/20 text-red-900 placeholder-red-300' 
              : 'border-gray-200 focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/20 text-gray-900 placeholder-gray-400'}
            ${props.disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500 mt-1">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
