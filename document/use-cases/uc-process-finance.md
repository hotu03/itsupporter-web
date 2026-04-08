# UC-007 - Xử lý giao dịch tài chính

## Mô tả
Quản lý các giao dịch tài chính, dịch vụ và mã giảm giá của hệ thống.

## Actor chính
Admin

## Actor phụ
Không có

## Điều kiện tiên quyết
- Admin có quyền truy cập module Finance
- Có dữ liệu giao dịch để quản lý

## Điều kiện hậu quả
- Giao dịch được ghi nhận chính xác
- Báo cáo tài chính được cập nhật
- Danh mục dịch vụ và mã giảm giá được quản lý

## Luồng chính
1. Admin chọn tab tương ứng (Giao dịch/Dịch vụ/Mã giảm giá)
2. Xem danh sách và tìm kiếm theo tiêu chí
3. Thực hiện thao tác cần thiết (thêm/sửa/xóa)
4. Lưu thay đổi
5. Xem báo cáo tổng hợp

## Luồng thay thế
### Thêm dịch vụ mới
1. Nhập tên dịch vụ và giá cả
2. Đặt trạng thái active/inactive
3. Lưu vào danh mục dịch vụ

### Tạo mã giảm giá
1. Nhập thông tin mã giảm giá
2. Cấu hình điều kiện áp dụng
3. Đặt thời hạn hiệu lực
4. Lưu mã giảm giá

### Xem báo cáo doanh thu
1. Chọn khoảng thời gian
2. Hệ thống tính toán tổng doanh thu
3. Hiển thị biểu đồ và thống kê chi tiết

## Luồng ngoại lệ
### Dữ liệu không hợp lệ
1. Hệ thống kiểm tra tính hợp lệ
2. Hiển thị lỗi cụ thể
3. Yêu cầu nhập lại thông tin đúng