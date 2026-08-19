-- PrymaLab commerce + CRM hardening.
-- This migration is intentionally non-destructive and preserves existing leads,
-- contacts and orders.

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS admin_note TEXT,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

ALTER TABLE contacts
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS admin_note TEXT,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS order_code TEXT,
  ADD COLUMN IF NOT EXISTS customer_email TEXT,
  ADD COLUMN IF NOT EXISTS amount INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS payment_method TEXT NOT NULL DEFAULT 'bank_transfer',
  ADD COLUMN IF NOT EXISTS transfer_content TEXT,
  ADD COLUMN IF NOT EXISTS customer_note TEXT,
  ADD COLUMN IF NOT EXISTS admin_note TEXT,
  ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

UPDATE orders
SET
  order_code = COALESCE(order_code, 'PL-OLD-' || upper(substr(replace(id::text, '-', ''), 1, 8))),
  customer_email = COALESCE(customer_email, ''),
  transfer_content = COALESCE(transfer_content, 'PRYMALAB ' || upper(substr(replace(id::text, '-', ''), 1, 8))),
  amount = CASE
    WHEN amount > 0 THEN amount
    WHEN package_id = 'starter' THEN 99000
    WHEN package_id = 'transformation' THEN 1490000
    WHEN package_id = 'elite' THEN 3990000
    ELSE 0
  END,
  status = CASE WHEN status IS NULL OR status = 'pending' THEN 'awaiting_payment' ELSE lower(status) END;

ALTER TABLE orders ALTER COLUMN order_code SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS orders_order_code_key ON orders (order_code);
CREATE INDEX IF NOT EXISTS orders_status_created_at_idx ON orders (status, created_at DESC);
CREATE INDEX IF NOT EXISTS leads_status_created_at_idx ON leads (status, created_at DESC);
CREATE INDEX IF NOT EXISTS contacts_status_created_at_idx ON contacts (status, created_at DESC);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'orders_status_check') THEN
    ALTER TABLE orders ADD CONSTRAINT orders_status_check CHECK (
      status IN ('awaiting_payment', 'payment_review', 'paid', 'onboarding', 'active', 'completed', 'cancelled')
    );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'leads_status_check') THEN
    ALTER TABLE leads ADD CONSTRAINT leads_status_check CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'archived'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'contacts_status_check') THEN
    ALTER TABLE contacts ADD CONSTRAINT contacts_status_check CHECK (status IN ('new', 'contacted', 'resolved', 'archived'));
  END IF;
END $$;

-- All writes now pass through validated server routes. Anonymous clients keep
-- read-only access to published content, but can no longer write directly.
DROP POLICY IF EXISTS "Public insert leads" ON leads;
DROP POLICY IF EXISTS "Public insert contacts" ON contacts;
DROP POLICY IF EXISTS "Public insert orders" ON orders;

INSERT INTO site_settings (key, value) VALUES
  ('bankName', 'Vietcombank'),
  ('bankBin', '970436'),
  ('bankAccountNumber', ''),
  ('bankAccountName', ''),
  ('bankBranch', '')
ON CONFLICT (key) DO NOTHING;

UPDATE packages
SET
  description = 'Bản khởi động 7 ngày để hiểu nhịp ăn, ngủ và chọn đúng ưu tiên.',
  price = '99,000 VNĐ',
  price_numeric = 99000,
  period = '/7 ngày',
  duration_days = 7,
  features = '[{"text":"Bản đọc nhịp sống cá nhân","included":true},{"text":"Khung bữa ăn thực hành 7 ngày","included":true},{"text":"Routine thư giãn trước ngủ","included":true},{"text":"Mẫu theo dõi năng lượng mỗi ngày","included":true}]'::jsonb
WHERE id = 'starter';

UPDATE packages
SET
  description = 'Thiết lập lại nhịp ăn, ngủ và năng lượng trong 30 ngày có người đồng hành.',
  price = '1,490,000 VNĐ',
  price_numeric = 1490000,
  period = '/30 ngày',
  duration_days = 30,
  features = '[{"text":"Đánh giá đầu vào có cấu trúc","included":true},{"text":"Khung bữa ăn cá nhân hóa 30 ngày","included":true},{"text":"Routine giấc ngủ theo lịch sống","included":true},{"text":"2 buổi trao đổi 1-1","included":true},{"text":"Check-in và tinh chỉnh hàng tuần","included":true},{"text":"Hỗ trợ trong giờ làm việc","included":true}]'::jsonb
WHERE id = 'transformation';

UPDATE packages
SET
  description = 'Đồng hành 90 ngày để biến thay đổi ngắn hạn thành hệ thống có thể duy trì.',
  price = '3,990,000 VNĐ',
  price_numeric = 3990000,
  period = '/90 ngày',
  duration_days = 90,
  features = '[{"text":"Toàn bộ Pryma Reset 30","included":true},{"text":"3 chu kỳ mục tiêu 30 ngày","included":true},{"text":"6 buổi trao đổi 1-1","included":true},{"text":"Báo cáo xu hướng theo tuần","included":true},{"text":"Tinh chỉnh ưu tiên xuyên suốt","included":true},{"text":"Phản hồi ưu tiên trong ngày làm việc","included":true}]'::jsonb
WHERE id = 'elite';

-- Do not publish unverified social proof or professional titles.
UPDATE testimonials SET is_active = false;
UPDATE team_members SET is_active = false;
UPDATE blog_posts SET author = 'Ban biên tập PrymaLab';

UPDATE faqs SET is_active = false;
INSERT INTO faqs (question, answer, sort_order, is_active) VALUES
  ('PrymaLab có thay thế tư vấn y khoa không?', 'Không. PrymaLab cung cấp nội dung giáo dục và đồng hành thay đổi lối sống; không chẩn đoán, kê đơn hoặc thay thế cơ sở y tế.', 1, true),
  ('Tôi nhận được gì sau khi đăng ký?', 'Bạn nhận hướng dẫn bắt đầu, biểu mẫu đánh giá đầu vào và lịch triển khai tương ứng với chương trình đã chọn. Các quyền lợi cụ thể luôn được hiển thị trước khi tạo đơn.', 2, true),
  ('Thanh toán bằng cách nào?', 'PrymaLab sử dụng chuyển khoản ngân hàng với mã đơn riêng. Đơn chỉ được kích hoạt sau khi khoản chuyển được đối soát.', 3, true),
  ('Khi nào tôi có thể bắt đầu?', 'Trong giờ làm việc, PrymaLab thường xác nhận đơn và gửi hướng dẫn bắt đầu sau khi đối soát thanh toán. Thời gian cụ thể phụ thuộc chương trình và lịch hai bên.', 4, true),
  ('Tôi có thể hủy trước khi bắt đầu không?', 'Có. Hãy liên hệ trước khi buổi khởi động hoặc tài liệu cá nhân hóa được triển khai để PrymaLab kiểm tra điều kiện hủy và hoàn trả theo Điều khoản dịch vụ.', 5, true);
