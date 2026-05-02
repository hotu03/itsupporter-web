# IT Supporter — Hệ thống Quản lý Sửa chữa Máy tính

> Hệ thống quản lý sửa chữa máy tính cho phép staff quản lý khách hàng, máy móc, tài chính; đồng thời khách hàng có thể tra cứu trạng thái máy và đổi voucher qua cổng thông tin riêng.

**Live Demo:**
- Staff Portal: https://itsupporter-tech.web.app
- Customer Portal: https://itsupport-tech-customers.web.app

---

## Tổng quan

IT Supporter bao gồm **2 ứng dụng web** được triển khai trên Firebase Hosting:

| Ứng dụng | URL | Mục đích |
|----------|-----|----------|
| **Staff App** | https://itsupporter-tech.web.app | Quản lý khách hàng, máy, nhân sự, tài chính, hóa đơn |
| **Customer App** | https://itsupport-tech-customers.web.app | Tra cứu trạng thái máy, xem điểm tích lũy, đổi voucher |

### Kiến trúc

- **Frontend:** React 18 + TypeScript + Vite + TailwindCSS
- **Backend:** Firebase (Authentication + Firestore + Hosting)
- **2 Firebase Projects:** Staff Auth và Customer Auth **tách biệt nhau** nhưng dùng chung Firestore database

---

## Tính năng chính

### Staff App

- **Dashboard** — Thống kê tổng quan, biểu đồ doanh thu, hoạt động gần đây
- **Quản lý Khách hàng** — Thêm/sửa/xóa, tìm kiếm, lọc theo ngày, phân trang, đổi điểm voucher, xem lịch sử điểm
- **Quản lý Máy** — Theo dõi trạng thái sửa chữa (8 trạng thái), cập nhật tiến độ, ghi chú kỹ thuật, in phiếu
- **Quản lý Nhân sự** — Phân quyền Admin/Member
- **Quản lý Tài chính** — Theo dõi thu/chi, mã giảm giá/voucher
- **Hóa đơn** — Tạo và in hóa đơn từ máy đã hoàn thành
- **Đăng ký Dịch vụ** — Tạo tài khoản khách hàng mới và tiếp nhận máy sửa chữa

### Customer App

- **Đăng ký / Đăng nhập** — Bằng email/password hoặc Google
- **Tra cứu Máy** — Xem danh sách máy đang sửa và trạng thái real-time
- **Điểm Tích lũy** — Theo dõi điểm và lịch sử tích/tiêu điểm
- **Voucher** — Đổi voucher bằng điểm, xem trạng thái voucher, hoàn điểm voucher hết hạn
- **Hóa đơn** — Xem lịch sử hóa đơn

---

## Công nghệ sử dụng

| Layer | Công nghệ |
|-------|-----------|
| Ngôn ngữ | TypeScript, JavaScript |
| Framework | React 18, React Router v6 |
| Styling | TailwindCSS, lucide-react icons |
| Build | Vite 6 |
| Backend | Firebase Auth, Firestore, Hosting |
| Deploy | Firebase Hosting (multi-site) |

---

## Cấu trúc dự án

```
d:/itsupporter/
├── design/                    # Source code (React app)
│   ├── src/
│   │   ├── app/
│   │   │   ├── pages/         # Tất cả trang (Staff + Customer)
│   │   │   ├── components/    # Shared components
│   │   │   ├── data/          # Firestore data access layer
│   │   │   └── contexts/      # React contexts (Auth)
│   │   ├── main.tsx           # Staff app entry
│   │   └── customer-main.tsx  # Customer app entry
│   ├── index.html             # Staff app HTML
│   ├── customer-index.html    # Customer app HTML
│   ├── firebase.json          # Firebase config (multi-site)
│   └── package.json
├── README.md                  # (file này - ở root)
└── .git/                      # Git repository
```

---

## Database Schema (Firestore)

| Collection | Document ID | Mô tả |
|------------|-------------|-------|
| `customers` | `cust_email_{email}` | Thông tin khách hàng |
| `machines` | `machine_{id}` | Máy sửa chữa |
| `discounts` | `discount_{id}` | Mã giảm giá/voucher |
| `redeemed_vouchers` | auto-id | Voucher đã đổi |
| `invoices` | `inv_{machineId}` | Hóa đơn |
| `point_history` | auto-id | Lịch sử tích/tiêu điểm |
| `members` | `member_{phone}` | Nhân viên |
| `transactions` | `tx_{machineId}` | Giao dịch tài chính |

---

## Bảo mật

- **Phân tách Auth:** Staff và Customer dùng 2 Firebase Auth project riêng biệt
- **Data Isolation:** Customer queries filter tại Firestore level bằng email — đảm bảo customer A không thấy data của customer B
- **Protected Routes:** Staff dùng `AuthContext`, Customer dùng `sessionStorage`
- **Input Validation:** Tất cả user inputs validate trước khi gửi lên Firestore

---

## Development

```bash
cd design

# Cài đặt dependencies
pnpm install

# Build staff app
pnpm build

# Build customer app
pnpm build:customer

# Deploy lên Firebase
firebase deploy --only hosting
```

---

## Liên hệ

Nếu có câu hỏi hoặc cần hỗ trợ, vui lòng liên hệ qua GitHub Issues của repository này.

---

*Repository này chứa source code cho cả Staff App và Customer App của hệ thống IT Supporter.*