'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CreditCard, Lock, Loader2 } from 'lucide-react';

interface PaymentFormProps {
  onSuccess: (transactionId: string) => void;
  amount: number;
  isProcessing: boolean;
  setIsProcessing: (val: boolean) => void;
}

export function PaymentForm({ onSuccess, amount, isProcessing, setIsProcessing }: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const formatCardNumber = (val: string) => {
    const v = val.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return val;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length >= 2) {
      val = val.substring(0, 2) + '/' + val.substring(2, 4);
    }
    setExpiry(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardHolder || !expiry || !cvc) return;
    
    setIsProcessing(true);
    // Simulate 2s payment processing delay
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess(`TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`);
    }, 2000);
  };

  const isVisa = cardNumber.startsWith('4');
  const isMastercard = cardNumber.startsWith('5');

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Tên trên thẻ</label>
          <Input 
            required 
            placeholder="NGUYEN VAN A" 
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
            disabled={isProcessing}
            className="h-11 uppercase"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Số thẻ</label>
          <div className="relative">
            <Input 
              required 
              placeholder="0000 0000 0000 0000" 
              maxLength={19}
              value={cardNumber}
              onChange={handleCardNumberChange}
              disabled={isProcessing}
              className="pl-10 h-11"
            />
            <CreditCard className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
              {isVisa && <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded tracking-wider">VISA</span>}
              {isMastercard && <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-100 px-1.5 py-0.5 rounded tracking-wider">MASTERCARD</span>}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Ngày hết hạn</label>
            <Input 
              required 
              placeholder="MM/YY" 
              maxLength={5}
              value={expiry}
              onChange={handleExpiryChange}
              disabled={isProcessing}
              className="h-11"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Mã CVC</label>
            <Input 
              required 
              type="password" 
              placeholder="123" 
              maxLength={4}
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
              disabled={isProcessing}
              className="h-11 font-mono tracking-widest"
            />
          </div>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-teal-600 hover:bg-teal-700 text-white h-14 text-lg font-medium shadow-md shadow-teal-900/10 transition-all duration-200"
        disabled={isProcessing}
      >
        {isProcessing ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Đang xử lý thanh toán...
          </span>
        ) : (
          `Thanh toán ${new Intl.NumberFormat('vi-VN').format(amount)}đ`
        )}
      </Button>

      <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-6">
        <Lock className="w-4 h-4 text-teal-600" />
        <span>Giao dịch được mã hóa an toàn với SSL 256-bit</span>
      </div>
    </form>
  );
}
