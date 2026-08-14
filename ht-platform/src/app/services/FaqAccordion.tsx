'use client';

import React, { useState } from 'react';

export default function FaqAccordion({ faqs }: { faqs: { q: string, a: string }[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => (
        <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
          <button 
            onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-gray-900">{faq.q}</span>
            <span className={`transform transition-transform text-teal-600 ${openFaq === idx ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-40 py-4 border-t border-gray-100 opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
