# UC-006 - Quản lý thông tin khách hàng

## Mô tả
Xem và quản lý thông tin khách hàng, lịch sử sửa chữa và điểm thưởng.

## Actor chính
Admin

## Actor phụ
Khách hàng (cập nhật thông tin cá nhân)

## Điều kiện tiên quyết
- Khách hàng đã có ít nhất 1 lần tương tác với hệ thống
- Admin có quyền truy cập module khách hàng

## Điều kiện hậu quả
- Thông tin khách hàng được cập nhật chính xác
- Lịch sử tương tác được lưu trữ đầy đủ
- Điểm thưởng được quản lý chính xác

## Luồng chính
1. Admin tìm kiếm khách hàng theo tên hoặc số điện thoại
2. Xem thông tin chi tiết khách hàng
3. Xem lịch sử sửa chữa và điểm thưởng
4. Cập nhật thông tin nếu cần (địa chỉ, email, etc.)
5. Xem thống kê khách hàng (tổng chi tiêu, điểm hiện tại)
6. Lưu thay đổi

## Luồng thay thế
### Cộng/trừ điểm thủ công
1. Admin chọn điều chỉnh điểm thưởng
2. Nhập lý do và số điểm thay đổi
3. Hệ thống cập nhật số dư điểm
4. Ghi nhận vào lịch sử điểm

### Xuất báo cáo khách hàng
1. Admin chọn khoảng thời gian
2. Hệ thống tạo báo cáo chi tiết
3. Xuất file Excel với thông tin khách hàng

## Luồng ngoại lệ
### Khách hàng không tồn tại
1. Hệ thống thông báo không tìm thấy
2. Đề nghị kiểm tra lại thông tin tìm kiếm
3. Có thể tạo khách hàng mới nếu cần