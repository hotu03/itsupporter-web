# Workflow Diagrams - Sơ đồ Quy trình

## WF-003: Quy trình đăng nhập và xác thực

```mermaid
stateDiagram-v2
    [*] --> TrangDangNhap

    TrangDangNhap --> ChonLoaiTaiKhoan: Người dùng truy cập
    ChonLoaiTaiKhoan --> NhapThongTin: Chọn Thành viên/Khách hàng

    NhapThongTin --> KiemTraThongTin: Submit form
    KiemTraThongTin --> TaiKhoanHopLe: Thông tin đúng
    KiemTraThongTin --> TaiKhoanKhongHopLe: Thông tin sai

    TaiKhoanHopLe --> KiemTraTrangThai: Kiểm tra trạng thái tài khoản
    KiemTraTrangThai --> TaiKhoanActive: Trạng thái 'active'
    KiemTraTrangThai --> TaiKhoanPending: Trạng thái 'pending'
    KiemTraTrangThai --> TaiKhoanBiKhoa: Trạng thái 'locked'

    TaiKhoanActive --> TaoSession: Tạo session đăng nhập
    TaoSession --> ChuyenHuongDashboard: Chuyển hướng trang chính
    ChuyenHuongDashboard --> [*]: Đăng nhập thành công

    TaiKhoanPending --> ThongBaoChoDuyet: Hiển thị thông báo chờ phê duyệt
    ThongBaoChoDuyet --> TrangDangNhap: Quay lại đăng nhập

    TaiKhoanBiKhoa --> ThongBaoBiKhoa: Hiển thị lý do khóa
    ThongBaoBiKhoa --> LienHeAdmin: Đề nghị liên hệ Admin
    LienHeAdmin --> TrangDangNhap: Quay lại đăng nhập

    TaiKhoanKhongHopLe --> DemSoLanThu: Tăng counter thất bại
    DemSoLanThu --> VuotQuaGioiHan: >= 5 lần
    DemSoLanThu --> ThongBaoLoi: < 5 lần

    ThongBaoLoi --> TrangDangNhap: Hiển thị lỗi + Retry
    VuotQuaGioiHan --> KhoaTamThoi: Khóa 15 phút
    KhoaTamThoi --> TrangDangNhap: Thông báo khóa tạm thời

    NhapThongTin --> QuenMatKhau: Chọn "Quên mật khẩu"
    QuenMatKhau --> GuiOTP: Nhập email/username
    GuiOTP --> NhapOTP: Gửi mã OTP
    NhapOTP --> XacThucOTP: Nhập mã OTP
    XacThucOTP --> TaoMatKhauMoi: OTP đúng
    XacThucOTP --> ThongBaoSaiOTP: OTP sai
    ThongBaoSaiOTP --> NhapOTP: Retry

    TaoMatKhauMoi --> DangNhapTuDong: Tạo mật khẩu mới
    DangNhapTuDong --> TaoSession

    ChonLoaiTaiKhoan --> DangKyTaiKhoan: Chọn "Đăng ký"
    DangKyTaiKhoan --> DienThongTin: Điền form đăng ký
    DienThongTin --> KiemTraForm: Submit
    KiemTraForm --> FormHopLe: Thông tin đầy đủ
    KiemTraForm --> FormKhongHopLe: Thiếu thông tin

    FormHopLe --> TaoTaiKhoanPending: Tạo tài khoản 'pending'
    TaoTaiKhoanPending --> GuiThongBaoAdmin: Thông báo Admin
    GuiThongBaoAdmin --> PheDuyet: Admin xem xét
    PheDuyet --> DuyetThanhCong: Phê duyệt
    PheDuyet --> TuChoi: Từ chối

    DuyetThanhCong --> ThongBaoThanhCong: Thông báo người dùng
    TuChoi --> ThongBaoTuChoi: Thông báo lý do

    FormKhongHopLe --> DienThongTin: Hiển thị lỗi + Sửa
```

## WF-004: Quy trình cổng thông tin khách hàng

```mermaid
stateDiagram-v2
    [*] --> DangNhapThanhCong

    DangNhapThanhCong --> DashboardTongQuan: Chuyển hướng

    DashboardTongQuan --> XemThongTinCaNhan: Click "Thông tin cá nhân"
    DashboardTongQuan --> XemLichSuSuaChua: Click "Lịch sử sửa chữa"
    DashboardTongQuan --> QuanLyDiemThuong: Click "Điểm thưởng"
    DashboardTongQuan --> DatLichSuaLai: Click "Đặt lịch sửa chữa lại"

    XemThongTinCaNhan --> HienThiForm: Hiển thị thông tin hiện tại
    HienThiForm --> ChinhSuaThongTin: Người dùng chỉnh sửa
    ChinhSuaThongTin --> LuuThayDoi: Click "Lưu"
    LuuThayDoi --> CapNhatThanhCong: Hệ thống cập nhật
    CapNhatThanhCong --> DashboardTongQuan: Thông báo thành công

    XemLichSuSuaChua --> HienThiDanhSach: Hiển thị tất cả phiếu
    HienThiDanhSach --> LocTheoTrangThai: Chọn bộ lọc
    LocTheoTrangThai --> HienThiDanhSach: Cập nhật danh sách
    HienThiDanhSach --> XemChiTietPhieu: Click phiếu cụ thể

    XemChiTietPhieu --> HienThiThongTinChiTiet: Hiển thị đầy đủ thông tin
    HienThiThongTinChiTiet --> TaiHoaDonPDF: Click "Tải hóa đơn"
    TaiHoaDonPDF --> TaiFileThanhCong: Download PDF
    TaiFileThanhCong --> XemChiTietPhieu: Quay lại chi tiết

    QuanLyDiemThuong --> HienThiSoDiem: Hiển thị điểm hiện có
    HienThiSoDiem --> XemLichSuDiem: Click "Lịch sử"
    HienThiSoDiem --> XemMaGiamGia: Click "Đổi quà"

    XemLichSuDiem --> HienThiLichSu: Danh sách giao dịch điểm
    XemLichSuDiem --> LocTheoThoiGian: Bộ lọc thời gian
    LocTheoThoiGian --> HienThiLichSu: Cập nhật danh sách

    XemMaGiamGia --> HienThiDanhSachMa: Danh sách mã có thể đổi
    HienThiDanhSachMa --> ChonMaGiamGia: Click mã muốn đổi
    ChonMaGiamGia --> KiemTraDiem: Hệ thống kiểm tra điểm
    KiemTraDiem --> DiemDu: Đủ điểm
    KiemTraDiem --> DiemKhongDu: Không đủ điểm

    DiemDu --> XacNhanDoi: Hiển thị xác nhận
    XacNhanDoi --> TruDiem: Người dùng xác nhận
    TruDiem --> GuiMaGiamGia: Gửi mã về email
    GuiMaGiamGia --> ThongBaoThanhCong: Thông báo thành công
    ThongBaoThanhCong --> QuanLyDiemThuong: Cập nhật số điểm

    DiemKhongDu --> ThongBaoKhongDu: Hiển thị thông báo
    ThongBaoKhongDu --> XemMaGiamGia: Đề xuất mã khác

    DatLichSuaLai --> ChonPhieuCu: Chọn phiếu đã hoàn thành
    ChonPhieuCu --> TaoFormDangKy: Tạo form với auto-fill
    TaoFormDangKy --> ChinhSuaThongTin: Người dùng chỉnh sửa
    ChinhSuaThongTin --> TaoPhieuMoi: Submit đăng ký
    TaoPhieuMoi --> UuTienXuLy: Hệ thống đánh dấu ưu tiên
    UuTienXuLy --> DashboardTongQuan: Thông báo thành công
```

## WF-005: Quy trình đăng ký dịch vụ khách hàng

```mermaid
stateDiagram-v2
    [*] --> KhachHangDangNhap

    KhachHangDangNhap --> ChonDangKySuaChua: Click "Đăng ký sửa chữa"

    ChonDangKySuaChua --> AutoFillThongTin: Hệ thống điền thông tin KH
    AutoFillThongTin --> MoTaThietBi: Người dùng mô tả thiết bị
    MoTaThietBi --> ChonDichVu: Chọn loại dịch vụ
    ChonDichVu --> ChonThoiGianHen: Chọn thời gian hẹn

    ChonThoiGianHen --> KiemTraLichTrong: Hệ thống kiểm tra
    KiemTraLichTrong --> LichTrong: Có slot trống
    KiemTraLichTrong --> LichDay: Không có slot

    LichTrong --> UploadHinhAnh: Upload ảnh thiết bị (tùy chọn)
    UploadHinhAnh --> TinhChiPhi: Hệ thống tính chi phí
    TinhChiPhi --> UocTinhDiemThuong: Tính điểm sẽ nhận
    UocTinhDiemThuong --> XacNhanDangKy: Hiển thị tóm tắt
    XacNhanDangKy --> SubmitDangKy: Người dùng xác nhận

    SubmitDangKy --> TaoPhieuOnline: Tạo phiếu trạng thái 'online'
    TaoPhieuOnline --> TaoMaQR: Tạo mã QR theo dõi
    TaoMaQR --> GuiThongBao: Gửi SMS thông báo
    GuiThongBao --> TheoDoiRealtime: Cho phép theo dõi ngay

    LichDay --> DeXuatThoiGian: Đề xuất thời gian khác
    DeXuatThoiGian --> ChonLaiThoiGian: Người dùng chọn
    ChonLaiThoiGian --> ChonThoiGianHen: Quay lại kiểm tra

    MoTaThietBi --> SuDungMaGiamGia: Click "Dùng mã giảm giá"
    SuDungMaGiamGia --> NhapMaGiamGia: Nhập mã
    NhapMaGiamGia --> KiemTraMa: Hệ thống kiểm tra
    KiemTraMa --> MaHopLe: Mã hợp lệ
    KiemTraMa --> MaKhongHopLe: Mã không hợp lệ

    MaHopLe --> ApDungGiamGia: Áp dụng giảm giá
    ApDungGiamGia --> CapNhatChiPhi: Cập nhật chi phí
    CapNhatChiPhi --> UocTinhDiemThuong: Cập nhật điểm thưởng

    MaKhongHopLe --> ThongBaoLoiMa: Hiển thị lỗi
    ThongBaoLoiMa --> DeXuatMaKhac: Đề xuất mã khả dụng
    DeXuatMaKhac --> NhapMaGiamGia: Retry hoặc bỏ qua

    MoTaThietBi --> DangKyKhanCap: Click "Khẩn cấp"
    DangKyKhanCap --> XacNhanKhanCap: Xác nhận phí cao hơn
    XacNhanKhanCap --> UuTienXuLy: Đánh dấu ưu tiên
    UuTienXuLy --> ChonThoiGianHen: Tiếp tục chọn thời gian

    MoTaThietBi --> ThietBiCu: Click "Thiết bị đã sửa"
    ThietBiCu --> ChonTuLichSu: Chọn từ lịch sử
    ChonTuLichSu --> AutoFillThietBiCu: Điền thông tin cũ
    AutoFillThietBiCu --> CapNhatTinhTrang: Cập nhật tình trạng mới
    CapNhatTinhTrang --> KiemTraBaoHanh: Kiểm tra bảo hành
    KiemTraBaoHanh --> ConBaoHanh: Còn bảo hành
    KiemTraBaoHanh --> HetBaoHanh: Hết bảo hành

    ConBaoHanh --> ChonBaoHanh: Chọn chế độ bảo hành
    ChonBaoHanh --> ChonDichVu: Tiếp tục chọn dịch vụ

    HetBaoHanh --> ChonDichVu: Tiếp tục đăng ký thường

    SubmitDangKy --> KiemTraGioiHan: Kiểm tra số phiếu đang chờ
    KiemTraGioiHan --> VuotGioiHan: > 3 phiếu chờ
    KiemTraGioiHan --> TrongGioiHan: ≤ 3 phiếu

    VuotGioiHan --> ThongBaoGioiHan: Thông báo giới hạn
    ThongBaoGioiHan --> DeNghiHoanThanhCu: Đề nghị hoàn thành phiếu cũ
    DeNghiHoanThanhCu --> ChonDangKySuaChua: Quay lại hoặc hủy

    TrongGioiHan --> TaoPhieuOnline: Tiếp tục tạo phiếu
```

## WF-006: Quy trình phê duyệt đăng ký trực tuyến

```mermaid
stateDiagram-v2
    [*] --> KhachHangSubmitDangKy

    KhachHangSubmitDangKy --> TaoPhieuOnline: Tạo phiếu 'online'
    TaoPhieuOnline --> GuiMaQR: Gửi mã QR
    GuiMaQR --> ChoPheDuyet: Chờ phê duyệt

    ChoPheDuyet --> KhachHangDenQuay: Khách hàng đến cửa hàng
    KhachHangDenQuay --> TesterQuetQR: Tester quét mã QR

    TesterQuetQR --> HienThiThongTin: Hiển thị thông tin đăng ký
    HienThiThongTin --> KiemTraThietBi: Kiểm tra thiết bị thực tế
    KiemTraThietBi --> ThongTinKhop: Thông tin khớp
    KiemTraThietBi --> ThongTinKhongKhop: Thông tin không khớp

    ThongTinKhongKhop --> YeuCauCapNhat: Yêu cầu cập nhật
    YeuCauCapNhat --> KhachHangCapNhat: Khách hàng cập nhật
    KhachHangCapNhat --> KiemTraThietBi: Kiểm tra lại

    ThongTinKhop --> DanhGiaSoBo: Đánh giá sơ bộ
    DanhGiaSoBo --> CoTheSua: Có thể sửa chữa
    DanhGiaSoBo --> KhongTheSua: Không thể sửa chữa

    KhongTheSua --> ThongBaoKhongSua: Thông báo khách hàng
    ThongBaoKhongSua --> HuyDangKy: Hủy đăng ký
    HuyDangKy --> [*]: Kết thúc

    CoTheSua --> PheDuyet: Tester/Admin phê duyệt
    PheDuyet --> ChuyenThanhPhieuChinhThuc: Chuyển thành phiếu WAITING
    ChuyenThanhPhieuChinhThuc --> BatDauQuyTrinhP1: Bắt đầu quy trình 5 giai đoạn
    BatDauQuyTrinhP1 --> [*]: Tiếp tục WF-001

    PheDuyet --> TuChoiPheDuyet: Nếu có vấn đề
    TuChoiPheDuyet --> ThongBaoLyDo: Thông báo lý do từ chối
    ThongBaoLyDo --> ChoKhachHangQuyetDinh: Khách hàng quyết định
    ChoKhachHangQuyetDinh --> CapNhatDangKy: Cập nhật và thử lại
    ChoKhachHangQuyetDinh --> HuyDangKy: Hủy đăng ký

    CapNhatDangKy --> ChoPheDuyet: Quay lại chờ phê duyệt
```</content>
</xai:function_call">Create detailed workflow diagrams for all the processes