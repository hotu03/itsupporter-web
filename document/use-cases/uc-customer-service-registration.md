# UC-004 - Khách hàng đăng ký dịch vụ sửa chữa

## Mô tả
Quy trình đăng ký dịch vụ sửa chữa trực tuyến dành riêng cho khách hàng đã có tài khoản, cho phép theo dõi và quản lý phiếu dễ dàng hơn.

## Actor chính
Khách hàng (đã đăng nhập)

## Actor phụ
Tester hoặc Admin (phê duyệt đăng ký)

## Điều kiện tiên quyết
- Khách hàng đã đăng nhập thành công
- Có thiết bị cần sửa chữa
- Hệ thống đăng ký trực tuyến hoạt động
- Khách hàng có thông tin cá nhân đầy đủ trong hệ thống

## Điều kiện hậu quả
- Phiếu yêu cầu sửa chữa được tạo với trạng thái "online"
- Thông tin khách hàng tự động điền từ tài khoản
- Khách hàng nhận mã QR để theo dõi
- Phiếu chờ phê duyệt chuyển thành phiếu chính thức
- Lịch sử đăng ký được lưu trữ trong tài khoản

## Luồng chính
1. Khách hàng chọn "Đăng ký sửa chữa" từ menu cổng thông tin
2. Hệ thống tự động điền thông tin cá nhân từ tài khoản
3. Khách hàng mô tả chi tiết thiết bị và vấn đề cần sửa
4. Chọn loại dịch vụ sửa chữa từ danh sách có sẵn
5. Chọn thời gian hẹn mong muốn (có kiểm tra lịch trống)
6. Upload hình ảnh thiết bị (tùy chọn)
7. Xem ước tính chi phí và điểm thưởng sẽ nhận
8. Xác nhận và submit đăng ký
9. Hệ thống tạo mã QR và gửi thông báo
10. Khách hàng có thể theo dõi trạng thái ngay lập tức

## Luồng thay thế - Sử dụng mã giảm giá
1. Khách hàng nhập mã giảm giá nếu có
2. Hệ thống kiểm tra tính hợp lệ và quyền sử dụng
3. Áp dụng giảm giá vào ước tính chi phí
4. Cập nhật điểm thưởng sẽ nhận
5. Tiếp tục với luồng chính

## Luồng thay thế - Đăng ký khẩn cấp
1. Khách hàng chọn tùy chọn "sửa khẩn cấp"
2. Hệ thống ưu tiên xử lý (bỏ qua phê duyệt thông thường)
3. Phí dịch vụ có thể cao hơn mức chuẩn
4. Thời gian xử lý được đảm bảo trong 24h
5. Thông báo ưu tiên gửi đến đội ngũ kỹ thuật

## Luồng thay thế - Thiết bị đã sửa trước đó
1. Khách hàng chọn từ lịch sử thiết bị đã sửa
2. Hệ thống tự động điền thông tin thiết bị cũ
3. Khách hàng cập nhật tình trạng hiện tại
4. Có thể chọn "bảo hành" nếu còn thời hạn
5. Ưu tiên xử lý cho khách hàng cũ

## Luồng ngoại lệ - Form thiếu thông tin
1. Hệ thống kiểm tra các trường bắt buộc
2. Hiển thị lỗi và đánh dấu các trường thiếu
3. Khách hàng bổ sung thông tin còn thiếu
4. Cho phép lưu bản nháp để hoàn thành sau

## Luồng ngoại lệ - Lịch hẹn không khả dụng
1. Hệ thống kiểm tra lịch trình kỹ thuật viên
2. Đề xuất các thời gian trống gần nhất
3. Khách hàng chọn thời gian phù hợp
4. Hoặc chọn "sửa khẩn cấp" nếu cần gấp

## Luồng ngoại lệ - Mã giảm giá không hợp lệ
1. Khách hàng nhập mã giảm giá
2. Hệ thống kiểm tra và từ chối
3. Hiển thị lý do (hết hạn, đã sử dụng, không đủ điều kiện)
4. Đề xuất các mã giảm giá khả dụng khác
5. Cho phép tiếp tục mà không dùng mã

## Luồng ngoại lệ - Vượt quá giới hạn đăng ký
1. Khách hàng có nhiều phiếu đang chờ xử lý
2. Hệ thống giới hạn số phiếu đồng thời (tối đa 3)
3. Hiển thị thông báo và đề nghị hoàn thành phiếu cũ trước
4. Cho phép hủy phiếu cũ hoặc liên hệ trực tiếp

## Điểm quyết định
- **Thông tin không đầy đủ**: Hiển thị form lỗi và yêu cầu bổ sung
- **Lịch hẹn không khả dụng**: Đề xuất thời gian thay thế
- **Mã giảm giá không hợp lệ**: Tiếp tục không áp dụng giảm giá
- **Thiết bị không hỗ trợ**: Thông báo và đề xuất phương án thay thế
- **Khẩn cấp**: Ưu tiên xử lý với phí cao hơn

## Xử lý ngoại lệ
- **Mất kết nối**: Lưu bản nháp tự động và cho phép tiếp tục sau
- **Hệ thống lỗi**: Thông báo và đề nghị thử lại sau 5 phút
- **Thiết bị không thể sửa**: Thông báo và hoàn tiền phí đăng ký
- **Thay đổi yêu cầu**: Cho phép chỉnh sửa phiếu trong vòng 30 phút</content>
</xai:function_call">Create the customer service registration use case with comprehensive flows