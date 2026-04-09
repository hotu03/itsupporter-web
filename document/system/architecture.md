# Kiến trúc hệ thống IT Support

## Tổng quan
Hệ thống quản lý dịch vụ sửa chữa thiết bị công nghệ với quy trình 5 giai đoạn, tích hợp quản lý khách hàng và nhân sự.

## Cấu trúc tổng thể

### Lớp trình bày (Presentation Layer)
- **React.js + TypeScript**: Giao diện người dùng chính
- **shadcn/ui**: Component library thống nhất
- **Tailwind CSS**: Styling system
- **React Router**: Điều hướng giữa các trang

### Lớp nghiệp vụ (Business Logic Layer)
- **React Hooks**: Logic xử lý state và side effects
- **Custom Hooks**: Tái sử dụng logic nghiệp vụ
- **Utility Functions**: Helper functions cho tính toán

### Lớp dữ liệu (Data Layer)
- **LocalStorage**: Lưu trữ dữ liệu client-side
- **JSON Files**: Cấu trúc dữ liệu đơn giản
- **In-memory State**: Quản lý state ứng dụng

## Các module chính

### 1. Quản lý máy móc (Machines)
**Chức năng:**
- Quản lý phiếu sửa chữa 5 giai đoạn
- Theo dõi trạng thái và tiến độ
- Tích hợp dịch vụ và thanh toán

**Thành phần:**
- `Machines.tsx`: Trang chính quản lý phiếu
- `machines.ts`: Data management và types
- Components: MachineCard, phiếu P1-P5

### 2. Quản lý khách hàng (Customers)
**Chức năng:**
- Lưu trữ thông tin khách hàng
- Quản lý điểm thưởng tích lũy
- Lịch sử giao dịch và sửa chữa

**Thành phần:**
- `Customers.tsx`: Giao diện quản lý khách hàng
- `customers.ts`: Customer data và point system
- `points.ts`: Logic tính điểm và quy tắc

### 3. Quản lý nhân sự (Personnel)
**Chức năng:**
- Quản lý thành viên kỹ thuật/tester
- Phê duyệt thành viên mới
- Theo dõi hiệu suất và thống kê

**Thành phần:**
- `Personnel.tsx`: Trang quản lý nhân sự
- Mock data: MEMBERS_INITIAL
- Role-based access control

### 4. Quản lý tài chính (Finance)
**Chức năng:**
- Quản lý giao dịch và doanh thu
- Danh mục dịch vụ và giá cả
- Hệ thống mã giảm giá và khuyến mãi

**Thành phần:**
- `Finance.tsx`: Dashboard tài chính
- `finance.ts`: Transaction management
- `discounts.ts`: Discount code logic

### 5. Xác thực và phân quyền (Authentication)
**Chức năng:**
- Đăng nhập/đăng ký người dùng
- Phân quyền dựa trên vai trò
- Bảo mật thông tin

**Thành phần:**
- `SignIn.tsx`, `SignUp.tsx`: Auth pages
- `auth.ts`: Authentication utilities
- Role-based routing

## Luồng dữ liệu

### Quy trình sửa chữa tiêu chuẩn
1. **Input**: Khách hàng → Tester (P1 - chọn thanh toán)
2. **Processing**: Tester (P2) → Kỹ thuật viên (P3) → Tester (P4)
3. **Output**: Admin (P5 - tạo hóa đơn, tích điểm) → Khách hàng
4. **Feedback**: Điểm thưởng + Hóa đơn → Customer/Finance database

### Quản lý dữ liệu
- **LocalStorage**: Persistent storage cho tất cả entities
- **Real-time sync**: State management giữa components
- **Validation**: Input validation tại boundary
- **Backup**: JSON export/import capabilities
- **Invoice generation**: Tự động tạo và lưu hóa đơn khi hoàn thành
- **Points tracking**: Lưu trữ lịch sử điểm thưởng và đổi điểm

## Tích hợp bên ngoài

### SMS Notifications
- Gửi thông báo trạng thái cho khách hàng
- Xác nhận đăng ký và hoàn thành
- API integration (future enhancement)

### Payment Gateway
- Xử lý thanh toán thẻ/transfer
- Tích hợp VNPay/Momo (future enhancement)
- Invoice generation

### Digital Signature
- Chữ ký điện tử xác nhận
- QR code generation
- PDF export capabilities

## Bảo mật và quyền truy cập

### Authentication
- Email/password authentication
- Role-based access (Admin/User)
- Session management

### Authorization
- Component-level permissions
- Action-based access control
- Data filtering theo role

### Data Protection
- Client-side encryption (future)
- Secure LocalStorage usage
- Input sanitization

## Hiệu suất và mở rộng

### Performance Optimization
- Lazy loading components
- Memoization của expensive calculations
- Efficient state updates

### Scalability Considerations
- Modular architecture
- Separation of concerns
- API-ready data layer

### Monitoring
- Error boundary implementation
- Logging system
- Performance metrics