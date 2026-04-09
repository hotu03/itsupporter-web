# Thực thể dữ liệu hệ thống

## Tổng quan
Hệ thống sử dụng cấu trúc dữ liệu JSON đơn giản lưu trữ trong LocalStorage với các thực thể chính sau.

## Machine (Thiết bị/Máy móc)

```typescript
interface Machine {
  id: number;                    // ID duy nhất
  status: Status;               // Trạng thái hiện tại
  customerName: string;         // Tên khách hàng
  phone: string;               // Số điện thoại liên hệ
  time: string;                // Thời gian tạo phiếu
  description: string;         // Mô tả vấn đề
  expired: string;             // Hạn bảo hành
  category: string;            // Loại thiết bị
  tester: string;              // Tester phụ trách
  technician: string;          // Kỹ thuật viên phụ trách
  warranty: "con" | "het";     // Trạng thái bảo hành
  password: string;            // Mật khẩu thiết bị
  charger: boolean;            // Có sạc không
  appointmentTime: string;     // Thời gian hẹn
  dropOffTime?: string;        // Thời gian nhận máy
  testerBefore: string;        // Tester kiểm tra ban đầu
  testerAfter: string;         // Tester kiểm tra cuối
  registrationType: "online" | "in-person";
  isApproved?: boolean;        // Đã duyệt cho online
  machineCondition?: string;   // Tình trạng máy
  needs?: string;              // Nhu cầu sửa chữa
  checklistBefore?: boolean[]; // Checklist trước sửa
  checklistAfter?: boolean[];  // Checklist sau sửa
  techChecklist?: boolean[];   // Checklist kỹ thuật
  techNotes?: string;          // Ghi chú kỹ thuật
  adminConfirmNote?: string;   // Ghi chú xác nhận Admin
  customerSignature?: string;  // Chữ ký khách hàng
  additionalServices?: string[]; // Dịch vụ bổ sung
  serviceAmount?: number;      // Chi phí dịch vụ
  discountCode?: string;       // Mã giảm giá
  discountAmount?: number;     // Số tiền giảm
  paymentStatus?: "paid" | "pending" | "free";
  finalAmount?: number;        // Tổng tiền thanh toán
  pointsEarned?: number;       // Điểm tích lũy
}
```

**Status values:**
- "COMPLETE" - Hoàn thành
- "RUNNING" - Đang sửa chữa
- "WAITING" - Chờ xử lý
- "RETURNING" - Sẵn sàng trả
- "RETESTING" - Đang kiểm tra lại
- "RETURNED" - Đã trả khách

## Customer (Khách hàng)

```typescript
interface Customer {
  id: number;              // ID duy nhất
  name: string;           // Tên khách hàng
  phone: string;          // Số điện thoại
  totalRepairs: number;   // Tổng số lần sửa
  points: number;         // Điểm tích lũy hiện tại
  registeredAt?: string;  // Ngày đăng ký
}
```

## Personnel/Member (Nhân sự)

```typescript
interface Member {
  id: number;                    // ID duy nhất
  name: string;                 // Họ tên
  username: string;             // Tên đăng nhập
  dob: string;                  // Ngày sinh (DD/MM/YYYY)
  phone: string;                // Số điện thoại
  gender: string;               // Giới tính
  course: string;               // Khóa học (K15, K16, etc.)
  class: string;                // Lớp học
  hometown: string;             // Quê quán
  position: string;             // Chức vụ
  type: "technician" | "tester"; // Vai trò
  machinesDone: number;         // Số máy đã sửa (technician)
  testsRun: number;             // Số test đã chạy (tester)
  status: string;               // Trạng thái (active/inactive)
  approvalStatus: "pending" | "approved" | "rejected";
  email?: string;               // Email
  registeredAt?: string;        // Ngày đăng ký
  isAdmin?: boolean;            // Quyền Admin
}
```

## Service (Dịch vụ)

```typescript
interface ServiceData {
  id: string;     // ID duy nhất
  name: string;   // Tên dịch vụ
  price: number;  // Giá dịch vụ (VND)
}
```

## Discount Code (Mã giảm giá)

```typescript
interface DiscountCode {
  id: string;           // ID duy nhất
  code: string;         // Mã giảm giá
  discountPercent: number; // Phần trăm giảm (%)
  maxDiscount: number;     // Giảm tối đa (VND)
  usageLimit: number;      // Số lần sử dụng tối đa
  usageCount: number;      // Số lần đã sử dụng
  validFrom: string;       // Ngày bắt đầu hiệu lực
  validUntil: string;      // Ngày hết hiệu lực
  description?: string;    // Mô tả
  isRedeemable?: boolean;  // Có thể đổi bằng điểm
  pointsRequired?: number; // Số điểm cần để đổi
}
```

## Invoice (Hóa đơn)

```typescript
interface Invoice {
  id: string;                    // ID duy nhất
  invoiceNumber: string;         // Mã hóa đơn (HD-XXXX)
  machineId?: number;            // ID máy liên kết
  customerName: string;          // Tên khách hàng
  phone: string;                 // Số điện thoại
  registrationType: "online" | "in-person"; // Loại đăng ký

  // Thông tin dịch vụ
  services: {
    name: string;
    price: number;
  }[];
  machineCondition?: string;
  needs?: string;
  category: string;
  warranty: "con" | "het";

  // Thông tin thời gian
  createdAt: string;             // Ngày tạo
  createdTime: string;           // Giờ tạo
  dropOffTime?: string;          // Thời gian nhận máy
  appointmentTime?: string;      // Thời gian hẹn

  // Thông tin thanh toán
  serviceAmount: number;         // Tổng tiền dịch vụ
  discountCode?: string;
  discountAmount: number;
  finalAmount: number;           // Thành tiền
  paymentStatus: "paid" | "pending" | "free";

  // Thông tin điểm thưởng
  pointsEarned?: number;

  // Thông tin nhân viên
  tester?: string;               // Tester tạo hóa đơn
  createdBy?: string;            // Người tạo hóa đơn

  // Ghi chú
  notes?: string;
}
```

## Transaction (Giao dịch)

```typescript
interface Transaction {
  id: string;         // ID duy nhất
  date: string;       // Ngày giao dịch
  type: "income" | "expense"; // Loại giao dịch
  amount: number;     // Số tiền
  description: string; // Mô tả
  category: string;   // Danh mục
}
```

## Point System (Hệ thống điểm)

### Point Rule (Quy tắc tích điểm)
```typescript
interface PointRule {
  id: string;              // ID duy nhất
  name: string;           // Tên quy tắc
  type: "per_order" | "amount_threshold"; // Loại quy tắc
  points: number;         // Số điểm cộng
  threshold?: number;     // Ngưỡng tiền (cho amount_threshold)
  enabled: boolean;       // Có áp dụng
  description?: string;   // Mô tả
}
```

### Point History (Lịch sử điểm)
```typescript
interface PointHistory {
  id: string;              // ID duy nhất
  customerPhone: string;   // SĐT khách hàng
  customerName: string;    // Tên khách hàng
  type: "earn" | "redeem"; // Tích điểm hoặc đổi điểm
  points: number;          // Số điểm (+ tích, - đổi)
  date: string;            // Ngày (ISO string)
  description: string;     // Mô tả giao dịch
  relatedId?: string;      // ID đơn hàng hoặc mã giảm giá
}
```

## Quan hệ giữa các thực thể

### Machine ↔ Customer
- Machine.phone → Customer.phone (lookup)
- Customer.totalRepairs cập nhật khi Machine hoàn thành
- Customer.points cập nhật từ Machine.pointsEarned

### Machine ↔ Personnel
- Machine.tester → Member.name (lookup)
- Machine.technician → Member.name (lookup)
- Member.machinesDone/testsRun cập nhật khi Machine hoàn thành

### Machine ↔ Service
- Machine.additionalServices[] → Service.name[] (lookup)
- Machine.serviceAmount tính từ Service.price[]

### Machine ↔ DiscountCode
- Machine.discountCode → DiscountCode.code (lookup)
- DiscountCode.usageCount tăng khi áp dụng

### Machine ↔ Invoice
- Invoice.machineId → Machine.id
- Invoice được tạo khi Machine.status = "COMPLETE" | "RETURNED"

### Customer ↔ PointHistory
- PointHistory.customerPhone → Customer.phone
- Customer.points = sum(PointHistory.points)

### Personnel ↔ System
- Member.approvalStatus quản lý truy cập
- Member.isAdmin cấp quyền cao nhất

## Storage Strategy

### LocalStorage Keys
- `"its_machines"`: Array<Machine>
- `"its_customers"`: Array<Customer>
- `"its_services"`: Array<ServiceData>
- `"its_discounts"`: Array<DiscountCode>
- `"its_transactions"`: Array<Transaction>
- `"its_invoices"`: Array<Invoice>
- `"its_point_rules"`: Array<PointRule>
- `"its_point_history"`: Array<PointHistory>

### Data Persistence
- Tự động lưu khi có thay đổi
- JSON serialization/deserialization
- Error handling cho corrupt data
- Fallback to default data khi cần

### Data Validation
- Type checking tại runtime
- Required field validation
- Business rule enforcement
- Referential integrity checking