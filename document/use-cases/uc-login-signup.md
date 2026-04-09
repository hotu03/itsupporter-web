# UC-002 - Đăng nhập và Đăng ký thành viên

## Mô tả
Quy trình xác thực và đăng ký tài khoản cho thành viên hệ thống và khách hàng đã đăng ký.

## Actor chính
Thành viên (đăng nhập/đăng ký) hoặc Khách hàng (đăng nhập)

## Actor phụ
Admin (phê duyệt đăng ký thành viên)

## Điều kiện tiên quyết
- Người dùng truy cập được trang đăng nhập
- (Đối với đăng ký) Thông tin cá nhân đầy đủ và hợp lệ
- Hệ thống xác thực hoạt động bình thường

## Điều kiện hậu quả
- Người dùng được xác thực và truy cập hệ thống
- (Đối với đăng ký) Tài khoản mới được tạo và chờ phê duyệt
- Session được tạo và lưu trữ

## Luồng chính - Đăng nhập
1. Người dùng truy cập trang đăng nhập
2. Chọn loại tài khoản (Thành viên/Khách hàng)
3. Nhập thông tin đăng nhập (username/email + password)
4. Hệ thống kiểm tra thông tin đăng nhập
5. Nếu hợp lệ, tạo session và chuyển hướng đến trang chính
6. Hiển thị thông báo đăng nhập thành công

## Luồng thay thế - Đăng ký thành viên mới
1. Người dùng chọn "Đăng ký" từ trang đăng nhập
2. Điền thông tin cá nhân đầy đủ:
   - Họ tên, ngày sinh, giới tính
   - Số điện thoại, email
   - Khóa học, lớp học, quê quán
   - Chức vụ mong muốn (Tester/Kỹ thuật viên)
3. Tạo username và mật khẩu
4. Đồng ý với quy định của câu lạc bộ
5. Submit form đăng ký
6. Hệ thống kiểm tra tính hợp lệ của thông tin
7. Tạo tài khoản với trạng thái "pending"
8. Gửi thông báo cho Admin phê duyệt
9. Hiển thị thông báo chờ phê duyệt

## Luồng thay thế - Quên mật khẩu
1. Người dùng chọn "Quên mật khẩu"
2. Nhập email/username đã đăng ký
3. Hệ thống gửi mã OTP về email
4. Người dùng nhập mã OTP
5. Tạo mật khẩu mới
6. Đăng nhập tự động với mật khẩu mới

## Luồng ngoại lệ - Tài khoản bị khóa
1. Người dùng nhập thông tin đăng nhập hợp lệ
2. Hệ thống phát hiện tài khoản bị khóa
3. Hiển thị thông báo và lý do khóa
4. Đề nghị liên hệ Admin

## Luồng ngoại lệ - Tài khoản chưa được phê duyệt
1. Thành viên mới nhập thông tin đăng nhập
2. Hệ thống phát hiện trạng thái "pending"
3. Hiển thị thông báo chờ phê duyệt từ Admin
4. Đề nghị kiểm tra email hoặc liên hệ Admin

## Luồng ngoại lệ - Sai thông tin đăng nhập
1. Người dùng nhập thông tin không chính xác
2. Hệ thống hiển thị thông báo lỗi
3. Cho phép thử lại (tối đa 5 lần)
4. Sau 5 lần thất bại, tạm thời khóa tài khoản 15 phút</content>
</xai:function_call">Create the login and signup use case following the established format