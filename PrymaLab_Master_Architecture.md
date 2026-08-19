# PRYMALAB - MASTER TECHNICAL ARCHITECTURE & IMPLEMENTATION BLUEPRINT

[cite_start]**Dự án:** Nền tảng Dịch vụ Dinh dưỡng Healthy & Cải thiện Chất lượng Giấc ngủ cá nhân hóa
[cite_start]**Thương hiệu:** PrymaLab (Teal & Blue Brand Identity)
**Kiến trúc:** Modular Monolith (Next.js App Router + Supabase/PostgreSQL)
[cite_start]**Tài liệu dành cho:** AI Engineering Lead / Claude Opus 4.6 (Aitigaravity) [cite: 2]

---

## 1. PHẠM VI TRIỂN KHAI (PROJECT SCOPE & PHASING)

### 1.1. Phase 1: MVP (Khởi tạo Core Value & Digital Services)
* **Chức năng chính:** [cite_start]Luồng Interactive Health Quiz (`/quiz`) để lấy thông tin sức khỏe/giấc ngủ [cite: 54, 56][cite_start], chấm điểm **Sleep Score (0-100)** và tính **BMI/TDEE**[cite: 54].
* [cite_start]**Dịch vụ lõi:** Bán 3 gói Digital Services: *Pryma Start*, *Pryma Reset 30*, *Pryma Signature 90*[cite: 53].
* **Customer Portal:** [cite_start]Xem Meal Plan [cite: 24] (thực đơn cá nhân hóa), [cite_start]Sleep Tracker [cite: 53] (nhật ký giấc ngủ), liên hệ 1-1 qua [cite_start]Chat/Ticketing[cite: 53].
* **Thanh toán:** [cite_start]Cổng thanh toán tự động (VietQR/VNPay) kèm Webhook cấp quyền lập tức[cite: 54, 55].

### 1.2. Phase 2: Upsell Ecosystem & Affiliate Integration
* [cite_start]Tích hợp khối Affiliate Smart Upsell (Granola, Tinh dầu, Gối cao su non, Smart Ring, v.v.) vào Dashboard[cite: 16, 18, 20, 22, 45].
* Hệ thống nhắc nhở tự động qua Email (Resend) / Zalo ZNS / SMS cho lịch ăn uống và giờ ngủ.

### 1.3. Phase 3: Advanced AI Coach & E-commerce (Thương hiệu riêng)
* Tích hợp AI Engine trợ lý sức khỏe tự động nhận diện mẫu hình mất ngủ và thay đổi thực đơn hàng tuần.
* [cite_start]Ra mắt module E-commerce tự nhập và bán sản phẩm vật lý thương hiệu PrymaLab (Granola PrymaLab, Trà thảo mộc PrymaLab)[cite: 49].

---

## 2. ĐỊNH VỊ THƯƠNG HIỆU & DESIGN SYSTEM (BRAND IDENTITY)

* **Tinh thần thương hiệu:** Chữa lành, khoa học, bình yên, sang trọng và đáng tin cậy.
* **Màu sắc chủ đạo (Tailwind Design Tokens):**
    * `primary` (**Teal - Xanh Teal - `#0D9488` / `#0F766E`**): [cite_start]Dành cho Dinh dưỡng (Nutrition), sự sống động, các chỉ số sức khỏe, [cite_start]Button CTA chuyển đổi[cite: 53].
    * `secondary` (**Blue - Xanh Lam - `#1E3A8A` / `#2563EB`**): [cite_start]Dành cho Giấc ngủ (Sleep) [cite: 1][cite_start], không gian thư giãn, biểu đồ phân tích sâu[cite: 53].
    * `accent` (**Warm Sand - `#F3F4F6`**): Màu nền nhẹ nhàng, tạo độ tương phản êm dịu cho mắt (đặc biệt khi xem vào buổi tối).
* **Typography:** Primary: *Inter* (Sạch sẽ, hiện đại cho các thông số/dashboard) | Display: *Playfair Display* hoặc *Merriweather* (Sang trọng cho tiêu đề trang chủ/bài viết blog).

---

## 3. HỆ THỐNG PHÂN QUYỀN (ROLE-BASED ACCESS CONTROL - RBAC)

| Role | Mô tả & Quyền hạn cốt lõi |
| :--- | :--- |
| **GUEST** | Truy cập trang công khai, thực hiện Health Quiz, xem Blog, mua gói dịch vụ. |
| **CUSTOMER** | Truy cập Dashboard cá nhân (`/dashboard`), ghi nhật ký giấc ngủ, xác nhận Meal Plan, chat với chuyên gia. |
| **SPECIALIST** *(Chuyên viên)* | Quản lý danh sách khách hàng được phân công, thiết lập/chỉnh sửa Meal Plan & Liệu trình, giải đáp qua Chat. |
| **CONTENT_MGR** *(Marketing)*| Quản lý CMS Blog, tạo/sửa Bài đánh giá Health Quiz, xem số liệu Conversion Funnel. |
| **SUPER_ADMIN** | Toàn quyền cấu hình hệ thống, quản lý User, kiểm soát Webhook, thiết lập giá & quyền hạn Role. |

---

## 4. SITEMAP & CORE USER JOURNEYS

### 4.1. Cấu trúc Sitemap
* **Public Pages:** `/` (Home), [cite_start]`/about`[cite: 54], `/quiz` (Interactive Health Assessment), [cite_start]`/services`[cite: 54], `/blog`, `/contact`.
* **Auth Pages:** `/login`, `/register`, `/forgot-password`.
* **Customer Portal:** `/dashboard`, [cite_start]`/dashboard/meal-plan`[cite: 53], [cite_start]`/dashboard/sleep-tracker`[cite: 53], [cite_start]`/dashboard/chat`[cite: 53], `/dashboard/settings`.
* **Admin & Specialist Portal:** `/admin/overview`, `/admin/users`, `/admin/meal-builder`, `/admin/sleep-analytics`, `/admin/content`.

### 4.2. State Machine & Luồng Đăng ký Dịch Vụ (Service Lifecycle)
GUEST_QUIZ_COMPLETED] │ (Lưu Result ID vào Session) ▼ [CHECKOUT_INITIATED] ───(Thanh toán lỗi/Hủy)──► [PAYMENT_FAILED / ABORTED] │ ▼ (Webhook Verified / Payment Confirmed) [SERVICE_ACTIVE] ──► [ONBOARDING_REQUIRED] ──► [PORTAL_UNLOCKED] │ │ │ ▼ └──────────────(Hết hạn gói)──────────► [SERVICE_EXPIRED / DOWNGRADED]

## 5. DESIGN DATA & ERD (DATABASE SCHEMA & RLS) Sử dụng **PostgreSQL (Supabase)** kết hợp **Prisma ORM**. Dưới đây là lược đồ dữ liệu và cấu trúc các bảng cốt lõi (Domain Models): ### 5.1. Bảng Dữ Liệu Lõi (Core Tables) ```sql -- 1. USERS & PROFILES CREATE TABLE users ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), email VARCHAR(255) UNIQUE NOT NULL, role VARCHAR(50) DEFAULT 'CUSTOMER', -- GUEST, CUSTOMER, SPECIALIST, CONTENT_MGR, SUPER_ADMIN created_at TIMESTAMPTZ DEFAULT NOW() ); CREATE TABLE user_profiles ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE, full_name VARCHAR(100), age INT, gender VARCHAR(20), weight_kg DECIMAL(5,2), height_cm DECIMAL(5,2), target_goal VARCHAR(100), -- e.g., 'FAT_LOSS', 'SLEEP_RECOVERY' specialist_id UUID REFERENCES users(id) -- Chuyên gia phụ trách ); -- 2. ASSESSMENT & QUIZ RESULTS CREATE TABLE quiz_results ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES users(id) ON DELETE SET NULL, sleep_score INT CHECK (sleep_score >= 0 AND sleep_score <= 100), tdee_score INT, bmi_score DECIMAL(4,2), raw_answers JSONB NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW() ); -- 3. MEAL PLANS & TRACKING CREATE TABLE meal_plans ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES users(id) ON DELETE CASCADE, title VARCHAR(255) NOT NULL, day_date DATE NOT NULL, total_calories INT, created_at TIMESTAMPTZ DEFAULT NOW(), CONSTRAINT unique_user_day_meal UNIQUE (user_id, day_date) -- Tránh lặp lộ trình trong 1 ngày ); CREATE TABLE meal_items ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), meal_plan_id UUID REFERENCES meal_plans(id) ON DELETE CASCADE, meal_type VARCHAR(50), -- 'BREAKFAST', 'LUNCH', 'DINNER', 'SNACK' name VARCHAR(255) NOT NULL, calories INT, affiliate_url VARCHAR(500), -- Link Upsell sản phẩm [Granola, Protein...] is_completed BOOLEAN DEFAULT FALSE ); -- 4. SLEEP LOGS & ANALYTICS CREATE TABLE sleep_logs ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES users(id) ON DELETE CASCADE, log_date DATE NOT NULL, bed_time TIMESTAMPTZ NOT NULL, wake_time TIMESTAMPTZ NOT NULL, quality_rating INT CHECK (quality_rating BETWEEN 1 AND 5), notes TEXT, CONSTRAINT unique_user_day_sleep UNIQUE (user_id, log_date) ); -- 5. ORDERS & TRANSACTIONAL OUTBOX CREATE TABLE orders ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES users(id), package_type VARCHAR(50) NOT NULL, -- 'STARTER', 'TRANSFORMATION_30', 'ELITE_90' amount INT NOT NULL, status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, COMPLETED, FAILED payment_gateway VARCHAR(50), transaction_id VARCHAR(100) UNIQUE, created_at TIMESTAMPTZ DEFAULT NOW() ); CREATE TABLE outbox_events ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), event_type VARCHAR(100) NOT NULL, -- e.g., 'order.completed', 'quiz.submitted' payload JSONB NOT NULL, status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, PROCESSED, FAILED created_at TIMESTAMPTZ DEFAULT NOW() );

5.2. Row Level Security (RLS Policies - Supabase)
• Rule 1 (user_profiles, meal_plans, sleep_logs): User chỉ có quyền SELECT, UPDATE dữ liệu có user_id == auth.uid().
• Rule 2 (Specialist Access): Tài khoản role SPECIALIST được phép SELECT và UPDATE trên bảng meal_plans của các User có user_profiles.specialist_id == auth.uid().
• Rule 3 (System/Admin): Role SUPER_ADMIN có toàn quyền ALL trên toàn bộ các bảng thông qua Service Role Key.

6. KIẾN TRÚC LOGIC, DATABASE TRANSACTION & RANGES
6.1. Chống Trùng Lặp Nhật Ký & Lộ Trình (Concurrency & Constraints)
Để ngăn chặn lỗi race condition (người dùng bấm đúp gửi 2 nhật ký giấc ngủ hoặc tạo 2 meal plan trong cùng một ngày), hệ thống dùng cấu trúc ràng buộc cơ sở dữ liệu:
• Áp dụng Constraint UNIQUE (user_id, log_date) và UNIQUE (user_id, day_date).
• PostgreSQL Exclusion Constraint (Nếu mở rộng lịch đặt lịch call 1-1 với Specialist):
CREATE EXTENSION IF NOT EXISTS btree_gist;
CREATE TABLE specialist_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    specialist_id UUID REFERENCES users(id),
    customer_id UUID REFERENCES users(id),
    booking_time RANGESPEC NOT NULL, -- TSTZRANGE
    EXCLUDE USING gist (
        specialist_id WITH =,
        booking_time WITH &&
    )
);

6.2. Transactional Outbox Pattern (Đảm Bảo Tính Nhất Quán Dữ Liệu)
Khi thanh toán gói TRANSFORMATION_30 thành công qua Webhook:
1. Bắt đầu Transaction BEGIN;.
2. Cập nhật trạng thái orders.status = 'COMPLETED'.
3. Cập nhật users.role = 'CUSTOMER'.
4. Ghi vào bảng outbox_events event order.completed (chứa user_id, email, gói dịch vụ).
5. Kết thúc Transaction COMMIT;.
6. Background Worker / Serverless Job sẽ quét bảng outbox_events để gửi Email chào mừng, gửi Zalo ZNS và thông báo cho Specialist mà không sợ rủi ro mất mát dữ liệu khi server crash.


7. API CONTRACTS & STABLE ERROR CODES
7.1. Chuẩn Hóa Chuỗi Mã Lỗi (Error Codes)
Toàn bộ API trả về JSON chuẩn HTTP Status và code nội bộ cố định để Frontend dễ dàng bắt lỗi và hiển thị thông báo:
• ERR_AUTH_UNAUTHORIZED (401) - Chưa đăng nhập hoặc Token hết hạn.
• ERR_QUIZ_INVALID_PAYLOAD (400) - Dữ liệu Health Quiz gửi lên không hợp lệ.
• ERR_MEAL_PLAN_DUPLICATE (409) - Đã tồn tại thực đơn cho ngày được chọn.
• ERR_PAYMENT_WEBHOOK_INVALID (400) - Chữ ký (Signature) Webhook thanh toán sai.
• ERR_FORBIDDEN_ROLE
• (403) - Role hiện tại không có quyền thực hiện thao tác.

7.2. API Spec (Ví Dụ API Submit Quiz)
// POST /api/v1/quiz/evaluate
// Request Payload:
{
  "age": 28,
  "weightKg": 65.5,
  "heightCm": 170.0,
  "sleepHoursPerNight": 5.5,
  "sleepDifficultyFreq": "OFTEN",
  "goal": "SLEEP_RECOVERY"
}

// Response (200 OK):
{
  "success": true,
  "data": {
    "quizId": "a1b2c3d4-...",
    "sleepScore": 58,
    "tdee": 2150,
    "bmi": 22.66,
    "recommendationPackage": "TRANSFORMATION_30",
    "summary": "Giấc ngủ của bạn đang ở mức cần cải thiện gấp để tránh suy nhược..."
  }
}

8. 14 MODULES IMPLEMENTATION ROADMAP (CHI TIẾT TASK)
[M01: Core Infra] ──► [M02: DB Schema] ──► [M03: Design Tokens UI]
                            │
        ┌───────────────────┴───────────────────┐
        ▼                                       ▼
[M04: Health Quiz UI/AI]                 [M05: Auth & RBAC]
        │                                       │
        └───────────────────┬───────────────────┘
                            ▼
                   [M06: Sales & Checkout]
                            │
                            ▼
              [M07: Customer Dashboard Core]
                            │
        ┌───────────────────┴───────────────────┐
        ▼                                       ▼
[M08: Meal Plan System]               [M09: Sleep Tracker & Analytics]
        │                                       │
        └───────────────────┬───────────────────┘
                            ▼
                  [M10: Smart Affiliate Upsell]
                            │
                            ▼
               [M11: Specialist & Admin Portal]
                            │
                            ▼
               [M12: Email/SMS/Zalo Outbox Engine]
                            │
                            ▼
                [M13: SEO & Performance Auditing]
                            │
                            ▼
                 [M14: Security & UAT Go-Live]


Chi tiết 14 Module (Task breakdown, Effort & Gate):
1. Module 01: Next.js Core Infrastructure Setup
o Tasks: Cấu hình Next.js App Router (TypeScript), ESLint, Prettier, Husky. Thiết lập liên kết Supabase SDK & Prisma ORM.
o Effort: 2 Days | Dependency: None | Completion Gate: Project compile thành công, CI check linter pass 100%.
2. Module 02: Database Engineering & RLS Policies
o Tasks: Viết migration cho 5 bảng core. Viết script Seed Data (3 Gói dịch vụ, Specialist mẫu). Thiết lập Supabase RLS policies.
o Effort: 3 Days | Dependency: M01 | Completion Gate: Test truy vấn RLS: Customer không thể xem Meal Plan của Customer khác.
3. Module 03: Brand Design System (Teal & Blue)
o Tasks: Cấu hình tailwind.config.ts, xây dựng UI library (Buttons, Card, Form, Badge, Modal, Navigation) tuân thủ WCAG 2.1 Contrast.
o Effort: 3 Days | Dependency: M01 | Completion Gate: Trang Storybook/UI Showroom hiển thị chuẩn sắc màu PrymaLab trên Dark/Light mode.
4. Module 04: Interactive Health Quiz Engine (/quiz)
o Tasks: Code Multi-step form bằng Framer Motion + Hook Form. Viết thuật toán tính điểm Sleep Score và TDEE tại Backend.
o Effort: 4 Days | Dependency: M02, M03 | Completion Gate: Flow trả về đúng kết quả dưới 500ms, lưu Result ID vào Database.
5. Module 05: Authentication & RBAC Layer
o Tasks: Cấu hình Supabase Auth (Google OAuth, Email/Password), middleware kiểm tra Role (Guest vs Customer vs Specialist).
o Effort: 3 Days | Dependency: M02 | Completion Gate: Chặn truy cập trái phép vào /dashboard và /admin hoàn hảo.
6. Module 06: Sales Page, Payment Gateway & Webhook
o Tasks: Code trang /services hiển thị Bảng giá so sánh. Tích hợp thanh toán VietQR / VNPay / Stripe. Code Webhook Transactional Outbox.
o Effort: 5 Days | Dependency: M04, M05 | Completion Gate: Simulate Webhook thành công -> tự động nâng cấp role lên CUSTOMER.
7. Module 07: Customer Portal Skeleton & Dashboard
o Tasks: Code Layout Portal (Sidebar, Topbar). Code trang tổng quan /dashboard với thẻ chỉ số cơ bản (BMI, Ngày theo dõi, Sleep Score).
o Effort: 3 Days | Dependency: M05 | Completion Gate: UI Responsive 100% trên Mobile, Tablet, Desktop.
8. Module 08: Personalized Meal Plan Module (/dashboard/meal-plan)
o Tasks: UI lịch thực đơn tuần/ngày. Tích hợp Checkbox hoàn thành món ăn (Progress Bar). Dynamic Calorie calculation.
o Effort: 4 Days | Dependency: M07 | Completion Gate: Dữ liệu checkbox được sync Real-time với PostgreSQL mà không lag.
9. Module 09: Sleep Tracker & Recharts Analytics (/dashboard/sleep-tracker)
o Tasks: Form ghi nhận giờ đi ngủ/thức dậy. Vẽ biểu đồ chất lượng giấc ngủ 7/30 ngày bằng Recharts sử dụng màu Xanh Lam (#2563EB).
o Effort: 4 Days | Dependency: M07 | Completion Gate: Biểu đồ render mượt mà, chính xác số liệu theo khoảng thời gian được lọc.
10. Module 10: Smart Affiliate & Upsell Integration
o Tasks: Tạo Component "PrymaLab Recommended" tích hợp vào từng món ăn (Granola) và góc Giấc Ngủ (Gối non, Tinh dầu). Add Affiliate Tracking codes.
o Effort: 2 Days | Dependency: M08, M09 | Completion Gate: Các link Click Out được track event đầy đủ vào hệ thống Analytics.
11. Module 11: Specialist & Admin Portal (/admin)
o Tasks: Giao diện cho Specialist gán/chỉnh sửa Meal Plan cho khách hàng. Trang quản lý người dùng và số liệu doanh thu cho Admin.
o Effort: 5 Days | Dependency: M05, M08 | Completion Gate: Specialist thay đổi thực đơn -> bên Customer Dashboard thấy cập nhật tức thì.
12. Module 12: Notification & Outbox Worker Engine
o Tasks: Viết Cronjob/Background Worker xử lý outbox_events. Tích hợp Email templates (Resend) cho Welcome Email, Reminder.
o Effort: 3 Days | Dependency: M06 | Completion Gate: Transaction trong Webhook hoàn tất -> nhận được Email mẫu đẹp trong vòng 10 giây.
13. Module 13: Local SEO, Structured Data & CWV Optimization
o Tasks: Cấu hình Dynamic Metadata, Open Graph, Schema.org (HealthAndBeautyBusiness, Service, Article), Sitemap.xml, robots.txt.
o Effort: 2 Days | Dependency: M03 | Completion Gate: Google PageSpeed Insights đạt > 90 điểm cho Performance và SEO.
14. Module 14: Security Hardening, E2E Testing & Go-Live UAT
o Tasks: Viết E2E Test bằng Playwright cho luồng Quiz -> Checkout -> Dashboard. Audit Bảo mật (CORS, Rate Limiting, CSP Header).
o Effort: 4 Days | Dependency: M01-M13 | Completion Gate: Toàn bộ E2E Tests Pass, Zero Critical Vulnerabilities.
9. QUY CHỨNG CHẤT LƯỢNG (DOD, DOR, TESTING & RUNBOOK)
9.1. Definition of Ready (DoD) & Definition of Done (DoD)
• Definition of Ready (DoR - Trước khi code): Task có đủ UI Wireframe, cấu trúc API Input/Output rõ ràng, đã định nghĩa Schema cơ sở dữ liệu.
• Definition of Done (DoD - Khi hoàn thành): * Code phải được viết bằng TypeScript Strictly Typed (không dùng any).
o Đạt Unit Test Coverage >= 80% cho các logic tính toán (BMI, TDEE, Sleep Score).
o UI đáp ứng chuẩn Responsive và màu thương hiệu (Teal/Blue).
o Pass các kiểm tra an toàn bảo mật RLS trên Supabase.
9.2. Testing Strategy
• Unit Testing (Vitest): Test độ chính xác của các hàm tính Calorie, Sleep quality scoring.
• Database Concurrency Testing: Viết test script giả lập 10 requests gửi cùng thời điểm để xác minh Constraint chống trùng lịch làm việc đúng.
• E2E Testing (Playwright): Tự động hóa kiểm thử luồng Người dùng vào làm Quiz -> Thanh toán -> Nhận quyền truy cập Dashboard.
9.3. Operations & Incident Runbook
• Sự cố Webhook không gửi được quyền (Payment Confirmed but Portal Locked):
1. Kiểm tra bảng orders qua Transaction ID xem trạng thái là gì.
2. Kiểm tra bảng outbox_events xem event order.completed đang ở status PENDING hay FAILED.
3. Chạy Command Retry: npm run ops:retry-outbox -- --id=<event_id>.
10. CLAUDE OPUS 4.6 (AITIGARAVITY) - MASTER PROMPT & AGENTS.MD
10.1. File cấu trúc chuẩn AGENTS.md (Đặt ở thư mục gốc Project)
Markdown
# AI ASSISTANT RULES & CONVENTIONS (AGENTS.MD)
1. You are operating as the Principal Software Architect & Lead Fullstack Engineer for "PrymaLab".
2. **STRICT TECH STACK:** Next.js (App Router), TypeScript, Tailwind CSS, Prisma, Supabase (PostgreSQL), Framer Motion, Recharts.
3. **BRAND IDENTITY ENFORCEMENT:** Use `#0D9488` (Teal) for Nutrition/Actions and `#2563EB` (Blue) for Sleep/Analytics. Always ensure accessible contrast.
4. **DATABASE RULES:** Never execute queries without RLS awareness. Always use Transactional Outbox for payment/state mutations.
5. **ERROR HANDLING:** Always implement structured error codes (`ERR_...`). Never swallow exceptions.
6. **WORKING METHODOLOGY:** Implement one module at a time. Do not jump to M(x+1) until M(x) meets its Completion Gate.
10.2. Master Prompt để giao việc cho Claude Opus 4.6
Bạn copy toàn bộ phần lời lệnh dưới đây cùng file Markdown này gửi cho Claude:
"Chào Claude Opus 4.6 (Aitigaravity). Tôi giao cho bạn quyền Lead Technical Architect & Principal Fullstack Developer của dự án website PrymaLab (Dịch vụ Dinh dưỡng Healthy & Giấc ngủ, thương hiệu Xanh Teal & Xanh Lam).
Tôi đã đính kèm tài liệu Master Technical Architecture & Implementation Blueprint chuẩn Kỹ thuật phần mềm ở trên. Bạn hãy đọc kỹ tài liệu, ghi nhớ file AGENTS.md, cấu trúc bảng Database, chuẩn màu sắc thương hiệu và lộ trình 14 Modules.
Lệnh thực thi ngay bây giờ:
1. Xác nhận bạn đã hiểu toàn bộ kiến trúc Modular Monolith, bảng RLS, và cơ chế Transactional Outbox.
2. Hãy tiến hành tạo cấu trúc dự án và thiết lập mã nguồn hoàn chỉnh cho Module 01 (Core Infra) và Module 02 (Database Engineering & RLS Policies - Prisma Schema + Supabase SQL Migration) ngay lập tức. Hãy viết code chất lượng cao, chuẩn Production-ready và không dùng placeholder."
