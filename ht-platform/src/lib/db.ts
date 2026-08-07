import fs from 'fs/promises';
import path from 'path';

// For Vercel edge/serverless compatibility, writing to local fs is not persistent.
// Since we are running this on a standard Node server or locally, it works fine.
const DB_FILE = path.join(process.cwd(), 'data', 'db.json');

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

const defaultDB: DatabaseSchema = {
  settings: {
    phone: "0948 348 444",
    email: "Ahunglua7@gmail.com",
    address: "Nguyễn Tất Thành - Đà Nẵng",
    workingHours: "08:30 - 17:00 (Thứ 2 - Thứ 6)",
    heroCustomers: "1000",
    heroSatisfaction: "95",
    heroExperts: "30"
  },
  packages: [
    {
      id: 'starter',
      name: 'H&T Starter',
      desc: 'Trải nghiệm nền tảng, thiết lập thói quen.',
      price: '99,000 VNĐ',
      period: '/tháng',
      features: [
        { text: 'Tính toán TDEE cơ bản', included: true },
        { text: 'Gợi ý thực đơn mẫu', included: true },
        { text: 'Nhật ký giấc ngủ (7 ngày)', included: true },
        { text: 'Chuyên gia tư vấn 1-1', included: false },
      ],
      theme: 'teal'
    },
    {
      id: 'transformation',
      name: 'H&T Transformation',
      desc: 'Thay đổi toàn diện vóc dáng và sinh học trong 30 ngày.',
      price: '1,490,000 VNĐ',
      period: '/30 ngày',
      subprice: 'Chỉ ~49,000 VNĐ/ngày',
      badge: 'Được lựa chọn nhiều nhất',
      features: [
        { text: 'Thực đơn cá nhân hóa mỗi ngày', included: true },
        { text: 'Phác đồ giấc ngủ chuyên sâu', included: true },
        { text: 'Theo dõi và tinh chỉnh hàng tuần', included: true },
        { text: '2 buổi tư vấn 1-1 với chuyên gia', included: true },
        { text: 'Hỗ trợ qua chat 24/7', included: true },
      ],
      theme: 'teal'
    },
    {
      id: 'elite',
      name: 'H&T Elite Care',
      desc: 'Chăm sóc cao cấp 90 ngày. Đồng hành trọn vẹn.',
      price: '3,990,000 VNĐ',
      period: '/90 ngày',
      features: [
        { text: 'Mọi quyền lợi của gói Transformation', included: true },
        { text: 'Phân tích xét nghiệm máu định kỳ', included: true },
        { text: '6 buổi tư vấn chuyên gia cao cấp', included: true },
        { text: 'Ưu tiên hỗ trợ kỹ thuật và y tế', included: true },
      ],
      theme: 'blue'
    }
  ],
  leads: [],
  contacts: [],
  orders: []
};

// Initialize DB if not exists
async function initDb() {
  try {
    await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });
    try {
      await fs.access(DB_FILE);
    } catch {
      await fs.writeFile(DB_FILE, JSON.stringify(defaultDB, null, 2), 'utf-8');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

export async function getDb(): Promise<DatabaseSchema> {
  await initDb();
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(data) as DatabaseSchema;
  } catch (error) {
    console.error('Error reading db:', error);
    return defaultDB;
  }
}

export async function saveDb(data: DatabaseSchema): Promise<void> {
  await initDb();
  try {
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing db:', error);
  }
}

export async function addLead(lead: Omit<Lead, 'id' | 'createdAt'>) {
  const db = await getDb();
  const newLead: Lead = {
    ...lead,
    id: Math.random().toString(36).substring(2, 9),
    createdAt: new Date().toISOString()
  };
  db.leads.unshift(newLead); // Add to top
  await saveDb(db);
  return newLead;
}

export async function addContact(contact: Omit<ContactMessage, 'id' | 'createdAt'>) {
  const db = await getDb();
  const newContact: ContactMessage = {
    ...contact,
    id: Math.random().toString(36).substring(2, 9),
    createdAt: new Date().toISOString()
  };
  db.contacts.unshift(newContact);
  await saveDb(db);
  return newContact;
}

export async function addOrder(order: Omit<Order, 'id' | 'createdAt'>) {
  const db = await getDb();
  const newOrder: Order = {
    ...order,
    id: Math.random().toString(36).substring(2, 9),
    createdAt: new Date().toISOString()
  };
  db.orders.unshift(newOrder);
  await saveDb(db);
  return newOrder;
}

export async function updateSettings(settings: SiteSettings) {
  const db = await getDb();
  db.settings = settings;
  await saveDb(db);
  return db.settings;
}

export async function updatePackages(packages: SitePackage[]) {
  const db = await getDb();
  db.packages = packages;
  await saveDb(db);
  return db.packages;
}
