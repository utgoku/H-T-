'use client';
import React, { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'bordered' | 'elevated';
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({
  variant = 'default',
  hoverable = false,
  padding = 'md',
  children,
  className = '',
  onClick,
  ...props
}: CardProps) {
  const baseStyles = 'rounded-2xl overflow-hidden';
  
  const variants = {
    default: 'bg-white shadow-md',
    glass: 'bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg',
    bordered: 'bg-white border-2 border-gray-200',
    elevated: 'bg-white shadow-xl',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverStyles = hoverable ? 'hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer' : '';

  const classes = `${baseStyles} ${variants[variant]} ${paddings[padding]} ${hoverStyles} ${className}`;

  return (
    <div className={classes} onClick={onClick} {...props}>
      {children}
    </div>
  );
}
