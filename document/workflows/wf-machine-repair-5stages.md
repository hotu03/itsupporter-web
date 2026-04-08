# WF-001 - Quy trình sửa chữa thiết bị 5 giai đoạn

## Mô tả
Quy trình hoàn chỉnh để sửa chữa thiết bị từ lúc tiếp nhận đến khi bàn giao, chia thành 5 giai đoạn với sự tham gia của nhiều bộ phận.

## Điều kiện kích hoạt
- Khách hàng mang thiết bị đến cửa hàng
- Hoặc Admin phê duyệt đăng ký trực tuyến

## Các bước thực hiện

### Bước 1: Thu thập thông tin (P1)
**Người thực hiện:** Tester
**Thời gian dự kiến:** 10-15 phút

**Hành động:**
1. Tiếp nhận khách hàng và thiết bị
2. Thu thập thông tin cá nhân (tên, số điện thoại)
3. Ghi nhận thông tin thiết bị (loại máy, cấu hình, tình trạng)
4. Kiểm tra bảo hành và các yêu cầu sửa chữa
5. Chọn dịch vụ bổ sung nếu khách hàng yêu cầu
6. Tạo phiếu yêu cầu trong hệ thống
7. In phiếu xác nhận cho khách hàng

**Đầu ra:**
- Phiếu yêu cầu với mã duy nhất
- Thông tin khách hàng và thiết bị đầy đủ
- Danh sách dịch vụ cần thực hiện

### Bước 2: Kiểm tra sơ bộ (P2)
**Người thực hiện:** Tester
**Thời gian dự kiến:** 20-30 phút

**Hành động:**
1. Mở phiếu đã tạo ở P1
2. Thực hiện các bài test cơ bản
3. Tạo checklist kiểm tra ban đầu
4. Ghi nhận các vấn đề phát hiện được
5. Chụp ảnh thiết bị nếu cần
6. Thêm ghi chú chi tiết về tình trạng
7. Cập nhật trạng thái phiếu

**Đầu ra:**
- Checklist kiểm tra ban đầu
- Báo cáo tình trạng thiết bị
- Hình ảnh minh họa (nếu có)

### Bước 3: Thực hiện sửa chữa (P3)
**Người thực hiện:** Admin (phân công) → Kỹ thuật viên (thực hiện)
**Thời gian dự kiến:** 30 phút - vài giờ (tùy độ phức tạp)

**Hành động:**
1. Admin phân công Kỹ thuật viên phù hợp
2. Kỹ thuật viên nhận phiếu và xem yêu cầu
3. Chuẩn bị dụng cụ và linh kiện cần thiết
4. Thực hiện các công việc sửa chữa
5. Cập nhật checklist kỹ thuật chi tiết
6. Thêm ghi chú về quá trình sửa chữa
7. Báo cáo hoàn thành cho Admin

**Đầu ra:**
- Checklist kỹ thuật đã hoàn thành
- Báo cáo chi tiết công việc đã thực hiện
- Hình ảnh quá trình sửa chữa (nếu có)

### Bước 4: Kiểm tra chất lượng (P4)
**Người thực hiện:** Admin (phân công) → Tester (thực hiện)
**Thời gian dự kiến:** 15-30 phút

**Hành động:**
1. Admin phân công Tester
2. Tester thực hiện test toàn diện
3. Xác minh tất cả yêu cầu đã hoàn thành
4. Tạo checklist kiểm tra sau sửa chữa
5. Ghi nhận kết quả test chi tiết
6. Chụp ảnh thiết bị sau sửa chữa
7. Báo cáo kết quả cho Admin

**Đầu ra:**
- Checklist kiểm tra chất lượng
- Báo cáo test chi tiết
- Hình ảnh thiết bị sau sửa chữa

### Bước 5: Xác nhận hoàn thành (P5)
**Người thực hiện:** Admin
**Thời gian dự kiến:** 10-15 phút

**Hành động:**
1. Admin xem xét tất cả báo cáo từ P1-P4
2. Tính toán chi phí cuối cùng
3. Áp dụng giảm giá nếu có
4. Tính điểm thưởng tích lũy
5. Chuẩn bị hóa đơn chi tiết
6. Thu thanh toán từ khách hàng
7. Thu chữ ký điện tử xác nhận
8. Bàn giao thiết bị và hóa đơn
9. Cập nhật trạng thái hoàn thành

**Đầu ra:**
- Hóa đơn thanh toán chi tiết
- Biên nhận có chữ ký
- Thiết bị đã được sửa chữa
- Cập nhật điểm thưởng cho khách hàng

## Điểm quyết định
- **Sau P4**: Nếu test thất bại → Quay lại P3 với ghi chú sửa lỗi
- **Thanh toán**: Nếu khách hàng không đồng ý chi phí → Thỏa thuận lại hoặc hủy
- **Điểm thưởng**: Tự động tính dựa trên quy tắc có sẵn

## Xử lý ngoại lệ
- **Thiếu linh kiện**: Tạm dừng và chờ cung cấp, thông báo khách hàng
- **Không thể sửa**: Thông báo khách hàng và đề xuất phương án thay thế
- **Khách hàng hủy**: Ngừng quy trình và cập nhật trạng thái
- **Lỗi hệ thống**: Sao lưu dữ liệu và khôi phục từ checkpoint cuối