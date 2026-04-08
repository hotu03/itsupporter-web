# Khách hàng (Customer)

## Mô tả tổng quan
Khách hàng là người dùng bên ngoài mang thiết bị đến cửa hàng để sửa chữa. Họ có thể đăng ký dịch vụ trực tuyến hoặc đến trực tiếp tại quầy.

## Trách nhiệm chính
- Đăng ký dịch vụ sửa chữa trực tuyến qua trang `/dang-ky-dich-vu`
- Cung cấp thông tin cá nhân và thông tin thiết bị
- Nhận SMS thông báo về tiến độ sửa chữa
- Thanh toán chi phí dịch vụ
- Nhận và đổi điểm thưởng tích lũy
- Ký xác nhận điện tử khi hoàn thành sửa chữa

## Quyền hạn và truy cập
- Truy cập trang đăng ký dịch vụ trực tuyến
- Xem trạng thái đơn hàng của mình (nếu có hệ thống tra cứu)
- Nhận thông báo SMS về tiến độ
- Thanh toán hóa đơn tại quầy
- Đổi điểm thưởng lấy mã giảm giá

## Tham gia quy trình
- **Quy trình đăng ký trực tuyến**: Khởi tạo yêu cầu sửa chữa từ xa
- **Quy trình thanh toán**: Cung cấp phương thức thanh toán và xác nhận
- **Quy trình tích điểm**: Nhận điểm thưởng tự động sau khi thanh toán

## Tương tác với actor khác
- **Tester**: Giao tiếp trực tiếp tại quầy để cung cấp thông tin thiết bị
- **Admin**: Nhận xác nhận hoàn thành và ký điện tử
- **Hệ thống**: Nhận thông báo SMS và email về tiến độ

## Yêu cầu hệ thống
- Giao diện đăng ký trực tuyến thân thiện
- Hệ thống thông báo SMS tự động
- Tích hợp chữ ký điện tử
- Lưu trữ lịch sử sửa chữa và điểm thưởng