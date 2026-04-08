# Tester

## Mô tả tổng quan
Tester là nhân viên đa nhiệm, chịu trách nhiệm từ việc tiếp nhận khách hàng, kiểm tra thiết bị ban đầu, thực hiện sửa chữa, kiểm tra chất lượng cho đến phê duyệt đăng ký trực tuyến và bàn giao thiết bị cuối cùng.

## Trách nhiệm chính
- Tiếp nhận khách hàng đến trực tiếp tại quầy
- Thu thập thông tin cá nhân của khách hàng (tên, số điện thoại)
- Ghi nhận thông tin thiết bị và tình trạng ban đầu
- Kiểm tra bảo hành và các yêu cầu sửa chữa
- Tạo phiếu yêu cầu sửa chữa trong hệ thống (P1)
- Thực hiện các bài test cơ bản và tạo checklist ban đầu (P2)
- Phê duyệt đăng ký trực tuyến chuyển thành phiếu chính thức
- Thực hiện các công việc sửa chữa cơ bản nếu được đào tạo
- Nhận phiếu để kiểm tra chất lượng sau sửa chữa (P4)
- Thực hiện test toàn diện trên thiết bị đã sửa
- Xác minh tất cả yêu cầu sửa chữa đã hoàn thành
- Tạo checklist kiểm tra sau sửa chữa
- Báo cáo kết quả kiểm tra cho Admin
- Từ chối phiếu nếu phát hiện lỗi cần sửa lại

## Quyền hạn và truy cập
- Quyền truy cập đầy đủ trang Machines để tạo và chỉnh sửa phiếu
- Quyền tạo phiếu mới với trạng thái WAITING
- Quyền cập nhật thông tin khách hàng và thiết bị
- Quyền xem danh sách phiếu chờ xử lý
- Quyền phê duyệt đăng ký trực tuyến
- Quyền xem phiếu trong giai đoạn kiểm tra (RETESTING)
- Quyền cập nhật checklist kiểm tra sau sửa chữa
- Quyền thêm ghi chú về kết quả test
- Quyền từ chối phiếu nếu không đạt chất lượng
- Quyền thực hiện sửa chữa cơ bản (nếu được phân công)
- Không có quyền phân công nhân sự hoặc xác nhận hoàn thành cuối cùng

## Tham gia quy trình
- **P1 - Thu thập thông tin**: Tạo phiếu và nhập dữ liệu ban đầu
- **P2 - Kiểm tra sơ bộ**: Thực hiện test cơ bản và tạo checklist
- **P3 - Thực hiện sửa chữa**: Có thể tham gia sửa chữa cơ bản
- **P4 - Kiểm tra chất lượng**: Thực hiện test toàn diện và xác minh
- **Quy trình phê duyệt**: Phê duyệt đăng ký trực tuyến tại quầy
- **Quy trình chuyển giao**: Báo cáo kết quả cho Admin quyết định

## Tương tác với actor khác
- **Khách hàng**: Thu thập thông tin trực tiếp, giải thích quy trình, bàn giao thiết bị
- **Admin**: Chuyển giao phiếu đã tạo, nhận phân công kiểm tra, báo cáo kết quả
- **Kỹ thuật viên**: Phối hợp trong quá trình sửa chữa, kiểm tra công việc đã thực hiện
- **Tester khác**: Phối hợp khi cần hỗ trợ

## Yêu cầu hệ thống
- Giao diện tạo phiếu nhanh và dễ sử dụng
- Tự động tạo mã phiếu duy nhất
- Hỗ trợ scan QR code từ đăng ký trực tuyến
- Lưu trữ thông tin khách hàng tự động cho lần sau
- Template checklist kiểm tra cho từng loại thiết bị
- Hỗ trợ ghi chú chi tiết về lỗi phát hiện
- Chức năng từ chối phiếu với lý do cụ thể
- Lưu trữ lịch sử kiểm tra để theo dõi chất lượng
- Thông báo tự động khi có phiếu cần kiểm tra
- Công cụ phê duyệt đăng ký trực tuyến</content>
</xai:function_call">Create the merged Tester role combining both internal and external tester responsibilities, plus online registration approval permission