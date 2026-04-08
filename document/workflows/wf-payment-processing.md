# WF-004 - Quy trình xử lý thanh toán

## Mô tả
Quy trình tính toán chi phí, xử lý thanh toán và tích điểm thưởng cho khách hàng sau khi sửa chữa hoàn thành.

## Điều kiện kích hoạt
- Phiếu sửa chữa đã hoàn thành P4 (kiểm tra chất lượng passed)
- Khách hàng có mặt tại cửa hàng để nhận máy
- Tất cả dịch vụ đã được thực hiện xong

## Các bước thực hiện

### Bước 1: Tính toán chi phí
**Người thực hiện:** Hệ thống tự động + Admin
**Thời gian dự kiến:** 2-3 phút

**Hành động:**
1. Hệ thống tự động tính tổng chi phí dịch vụ
2. Áp dụng mã giảm giá nếu khách hàng cung cấp
3. Tính thuế phí (nếu có)
4. Hiển thị chi tiết hóa đơn cho khách hàng
5. Admin kiểm tra và xác nhận tính toán

**Đầu ra:**
- Bảng chi tiết chi phí từng hạng mục
- Tổng tiền sau giảm giá
- Hóa đơn tạm thời

### Bước 2: Xử lý thanh toán
**Người thực hiện:** Admin + Khách hàng
**Thời gian dự kiến:** 3-5 phút

**Hành động:**
1. Khách hàng chọn phương thức thanh toán
2. Xử lý thanh toán (tiền mặt/thẻ chuyển khoản)
3. In hóa đơn chính thức
4. Thu chữ ký điện tử xác nhận
5. Cập nhật trạng thái thanh toán

**Đầu ra:**
- Hóa đơn có chữ ký xác nhận
- Biên lai thanh toán
- Cập nhật trạng thái phiếu

### Bước 3: Tích điểm thưởng
**Người thực hiện:** Hệ thống tự động
**Thời gian dự kiến:** < 1 phút

**Hành động:**
1. Tính điểm thưởng dựa trên quy tắc
2. Cộng điểm vào tài khoản khách hàng
3. Ghi nhận lịch sử tích điểm
4. Hiển thị thông báo điểm thưởng
5. Gửi SMS xác nhận (nếu có)

**Đầu ra:**
- Cập nhật số dư điểm khách hàng
- Lịch sử giao dịch điểm
- Thông báo điểm thưởng nhận được

## Điểm quyết định
- **Giảm giá**: Nếu khách hàng có mã hợp lệ → Áp dụng
- **Thanh toán**: Nếu đủ tiền → Hoàn tất; nếu thiếu → Ghi nợ hoặc hẹn sau
- **Điểm thưởng**: Luôn tích nếu đơn hàng đủ điều kiện

## Xử lý ngoại lệ
- **Lỗi tính toán**: Admin điều chỉnh thủ công và giải thích
- **Thanh toán thất bại**: Kiểm tra phương thức, thử lại hoặc đổi phương thức
- **Mất hóa đơn**: In lại với ghi chú bổ sung
- **Khách hàng đổi ý**: Hủy giao dịch và cập nhật trạng thái phiếu