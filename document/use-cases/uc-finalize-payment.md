# UC-004 - Hoàn tất thanh toán và bàn giao

## Mô tả
Tính toán chi phí cuối cùng, xử lý thanh toán và bàn giao thiết bị cho khách hàng.

## Actor chính
Admin

## Actor phụ
Khách hàng (thanh toán và ký xác nhận)

## Điều kiện tiên quyết
- Phiếu đã hoàn thành P4 (kiểm tra chất lượng passed)
- Tất cả dịch vụ đã được thực hiện
- Khách hàng có mặt tại cửa hàng

## Điều kiện hậu quả
- Thanh toán được xử lý thành công
- Điểm thưởng được tích tự động
- Thiết bị được bàn giao với hóa đơn
- Lịch sử giao dịch được lưu trữ

## Luồng chính
1. Admin mở phiếu ở giai đoạn P5
2. Hệ thống tự động tính tổng chi phí (dịch vụ + giảm giá)
3. Áp dụng mã giảm giá nếu khách hàng có
4. Tính điểm thưởng tích lũy
5. Hiển thị hóa đơn chi tiết cho khách hàng
6. Xử lý thanh toán (tiền mặt/thẻ)
7. Thu chữ ký điện tử xác nhận
8. Cập nhật trạng thái phiếu thành COMPLETE
9. Tự động cộng điểm cho khách hàng
10. In/bán giao hóa đơn và thiết bị

## Luồng thay thế
### Thanh toán bằng điểm thưởng
1. Khách hàng chọn sử dụng điểm để giảm giá
2. Hệ thống kiểm tra đủ điểm và áp dụng
3. Giảm số điểm tương ứng
4. Tiếp tục với luồng chính

### Thanh toán chưa đủ
1. Khách hàng thanh toán một phần
2. Admin cập nhật trạng thái "pending" với ghi chú
3. Hẹn lịch thanh toán phần còn lại
4. Phiếu ở trạng thái đặc biệt chờ thanh toán

## Luồng ngoại lệ
### Lỗi tính toán
1. Hệ thống phát hiện sai sót trong tính toán
2. Admin kiểm tra và điều chỉnh thủ công
3. Xác nhận lại với khách hàng trước khi thanh toán

### Khách hàng từ chối thanh toán
1. Khách hàng không đồng ý với chi phí
2. Admin giải thích chi tiết các hạng mục
3. Điều chỉnh giảm giá nếu phù hợp
4. Hoặc hủy giao dịch nếu không thống nhất