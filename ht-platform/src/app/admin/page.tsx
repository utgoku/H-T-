'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isAdminConfigured, setIsAdminConfigured] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [password, setPassword] = useState('');
  const [db, setDb] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'leads' | 'contacts' | 'orders' | 'settings' | 'packages'>('leads');
  const [isSaving, setIsSaving] = useState(false);
  const [settingsForm, setSettingsForm] = useState<any>(null);
  const [packagesForm, setPackagesForm] = useState<any>(null);

  useEffect(() => {
    fetch('/api/admin/session')
      .then((response) => response.json())
      .then(async (session) => {
        setIsAdminConfigured(Boolean(session.configured));
        setIsAuthenticated(Boolean(session.authenticated));
        if (session.authenticated) {
          const response = await fetch('/api/admin/db');
          if (response.ok) {
            const data = await response.json();
            setDb(data);
            setSettingsForm(data.settings);
            setPackagesForm(data.packages);
          }
        }
      })
      .catch(() => setLoginError('Không thể kiểm tra phiên quản trị.'))
      .finally(() => setIsCheckingSession(false));
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/db');
      if (res.ok) {
        const data = await res.json();
        setDb(data);
        if (!settingsForm) setSettingsForm(data.settings);
        if (!packagesForm) setPackagesForm(data.packages);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const response = await fetch('/api/admin/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (response.ok) {
      setIsAuthenticated(true);
      setPassword('');
      fetchData();
    } else {
      const data = await response.json().catch(() => ({}));
      setLoginError(data.error || 'Không thể đăng nhập.');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/session', { method: 'DELETE' });
    setIsAuthenticated(false);
    setDb(null);
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsForm)
      });
      if (res.ok) {
        alert('Lưu cấu hình thành công!');
        fetchData();
      } else {
        alert('Lưu thất bại');
      }
    } catch (e) {
      console.error(e);
      alert('Lưu thất bại');
    }
    setIsSaving(false);
  };

  const handleSavePackages = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/packages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(packagesForm)
      });
      if (res.ok) {
        alert('Lưu gói dịch vụ thành công!');
        fetchData();
      } else {
        alert('Lưu thất bại');
      }
    } catch (e) {
      console.error(e);
      alert('Lưu thất bại');
    }
    setIsSaving(false);
  };

  if (isCheckingSession) {
    return <div className="flex min-h-screen items-center justify-center bg-[#f4f7f2] text-sm font-semibold text-[#5f7478]">Đang kiểm tra phiên quản trị...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f7f2] p-4">
        <Card className="w-full max-w-sm rounded-[2rem] border border-[#dbe4df] bg-white p-8 shadow-[0_35px_80px_-52px_rgba(18,56,62,0.6)]">
          <div className="text-center mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#0b7f72]">PrymaLab CRM</p>
            <h1 className="mt-3 text-2xl font-bold text-[#153339]">Trung tâm quản trị</h1>
            <p className="mt-2 text-sm leading-6 text-[#718589]">Phiên đăng nhập được bảo vệ bằng cookie HttpOnly trên máy chủ.</p>
          </div>
          {!isAdminConfigured && <div className="mb-5 rounded-xl border border-amber-100 bg-amber-50 p-4 text-xs leading-5 text-amber-800">Admin đang được khóa an toàn. Cần cấu hình biến môi trường quản trị trên Vercel để kích hoạt.</div>}
          {loginError && <div className="mb-5 rounded-xl border border-red-100 bg-red-50 p-4 text-xs leading-5 text-red-700">{loginError}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <Input 
              type="password" 
              placeholder="Mật khẩu" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
            <Button type="submit" disabled={!isAdminConfigured} className="w-full bg-[#153339] text-white hover:bg-[#0b7f72]">Đăng nhập an toàn</Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">PrymaLab Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'settings' ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            ⚙️ Cấu hình chung
          </button>
          <button 
            onClick={() => setActiveTab('packages')}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'packages' ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            💎 Gói dịch vụ
          </button>
          <hr className="my-2 border-gray-100" />
          <button 
            onClick={() => setActiveTab('leads')}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'leads' ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            📋 Leads từ Quiz ({db?.leads?.length || 0})
          </button>
          <button 
            onClick={() => setActiveTab('contacts')}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'contacts' ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            ✉️ Liên hệ ({db?.contacts?.length || 0})
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'orders' ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            📦 Đăng ký gói ({db?.orders?.length || 0})
          </button>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Button onClick={handleLogout} variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">Đăng xuất</Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {activeTab === 'leads' ? 'Danh sách Leads (Quiz)' : 
             activeTab === 'contacts' ? 'Tin nhắn liên hệ' : 
             activeTab === 'orders' ? 'Đơn đăng ký gói' :
             activeTab === 'settings' ? 'Cấu hình Website' : 'Quản lý Gói dịch vụ'}
          </h1>
          <Button onClick={fetchData} variant="outline" size="sm" className="bg-white">🔄 Làm mới</Button>
        </div>

        {!db ? (
          <div className="text-center text-gray-500 mt-20">Đang tải dữ liệu...</div>
        ) : (
          <div className="space-y-4">
            {activeTab === 'leads' && db.leads.length === 0 && <p className="text-gray-500">Chưa có lead nào.</p>}
            {activeTab === 'leads' && db.leads.map((lead: any) => (
              <Card key={lead.id} className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{lead.name}</h3>
                    <p className="text-teal-600 font-medium">{lead.emailOrPhone}</p>
                  </div>
                  <span className="text-xs text-gray-400">{new Date(lead.createdAt).toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm bg-gray-50 p-4 rounded-xl">
                  <div><span className="text-gray-500 block">Mục tiêu</span><strong className="text-gray-900">{lead.goals}</strong></div>
                  <div><span className="text-gray-500 block">BMI</span><strong className="text-gray-900">{lead.bmi} ({lead.bmiCategory})</strong></div>
                  <div><span className="text-gray-500 block">TDEE</span><strong className="text-gray-900">{lead.tdee} kcal</strong></div>
                  <div><span className="text-gray-500 block">Sleep Score</span><strong className="text-gray-900">{lead.sleepScore}/100 ({lead.sleepCategory})</strong></div>
                </div>
              </Card>
            ))}

            {activeTab === 'contacts' && db.contacts.length === 0 && <p className="text-gray-500">Chưa có tin nhắn nào.</p>}
            {activeTab === 'contacts' && db.contacts.map((contact: any) => (
              <Card key={contact.id} className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{contact.name}</h3>
                    <p className="text-sm text-gray-600">Email: <span className="font-medium text-gray-900">{contact.email}</span> | SĐT: <span className="font-medium text-gray-900">{contact.phone || 'N/A'}</span></p>
                  </div>
                  <span className="text-xs text-gray-400">{new Date(contact.createdAt).toLocaleString()}</span>
                </div>
                <div>
                  <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full mb-3">{contact.subject}</span>
                  <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                </div>
              </Card>
            ))}

            {activeTab === 'orders' && db.orders.length === 0 && <p className="text-gray-500">Chưa có đơn đăng ký nào.</p>}
            {activeTab === 'orders' && db.orders.map((order: any) => (
              <Card key={order.id} className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{order.customerName}</h3>
                  <p className="text-gray-600">{order.customerPhone}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-4 py-2 bg-teal-50 text-teal-700 font-bold rounded-xl">{order.packageName}</span>
                  <div className="text-xs text-gray-400 mt-2">{new Date(order.createdAt).toLocaleString()}</div>
                </div>
              </Card>
            ))}

            {activeTab === 'settings' && settingsForm && (
              <div className="space-y-8">
                <Card className="p-6 bg-white shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Thông tin Liên hệ (Footer & Contact)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                      <Input value={settingsForm.phone} onChange={(e) => setSettingsForm({...settingsForm, phone: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <Input value={settingsForm.email} onChange={(e) => setSettingsForm({...settingsForm, email: e.target.value})} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                      <Input value={settingsForm.address} onChange={(e) => setSettingsForm({...settingsForm, address: e.target.value})} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Giờ làm việc</label>
                      <Input value={settingsForm.workingHours} onChange={(e) => setSettingsForm({...settingsForm, workingHours: e.target.value})} />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Thống kê Trang chủ</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Số Khách hàng</label>
                      <Input value={settingsForm.heroCustomers} onChange={(e) => setSettingsForm({...settingsForm, heroCustomers: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tỷ lệ hài lòng (%)</label>
                      <Input value={settingsForm.heroSatisfaction} onChange={(e) => setSettingsForm({...settingsForm, heroSatisfaction: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Số Chuyên gia</label>
                      <Input value={settingsForm.heroExperts} onChange={(e) => setSettingsForm({...settingsForm, heroExperts: e.target.value})} />
                    </div>
                  </div>
                </Card>

                <Button onClick={handleSaveSettings} disabled={isSaving} className="bg-teal-600 hover:bg-teal-700 text-white w-full md:w-auto">
                  {isSaving ? 'Đang lưu...' : '💾 Lưu Cấu hình'}
                </Button>
              </div>
            )}

            {activeTab === 'packages' && packagesForm && (
              <div className="space-y-8">
                {packagesForm.map((pkg: any, idx: number) => (
                  <Card key={idx} className="p-6 bg-white shadow-sm border-l-4 border-teal-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tên gói</label>
                        <Input 
                          value={pkg.name} 
                          onChange={(e) => {
                            const newPkgs = [...packagesForm];
                            newPkgs[idx].name = e.target.value;
                            setPackagesForm(newPkgs);
                          }} 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Giá tiền</label>
                        <Input 
                          value={pkg.price} 
                          onChange={(e) => {
                            const newPkgs = [...packagesForm];
                            newPkgs[idx].price = e.target.value;
                            setPackagesForm(newPkgs);
                          }} 
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn</label>
                        <Input 
                          value={pkg.desc} 
                          onChange={(e) => {
                            const newPkgs = [...packagesForm];
                            newPkgs[idx].desc = e.target.value;
                            setPackagesForm(newPkgs);
                          }} 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nhãn dán (Nổi bật)</label>
                        <Input 
                          value={pkg.badge || ''} 
                          placeholder="VD: Được lựa chọn nhiều nhất"
                          onChange={(e) => {
                            const newPkgs = [...packagesForm];
                            newPkgs[idx].badge = e.target.value;
                            setPackagesForm(newPkgs);
                          }} 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Giá phụ (Phía dưới)</label>
                        <Input 
                          value={pkg.subprice || ''} 
                          placeholder="VD: Chỉ ~49k/ngày"
                          onChange={(e) => {
                            const newPkgs = [...packagesForm];
                            newPkgs[idx].subprice = e.target.value;
                            setPackagesForm(newPkgs);
                          }} 
                        />
                      </div>
                    </div>
                  </Card>
                ))}
                
                <Button onClick={handleSavePackages} disabled={isSaving} className="bg-teal-600 hover:bg-teal-700 text-white w-full md:w-auto">
                  {isSaving ? 'Đang lưu...' : '💾 Lưu Gói Dịch Vụ'}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
