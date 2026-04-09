# Use Case Diagrams - Sơ đồ Use Case

## UC-001: Đăng ký yêu cầu sửa chữa

```mermaid
graph TD
    A[Khách hàng] --> B[Đăng ký trực tuyến]
    A --> C[Đến quầy trực tiếp]

    B --> D[Truy cập /dang-ky-dich-vu]
    D --> E[Điền thông tin thiết bị]
    E --> F[Chọn dịch vụ bổ sung]
    F --> G[Chọn thời gian hẹn]
    G --> H[Submit form]

    C --> I[Tester tiếp nhận]
    I --> J[Thu thập thông tin KH]
    J --> K[Ghi nhận thiết bị]
    K --> L[Chọn dịch vụ bổ sung]
    L --> M[Tạo phiếu WAITING]

    H --> N[Mã QR + SMS]
    M --> O[Phiếu xác nhận]

    P[Tester/Admin] --> Q[Phê duyệt đăng ký online]
    Q --> R[Chuyển thành phiếu chính thức]

    N --> Q
    O --> S[Hệ thống lưu trữ]
    R --> S
```

## UC-002: Đăng nhập và Đăng ký thành viên

```mermaid
graph TD
    A[Người dùng] --> B{Đã có tài khoản?}

    B -->|Có| C[Đăng nhập]
    B -->|Không| D[Đăng ký]

    C --> E[Chọn loại: Thành viên/Khách hàng]
    E --> F[Nhập username/email + password]
    F --> G[Hệ thống xác thực]
    G --> H{Valid?}
    H -->|Có| I[Tạo session + Chuyển hướng]
    H -->|Không| J[Hiển thị lỗi + Retry]

    D --> K[Điền thông tin cá nhân]
    K --> L[Tạo username/password]
    L --> M[Đồng ý quy định]
    M --> N[Submit đăng ký]
    N --> O[Hệ thống kiểm tra]
    O --> P{Trạng thái}
    P -->|Valid| Q[Tạo tài khoản 'pending']
    P -->|Invalid| R[Hiển thị lỗi + Sửa]

    Q --> S[Thông báo Admin phê duyệt]
    S --> T[Admin]
    T --> U{Phê duyệt?}
    U -->|Có| V[Tài khoản active]
    U -->|Không| W[Từ chối + Lý do]

    V --> X[Người dùng có thể đăng nhập]
    X --> I

    W --> Y[Thông báo từ chối]
```

## UC-003: Cổng thông tin khách hàng

```mermaid
graph TD
    A[Khách hàng đã đăng nhập] --> B[Dashboard tổng quan]

    B --> C[Thông tin cá nhân]
    B --> D[Số điểm thưởng]
    B --> E[Danh sách phiếu đang xử lý]
    B --> F[Thống kê sửa chữa]

    A --> G[Quản lý thông tin cá nhân]
    G --> H[Xem thông tin hiện tại]
    H --> I[Cập nhật thông tin]
    I --> J[Lưu thay đổi]

    A --> K[Theo dõi phiếu sửa chữa]
    K --> L[Xem danh sách tất cả phiếu]
    L --> M[Lọc theo trạng thái/thời gian]
    M --> N[Xem chi tiết phiếu]
    N --> O[Tải hóa đơn PDF]

    A --> P[Quản lý điểm thưởng]
    P --> Q[Xem số điểm hiện có]
    Q --> R[Xem lịch sử tích/tiêu điểm]
    R --> S[Xem mã giảm giá có thể đổi]
    S --> T[Chọn mã muốn đổi]
    T --> U[Xác nhận đổi điểm]
    U --> V[Hệ thống trừ điểm + Gửi mã]

    A --> W[Đặt lịch sửa chữa lại]
    W --> X[Chọn phiếu đã hoàn thành]
    X --> Y[Form đăng ký mới với auto-fill]
    Y --> Z[Cập nhật thông tin nếu cần]
    Z --> AA[Tạo phiếu mới]
    AA --> BB[Hệ thống ưu tiên xử lý]
```

## UC-004: Khách hàng đăng ký dịch vụ sửa chữa

```mermaid
graph TD
    A[Khách hàng đã đăng nhập] --> B[Chọn 'Đăng ký sửa chữa']

    B --> C[Hệ thống auto-fill thông tin KH]
    C --> D[Mô tả thiết bị và vấn đề]
    D --> E[Chọn loại dịch vụ sửa chữa]
    E --> F[Chọn thời gian hẹn]
    F --> G{Kiểm tra lịch trống?}
    G -->|Có| H[Upload hình ảnh thiết bị]
    G -->|Không| I[Đề xuất thời gian khác]
    I --> F

    H --> J[Xem ước tính chi phí + điểm thưởng]
    J --> K[Xác nhận + Submit]
    K --> L[Tạo phiếu 'online']
    L --> M[Tạo mã QR + Gửi thông báo]
    M --> N[Theo dõi trạng thái realtime]

    D --> O{Sử dụng mã giảm giá?}
    O -->|Có| P[Nhập mã giảm giá]
    P --> Q{Kiểm tra hợp lệ?}
    Q -->|Có| R[Áp dụng giảm giá]
    Q -->|Không| S[Hiển thị lỗi + Đề xuất mã khác]
    S --> O
    R --> J

    D --> T{Đăng ký khẩn cấp?}
    T -->|Có| U[Chọn 'sửa khẩn cấp']
    U --> V[Ưu tiên xử lý + Phí cao hơn]
    V --> F

    D --> W{Thiết bị đã sửa trước đó?}
    W -->|Có| X[Chọn từ lịch sử thiết bị]
    X --> Y[Auto-fill thông tin cũ]
    Y --> Z[Cập nhật tình trạng hiện tại]
    Z --> AA{Kiểm tra bảo hành?}
    AA -->|Còn| BB[Chọn 'bảo hành']
    AA -->|Hết| CC[Tiếp tục đăng ký thường]
    BB --> E
    CC --> E
```

## Tổng quan hệ thống Use Case

```mermaid
graph TD
    subgraph "Khách hàng"
        KH1[Đăng ký trực tuyến]
        KH2[Đăng nhập cổng thông tin]
        KH3[Theo dõi phiếu sửa chữa]
        KH4[Quản lý điểm thưởng]
        KH5[Đặt lịch sửa chữa lại]
    end

    subgraph "Thành viên"
        TV1[Đăng nhập hệ thống]
        TV2[Đăng ký thành viên mới]
        TV3[Quản lý phiếu sửa chữa]
        TV4[Thực hiện quy trình 5 giai đoạn]
        TV5[Cập nhật trạng thái]
    end

    subgraph "Admin"
        AD1[Phê duyệt đăng ký thành viên]
        AD2[Phân công nhân sự]
        AD3[Xác nhận hoàn thành]
        AD4[Quản lý hệ thống]
        AD5[Giám sát dashboard]
    end

    subgraph "Tester"
        TS1[Tiếp nhận khách hàng]
        TS2[Tạo phiếu yêu cầu]
        TS3[Thực hiện kiểm tra]
        TS4[Kiểm tra chất lượng]
        TS5[Phê duyệt đăng ký online]
    end

    subgraph "Kỹ thuật viên"
        KT1[Nhận phiếu phân công]
        KT2[Thực hiện sửa chữa]
        KT3[Cập nhật checklist]
        KT4[Báo cáo tiến độ]
    end

    KH1 --> TS5
    TS5 --> AD2

    KH2 --> KH3
    KH2 --> KH4
    KH2 --> KH5

    TV2 --> AD1
    TV1 --> TV3
    TV1 --> TV4
    TV1 --> TV5

    TS1 --> TS2
    TS3 --> TS4

    KT1 --> KT2
    KT2 --> KT3
    KT3 --> KT4
    KT4 --> AD3
```</content>
</xai:function_call">Create comprehensive use case diagrams for all the use cases