# Quy tắc nghiệp vụ hệ thống

## Quy tắc tích điểm thưởng

### BR-POINT-001: Tích điểm cơ bản
**Điều kiện:** Khách hàng hoàn thành đơn hàng sửa chữa có thanh toán
**Quy tắc:**
- Cộng 1 điểm cho mỗi đơn hàng (per_order)
- Điểm threshold bổ sung:
  - Từ 50,000 VND: +2 điểm
  - Từ 100,000 VND: +3 điểm
  - Từ 200,000 VND: +5 điểm
**Ví dụ:** Đơn 75,000 VND → 1 + 2 = 3 điểm

### BR-POINT-002: Điều kiện tích điểm
**Điều kiện:** Chỉ áp dụng khi:
- Đơn hàng có trạng thái "COMPLETE" hoặc "RETURNED"
- finalAmount > 0
- Khách hàng có thông tin hợp lệ
**Không áp dụng:** Đơn miễn phí, hủy, hoặc lỗi

### BR-POINT-003: Đổi điểm lấy giảm giá
**Điều kiện:** Khách hàng có đủ điểm và mã giảm giá cho phép
**Quy tắc:**
- Mã giảm giá có isRedeemable = true
- pointsRequired ≤ điểm hiện có của khách hàng
- Trừ điểm tương ứng khi sử dụng

## Quy tắc trạng thái phiếu

### BR-STATUS-001: Quy trình 5 giai đoạn
**Luồng bắt buộc:**
1. WAITING → RUNNING (sau P2)
2. RUNNING → RETESTING (sau P3)
3. RETESTING → RETURNING (sau P4 passed)
4. RETURNING → COMPLETE (sau P5)

**Không cho phép:** Bỏ qua giai đoạn hoặc quay ngược không kiểm soát

### BR-STATUS-002: Quyền thay đổi trạng thái
- **Tester:** WAITING và RETESTING
- **Kỹ thuật viên:** Không được thay đổi status
- **Admin:** Toàn quyền thay đổi

### BR-STATUS-003: Status đặc biệt
- **"online"**: Phiếu từ đăng ký web, chờ phê duyệt
- **"pending"**: Chờ thanh toán hoặc xác nhận bổ sung
- **"cancelled"**: Đã hủy, không xử lý tiếp

## Quy tắc tài chính

### BR-FINANCE-001: Tính toán chi phí
**Công thức:**
```
finalAmount = (serviceAmount + additionalServices) - discountAmount
```

**Ràng buộc:**
- serviceAmount: từ danh mục Service
- additionalServices: tính từ Service.price[]
- discountAmount: ≤ maxDiscount của discountCode

### BR-FINANCE-002: Thanh toán
**Trạng thái:**
- "paid": Đã thanh toán đầy đủ
- "pending": Chưa thanh toán hoặc thanh toán một phần
- "free": Miễn phí (dịch vụ tư vấn, etc.)

**Validation:** Không cho bàn giao nếu paymentStatus = "pending"

### BR-FINANCE-003: Giảm giá
**Điều kiện áp dụng:**
- discountCode tồn tại và active
- Trong thời hạn validFrom ≤ today ≤ validUntil
- usageCount < usageLimit
- Không conflict với giảm giá khác

## Quy tắc nhân sự

### BR-PERSONNEL-001: Phê duyệt thành viên
**Tiêu chí phê duyệt:**
- Thông tin cá nhân đầy đủ
- Thuộc khóa học hợp lệ (K14-K18)
- Chưa có tài khoản trùng lặp
- Đồng ý với quy định câu lạc bộ

### BR-PERSONNEL-002: Phân quyền
**Admin:** isAdmin = true, toàn quyền
**Technician/Tester:** Quyền theo vai trò, chỉ xem/sửa phiếu được phân công
**Pending:** Chưa phê duyệt, không có quyền truy cập

### BR-PERSONNEL-003: Hiệu suất
**Tự động cập nhật:**
- machinesDone: +1 mỗi khi hoàn thành phiếu (technician)
- testsRun: +1 mỗi khi hoàn thành test (tester)
- pointsEarned: Tự động cộng điểm thưởng cho khách hàng
**Thưởng:** Dựa trên số lượng và chất lượng công việc

## Quy tắc khách hàng

### BR-CUSTOMER-001: Đăng ký tự động
**Trigger:** Lần đầu tạo phiếu sửa chữa
**Thông tin bắt buộc:** name, phone
**Tự động:**
- Tạo Customer record
- totalRepairs = 1
- points = 0

### BR-CUSTOMER-002: Cập nhật thông tin
**Khi sửa chữa hoàn thành:**
- totalRepairs += 1
- points += pointsEarned từ đơn hàng
- Cập nhật registeredAt nếu chưa có

### BR-CUSTOMER-003: Tra cứu khách hàng
**Lookup key:** phone number (unique)
**Nếu tồn tại:** Update thông tin
**Nếu mới:** Tạo record mới

## Quy tắc dịch vụ

### BR-SERVICE-001: Danh mục dịch vụ
**Phân loại:**
- Dịch vụ chính: Có giá, bắt buộc
- Dịch vụ bổ sung: Tùy chọn, cộng dồn
- Tư vấn: Giá = 0, miễn phí

### BR-SERVICE-002: Giá dịch vụ
**Định nghĩa:** Lưu trong ServiceData.price
**Cập nhật:** Chỉ Admin được thay đổi
**Validation:** price ≥ 0

## Quy tắc hệ thống

### BR-SYSTEM-001: Đăng ký trực tuyến
**Thời hạn:** 7 ngày kể từ ngày đăng ký
**Chuyển đổi:** Admin phê duyệt → thành phiếu chính thức
**Hủy:** Quá hạn hoặc khách hàng yêu cầu

### BR-SYSTEM-002: Bảo hành
**Phân loại:**
- "con": Còn bảo hành, ưu tiên xử lý
- "het": Hết bảo hành, tính phí đầy đủ
**Ảnh hưởng:** Ưu tiên queue và giá cả

### BR-SYSTEM-003: Chữ ký điện tử
**Bắt buộc:** Tất cả phiếu hoàn thành
**Lưu trữ:** customerSignature field
**Validation:** Không bàn giao nếu thiếu chữ ký

## Quy tắc validation

### BR-VALIDATION-001: Input bắt buộc
**Machine creation:**
- customerName, phone: required
- description: required
- category: required

**Personnel registration:**
- name, username, dob, phone: required
- course, class: required

### BR-VALIDATION-002: Format data
**Phone:** 10-11 số, bắt đầu bằng 0
**Email:** Valid email format (optional)
**Date:** DD/MM/YYYY hoặc ISO string
**Money:** Số dương, format VND

### BR-VALIDATION-003: Business constraints
**Discount:**
- discountPercent: 1-100
- validUntil > validFrom
- pointsRequired > 0 (nếu isRedeemable)

**Points:**
- points ≥ 0 (không âm)
- Không redeem quá số điểm hiện có

## Quy tắc workflow

### BR-WORKFLOW-001: Phân công bắt buộc
**Trước P3:** Phải có technician được assign
**Trước P4:** Phải có tester được assign
**Validation:** Kiểm tra personnel active và phù hợp vai trò

### BR-WORKFLOW-002: Checklist completion
**P2:** checklistBefore completed
**P3:** techChecklist completed
**P4:** checklistAfter completed
**P5:** Tất cả checklist verified

### BR-WORKFLOW-003: Thời gian xử lý
**SLA mặc định:**
- P1-P2: 30 phút
- P3: 2-4 giờ (tùy complexity)
- P4: 30 phút
- P5: 15 phút

**Monitoring:** Dashboard hiển thị phiếu quá hạn

### BR-WORKFLOW-004: Tạo hóa đơn
**Trigger:** Khi admin nhấn "COMPLETE" hoặc "RETURNED" trong P5
**Tự động:**
- Tính toán finalAmount
- Tính điểm tích lũy
- Tạo và lưu hóa đơn
- Cập nhật lịch sử điểm
- Hiển thị thông báo cho admin

**Validation:** Chỉ tạo hóa đơn khi finalAmount > 0 và paymentStatus hợp lệ

## Quy tắc thanh toán và điểm thưởng

### BR-PAYMENT-001: Trạng thái thanh toán
**Các trạng thái:**
- **"paid"**: Đã thanh toán đầy đủ → Cho phép bàn giao
- **"pending"**: Chưa thanh toán hoặc thanh toán một phần → Không cho bàn giao
- **"free"**: Miễn phí (dịch vụ tư vấn, bảo hành) → Không tính tiền

**Validation:** Không cho phép bàn giao phiếu nếu paymentStatus = "pending"

### BR-PAYMENT-002: Tính toán thành tiền
**Công thức:**
```
finalAmount = serviceAmount + additionalServices - discountAmount
```

**Ràng buộc:**
- serviceAmount: Giá dịch vụ chính (bắt buộc)
- additionalServices: Tổng giá dịch vụ bổ sung
- discountAmount: Giảm giá từ mã hoặc đổi điểm
- finalAmount ≥ 0 (không âm)

### BR-POINTS-001: Tích điểm tự động
**Trigger:** Khi phiếu chuyển sang trạng thái "COMPLETE" hoặc "RETURNED"
**Điều kiện:**
- finalAmount > 0
- paymentStatus = "paid"
- Khách hàng có thông tin hợp lệ

**Quy tắc tích điểm:**
- Áp dụng tất cả quy tắc per_order
- Áp dụng quy tắc amount_threshold cao nhất (nếu đủ điều kiện)
- Lưu lịch sử điểm với mô tả chi tiết

### BR-POINTS-002: Đổi điểm lấy giảm giá
**Điều kiện:**
- discountCode có isRedeemable = true
- pointsRequired ≤ điểm hiện có của khách hàng
- Trong thời hạn sử dụng của mã

**Quy tắc:**
- Trừ điểm tương ứng khi áp dụng
- Lưu lịch sử điểm với type = "redeem"
- Không thể hoàn lại điểm sau khi đổi

### BR-INVOICE-001: Tự động tạo hóa đơn
**Trigger:** Khi admin xác nhận hoàn thành (P5)
**Thông tin bắt buộc:**
- Thông tin khách hàng (name, phone)
- Danh sách dịch vụ và giá
- Thành tiền và trạng thái thanh toán
- Điểm tích lũy (nếu có)

**Lưu trữ:** Tự động lưu vào cơ sở dữ liệu hóa đơn với mã HD duy nhất