'use client';
import React, { useState } from 'react';
import { Navigation } from '@/components/ui/Navigation';
import { Footer } from '@/components/ui/Footer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [settings, setSettings] = useState<any>(null);

  React.useEffect(() => {
    fetch('/api/admin/db')
      .then(res => res.json())
      .then(data => setSettings(data.settings))
      .catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/admin/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('idle');
        alert('Có lỗi xảy ra, vui lòng thử lại.');
      }
    } catch (error) {
      setStatus('idle');
      alert('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      <main className="flex-grow pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-4">Liên Hệ Với Chúng Tôi</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Đội ngũ PrymaLab luôn sẵn sàng lắng nghe và hỗ trợ bạn trên hành trình chăm sóc sức khỏe.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <Card className="p-8 bg-white shadow-xl">
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-6">Gửi Tin Nhắn</h2>
              
              {status === 'success' ? (
                <div className="bg-teal-50 border border-teal-200 text-teal-800 rounded-lg p-6 text-center animate-in fade-in duration-500">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✓</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Gửi thành công!</h3>
                  <p>Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.</p>
                  <Button className="mt-6" onClick={() => setStatus('idle')} variant="outline">Gửi tin nhắn mới</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên *</label>
                    <Input required name="name" value={formData.name} onChange={handleChange} placeholder="Nhập họ và tên" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <Input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@gmail.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                      <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="090..." />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Chủ đề quan tâm *</label>
                    <select 
                      required
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow"
                    >
                      <option value="">-- Chọn chủ đề --</option>
                      <option value="nutrition">Tư vấn Dinh dưỡng</option>
                      <option value="sleep">Cải thiện Giấc ngủ</option>
                      <option value="partnership">Hợp tác / Doanh nghiệp</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tin nhắn của bạn *</label>
                    <textarea 
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Mô tả ngắn gọn vấn đề bạn cần hỗ trợ..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow resize-none"
                    ></textarea>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 text-lg"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? 'Đang gửi...' : 'Gửi Yêu Cầu'}
                  </Button>
                </form>
              )}
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <Card className="p-6 bg-white hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center text-xl mb-4">📍</div>
                  <h3 className="font-bold text-gray-900 mb-2">Địa chỉ</h3>
                  <p className="text-gray-600 text-sm">{settings?.address || 'Nguyễn Tất Thành - Đà Nẵng'}</p>
                </Card>
                
                <Card className="p-6 bg-white hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl mb-4">✉️</div>
                  <h3 className="font-bold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-600 text-sm">{settings?.email || 'Ahunglua7@gmail.com'}</p>
                </Card>

                <Card className="p-6 bg-white hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center text-xl mb-4">📞</div>
                  <h3 className="font-bold text-gray-900 mb-2">Hotline</h3>
                  <p className="text-gray-600 text-sm">{settings?.phone || '0948 348 444'}</p>
                </Card>

                <Card className="p-6 bg-white hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl mb-4">⏰</div>
                  <h3 className="font-bold text-gray-900 mb-2">Giờ làm việc</h3>
                  <p className="text-gray-600 text-sm">{settings?.workingHours || '08:30 - 17:00 (Thứ 2 - Thứ 6)'}</p>
                </Card>
              </div>

              {/* Map Placeholder */}
              <div className="w-full h-64 rounded-2xl overflow-hidden relative shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🗺️</div>
                    <span className="text-sm font-medium text-teal-800">Bản đồ đang được cập nhật</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
