# UC-003 - Cập nhật trạng thái phiếu sửa chữa

## Mô tả
Cập nhật tiến độ công việc và trạng thái phiếu trong quy trình sửa chữa.

## Actor chính
Tester, Kỹ thuật viên

## Actor phụ
Admin (giám sát và can thiệp nếu cần)

## Điều kiện tiên quyết
- Phiếu đang trong quy trình sửa chữa (từ P2 trở đi)
- Người dùng có quyền truy cập phiếu đang xử lý

## Điều kiện hậu quả
- Trạng thái phiếu được cập nhật chính xác
- Lịch sử thay đổi được lưu trữ
- Các actor liên quan nhận thông báo tự động

## Luồng chính
1. Mở phiếu đang xử lý trong giai đoạn hiện tại
2. Hoàn thành checklist bắt buộc cho giai đoạn
3. Thêm ghi chú chi tiết về công việc đã thực hiện
4. Cập nhật trạng thái phiếu (nếu đủ điều kiện)
5. Lưu thay đổi
6. Hệ thống chuyển phiếu sang giai đoạn tiếp theo

## Luồng thay thế
### Cập nhật mà không chuyển giai đoạn
1. Thêm thông tin bổ sung vào phiếu
2. Cập nhật checklist một phần
3. Lưu thay đổi mà không chuyển trạng thái
4. Phiếu vẫn ở giai đoạn hiện tại

### Yêu cầu hỗ trợ từ Admin
1. Thêm ghi chú yêu cầu hỗ trợ
2. Gửi thông báo cho Admin
3. Admin can thiệp và hướng dẫn tiếp tục

## Luồng ngoại lệ
### Thiếu thông tin bắt buộc
1. Hệ thống từ chối lưu thay đổi
2. Hiển thị danh sách thông tin còn thiếu
3. Người dùng bổ sung thông tin và thử lại