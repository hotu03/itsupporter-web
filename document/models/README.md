# Mô hình Hệ thống IT Supporter

## 📋 Tổng quan

Thư mục này chứa các mô hình phân tích và thiết kế cho hệ thống IT Supporter, bao gồm:

- **Use Case Diagrams**: Sơ đồ ca sử dụng
- **Workflow Diagrams**: Sơ đồ quy trình làm việc
- **Activity Diagrams**: Sơ đồ hoạt động chi tiết
- **Sequence Diagrams**: Sơ đồ tuần tự tương tác

## 📁 Cấu trúc thư mục

```
models/
├── use-case-diagrams.md      # Sơ đồ ca sử dụng
├── workflow-diagrams.md      # Sơ đồ quy trình
├── activity-diagrams.md      # Sơ đồ hoạt động
├── sequence-diagrams.md      # Sơ đồ tuần tự
└── README.md                 # Tài liệu này
```

## 🎯 Các Use Case Chính

### UC-001: Đăng ký yêu cầu sửa chữa
- **Actor chính**: Khách hàng, Tester
- **Actor phụ**: Admin
- **Mô tả**: Quy trình đăng ký thiết bị cần sửa chữa

### UC-002: Đăng nhập và Đăng ký thành viên
- **Actor chính**: Thành viên, Khách hàng
- **Actor phụ**: Admin
- **Mô tả**: Xác thực và đăng ký tài khoản

### UC-003: Cổng thông tin khách hàng
- **Actor chính**: Khách hàng đã đăng nhập
- **Mô tả**: Quản lý thông tin cá nhân và theo dõi dịch vụ

### UC-004: Khách hàng đăng ký dịch vụ sửa chữa
- **Actor chính**: Khách hàng đã đăng nhập
- **Mô tả**: Đăng ký dịch vụ với thông tin tự động điền

## 🔄 Quy trình Chính

### WF-001: Quy trình sửa chữa 5 giai đoạn
```
P1: Thu thập thông tin → P2: Kiểm tra sơ bộ → P3: Sửa chữa →
P4: Kiểm tra chất lượng → P5: Xác nhận hoàn thành
```

### WF-002: Quy trình đăng ký trực tuyến
```
Đăng ký online → Phê duyệt tại quầy → Chuyển thành phiếu chính thức
```

### WF-003: Quy trình đăng nhập và xác thực
```
Đăng nhập → Xác thực → Phân quyền → Truy cập hệ thống
```

### WF-004: Quy trình cổng thông tin khách hàng
```
Đăng nhập → Dashboard → Quản lý thông tin → Theo dõi phiếu → Quản lý điểm
```

## 👥 Các Actor và Trách nhiệm

### Khách hàng (Customer)
- Đăng ký dịch vụ trực tuyến/tại quầy
- Theo dõi tiến độ sửa chữa
- Quản lý điểm thưởng và đổi quà
- Thanh toán và nhận thiết bị

### Tester (Kiểm tra viên)
- Tiếp nhận khách hàng và thiết bị
- Thực hiện kiểm tra sơ bộ và cuối cùng
- Phê duyệt đăng ký trực tuyến
- Tạo và cập nhật phiếu sửa chữa

### Kỹ thuật viên (Technician)
- Thực hiện công việc sửa chữa
- Cập nhật checklist kỹ thuật
- Báo cáo tiến độ cho Admin

### Admin (Quản trị viên)
- Phân công nhân sự cho từng phiếu
- Phê duyệt đăng ký thành viên mới
- Xác nhận hoàn thành và tính toán chi phí
- Giám sát toàn bộ hệ thống

### Thành viên (Member)
- Đăng ký và đăng nhập hệ thống
- Thực hiện nhiệm vụ theo phân công
- Cập nhật tiến độ công việc

## 📊 Các loại sơ đồ

### Use Case Diagrams
- **Mục đích**: Hiển thị mối quan hệ giữa actor và use case
- **Công cụ**: Mermaid graph TD
- **Ví dụ**: UC-001, UC-002, UC-003, UC-004

### Workflow Diagrams
- **Mục đích**: Mô tả luồng công việc từ đầu đến cuối
- **Công cụ**: Mermaid stateDiagram-v2
- **Ví dụ**: WF-003, WF-004, WF-005, WF-006

### Activity Diagrams
- **Mục đích**: Chi tiết các bước thực hiện trong một hoạt động
- **Công cụ**: Mermaid flowchart TD
- **Ví dụ**: AD-001 đến AD-006

### Sequence Diagrams
- **Mục đích**: Hiển thị tương tác giữa các actor và hệ thống theo thời gian
- **Công cụ**: Mermaid sequenceDiagram
- **Ví dụ**: SD-001 đến SD-007

## 🔗 Mối quan hệ giữa các mô hình

```
Use Case Diagrams (Tổng quan)
    ↓
Workflow Diagrams (Luồng chính)
    ↓
Activity Diagrams (Chi tiết từng bước)
    ↓
Sequence Diagrams (Tương tác cụ thể)
```

## 📝 Quy ước ký hiệu

### Actor
- 🔷 **Khách hàng**: Người dùng cuối
- 🔶 **Tester**: Nhân viên kiểm tra
- 🔵 **Kỹ thuật viên**: Nhân viên sửa chữa
- 🔴 **Admin**: Quản trị viên
- 🟡 **Thành viên**: Nhân viên hệ thống

### Trạng thái phiếu
- 🟢 **WAITING**: Chờ xử lý
- 🔵 **RUNNING**: Đang sửa chữa
- 🟡 **RETESTING**: Đang kiểm tra lại
- 🟠 **RETURNING**: Sẵn sàng trả
- 🔴 **COMPLETE**: Hoàn thành
- ⚫ **RETURNED**: Đã trả khách

### Quy trình
- ➊ **P1**: Thu thập thông tin
- ➋ **P2**: Kiểm tra sơ bộ
- ➌ **P3**: Thực hiện sửa chữa
- ➍ **P4**: Kiểm tra chất lượng
- ➎ **P5**: Xác nhận hoàn thành

## 🔍 Cách sử dụng

1. **Đọc Use Case Diagrams** để hiểu tổng quan hệ thống
2. **Theo dõi Workflow Diagrams** để nắm luồng công việc chính
3. **Đi sâu Activity Diagrams** khi cần chi tiết từng bước
4. **Tham khảo Sequence Diagrams** để hiểu tương tác kỹ thuật

## 📞 Liên hệ

Để cập nhật hoặc bổ sung mô hình, vui lòng liên hệ team phát triển.</content>
</xai:function_call">Create comprehensive overview document for all the models