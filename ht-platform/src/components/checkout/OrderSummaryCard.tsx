'use client';

import { SERVICE_PACKAGES } from '@/lib/constants';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2 } from 'lucide-react';

interface OrderSummaryCardProps {
  packageSlug: string;
}

export function OrderSummaryCard({ packageSlug }: OrderSummaryCardProps) {
  const pkg = SERVICE_PACKAGES.find((p) => p.slug === packageSlug) || SERVICE_PACKAGES[0];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const isPopular = pkg.slug === 'transformation_30';

  return (
    <Card className={`overflow-hidden transition-all duration-300 ${isPopular ? 'border-teal-600 ring-1 ring-teal-600' : 'border-slate-200 shadow-sm'}`}>
      <div className="bg-slate-50/80 p-6 border-b border-slate-100">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold font-serif text-slate-900">{pkg.name}</h3>
            {isPopular && (
              <Badge className="mt-2 bg-teal-600 hover:bg-teal-700 text-white border-0">Phổ biến nhất</Badge>
            )}
          </div>
          <Badge variant="outline" className="bg-white border-slate-200 text-slate-700">
            {pkg.durationDays} ngày
          </Badge>
        </div>

        <div className="flex items-baseline gap-2 mt-4">
          <span className="text-3xl font-bold text-teal-700">{formatPrice(pkg.price)}</span>
        </div>
      </div>

      <div className="p-6">
        <h4 className="text-sm font-semibold text-slate-900 mb-4">Gói bao gồm:</h4>
        <ul className="space-y-3">
          {pkg.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-slate-600">
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
              <span className="leading-tight">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="border-t border-slate-100 p-6 bg-slate-50/50">
        <div className="flex justify-between items-center text-lg font-bold text-slate-900">
          <span>Tổng thanh toán</span>
          <span className="text-teal-700">{formatPrice(pkg.price)}</span>
        </div>
        <p className="text-xs text-slate-500 text-right mt-1">Đã bao gồm VAT</p>
      </div>
    </Card>
  );
}
