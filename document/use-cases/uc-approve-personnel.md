# UC-005 - Phê duyệt thành viên nhân sự mới

## Mô tả
Quy trình phê duyệt đăng ký của thành viên mới vào đội ngũ kỹ thuật.

## Actor chính
Admin

## Actor phụ
Thành viên mới (cung cấp thông tin)

## Điều kiện tiên quyết
- Thành viên đã nộp đơn đăng ký với thông tin đầy đủ
- Admin có quyền phê duyệt nhân sự

## Điều kiện hậu quả
- Thành viên được kích hoạt hoặc từ chối
- Thông tin nhân sự được cập nhật trong hệ thống
- Thành viên mới có thể tham gia phân công công việc

## Luồng chính
1. Admin truy cập trang quản lý nhân sự
2. Xem danh sách thành viên chờ phê duyệt
3. Xem chi tiết thông tin đăng ký (họ tên, lớp, vai trò, etc.)
4. Kiểm tra thông tin và xác minh tính chính xác
5. Phê duyệt hoặc từ chối đăng ký
6. Cập nhật trạng thái thành viên
7. Gửi thông báo kết quả cho thành viên

## Luồng thay thế
### Phê duyệt với vai trò cụ thể
1. Admin chỉ định vai trò chính xác (technician/tester)
2. Đặt cấp bậc và quyền hạn phù hợp
3. Kích hoạt tài khoản ngay lập tức

### Từ chối với lý do
1. Admin thêm ghi chú lý do từ chối
2. Từ chối đăng ký
3. Gửi thông báo với giải thích cho thành viên

## Luồng ngoại lệ
### Thiếu thông tin
1. Admin yêu cầu bổ sung thông tin
2. Thành viên cập nhật thông tin
3. Tiếp tục quy trình phê duyệt