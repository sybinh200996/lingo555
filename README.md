# 🌟 Lingo555 - Web App Học Song Ngữ Tiếng Trung & Tiếng Anh Kiểu Duolingo

Ứng dụng học ngôn ngữ gamification toàn diện, đưa người học từ **con số 0 (Zero) đến trình độ Chuyên nghiệp (HSK 6 / IELTS C2)** với kiến trúc dữ liệu tối ưu cho quy mô **trên 50.000 từ vựng**.

---

## 🚀 TÍNH NĂNG NỔI BẬT

### 1. Giao diện Đa nền tảng Chuẩn Duolingo
- **Mobile-First & PWA:** Thanh điều hướng cố định đáy màn hình (Bottom Navigation Bar) 5 tab: *Lộ trình, Từ điển, Luyện tập SRS, AI Hội thoại, Hồ sơ & Admin*. Cài đặt thẳng ra màn hình chính điện thoại như native app.
- **Desktop 3 Cột:** 
  - *Cột trái:* Sidebar điều hướng, chuyển đổi khóa học Tiếng Trung 🇨🇳 / Tiếng Anh 🇬🇧, bật tắt Chế độ Tối/Sáng.
  - *Cột giữa:* Bản đồ cây kỹ năng (Skill Tree) hình sóng uốn lượn, các nút học 3D nổi có độ lún khi bấm.
  - *Cột phải:* Bảng thống kê chuỗi ngày học (Streak 🔥), Tim sống còn (Hearts ❤️), Đá quý (Gems 💎), Bảng xếp hạng thi đua tuần (Leaderboard 🏆) và Mục tiêu XP mỗi ngày.

### 2. Lộ trình Học từ Con số 0 đến Chuyên nghiệp
- **Tiếng Trung:**
  - *Cấp độ 0 (Nhập môn):* Bảng chữ cái Pinyin (Thanh mẫu, Vận mẫu, 4 Thanh điệu + biến điệu), 8 Nét cơ bản & 214 Bộ thủ.
  - *Lộ trình chuẩn:* HSK 1 đến HSK 6 (150 từ đến >5.000 từ chuyên sâu).
- **Tiếng Anh:**
  - *Cấp độ 0 (Nhập môn):* Bảng ký hiệu ngữ âm quốc tế IPA (44 âm), nguyên âm đơn/đôi, phụ âm gió.
  - *Lộ trình chuẩn:* Khung tham chiếu Châu Âu CEFR từ A1, A2, B1, B2 đến C1, C2.

### 3. Đầy Đủ 4 Kỹ Năng Tương Tác
- 🎧 **Kỹ năng NGHE (Listening):** Phát âm giọng bản xứ với 2 nút: tốc độ chuẩn **1.0x** và chế độ rùa bò **0.7x**.
- 🎙️ **Kỹ năng NÓI (Speaking):** Thu âm giọng nói trực tiếp qua Micro bằng Web Speech API, so sánh và **tô màu Xanh (từ đúng) / Đỏ (từ sai)** cùng điểm số % độ chuẩn xác.
- ✍️ **Kỹ năng VIẾT (Writing - Hanzi Writer):** Ô lưới Mễ tự cách (米字格) tập viết chữ Hán, hướng dẫn thứ tự nét mờ và chấm điểm nét bút.
- 🧩 **Ghép Thẻ & Sắp Xếp Câu:** Bài tập Dictation & Translation chọn thẻ từ thông minh, ghép thẻ từ vựng tương ứng.

### 4. Kiến Trúc Kho Dữ Liệu > 50.000 Từ & Ôn Tập SRS
- **SQLite B-Tree Indexes & WAL Mode:** Tối ưu hóa bộ đệm 64MB Cache, tìm kiếm tức thì đa trường (Tiếng Việt, Pinyin, IPA, Chữ Hán, Hán Việt) với độ trễ phản hồi < 5ms.
- **Thuật toán Lặp lại Ngắt quãng (Spaced Repetition System - SM-2):** Tự động tính chu kỳ quên của não bộ (1 ngày, 3 ngày, 7 ngày...) theo 4 mức đánh giá và lưu trữ "Sổ tay từ khó".
- **Admin Bulk Importer & Data Seeder:** Nạp nhanh hàng ngàn từ mẫu hoặc tải lên file CSV/JSON chứa hàng chục ngàn từ vựng.

---

## 🛠️ CÁCH KHỞI CHẠY DỰ ÁN

### 1. Khởi động Backend (Port 5000):
```bash
cd server
npm install
node src/index.js
```

### 2. Khởi động Frontend (Port 3000):
```bash
cd client
npm install
npm run dev
```

Mở trình duyệt truy cập: **http://localhost:3000**

---

## 🚀 HƯỚNG DẪN TRIỂN KHAI LÊN VPS (UBUNTU / DEBIAN / CENTOS)

### Cách 1: Triển khai tự động bằng Docker Compose (Khuyên dùng)

1. **Clone repository về VPS:**
```bash
git clone https://github.com/kisslove1712/lingo555.git
cd lingo555
```

2. **Cấu hình biến môi trường:**
```bash
cp server/.env.example server/.env
# Chỉnh sửa API Key nếu cần:
nano server/.env
```

3. **Chạy script triển khai một chạm:**
```bash
chmod +x deploy.sh
./deploy.sh
```
Hoặc chạy trực tiếp bằng Docker:
```bash
docker compose up -d --build
```
Ứng dụng sẽ hoạt động tại địa chỉ IP của VPS (Port 80).

---

### Cách 2: Triển khai bằng Node.js + PM2 & Nginx

1. **Build Frontend:**
```bash
cd client
npm install
npm run build
cd ..
```

2. **Cài đặt dependencies và chạy Backend bằng PM2:**
```bash
cd server
npm install --production
npm install -g pm2
pm2 start ../ecosystem.config.js
pm2 save
pm2 startup
```

3. **Cấu hình Nginx reverse proxy:**
Trỏ thư mục root tới `client/dist` và chuyển tiếp `/api/` về `http://127.0.0.1:5000/api/`.
