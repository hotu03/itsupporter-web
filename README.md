# IT Supporter — Hệ thống Quản lý Sửa chữa Máy tính

> Hệ thống quản lý sửa chữa máy tính cho phép staff quản lý khách hàng, máy móc, tài chính; đồng thời khách hàng có thể tra cứu trạng thái máy và đổi voucher qua cổng thông tin riêng.

**Live Demo:**
- Staff Portal: https://itsupporter-tech.web.app
- Customer Portal: https://itsupport-tech-customers.web.app

---

## Tổng quan

IT Supporter bao gồm **2 ứng dụng web** được triển khai trên Firebase Hosting:

| Ứng dụng | URL | Firebase Project | Mục đích |
|----------|-----|-------------------|----------|
| **Staff App** | https://itsupporter-tech.web.app | `itsupporter-tech` | Quản lý khách hàng, máy, nhân sự, tài chính, hóa đơn |
| **Customer App** | https://itsupport-tech-customers.web.app | `itsupport-tech-customers` | Tra cứu trạng thái máy, xem điểm tích lũy, đổi voucher |

### Kiến trúc

- **Frontend:** React 18 + TypeScript + Vite + TailwindCSS
- **Backend:** Firebase (Authentication + Firestore + Hosting)
- **2 Firebase Projects:** Staff Auth và Customer Auth **tách biệt nhau** nhưng dùng chung Firestore database `itsupporter-tech`

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

## Firebase Configuration — Hướng dẫn chi tiết

Hệ thống sử dụng **3 Firebase services** với **2 Firebase Projects** có vai trò khác nhau:

| Service | Firebase Project | Vai trò |
|---------|------------------|---------|
| **Firebase Auth** | `itsupporter-tech` | Staff authentication |
| **Firebase Auth** | `itsupport-tech-customers` | Customer authentication |
| **Firestore Database** | `itsupporter-tech` | Lưu trữ tất cả data (customers, machines, vouchers...) |

### Bước 1: Tạo Firebase Projects

Truy cập [Firebase Console](https://console.firebase.google.com/) và tạo **2 projects**:

1. **`itsupporter-tech`** — Project cho Staff (Auth + Firestore + Hosting)
2. **`itsupport-tech-customers`** — Project cho Customer (Auth + Hosting)

> **Lưu ý quan trọng:** Tên hosting sites phải trùng với tên Firebase project (không dấu, gạch ngang thay khoảng trắng).

### Bước 2: Bật Firebase Authentication

#### Staff Project (`itsupporter-tech`)

1. Mở **Build > Authentication > Get started**
2. Tab **Sign-in method**:
   - Bật **Email/Password** — đặt email/password là providers đầu tiên
   - Bật **Google** — chọn email của bạn làm project support email

#### Customer Project (`itsupport-tech-customers`)

1. Mở **Build > Authentication > Get started**
2. Tab **Sign-in method**:
   - Bật **Email/Password**
   - Bật **Google**

### Bước 3: Cấu hình Firestore Database

**Chỉ tạo Firestore trên project `itsupporter-tech`** (project còn lại không cần Firestore).

1. Mở **Build > Firestore Database > Create database**
2. Chọn region gần nhất (VD: `asia-southeast1` cho Việt Nam)
3. Chọn **Start in production mode** (hoặc test mode nếu dev)
4. Bắt đầu với các rules mặc định — sẽ cấu hình chi tiết ở bước Security Rules

### Bước 4: Cấu hình Firestore Security Rules

Trong **Firestore > Rules**, thay thế bằng rules phù hợp:

#### Rules cho Collection `customers`

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Staff: full access
    match /customers/{document} {
      allow read, write: if request.auth != null;
    }

    // Machines: staff full access
    match /machines/{document} {
      allow read, write: if request.auth != null;
    }

    // Members: staff full access
    match /members/{document} {
      allow read, write: if request.auth != null;
    }

    // Invoices: staff full access
    match /invoices/{document} {
      allow read, write: if request.auth != null;
    }

    // Transactions: staff full access
    match /transactions/{document} {
      allow read, write: if request.auth != null;
    }

    // Discounts: staff full access
    match /discounts/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

#### Rules cho Customer-facing collections (point_history, redeemed_vouchers)

```javascript
    // Point history: allow read by authenticated users, write by staff
    match /point_history/{document} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }

    // Redeemed vouchers: allow read by authenticated users, write by staff
    match /redeemed_vouchers/{document} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }

    // Services
    match /services/{document} {
      allow read, write: if request.auth != null;
    }
```

### Bước 5: Cấu hình Firebase Hosting

#### Project `itsupporter-tech`

1. **Build > Hosting > Get started**
2. Làm theo hướng dẫn cài `firebase-tools`: `npm install -g firebase-tools`
3. Login: `firebase login`
4. Init: `firebase init hosting` trong thư mục `design/`
5. Chọn project `itsupporter-tech`
6. Đặt `public directory` là `dist`
7. Configure as single-page app: **Yes**
8. Set up automatic builds: **No** (build thủ công với pnpm)

#### Project `itsupport-tech-customers`

1. Thêm site mới trong Firebase Console: **Build > Hosting > Add another site**
2. Đặt tên site: `itsupport-tech-customers`
3. Sau khi init project đầu tiên, chạy `firebase init hosting` lại và chọn **Add another site**
4. Đặt `public directory` cho site này là `dist-customer`
5. Configure as single-page app: **Yes** — trỏ đến `customer-index.html`

### Bước 6: Lấy Firebase Config

#### Staff Project Config

1. Firebase Console → Project Settings → General → **Your apps**
2. Click **Web** (</>) icon
3. Register app với nickname: `IT Supporter Staff`
4. Copy object `firebaseConfig`:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "itsupporter-tech.firebaseapp.com",
  projectId: "itsupporter-tech",
  storageBucket: "itsupporter-tech.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

#### Customer Project Config

1. Làm tương tự với project `itsupport-tech-customers`
2. Copy config của project customer

### Bước 7: Tạo file `.env`

Tạo file `design/.env` cho staff app:

```env
VITE_FIREBASE_API_KEY=AIzaSy...          # Từ staff project (itsupporter-tech)
VITE_FIREBASE_AUTH_DOMAIN=itsupporter-tech.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=itsupporter-tech
VITE_FIREBASE_STORAGE_BUCKET=itsupporter-tech.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

> **Lưu ý:** Staff app dùng config của project `itsupporter-tech` (nơi chứa Firestore).

Tạo file `design/.env.customer` cho customer app (nếu cần build riêng):

```env
VITE_FIREBASE_API_KEY=AIzaSy...          # Từ customer project (itsupport-tech-customers)
VITE_FIREBASE_AUTH_DOMAIN=itsupport-tech-customers.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=itsupport-tech-customers
VITE_FIREBASE_STORAGE_BUCKET=itsupport-tech-customers.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=987654321
VITE_FIREBASE_APP_ID=1:987654321:web:xyz789
```

### Bước 8: Cấu hình Google Sign-In (OAuth Consent Screen)

#### Staff Project

1. **APIs & Services > OAuth consent screen**
2. Chọn **External**
3. App name: `IT Supporter Staff`
4. Email hỗ trợ: email của bạn
5. **Scopes**: email, profile
6. **Test users**: thêm email test để tránh bị block khi chưa publish

#### Customer Project

1. Làm tương tự
2. App name: `IT Supporter Customer`

### Bước 9: Cập nhật `firebase.json`

Kiểm tra `firebase.json` đã đúng cấu hình 2 sites:

```json
{
  "hosting": [
    {
      "site": "itsupporter-tech",
      "public": "dist",
      "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
      "rewrites": [{
        "source": "**",
        "destination": "/index.html"
      }]
    },
    {
      "site": "itsupport-tech-customers",
      "public": "dist-customer",
      "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
      "rewrites": [{
        "source": "**",
        "destination": "/customer-index.html"
      }]
    }
  ]
}
```

### Bước 10: Build và Deploy

```bash
cd design

# Cài đặt dependencies
pnpm install

# Build staff app → output: dist/
pnpm build

# Build customer app → output: dist-customer/
pnpm build:customer

# Deploy cả 2 lên Firebase Hosting
firebase deploy --only hosting
```

### Kiểm tra sau khi deploy

| URL | Kiểm tra |
|-----|----------|
| https://itsupporter-tech.web.app | Staff login → Dashboard, Customers, Machines |
| https://itsupporter-tech.web.app/signin | Staff sign-in page |
| https://itsupport-tech-customers.web.app | Customer login page |
| https://itsupport-tech-customers.web.app/portal | Customer portal (redirect về login nếu chưa đăng nhập) |

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

## Troubleshooting thường gặp

### Lỗi "Permission denied" khi đọc Firestore

- Kiểm tra Firestore rules đã cho phép read/write
- Kiểm tra user đã đăng nhập (request.auth != null)

### Lỗi Google Sign-In không hoạt động

- Kiểm tra OAuth consent screen đã được configure đúng
- Kiểm tra email test đã được thêm vào test users
- Kiểm tra redirect URI trong Google Cloud Console

### Customer không thấy máy của mình

- Kiểm tra `customerEmail` trong machine document match với email đã đăng nhập
- Kiểm tra queries dùng email làm primary filter tại Firestore level

### Deploy thất bại

- Kiểm tra đã chạy `firebase login` chưa
- Kiểm tra quyền access (phải là Owner hoặc Editor của Firebase project)
- Kiểm tra `public` directory có tồn tại và có file `index.html`

---

## Liên hệ

Nếu có câu hỏi hoặc cần hỗ trợ, vui lòng liên hệ qua GitHub Issues của repository này.

---

*Repository này chứa source code cho cả Staff App và Customer App của hệ thống IT Supporter.*