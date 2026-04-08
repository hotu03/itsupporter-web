# WF-002 - Quy trình đăng ký trực tuyến

## Mô tả
Quy trình cho phép khách hàng tự đăng ký dịch vụ sửa chữa qua website, giảm thời gian chờ đợi tại quầy.

## Điều kiện kích hoạt
- Khách hàng truy cập website và chọn đăng ký dịch vụ
- Khách hàng có thiết bị cần sửa chữa
- Hệ thống đăng ký trực tuyến hoạt động

## Các bước thực hiện

### Bước 1: Truy cập và điền thông tin
**Người thực hiện:** Khách hàng
**Thời gian dự kiến:** 5-10 phút

**Hành động:**
1. Truy cập trang `/dang-ky-dich-vu`
2. Đọc hướng dẫn và yêu cầu cần thiết
3. Điền thông tin cá nhân (tên, số điện thoại, email)
4. Mô tả chi tiết thiết bị và vấn đề
5. Chọn loại dịch vụ sửa chữa cơ bản
6. Chọn thời gian hẹn mong muốn

**Đầu ra:**
- Form đăng ký với thông tin đầy đủ
- Mã đăng ký tạm thời

### Bước 2: Xử lý đăng ký
**Người thực hiện:** Hệ thống tự động
**Thời gian dự kiến:** < 1 phút

**Hành động:**
1. Kiểm tra tính hợp lệ của thông tin
2. Tạo mã đăng ký duy nhất
3. Lưu thông tin vào cơ sở dữ liệu tạm thời
4. Gửi SMS xác nhận với mã QR
5. Gửi email hướng dẫn (nếu có email)

**Đầu ra:**
- Mã QR để theo dõi trạng thái
- Thông tin xác nhận qua SMS
- Hướng dẫn mang máy đến cửa hàng

### Bước 3: Phê duyệt tại quầy
**Người thực hiện:** Tester + Admin
**Thời gian dự kiến:** 5-10 phút

**Hành động:**
1. Khách hàng đến cửa hàng với mã QR
2. Tester quét mã QR hoặc nhập mã đăng ký
3. Hệ thống tải thông tin đăng ký trực tuyến
4. Kiểm tra thông tin và xác minh thiết bị thực tế
5. Admin phê duyệt chuyển thành phiếu chính thức
6. Tester tiếp tục với quy trình P1 thông thường

**Đầu ra:**
- Phiếu sửa chữa chính thức
- Thông tin khách hàng được xác nhận
- Quy trình chuyển sang WF-001 (5 giai đoạn)

## Điểm quyết định
- **Thông tin không khớp**: Nếu thông tin đăng ký không khớp với thiết bị thực tế → Yêu cầu cập nhật
- **Không thể sửa**: Nếu đánh giá sơ bộ không thể sửa chữa → Thông báo và hủy đăng ký
- **Lịch hẹn**: Nếu thời gian yêu cầu không khả dụng → Đề xuất thời gian thay thế

## Xử lý ngoại lệ
- **Mã QR không hợp lệ**: Yêu cầu nhập lại thông tin hoặc tạo đăng ký mới
- **Hệ thống lỗi**: Thông báo khách hàng thử lại sau hoặc đến trực tiếp
- **Quá hạn**: Đăng ký trực tuyến có hạn sử dụng, quá hạn phải đăng ký lại