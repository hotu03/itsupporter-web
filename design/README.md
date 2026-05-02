# IT Supporter — Hệ thống Quản lý Sửa chữa Máy tính

## Mục lục

- [Tổng quan](#tổng-quan)
- [Kiến trúc](#kiến-trúc)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Staff App (itsupporter-tech)](#staff-app-itsupporter-tech)
  - [Đăng nhập & Xác thực](#đăng-nhập--xác-thực)
  - [Dashboard](#dashboard)
  - [Quản lý Khách hàng](#quản-lý-khách-hàng)
  - [Quản lý Máy (Machines)](#quản-lý-máy-machines)
  - [Quản lý Nhân sự](#quản-lý-nhân-sự)
  - [Quản lý Tài chính](#quản-lý-tài-chính)
  - [Hóa đơn (Invoices)](#hóa-đơn-invoices)
  - [Đăng ký Dịch vụ](#đăng-ký-dịch-vụ)
- [Customer App (itsupport-tech-customers)](#customer-app-itsupport-tech-customers)
  - [Đăng ký tài khoản](#đăng-ký-tài-khoản)
  - [Đăng nhập](#đăng-nhập)
  - [Quên mật khẩu](#quên-mật-khẩu)
  - [Đặt lại mật khẩu](#đặt-lại-mật-khẩu)
  - [OTP Xác thực](#otp-xác-thực)
  - [Customer Portal](#customer-portal)
- [Firestore Data Model](#firestore-data-model)
- [Firebase Authentication](#firebase-authentication)
- [Deployment](#deployment)
- [Development](#development)

---

## Tổng quan

IT Supporter là hệ thống quản lý sửa chữa máy tính bao gồm **2 ứng dụng** được triển khai trên Firebase Hosting:

| Ứng dụng | URL | Mục đích |
|----------|-----|----------|
| **Staff App** | https://itsupporter-tech.web.app | Quản lý khách hàng, máy, nhân sự, tài chính |
| **Customer App** | https://itsupport-tech-customers.web.app | Tra cứu trạng thái máy, đổi voucher |

### Khác biệt quan trọng về Auth và Database

| Thành phần | Staff App | Customer App |
|------------|-----------|--------------|
| **Firebase Auth** | Project: `itsupporter-tech` | Project: `itsupport-tech-customers` |
| **Firestore Database** | Project: `itsupporter-tech` | Project: `itsupporter-tech` (chung) |
| **Primary Identity** | Email đăng nhập | Email (là primary key trong document ID) |

> **Lưu ý:** Staff app và Customer app dùng chung Firestore database (`itsupporter-tech`) nhưng dùng 2 Firebase Auth project khác nhau. Điều này đảm bảo staff không thể đăng nhập vào customer portal và ngược lại.

---

## Kiến trúc

```
┌─────────────────────────────────────────────────────────────────┐
│                     Firebase Hosting                            │
│                                                                 │
│   itsupporter-tech.web.app          itsupport-tech-customers.web.app
│   (Staff App)                       (Customer App)             │
│   ┌──────────────────────┐          ┌──────────────────────────┐ │
│   │  React Router        │          │  React Router            │ │
│   │  /dashboard          │          │  /login                  │ │
│   │  /customers          │          │  /signup                 │ │
│   │  /machines           │          │  /forgot                 │ │
│   │  /personnel          │          │  /set-password           │ │
│   │  /finance            │          │  /otp                    │ │
│   │  /invoices           │          │  /portal (protected)     │ │
│   │  /profile            │          │                          │ │
│   │  /settings           │          │                          │ │
│   └──────────┬───────────┘          └──────────┬───────────────┘ │
│              │                                  │                 │
│   ┌──────────▼───────────┐          ┌──────────▼───────────────┐ │
│   │  Firebase Auth       │          │  Firebase Auth            │ │
│   │  (itsupporter-tech)  │          │  (itsupport-tech-customers)│ │
│   └──────────┬───────────┘          └──────────┬───────────────┘ │
│              │                                  │                 │
└──────────────┼──────────────────────────────────┼─────────────────┘
               │                                  │
   ┌───────────▼──────────────────────────────────▼─────────────┐
   │              Firestore (itsupporter-tech)                  │
   │  customers | machines | discounts | invoices | point_history│
   │  redeemed_vouchers | services | members | ...              │
   └────────────────────────────────────────────────────────────┘
```

---

## Cấu trúc dự án

```
design/
├── public/                     # Static assets (favicon)
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── customers/      # Customer management components
│   │   │   │   ├── CustomerTable.tsx
│   │   │   │   ├── CustomerFormModal.tsx
│   │   │   │   ├── RedeemModal.tsx
│   │   │   │   ├── HistoryModal.tsx
│   │   │   │   ├── DateFilterBar.tsx
│   │   │   │   ├── StatsCards.tsx
│   │   │   │   └── hooks/
│   │   │   │       └── useCustomers.ts
│   │   │   ├── customer/       # Customer-facing portal components
│   │   │   │   ├── MachinesTab.tsx
│   │   │   │   ├── ProfileTab.tsx
│   │   │   │   ├── InvoicesTab.tsx
│   │   │   │   └── hooks/
│   │   │   ├── dashboard/      # Dashboard widgets
│   │   │   ├── machines/       # Machine management
│   │   │   ├── finance/        # Finance management
│   │   │   ├── personnel/      # Personnel management
│   │   │   ├── service-registration/
│   │   │   ├── ui/            # Shared UI components
│   │   │   ├── Pagination.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── CustomerProtectedRoute.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx
│   │   ├── data/              # Firestore data access layer
│   │   │   ├── firestoreCustomers.ts
│   │   │   ├── firestoreMachines.ts
│   │   │   ├── firestoreDiscounts.ts
│   │   │   ├── firestoreInvoices.ts
│   │   │   ├── firestorePoints.ts
│   │   │   ├── firestoreRedeemedVouchers.ts
│   │   │   ├── firestoreServices.ts
│   │   │   ├── firestoreMembers.ts
│   │   │   ├── firestoreTransactions.ts
│   │   │   ├── firebase-auth.ts      # Customer Auth
│   │   │   ├── staff-auth.ts         # Staff Auth
│   │   │   └── operationKeys.ts      # Document ID builders
│   │   ├── pages/
│   │   │   ├── SignIn.tsx            # Staff login
│   │   │   ├── SignUp.tsx            # Staff registration
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Customers.tsx
│   │   │   ├── Machines.tsx
│   │   │   ├── Personnel.tsx
│   │   │   ├── Finance.tsx
│   │   │   ├── Invoices.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── ServiceRegistration.tsx
│   │   │   ├── CustomerLogin.tsx     # Customer login
│   │   │   ├── CustomerSignup.tsx    # Customer signup
│   │   │   ├── CustomerForgot.tsx
│   │   │   ├── CustomerSetPassword.tsx
│   │   │   ├── CustomerOTP.tsx
│   │   │   └── CustomerPortal.tsx    # Customer dashboard
│   │   ├── routes.tsx               # Staff router
│   │   └── customer-router.tsx       # Customer router
│   ├── assets/
│   │   └── images/
│   │       ├── logo.png
│   │       └── background.jpg
│   ├── main.tsx                    # Staff app entry
│   └── customer-main.tsx           # Customer app entry
├── index.html                      # Staff app HTML
├── customer-index.html             # Customer app HTML
├── firebase.json
└── vite.config.ts
```

---

## Staff App (itsupporter-tech)

URL: https://itsupporter-tech.web.app

### Đăng nhập & Xác thực

**Trang:** `/signin`

Staff đăng nhập bằng **email và password** (Firebase Auth trong project `itsupporter-tech`).

Các tính năng:
- Đăng nhập với email/password
- Đăng nhập bằng Google
- "Remember me" để giữ phiên đăng nhập
- Link đến trang đăng ký cho nhân viên mới

**Middleware:** `ProtectedRoute` kiểm tra auth state từ `AuthContext`, chuyển hướng về `/signin` nếu chưa đăng nhập.

**Phân quyền:**
- `isAdmin(user)` — kiểm tra role admin
- `isMember(user)` — kiểm tra role member
- Chỉ admin mới có quyền thêm/sửa/xóa khách hàng

---

### Dashboard

**Trang:** `/dashboard`

Tổng quan hệ thống với các thống kê:
- Tổng số khách hàng
- Số máy đang sửa chữa
- Doanh thu tháng
- Khách hàng mới trong tháng

Biểu đồ và danh sách hoạt động gần đây.

---

### Quản lý Khách hàng

**Trang:** `/customers`

#### Tính năng

1. **Danh sách khách hàng** — Bảng hiển thị tất cả khách hàng với:
   - Tên, SĐT, Email
   - Điểm tích lũy
   - Tổng số lần sửa chữa
   - Ngày tạo

2. **Tìm kiếm** — Tìm theo tên, SĐT, email

3. **Lọc theo ngày** — Lọc khách hàng theo khoảng thời gian tạo

4. **Thống kê** — Tổng số, khách hàng active, tổng sửa chữa, khách mới

5. **Phân trang** — 5/10/15/20 mục mỗi trang

#### Thao tác

| Thao tác | Mô tả |
|----------|-------|
| **Thêm khách hàng** | Chỉ admin — tạo document mới trong `customers` |
| **Sửa khách hàng** | Cập nhật name, email, notes |
| **Xóa khách hàng** | Chỉ admin — xóa document |
| **Đổi điểm** | Mở modal Redeem — chọn voucher để đổi điểm |
| **Lịch sử điểm** | Xem chi tiết tích/tiêu điểm |

#### Data Flow

```
Firestore: customers collection
    └── Document ID format: cust_email_{normalized_email}
    └── Fields: name, phone, email, points, totalRepairs, createdAt, notes, lastRepair

useCustomers hook:
    ├── getFirestoreCustomers() → lấy tất cả (staff có full access)
    ├── addFirestoreCustomer() → tạo mới
    ├── updateFirestoreCustomer() → cập nhật
    ├── deleteFirestoreCustomer() → xóa
    └── filteredCustomers → lọc theo search & date
```

---

### Quản lý Máy (Machines)

**Trang:** `/machines`

#### Tính năng

1. **Danh sách máy** — Tất cả máy trong hệ thống
2. **Tìm kiếm** — Theo tên khách hàng, SĐT, model, serial
3. **Bộ lọc trạng thái** — Đang sửa / Đã hoàn thành / Đã hủy
4. **Bộ lọc thời gian** — Theo ngày tiếp nhận

#### Trạng thái máy

| Trạng thái | Màu | Mô tả |
|------------|-----|-------|
| `pending` | Xanh dương | Chờ tiếp nhận |
| `received` | Cam | Đã tiếp nhận |
| `diagnosing` | Tím | Đang chẩn đoán |
| `repairing` | Vàng | Đang sửa |
| `waiting_parts` | Đỏ nhạt | Chờ linh kiện |
| `completed` | Xanh lá | Hoàn thành |
| `returned` | Xám | Đã trả khách |
| `cancelled` | Đỏ | Đã hủy |

#### Thao tác

| Thao tác | Mô tả |
|----------|-------|
| **Thêm máy mới** | Tạo record sửa chữa mới |
| **Cập nhật trạng thái** | Thay đổi status của máy |
| **Ghi chú** | Thêm ghi chú kỹ thuật |
| **In phiếu** | Xuất phiếu sửa chữa (signature canvas) |

#### Data Flow

```
Firestore: machines collection
    └── Document ID: machine_{id}
    └── Fields: customerId, customerName, customerPhone,
                model, serial, status, notes, createdAt, updatedAt

Workflow:
    createMachine → pending → received → diagnosing → repairing
        → completed → returned
```

---

### Quản lý Nhân sự

**Trang:** `/personnel`

#### Tính năng

1. **Danh sách nhân viên** — Bảng thông tin nhân viên
2. **Thêm/Sửa nhân viên** — Chỉ admin
3. **Vai trò** — Admin / Member

#### Data Flow

```
Firestore: members collection
    └── Document ID: member_{phone}
    └── Fields: name, phone, role, createdAt

Roles:
    ├── admin — full access (CRUD all)
    └── member — read + update machines, read customers
```

---

### Quản lý Tài chính

**Trang:** `/finance`

#### Tính năng

1. **Tổng quan** — Doanh thu, chi phí, lợi nhuận
2. **Danh sách giao dịch** — Tất cả thu/chi
3. **Bộ lọc** — Theo ngày, loại giao dịch

#### Discount/Voucher System

```
Firestore: discounts collection
    └── Document ID: discount_{id}
    └── Fields: code, description, discountPercent, maxDiscount,
                pointsRequired, validFrom, validUntil,
                usageLimit, usageCount, isRedeemable, createdAt

Workflow đổi điểm:
    customer points → redeem voucher → usageCount++ → customer points--
```

#### Data Flow

```
Firestore: transactions collection
    └── Document ID: tx_{machineId}
    └── Fields: machineId, type (income/expense),
                amount, description, date, createdBy

Discount redemption tạo transaction type="expense"
```

---

### Hóa đơn (Invoices)

**Trang:** `/invoices`

#### Tính năng

1. **Danh sách hóa đơn** — Tất cả hóa đơn
2. **Tạo hóa đơn** — Tạo từ máy đã hoàn thành
3. **In hóa đơn** — Xuất file in
4. **Filter** — Theo ngày, trạng thái thanh toán

#### Data Flow

```
Firestore: invoices collection
    └── Document ID: inv_{machineId}
    └── Fields: machineId, customerId, items[],
                subtotal, discount, total, status, createdAt

Invoice tự động tạo khi machine status = "completed"
```

---

### Đăng ký Dịch vụ

**Trang:** `/register`

Dành cho khách hàng chưa có tài khoản muốn đăng ký sửa máy.

#### Flow

1. Khách nhập thông tin (tên, SĐT, email)
2. Hệ thống check nếu chưa có → tạo customer document + firebase auth
3. Machine record được tạo với status `pending`
4. Staff nhận và xử lý

---

## Customer App (itsupport-tech-customers)

URL: https://itsupport-tech-customers.web.app

### Đăng ký tài khoản

**Trang:** `/signup`

#### 2 cách đăng ký

**1. Google Sign-In**
- Click "Đăng ký với Google"
- Firebase popup hiện ra → chọn tài khoản Google
- Nếu email chưa có trong hệ thống → hiện form nhập thêm thông tin (name, phone)
- Email được pre-fill và readonly (disabled)
- Submit → tạo customer document trong Firestore → redirect `/portal`

**2. Email/Password**
- Điền: Họ tên, SĐT, Email, Mật khẩu, Xác nhận mật khẩu
- Validate: tên ≥2 ký tự, SĐT 10-11 số, email hợp lệ, mật khẩu ≥6 ký tự
- Check trùng email trong Firestore trước khi tạo Firebase Auth
- Tạo Firebase Auth account → tạo customer document → redirect `/login`

#### Customer Document Structure

```typescript
interface Customer {
  id: string;                    // Document ID: cust_email_{normalized_email}
  name: string;                  // Họ tên
  phone: string;                 // SĐT
  email: string;                 // Email (primary key)
  points: number;                // Điểm tích lũy (default: 0)
  totalRepairs: number;          // Tổng số lần sửa (default: 0)
  source: string;                // "online" cho đăng ký web
  createdAt: string;             // ISO timestamp
  updatedAt: string;             // ISO timestamp
  lastLoginAt?: string;          // Cập nhật khi đăng nhập
  notes?: string;
}
```

---

### Đăng nhập

**Trang:** `/login`

#### 2 cách đăng nhập

**1. Google Sign-In**
- Click "Đăng nhập với Google"
- Nếu Google email đã có customer document → redirect `/portal`
- Nếu chưa có → redirect `/signup` với query params `from=google&email=...`

**2. Email/Password**
- Nhập email và password
- Firebase Auth `signInWithEmailAndPassword`
- Lưu auth state vào `sessionStorage`
- Redirect `/portal`

#### Auth Flow

```typescript
// Lưu auth sau khi đăng nhập thành công
sessionStorage.setItem("customer_auth", JSON.stringify({
  email: result.email,
  timestamp: Date.now()
}));

// Kiểm tra auth ở ProtectedRoute
const auth = sessionStorage.getItem("customer_auth");
if (!auth) redirect("/login");
```

---

### Quên mật khẩu

**Trang:** `/forgot`

1. Nhập email đã đăng ký
2. Hệ thống gửi email reset password qua Firebase Auth
3. Link reset trong email → `/set-password?oobCode=...`

---

### Đặt lại mật khẩu

**Trang:** `/set-password`

- Nhận `oobCode` từ query params (Firebase Auth code)
- Xác minh code hợp lệ
- Nhập password mới + xác nhận
- Firebase Auth `confirmPasswordReset(code, newPassword)`
- Redirect `/login`

---

### OTP Xác thực

**Trang:** `/otp`

Xác thực SĐT bằng OTP (dùng khi đăng ký hoặc quên password).

#### Flow

1. Gửi OTP đến SĐT qua Firebase Auth `sendPhoneVerification()`
2. User nhập 6 số OTP
3. Xác minh với Firebase Auth `verifyPhoneNumber()`
4. Nếu thành công → tiếp tục flow (đăng ký hoặc đặt lại password)

---

### Customer Portal

**Trang:** `/portal` (Protected)

#### Yêu cầu

- Phải đăng nhập (kiểm tra `sessionStorage.customer_auth`)
- Chưa đăng nhập → redirect `/login`

#### Các tab

**1. Tra cứu Máy (MachinesTab)**
- Hiển thị danh sách máy của customer (filtered by email at Firestore level)
- Mỗi máy show: model, serial, trạng thái, ngày tiếp nhận, ghi chú
- Trạng thái máy color-coded

**2. Thông tin (ProfileTab)**
- Họ tên, SĐT, email
- Điểm tích lũy hiện tại
- Lịch sử tích điểm (point history)

**3. Hóa đơn (InvoicesTab)**
- Danh sách hóa đơn của customer
- Filter theo ngày

**4. Voucher**
- **Đổi voucher:** Chọn voucher đang có → đổi bằng điểm
- **Voucher của tôi:** Danh sách voucher đã đổi với trạng thái
  - `available` — Còn dùng được
  - `used` — Đã sử dụng
  - `expired` — Đã hết hạn
  - `out_of_uses` — Đã hết lượt

#### Đổi Voucher Flow

```typescript
1. handleRedeem(voucher) → kiểm tra điểm đủ không
2. addFirestoreRedeemedVoucher() → lưu vào redeemed_vouchers
3. addFirestorePointHistory() → lưu lịch sử tiêu điểm
4. updateFirestoreCustomer() → trừ điểm
5. onSuccess callback → reload data
```

#### Hoàn điểm Voucher hết hạn

Nếu voucher hết hạn mà chưa sử dụng, customer có thể hoàn điểm:

```typescript
refundExpiredVoucher(voucherId, customerPhone)
// Hoàn: floor(pointsSpent * 2/3)
// VD: đổi 300 điểm → hoàn về 200 điểm
```

---

## Firestore Data Model

### Collections

| Collection | Document ID | Mục đích |
|------------|-------------|----------|
| `customers` | `cust_email_{email}` | Thông tin khách hàng |
| `machines` | `machine_{id}` | Máy sửa chữa |
| `discounts` | `discount_{id}` | Mã giảm giá/voucher |
| `redeemed_vouchers` | auto-id | Voucher đã đổi |
| `invoices` | `inv_{machineId}` | Hóa đơn |
| `services` | `service_{id}` | Dịch vụ sửa chữa |
| `point_history` | auto-id | Lịch sử điểm |
| `members` | `member_{phone}` | Nhân viên |
| `transactions` | `tx_{machineId}` | Giao dịch tài chính |

### Customer Document ID Format

```typescript
// Email là primary key
buildCustomerDocumentId({ email: "test@example.com" })
// → "cust_email_test@example.com"

// Fallback phone nếu không có email
buildCustomerDocumentId({ phone: "0912345678" })
// → "cust_phone_0912345678"
```

### Security Rules

**Nguyên tắc:** Tất cả customer-facing queries phải filter tại Firestore level (không fetch all rồi filter client side).

```typescript
// ✅ ĐÚNG: Filter tại Firestore
const machines = await getFirestoreMachinesByEmail(customerEmail);

// ❌ SAI: Fetch all rồi filter client (security issue)
const all = await getFirestoreMachines();
const filtered = all.filter(m => m.customerEmail === email);
```

---

## Firebase Authentication

### Staff Auth (itsupporter-tech)

```typescript
// Đăng nhập staff
signInWithEmailAndPassword(email, password)
signInWithGoogle()

// Đăng ký staff (chỉ admin)
createUserWithEmailAndPassword(email, password)
```

### Customer Auth (itsupport-tech-customers)

```typescript
// Đăng ký customer
createFirebaseCustomer(email, password)
signInWithGoogle()

// Đăng nhập customer
signInWithEmailAndPassword(email, password)
signInWithGoogle()

// Reset password
sendPasswordResetEmail(email)
confirmPasswordReset(oobCode, newPassword)

// OTP
sendPhoneVerification(phone)
verifyPhoneNumber(phone, code)
```

---

## Deployment

### Firebase Hosting

Hệ thống deploy lên 2 Firebase Hosting sites:

```bash
# Build staff app
pnpm build

# Build customer app
pnpm build:customer

# Deploy cả 2
firebase deploy --only hosting
```

### Workflow

```
1. pnpm build → output: dist/
2. pnpm build:customer → output: dist-customer/
3. firebase deploy →
   ├── itsupporter-tech → dist/
   └── itsupport-tech-customers → dist-customer/
```

### Environment Variables

Tạo `.env` file (tham khảo `.env.example` nếu có):

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

---

## Development

### Prerequisites

- Node.js ≥18
- pnpm

### Setup

```bash
# Install dependencies
pnpm install

# Run dev server (staff app)
pnpm dev

# Run customer app dev
# Cần sửa vite.config.ts để point vào customer-index.html
```

### Scripts

| Command | Mô tả |
|---------|--------|
| `pnpm dev` | Development server (staff app) |
| `pnpm build` | Build staff app |
| `pnpm build:customer` | Build customer app |
| `pnpm test` | Run tests |
| `pnpm test:unit` | Run unit tests |

### Build Output

```
dist/                   # Staff app (itsupporter-tech.web.app)
dist-customer/         # Customer app (itsupport-tech-customers.web.app)
```

---

## Bảo mật

### Phân tách Auth

- Staff và Customer dùng **2 Firebase Auth project khác nhau**
- Staff không thể đăng nhập vào customer portal
- Customer không thể đăng nhập vào staff app

### Data Isolation

- Customer queries filter **tại Firestore level** bằng email
- KHÔNG fetch all data rồi filter ở client
- Đảm bảo customer A không thể thấy data của customer B

### Protected Routes

- Staff: `ProtectedRoute` component check `AuthContext`
- Customer: `CustomerProtectedRoute` check `sessionStorage.customer_auth`

### Input Validation

- Tất cả user inputs được validate trước khi gửi lên Firestore
- Email format, phone format, required fields đều được kiểm tra

---

## Troubleshooting

### Lỗi "Email đã được đăng ký"

Kiểm tra:
1. Email đã tồn tại trong `customers` collection của Firestore
2. Email đã có Firebase Auth account (có thể đăng ký bằng Google rồi đăng thêm email/password)

### Lỗi phân trang không hoạt động

Kiểm tra `Customers.tsx` — dùng `page`, `pageSize`, `setPage`, `setPageSize` từ `useCustomers` hook, không dùng internal state của `usePagination`.

### Voucher không đổi được

1. Kiểm tra điểm của customer có đủ không
2. Kiểm tra voucher đã hết hạn chưa (`validUntil`)
3. Kiểm tra voucher đã hết lượt sử dụng chưa (`usageCount >= usageLimit`)

### Customer không thấy máy của mình

Kiểm tra `customerEmail` trong machine document có match với email đã đăng nhập không. Queries phải dùng email làm primary filter.