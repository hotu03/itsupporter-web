# UC-001 - Đăng ký yêu cầu sửa chữa

## Mô tả
Quy trình đăng ký thiết bị cần sửa chữa vào hệ thống, có thể thực hiện trực tuyến hoặc tại quầy.

## Actor chính
Khách hàng (trực tuyến) hoặc Tester (tại quầy)

## Actor phụ
Admin hoặc Tester (phê duyệt đăng ký trực tuyến)

## Điều kiện tiên quyết
- Khách hàng có thiết bị cần sửa chữa
- Hệ thống hoạt động bình thường
- (Đối với trực tuyến) Khách hàng truy cập được trang đăng ký

## Điều kiện hậu quả
- Phiếu yêu cầu sửa chữa được tạo trong hệ thống
- Thông tin khách hàng và thiết bị được lưu trữ
- Trạng thái phiếu là WAITING

## Luồng chính
1. Khách hàng/Tester nhập thông tin cá nhân (tên, số điện thoại)
2. Nhập thông tin thiết bị (loại máy, tình trạng, vấn đề)
3. Chọn dịch vụ sửa chữa bổ sung nếu có
4. Xác nhận thông tin và tạo phiếu
5. Hệ thống tạo mã phiếu duy nhất
6. Hiển thị thông tin phiếu cho khách hàng

## Luồng thay thế
### Đăng ký trực tuyến
1. Khách hàng truy cập `/dang-ky-dich-vu`
2. Điền form đăng ký với thông tin đầy đủ
3. Chọn thời gian hẹn (nếu có)
4. Submit form
5. Nhận mã QR để theo dõi
6. Phiếu chuyển sang trạng thái "online" chờ phê duyệt

### Tại quầy với khách hàng cũ
1. Tester quét số điện thoại khách hàng
2. Hệ thống tự động điền thông tin từ lịch sử
3. Xác nhận/cập nhật thông tin nếu cần
4. Tiếp tục với luồng chính từ bước 2

## Luồng ngoại lệ
### Thiếu thông tin bắt buộc
1. Hệ thống hiển thị lỗi và yêu cầu nhập đầy đủ
2. Người dùng bổ sung thông tin còn thiếu
3. Tiếp tục quy trình

### Hệ thống lỗi
1. Thông báo lỗi cho người dùng
2. Đề nghị thử lại sau
3. Ghi log lỗi để Admin xử lý