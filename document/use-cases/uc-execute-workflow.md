# UC-002 - Thực hiện quy trình sửa chữa 5 giai đoạn

## Mô tả
Thực hiện đầy đủ quy trình sửa chữa thiết bị theo 5 giai đoạn từ P1 đến P5 với sự tham gia của nhiều actor.

## Actor chính
Admin (điều phối), Tester (P1-P2, P4), Kỹ thuật viên (P3)

## Actor phụ
Khách hàng (cung cấp thông tin và xác nhận)

## Điều kiện tiên quyết
- Phiếu yêu cầu sửa chữa đã được tạo
- Có ít nhất 1 nhân viên active cho mỗi vai trò cần thiết
- Thiết bị có mặt tại cửa hàng

## Điều kiện hậu quả
- Thiết bị được sửa chữa hoàn chỉnh
- Tất cả checklist được hoàn thành
- Khách hàng đã thanh toán và nhận máy
- Điểm thưởng được tích tự động

## Luồng chính
1. **P1**: Tester thu thập thông tin và tạo phiếu chi tiết
2. **P2**: Tester thực hiện test sơ bộ và tạo checklist ban đầu
3. **P3**: Admin phân công → Kỹ thuật viên thực hiện sửa chữa
4. **P4**: Admin phân công → Tester kiểm tra chất lượng
5. **P5**: Admin xác nhận hoàn thành, tính tiền và trao trả thiết bị

## Luồng thay thế
### Phiếu từ đăng ký trực tuyến
1. Admin phê duyệt phiếu "online" chuyển thành phiếu chính thức
2. Tiếp tục với luồng chính từ P1

### Cần linh kiện bổ sung
1. Trong P3, Kỹ thuật viên yêu cầu linh kiện
2. Admin xác nhận và cung cấp linh kiện
3. Kỹ thuật viên tiếp tục công việc
4. Thời gian sửa chữa có thể延长

### Phát hiện lỗi trong P4
1. Tester từ chối phiếu với lý do cụ thể
2. Admin phân công lại cho Kỹ thuật viên sửa lỗi
3. Quay lại P3 với ghi chú bổ sung

## Luồng ngoại lệ
### Thiếu nhân sự
1. Admin nhận thông báo không có nhân viên phù hợp
2. Admin kích hoạt nhân viên inactive hoặc điều chuyển công việc
3. Tiếp tục quy trình sau khi có nhân sự

### Khách hàng hủy phiếu
1. Khách hàng yêu cầu hủy trong bất kỳ giai đoạn nào
2. Admin xác nhận hủy và cập nhật trạng thái
3. Ngừng tất cả công việc đang thực hiện

### Thiết bị không thể sửa
1. Kỹ thuật viên xác định thiết bị không thể sửa được
2. Admin thông báo cho khách hàng về tình trạng
3. Phiếu chuyển sang trạng thái đặc biệt với ghi chú