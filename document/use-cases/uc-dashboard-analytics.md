# UC-009 - Giám sát và phân tích dashboard

## Mô tả
Xem tổng quan hệ thống và các chỉ số quan trọng để quản lý hoạt động kinh doanh.

## Actor chính
Admin

## Actor phụ
Không có

## Điều kiện tiên quyết
- Admin đã đăng nhập hệ thống
- Có dữ liệu để hiển thị (ít nhất 1 phiếu hoặc giao dịch)

## Điều kiện hậu quả
- Admin nắm được tình trạng hiện tại của hệ thống
- Có thể đưa ra quyết định dựa trên dữ liệu
- Phát hiện kịp thời các vấn đề cần xử lý

## Luồng chính
1. Admin truy cập trang Dashboard
2. Xem các chỉ số tổng quan (tổng phiếu, doanh thu, etc.)
3. Xem trạng thái các phiếu đang xử lý
4. Kiểm tra cảnh báo và thông báo quan trọng
5. Xem biểu đồ thống kê theo thời gian
6. Xuất báo cáo nếu cần

## Luồng thay thế
### Xem chi tiết phiếu
1. Click vào phiếu cụ thể trên dashboard
2. Xem thông tin chi tiết và lịch sử
3. Thực hiện hành động nếu cần (phân công, cập nhật)

### Giám sát nhân viên
1. Xem hiệu suất từng nhân viên
2. Xem số phiếu đang xử lý
3. Xem điểm mạnh/yếu của từng người

## Luồng ngoại lệ
### Không có dữ liệu
1. Hệ thống hiển thị trạng thái trống
2. Đề nghị tạo phiếu đầu tiên hoặc kiểm tra cấu hình
3. Hiển thị hướng dẫn sử dụng dashboard