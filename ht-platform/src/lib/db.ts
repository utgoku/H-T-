import { supabase } from './supabase';

export interface Lead {
  id: string;
  createdAt: string;
  name: string;
  emailOrPhone: string;
  bmi: number;
  bmiCategory: string;
  tdee: number;
  sleepScore: number;
  sleepCategory: string;
  goals: string;
}

export interface ContactMessage {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface Order {
  id: string;
  createdAt: string;
  packageId: string;
  packageName: string;
  customerName: string;
  customerPhone: string;
}

export interface SiteSettings {
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  heroCustomers: string;
  heroSatisfaction: string;
  heroExperts: string;
  [key: string]: string; // Allows dynamic mapping of rows
}

export interface PackageFeature {
  text: string;
  included: boolean;
}

export interface SitePackage {
  id: string;
  name: string;
  desc: string;
  price: string;
  period: string;
  subprice?: string;
  badge?: string;
  theme: string;
  features: PackageFeature[];
}

export interface DatabaseSchema {
  settings: SiteSettings;
  packages: SitePackage[];
  leads: Lead[];
  contacts: ContactMessage[];
  orders: Order[];
}

const defaultSettings: SiteSettings = {
  phone: '0948 348 444',
  email: 'Ahunglua7@gmail.com',
  address: 'Nguyễn Tất Thành - Đà Nẵng',
  workingHours: '08:30 - 17:00 (Thứ 2 - Thứ 6)',
  heroCustomers: '1000',
  heroSatisfaction: '95',
  heroExperts: '30'
};

const defaultPackages: SitePackage[] = [
  {
    id: 'starter',
    name: 'H&T Starter',
    desc: 'Trải nghiệm nền tảng, thiết lập thói quen.',
    price: '99,000 VNĐ',
    period: '/tháng',
    theme: 'teal',
    features: [
      { text: 'Tính toán TDEE cơ bản', included: true },
      { text: 'Gợi ý thực đơn mẫu', included: true },
      { text: 'Nhật ký giấc ngủ (7 ngày)', included: true },
      { text: 'Chuyên gia tư vấn 1-1', included: false },
    ]
  },
  {
    id: 'transformation',
    name: 'H&T Transformation',
    desc: 'Thay đổi toàn diện vóc dáng và sinh học trong 30 ngày.',
    price: '1,490,000 VNĐ',
    period: '/30 ngày',
    subprice: 'Chỉ ~49,000 VNĐ/ngày',
    badge: 'Được lựa chọn nhiều nhất',
    theme: 'teal',
    features: [
      { text: 'Thực đơn cá nhân hóa mỗi ngày', included: true },
      { text: 'Phác đồ giấc ngủ chuyên sâu', included: true },
      { text: 'Theo dõi và tinh chỉnh hàng tuần', included: true },
      { text: '2 buổi tư vấn 1-1 với chuyên gia', included: true },
      { text: 'Hỗ trợ qua chat 24/7', included: true },
    ]
  },
  {
    id: 'elite',
    name: 'H&T Elite Care',
    desc: 'Chăm sóc cao cấp 90 ngày. Đồng hành trọn vẹn.',
    price: '3,990,000 VNĐ',
    period: '/90 ngày',
    theme: 'blue',
    features: [
      { text: 'Mọi quyền lợi của gói Transformation', included: true },
      { text: 'Phân tích xét nghiệm máu định kỳ', included: true },
      { text: '6 buổi tư vấn chuyên gia cao cấp', included: true },
      { text: 'Ưu tiên hỗ trợ kỹ thuật và y tế', included: true },
    ]
  }
];

const defaultDB: DatabaseSchema = {
  settings: defaultSettings,
  packages: defaultPackages,
  leads: [],
  contacts: [],
  orders: []
};

export async function getDb(): Promise<DatabaseSchema> {
  try {
    const [
      { data: settingsData },
      { data: packagesData },
      { data: leadsData },
      { data: contactsData },
      { data: ordersData }
    ] = await Promise.all([
      supabase.from('site_settings').select('key, value'),
      supabase.from('packages').select('*').order('sort_order'),
      supabase.from('leads').select('*').order('created_at', { ascending: false }),
      supabase.from('contacts').select('*').order('created_at', { ascending: false }),
      supabase.from('orders').select('*').order('created_at', { ascending: false })
    ]);

    let settings = { ...defaultSettings };
    if (settingsData && settingsData.length > 0) {
      const parsedSettings: Record<string, string> = {};
      settingsData.forEach(row => {
        parsedSettings[row.key] = row.value;
      });
      settings = { ...defaultSettings, ...parsedSettings };
    }

    let packages = defaultPackages;
    if (packagesData && packagesData.length > 0) {
      packages = packagesData.map(p => ({
        id: p.id,
        name: p.name,
        desc: p.description,
        price: p.price,
        period: p.period,
        subprice: p.subprice,
        badge: p.badge,
        theme: p.theme,
        features: p.features || []
      }));
    }

    let leads: Lead[] = [];
    if (leadsData) {
      leads = leadsData.map(l => ({
        id: l.id,
        createdAt: l.created_at,
        name: l.name,
        emailOrPhone: l.email_or_phone,
        bmi: l.bmi,
        bmiCategory: l.bmi_category,
        tdee: l.tdee,
        sleepScore: l.sleep_score,
        sleepCategory: l.sleep_category,
        goals: l.goals
      }));
    }

    let contacts: ContactMessage[] = [];
    if (contactsData) {
      contacts = contactsData.map(c => ({
        id: c.id,
        createdAt: c.created_at,
        name: c.name,
        email: c.email,
        phone: c.phone,
        subject: c.subject,
        message: c.message
      }));
    }

    let orders: Order[] = [];
    if (ordersData) {
      orders = ordersData.map(o => ({
        id: o.id,
        createdAt: o.created_at,
        packageId: o.package_id,
        packageName: o.package_name,
        customerName: o.customer_name,
        customerPhone: o.customer_phone
      }));
    }

    return {
      settings,
      packages,
      leads,
      contacts,
      orders
    };
  } catch (error) {
    console.error('Error fetching from Supabase, returning default DB', error);
    return defaultDB;
  }
}

export async function addLead(lead: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead> {
  try {
    const { data, error } = await supabase.from('leads').insert([{
      name: lead.name,
      email_or_phone: lead.emailOrPhone,
      bmi: lead.bmi,
      bmi_category: lead.bmiCategory,
      tdee: lead.tdee,
      sleep_score: lead.sleepScore,
      sleep_category: lead.sleepCategory,
      goals: lead.goals
    }]).select().single();

    if (error) throw error;
    
    return {
      id: data.id,
      createdAt: data.created_at,
      name: data.name,
      emailOrPhone: data.email_or_phone,
      bmi: data.bmi,
      bmiCategory: data.bmi_category,
      tdee: data.tdee,
      sleepScore: data.sleep_score,
      sleepCategory: data.sleep_category,
      goals: data.goals
    };
  } catch (error) {
    console.error('Error adding lead', error);
    return {
      ...lead,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date().toISOString()
    };
  }
}

export async function addContact(contact: Omit<ContactMessage, 'id' | 'createdAt'>): Promise<ContactMessage> {
  try {
    const { data, error } = await supabase.from('contacts').insert([{
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      subject: contact.subject,
      message: contact.message
    }]).select().single();

    if (error) throw error;

    return {
      id: data.id,
      createdAt: data.created_at,
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message
    };
  } catch (error) {
    console.error('Error adding contact', error);
    return {
      ...contact,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date().toISOString()
    };
  }
}

export async function addOrder(order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
  try {
    const { data, error } = await supabase.from('orders').insert([{
      package_id: order.packageId,
      package_name: order.packageName,
      customer_name: order.customerName,
      customer_phone: order.customerPhone
    }]).select().single();

    if (error) throw error;

    return {
      id: data.id,
      createdAt: data.created_at,
      packageId: data.package_id,
      packageName: data.package_name,
      customerName: data.customer_name,
      customerPhone: data.customer_phone
    };
  } catch (error) {
    console.error('Error adding order', error);
    return {
      ...order,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date().toISOString()
    };
  }
}

export async function updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  try {
    const entries = Object.entries(settings);
    if (entries.length > 0) {
      const updates = entries.map(([key, value]) => ({ key, value }));
      const { error } = await supabase.from('site_settings').upsert(updates, { onConflict: 'key' });
      if (error) throw error;
    }
    const db = await getDb();
    return db.settings;
  } catch (error) {
    console.error('Error updating settings', error);
    return { ...defaultSettings, ...settings } as SiteSettings;
  }
}

export async function updatePackages(packages: SitePackage[]): Promise<SitePackage[]> {
  try {
    const { error: deleteError } = await supabase.from('packages').delete().gte('sort_order', 0);
    if (deleteError) throw deleteError;

    if (packages.length > 0) {
      const inserts = packages.map((p, index) => ({
        id: p.id,
        name: p.name,
        description: p.desc,
        price: p.price,
        period: p.period,
        subprice: p.subprice,
        badge: p.badge,
        theme: p.theme,
        features: p.features,
        sort_order: index
      }));

      const { error: insertError } = await supabase.from('packages').insert(inserts);
      if (insertError) throw insertError;
    }

    return packages;
  } catch (error) {
    console.error('Error updating packages', error);
    return packages;
  }
}

export async function getTestimonials() {
  try {
    const { data, error } = await supabase.from('testimonials').select('*').eq('is_active', true).order('sort_order');
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting testimonials', error);
    return [];
  }
}

export async function getBlogPosts() {
  try {
    const { data, error } = await supabase.from('blog_posts').select('*').eq('is_published', true).order('id', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting blog posts', error);
    return [];
  }
}

export async function getFaqs() {
  try {
    const { data, error } = await supabase.from('faqs').select('*').eq('is_active', true).order('sort_order');
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting faqs', error);
    return [];
  }
}

export async function getTeamMembers() {
  try {
    const { data, error } = await supabase.from('team_members').select('*').eq('is_active', true).order('sort_order');
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting team members', error);
    return [];
  }
}
