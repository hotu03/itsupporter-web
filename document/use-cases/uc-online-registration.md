# UC-008 - Đăng ký dịch vụ trực tuyến

## Mô tả
Khách hàng tự đăng ký dịch vụ sửa chữa qua website mà không cần đến trực tiếp.

## Actor chính
Khách hàng

## Actor phụ
Admin (phê duyệt đăng ký)

## Điều kiện tiên quyết
- Khách hàng truy cập được website
- Hệ thống đăng ký trực tuyến hoạt động
- Khách hàng có thông tin thiết bị cơ bản

## Điều kiện hậu quả
- Yêu cầu đăng ký được tạo với trạng thái "online"
- Khách hàng nhận mã QR để theo dõi
- Phiếu chờ Admin phê duyệt chuyển thành phiếu chính thức

## Luồng chính
1. Khách hàng truy cập `/dang-ky-dich-vu`
2. Điền thông tin cá nhân (tên, số điện thoại, email)
3. Mô tả thiết bị và vấn đề cần sửa
4. Chọn dịch vụ bổ sung nếu biết
5. Chọn thời gian hẹn (nếu có)
6. Submit form đăng ký
7. Nhận mã QR và hướng dẫn mang máy đến cửa hàng

## Luồng thay thế
### Đăng ký với mã giảm giá
1. Khách hàng nhập mã giảm giá nếu có
2. Hệ thống kiểm tra tính hợp lệ
3. Áp dụng giảm giá vào ước tính chi phí
4. Tiếp tục đăng ký

### Đăng ký khẩn cấp
1. Khách hàng chọn tùy chọn "khẩn cấp"
2. Hệ thống ưu tiên xử lý
3. Phí dịch vụ có thể cao hơn

## Luồng ngoại lệ
### Form không đầy đủ
1. Hệ thống kiểm tra các trường bắt buộc
2. Hiển thị lỗi và yêu cầu điền đầy đủ
3. Khách hàng bổ sung thông tin

### Lịch hẹn không khả dụng
1. Hệ thống kiểm tra lịch trình
2. Đề xuất thời gian thay thế
3. Khách hàng chọn thời gian phù hợp