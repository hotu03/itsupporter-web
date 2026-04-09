# UC-003 - Chức năng cổng thông tin khách hàng

## Mô tả
Quy trình quản lý và theo dõi các dịch vụ sửa chữa, điểm thưởng và thông tin cá nhân của khách hàng sau khi đăng nhập.

## Actor chính
Khách hàng (đã đăng nhập)

## Actor phụ
Hệ thống (cung cấp dữ liệu và xử lý yêu cầu)

## Điều kiện tiên quyết
- Khách hàng đã đăng nhập thành công
- Có ít nhất một phiếu sửa chữa trong lịch sử
- Hệ thống hoạt động bình thường

## Điều kiện hậu quả
- Khách hàng xem được thông tin cá nhân và lịch sử
- Có thể quản lý điểm thưởng và đổi quà
- Theo dõi được tiến độ sửa chữa realtime

## Luồng chính - Xem dashboard tổng quan
1. Khách hàng truy cập trang chủ sau đăng nhập
2. Hệ thống hiển thị dashboard với:
   - Thông tin cá nhân cơ bản
   - Số điểm thưởng hiện có
   - Danh sách phiếu đang xử lý
   - Thống kê sửa chữa (tổng số lần, chi phí)
3. Khách hàng có thể tương tác với các widget

## Luồng thay thế - Quản lý thông tin cá nhân
1. Khách hàng chọn "Thông tin cá nhân" từ menu
2. Hiển thị form với thông tin hiện tại
3. Khách hàng cập nhật thông tin (tên, số điện thoại, email)
4. Lưu thay đổi
5. Hiển thị thông báo cập nhật thành công

## Luồng thay thế - Theo dõi phiếu sửa chữa
1. Khách hàng chọn "Lịch sử sửa chữa" từ menu
2. Hiển thị danh sách tất cả phiếu (đã hoàn thành + đang xử lý)
3. Mỗi phiếu hiển thị:
   - Mã phiếu và trạng thái
   - Thời gian tạo và hoàn thành
   - Chi phí và điểm tích lũy
   - Thông tin thiết bị
   - Link xem chi tiết
4. Khách hàng có thể lọc theo trạng thái hoặc thời gian

## Luồng thay thế - Xem chi tiết phiếu
1. Khách hàng chọn một phiếu từ danh sách
2. Hiển thị thông tin chi tiết:
   - Thông tin khách hàng và thiết bị
   - Danh sách dịch vụ đã thực hiện
   - Hình ảnh trước và sau sửa chữa
   - Hóa đơn thanh toán
   - Điểm đã tích lũy
   - Ghi chú từ kỹ thuật viên và admin
3. Khách hàng có thể tải xuống hóa đơn PDF

## Luồng thay thế - Quản lý điểm thưởng
1. Khách hàng chọn "Điểm thưởng" từ menu
2. Hiển thị:
   - Số điểm hiện có
   - Lịch sử tích/tiêu điểm
   - Các mã giảm giá có thể đổi
3. Khách hàng chọn mã giảm giá muốn đổi
4. Xác nhận đổi điểm
5. Hệ thống trừ điểm và gửi mã giảm giá về email

## Luồng thay thế - Đặt lịch hẹn lại
1. Khách hàng chọn phiếu đã hoàn thành
2. Chọn "Đặt lịch sửa chữa lại"
3. Hiển thị form đăng ký mới với thông tin tự động điền
4. Khách hàng có thể chỉnh sửa thông tin nếu cần
5. Submit để tạo phiếu mới
6. Hệ thống ưu tiên xử lý cho khách hàng cũ

## Luồng ngoại lệ - Không có phiếu nào
1. Khách hàng mới đăng nhập lần đầu
2. Hệ thống hiển thị trang chào mừng
3. Đề nghị đăng ký dịch vụ sửa chữa đầu tiên
4. Hướng dẫn cách sử dụng cổng thông tin

## Luồng ngoại lệ - Điểm không đủ để đổi
1. Khách hàng chọn mã giảm giá
2. Hệ thống kiểm tra số điểm
3. Nếu không đủ, hiển thị thông báo và đề xuất mã khác
4. Cho phép xem các mã có thể đổi với điểm hiện có</content>
</xai:function_call">Create the customer portal use case covering all functionalities after login