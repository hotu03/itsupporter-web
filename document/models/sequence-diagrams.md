# Sequence Diagrams - Sơ đồ Tuần tự

## SD-001: Đăng ký và phê duyệt trực tuyến

```mermaid
sequenceDiagram
    participant KH as Khách hàng
    participant HT as Hệ thống
    participant TS as Tester
    participant AD as Admin

    KH->>HT: Truy cập /dang-ky-dich-vu
    KH->>HT: Điền thông tin thiết bị
    KH->>HT: Chọn dịch vụ và thời gian
    KH->>HT: Submit đăng ký
    HT-->>KH: Tạo mã QR + Gửi SMS

    Note over KH,HT: Phiếu trạng thái 'online'

    KH->>TS: Đến quầy với mã QR
    TS->>HT: Quét mã QR
    HT-->>TS: Hiển thị thông tin đăng ký

    TS->>KH: Kiểm tra thiết bị thực tế
    KH-->>TS: Xác nhận thông tin

    TS->>TS: Đánh giá sơ bộ
    TS->>AD: Gửi yêu cầu phê duyệt
    AD->>AD: Xem xét đăng ký
    AD->>HT: Phê duyệt đăng ký

    HT-->>TS: Thông báo phê duyệt thành công
    TS->>KH: Xác nhận và bắt đầu P1
    TS->>HT: Tạo phiếu chính thức WAITING
```

## SD-002: Quy trình 5 giai đoạn hoàn chỉnh

```mermaid
sequenceDiagram
    participant KH as Khách hàng
    participant TS as Tester
    participant KT as Kỹ thuật viên
    participant AD as Admin
    participant HT as Hệ thống

    Note over KH,HT: P1: Thu thập thông tin
    TS->>KH: Thu thập thông tin cá nhân
    TS->>KH: Ghi nhận thiết bị
    TS->>HT: Tạo phiếu chi tiết
    HT-->>TS: Phiếu WAITING → RUNNING

    Note over KH,HT: P2: Kiểm tra sơ bộ
    TS->>KH: Thực hiện test cơ bản
    TS->>HT: Tạo checklist ban đầu
    TS->>HT: Cập nhật phiếu

    Note over KH,HT: P3: Thực hiện sửa chữa
    AD->>KT: Phân công phiếu
    KT->>HT: Nhận phiếu và xem yêu cầu
    KT->>KT: Thực hiện sửa chữa
    KT->>HT: Cập nhật checklist kỹ thuật
    KT->>AD: Báo cáo hoàn thành
    HT-->>AD: RUNNING → RETESTING

    Note over KH,HT: P4: Kiểm tra chất lượng
    AD->>TS: Phân công kiểm tra
    TS->>HT: Nhận phiếu kiểm tra
    TS->>TS: Test toàn diện
    TS->>HT: Tạo checklist cuối
    TS->>AD: Báo cáo kết quả

    alt Test đạt
        HT-->>AD: RETESTING → RETURNING
    else Test không đạt
        TS->>AD: Từ chối phiếu
        AD->>KT: Phân công sửa lại
    end

    Note over KH,HT: P5: Xác nhận hoàn thành
    AD->>HT: Xem xét tất cả báo cáo
    HT-->>AD: Tính chi phí và điểm thưởng
    AD->>KH: Thu thanh toán
    KH->>HT: Ký điện tử xác nhận
    AD->>KH: Bàn giao thiết bị
    HT-->>KH: Cộng điểm tự động
    HT-->>AD: COMPLETE
```

## SD-003: Quản lý điểm thưởng khách hàng

```mermaid
sequenceDiagram
    participant KH as Khách hàng
    participant HT as Hệ thống
    participant DB as Cơ sở dữ liệu

    KH->>HT: Đăng nhập cổng thông tin
    HT->>DB: Lấy thông tin khách hàng
    DB-->>HT: Trả về profile + điểm hiện có
    HT-->>KH: Hiển thị dashboard

    KH->>HT: Click "Điểm thưởng"
    HT->>DB: Lấy lịch sử điểm
    DB-->>HT: Danh sách giao dịch điểm
    HT-->>KH: Hiển thị số điểm + lịch sử

    KH->>HT: Click "Đổi quà"
    HT->>DB: Lấy danh sách mã giảm giá khả dụng
    DB-->>HT: Danh sách mã + điểm yêu cầu
    HT-->>KH: Hiển thị mã có thể đổi

    KH->>HT: Chọn mã giảm giá
    HT->>HT: Kiểm tra đủ điểm
    HT-->>KH: Xác nhận đổi điểm

    KH->>HT: Xác nhận đổi
    HT->>DB: Trừ điểm khách hàng
    HT->>DB: Tạo bản ghi lịch sử tiêu điểm
    HT->>DB: Tạo mã giảm giá mới
    DB-->>HT: Thành công
    HT-->>KH: Gửi mã về email
    HT-->>KH: Thông báo thành công
```

## SD-004: Đăng ký thành viên mới

```mermaid
sequenceDiagram
    participant UV as Người dùng
    participant HT as Hệ thống
    participant AD as Admin
    participant DB as Cơ sở dữ liệu

    UV->>HT: Truy cập trang đăng ký
    HT-->>UV: Hiển thị form đăng ký

    UV->>HT: Điền thông tin cá nhân
    UV->>HT: Tạo username/password
    UV->>HT: Đồng ý quy định
    UV->>HT: Submit đăng ký

    HT->>HT: Validate thông tin
    HT->>DB: Kiểm tra username/email trùng lặp
    DB-->>HT: Kết quả kiểm tra

    alt Thông tin hợp lệ
        HT->>DB: Tạo tài khoản trạng thái 'pending'
        DB-->>HT: Thành công
        HT->>AD: Gửi thông báo phê duyệt
        HT-->>UV: Thông báo chờ phê duyệt

        AD->>HT: Xem danh sách chờ duyệt
        HT->>DB: Lấy thông tin đăng ký
        DB-->>HT: Chi tiết đăng ký
        HT-->>AD: Hiển thị form phê duyệt

        AD->>HT: Phê duyệt/từ chối
        HT->>DB: Cập nhật trạng thái tài khoản
        HT->>UV: Gửi thông báo kết quả
    else Thông tin không hợp lệ
        HT-->>UV: Hiển thị lỗi validation
    end
```

## SD-005: Tích điểm tự động khi hoàn thành

```mermaid
sequenceDiagram
    participant AD as Admin
    participant HT as Hệ thống
    participant DB as Cơ sở dữ liệu
    participant KH as Khách hàng

    AD->>HT: Click "COMPLETE" phiếu
    HT->>HT: Kiểm tra điều kiện tích điểm
    HT->>DB: Lấy thông tin thanh toán
    DB-->>HT: Chi phí, trạng thái thanh toán

    HT->>HT: Tính điểm theo quy tắc
    HT->>DB: Lấy quy tắc điểm hiện tại
    DB-->>HT: Danh sách quy tắc

    HT->>HT: Áp dụng quy tắc per_order
    HT->>HT: Áp dụng quy tắc amount_threshold
    HT->>HT: Tính tổng điểm

    alt Có điểm tích lũy
        HT->>DB: Tạo bản ghi lịch sử điểm
        HT->>DB: Cập nhật điểm khách hàng
        DB-->>HT: Thành công

        HT->>KH: Hiển thị popup thông báo
        HT-->>AD: Hiển thị điểm đã tích
    else Không có điểm
        HT->>HT: Bỏ qua tích điểm
    end

    HT->>DB: Cập nhật trạng thái phiếu COMPLETE
    DB-->>HT: Thành công
    HT-->>AD: Phiếu hoàn thành
```

## SD-006: Đăng nhập và phân quyền

```mermaid
sequenceDiagram
    participant ND as Người dùng
    participant HT as Hệ thống
    participant DB as Cơ sở dữ liệu
    participant SS as Session Store

    ND->>HT: Truy cập trang đăng nhập
    HT-->>ND: Hiển thị form đăng nhập

    ND->>HT: Nhập thông tin đăng nhập
    ND->>HT: Click "Đăng nhập"

    HT->>DB: Xác thực thông tin
    DB-->>HT: Thông tin tài khoản

    alt Thông tin đúng
        HT->>HT: Kiểm tra trạng thái tài khoản
        HT->>SS: Tạo session mới
        SS-->>HT: Session ID

        HT->>HT: Xác định quyền truy cập
        HT-->>ND: Chuyển hướng dashboard
        HT-->>ND: Hiển thị giao diện theo role
    else Thông tin sai
        HT-->>ND: Thông báo lỗi
        HT->>HT: Tăng counter thất bại

        alt Quá 5 lần
            HT->>DB: Khóa tài khoản tạm thời
            DB-->>HT: Thành công
            HT-->>ND: Thông báo tài khoản bị khóa
        else Chưa quá giới hạn
            HT-->>ND: Cho phép thử lại
        end
    end
```

## SD-007: Phê duyệt đăng ký trực tuyến tại quầy

```mermaid
sequenceDiagram
    participant KH as Khách hàng
    participant TS as Tester
    participant HT as Hệ thống
    participant DB as Cơ sở dữ liệu

    KH->>TS: Đến quầy với mã QR
    TS->>HT: Quét mã QR
    HT->>DB: Tìm phiếu theo mã QR
    DB-->>HT: Thông tin đăng ký

    HT-->>TS: Hiển thị thông tin đăng ký

    TS->>KH: Kiểm tra thiết bị thực tế
    KH-->>TS: Xác nhận thông tin khớp/không khớp

    alt Thông tin không khớp
        TS->>HT: Yêu cầu cập nhật
        HT-->>KH: Form cập nhật thông tin
        KH->>HT: Cập nhật thông tin mới
        HT->>DB: Lưu thay đổi
    end

    TS->>TS: Đánh giá sơ bộ
    TS->>HT: Phê duyệt/từ chối

    alt Phê duyệt
        HT->>DB: Chuyển trạng thái 'online' → 'WAITING'
        HT-->>TS: Thông báo thành công
        TS->>KH: Xác nhận và bắt đầu quy trình
    else Từ chối
        HT->>DB: Ghi lý do từ chối
        HT-->>KH: Thông báo từ chối + lý do
    end
```</content>
</xai:function_call">Create sequence diagrams showing detailed interactions between actors and systems