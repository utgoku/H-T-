# HIỆU CHỈNH KIẾN TRÚC: QUY TRÌNH DỊCH VỤ & THIẾT KẾ ĐIỂM CHUYỂN ĐỔI (H&T PLATFORM)

[cite_start]**Mục tiêu tài liệu:** Bổ sung luồng dịch vụ (Service Flow), trang bán hàng (Sales Page), luồng thanh toán/đăng ký (Checkout & Subscription) và cơ chế Upsell cho AI Coder thiết lập chính xác logic Frontend/Backend[cite: 51].
**Nguyên tắc trải nghiệm:** Dẫn dắt người dùng bằng tâm lý học hành vi -> Cung cấp giá trị nhanh chóng -> Giải pháp cá nhân hóa từ chuyên gia.

---

## 1. CẤU TRÚC GÓI DỊCH VỤ CHỦ LỰC (SERVICE PACKAGES SCHEMA)

[cite_start]AI Coder cần khởi tạo Database Seed cho 3 gói dịch vụ cốt lõi sau để hiển thị trên hệ thống[cite: 24, 39]:

### Gói 1: H&T Starter (Dùng thử & Trải nghiệm) - *Phễu thu hút khách (Lead Magnet)*
* **Giá bán:** Miễn phí (Free Tier) hoặc Giá siêu ưu đãi (99.000 VNĐ).
* **Quyền lợi:**
  * Bài đánh giá chỉ số giấc ngủ & dinh dưỡng sâu (Deep Health & Sleep Assessment).
  * Thực đơn mẫu 3 ngày (3-Day Sample Meal Plan) tối ưu theo calo/Mục tiêu cơ bản.
  * Bản nhạc/âm thanh tần số giúp dễ ngủ (Audio Library).
* **Mục tiêu chuyển đổi:** Thu thập thông tin User (Email, SĐT, Vấn đề sức khỏe đang gặp phải).

### Gói 2: H&T Transformation 30-Day (Gói Phổ biến nhất - Best Seller)
* **Giá bán đề xuất:** 1.490.000 VNĐ (Tạo hiển thị Badge: "Được lựa chọn nhiều nhất").
* **Quyền lợi (Digital Services & Coaching):**
  * [cite_start]**Thực đơn cá nhân hóa 30 ngày[cite: 39]:** Cập nhật thực đơn mới mỗi tuần dựa trên tiến độ cân nặng/chỉ số cơ thể.
  * [cite_start]**Liệu trình giấc ngủ 30 ngày [cite: 40][cite_start]:** Kèm hướng dẫn vệ sinh giấc ngủ (Sleep Hygiene), bài tập thở & thư giãn chuyên sâu[cite: 40].
  * **Nhật ký thông minh (Interactive Trackers):** Tính năng check-list bữa ăn & tracking chất lượng giấc ngủ hàng ngày.
  * [cite_start]**Hỗ trợ 1-1 qua Chat:** Đội ngũ chuyên gia giải đáp qua hệ thống nhắn tin nội bộ trên Dashboard[cite: 41].

### Gói 3: H&T Elite Care 90-Day (Đồng hành Toàn diện)
* **Giá bán đề xuất:** 3.990.000 VNĐ.
* **Quyền lợi (High-Ticket Package):**
  * Toàn bộ quyền lợi của Gói Transformation nhưng mở rộng thời lượng 90 ngày.
  * [cite_start]**4 Buổi Video Call 1-1 (45 phút/buổi):** Trực tiếp tư vấn cùng chuyên gia Dinh dưỡng & Cố vấn Giấc ngủ H&T[cite: 41].
  * [cite_start]Tự động tạo danh sách đi chợ hàng tuần (Weekly Grocery List) tích hợp link mua sản phẩm gợi ý[cite: 45].

---

## 2. HIỆU CHỈNH USER JOURNEY & CORE FLOWS (LUỒNG TRẢI NGHIỆM KHÁCH HÀNG)

### Luồng 1: Interactive Health Quiz (Phễu Chuyển Đổi Tự Động)
Thay vì để khách hàng mua ngay, hệ thống dùng **Bài kiểm tra sức khỏe 1 phút** để kích thích sự tò mò và thấu hiểu cá nhân.