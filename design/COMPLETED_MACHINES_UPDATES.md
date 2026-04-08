# ✅ ĐÃ HOÀN THÀNH: HIỂN THỊ DỊCH VỤ, THANH TOÁN VÀ ĐIỂM TRÊN CARD & P5

## 🎯 Tổng quan thay đổi

Đã cập nhật trang **Machines** để hiển thị đầy đủ thông tin dịch vụ, thanh toán và điểm thưởng trên:
1. ✅ **Card trong danh sách máy** (Grid view)
2. ✅ **Phiếu P1** (Form nhập liệu - chọn trạng thái thanh toán)
3. ✅ **Phiếu P5** (Admin xác nhận - hiển thị hóa đơn chi tiết và điểm)

---

## 📝 Chi tiết thay đổi

### 1. **Cập nhật Machine Interface** ✅

**File**: `/src/app/pages/Machines.tsx`

Thêm các field mới vào interface Machine:
```typescript
interface Machine {
  // ... existing fields ...
  
  // Finance fields (đã có)
  additionalServices?: string[];
  serviceAmount?: number;
  discountCode?: string;
  discountAmount?: number;
  
  // NEW: Payment & Points
  paymentStatus?: "paid" | "pending" | "free";
  finalAmount?: number;
  pointsEarned?: number;
}
```

### 2. **Thêm Imports Mới** ✅

```typescript
import {
  // ... existing imports ...
  Star,           // Icon điểm thưởng
  DollarSign,     // Icon tiền
  CreditCard,     // Icon thanh toán
} from "lucide-react";

import {
  calculatePoints,
  addPointHistory,
  getPointsExplanation,
} from "../data/points";
```

---

## 🎨 CARD HIỂN THỊ (Grid View)

### Thay đổi trong `MachineCard` component:

#### ✅ **Phần 1: Hiển thị Dịch vụ**
```tsx
{machine.additionalServices && machine.additionalServices.length > 0 && (
  <div className="border-t border-gray-100 pt-2 mt-1">
    <p className="text-gray-400 text-[10px] mb-1">Dịch vụ</p>
    <div className="flex flex-wrap gap-1">
      {machine.additionalServices.slice(0, 2).map((service, idx) => (
        <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded text-[9px]">
          {service}
        </span>
      ))}
      {machine.additionalServices.length > 2 && (
        <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[9px]">
          +{machine.additionalServices.length - 2}
        </span>
      )}
    </div>
  </div>
)}
```

#### ✅ **Phần 2: Hiển thị Thanh toán**
```tsx
{machine.finalAmount !== undefined && machine.finalAmount > 0 && (
  <div className="flex items-center justify-between gap-2 bg-gray-50 rounded px-2 py-1.5">
    <div className="flex items-center gap-1">
      <DollarSign size={12} className="text-gray-500" />
      <span className="text-xs font-semibold text-gray-900">
        {formatCurr(machine.finalAmount)}
      </span>
    </div>
    {machine.paymentStatus && (
      <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${
        machine.paymentStatus === "paid"
          ? "bg-green-100 text-green-700"
          : machine.paymentStatus === "pending"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-blue-100 text-blue-700"
      }`}>
        {/* Đã thanh toán / Chưa thanh toán / Miễn phí */}
      </span>
    )}
  </div>
)}
```

#### ✅ **Phần 3: Hiển thị Điểm**
```tsx
{machine.pointsEarned && machine.pointsEarned > 0 && (
  <div className="flex items-center gap-1 text-yellow-600">
    <Star size={12} className="fill-yellow-500" />
    <span className="text-[10px] font-semibold">+{machine.pointsEarned} điểm</span>
  </div>
)}
```

---

## 📋 PHIẾU P1 (Thông tin KH - Form Input)

### ✅ **Thêm Payment Status Selector**

**Vị trí**: Sau phần "Tổng kết thanh toán" trong step 1

```tsx
{/* Payment Status */}
<div className="flex flex-col gap-2">
  <label className="text-xs font-medium text-gray-600">Trạng thái thanh toán</label>
  <div className="grid grid-cols-3 gap-2">
    <button
      type="button"
      onClick={() => set("paymentStatus", "paid")}
      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
        form.paymentStatus === "paid"
          ? "bg-green-500 text-white shadow-md"
          : "bg-white text-gray-600 border border-gray-200 hover:border-green-300"
      }`}
    >
      Đã thanh toán
    </button>
    <button
      type="button"
      onClick={() => set("paymentStatus", "pending")}
      className={`... yellow ...`}
    >
      Chưa thanh toán
    </button>
    <button
      type="button"
      onClick={() => set("paymentStatus", "free")}
      className={`... blue ...`}
    >
      Miễn phí
    </button>
  </div>
</div>
```

### ✅ **Cập nhật FormState**

Thêm field `paymentStatus` vào:
- `interface FormState`
- `DEFAULT_FORM`
- `machineToForm()` function
- `formToMachine()` function

---

## 🧾 PHIẾU P5 (Admin xác nhận)

### ✅ **Hiển thị Hóa đơn Chi tiết**

**Vị trí**: Sau "Tóm tắt phiếu" và trước "Ghi chú của Admin"

```tsx
{/* Invoice & Payment Summary */}
{(form.additionalServices.length > 0 || form.discountCode) && (
  <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
    {/* Header với trạng thái thanh toán */}
    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold">
          <CreditCard /> Hóa đơn thanh toán
        </p>
        <span className="badge">Đã thanh toán / Chưa / Miễn phí</span>
      </div>
    </div>

    <div className="p-4 flex flex-col gap-3">
      {/* Danh sách dịch vụ */}
      {form.additionalServices.length > 0 && (
        <div>
          <p className="text-[10px] uppercase">Dịch vụ</p>
          {form.additionalServices.map((service) => (
            <div className="flex justify-between">
              <span>{service}</span>
              <span>{formatCurr(getServicePrice(service))}</span>
            </div>
          ))}
          <div className="border-t pt-2">
            Tổng dịch vụ: {formatCurr(totalServiceAmount)}
          </div>
        </div>
      )}

      {/* Mã giảm giá */}
      {discountApplied && (
        <div className="border-t pt-2">
          Mã giảm giá: {form.discountCode}
          -{formatCurr(discountAmount)}
        </div>
      )}

      {/* Thành tiền */}
      <div className="border-t-2 pt-3">
        <div className="flex justify-between">
          <span>Thành tiền:</span>
          <span className="text-lg font-bold">
            {formatCurr(finalAmount)}
          </span>
        </div>
      </div>

      {/* Điểm tích lũy */}
      {(() => {
        const pointsEarned = calculatePoints(finalAmount);
        if (pointsEarned > 0) {
          return (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <Star /> Điểm tích lũy
              <p className="text-[10px]">
                {getPointsExplanation(finalAmount).join(" • ")}
              </p>
              <span className="text-lg font-bold">+{pointsEarned}</span>
            </div>
          );
        }
      })()}
    </div>
  </div>
)}
```

---

## ⚙️ LOGIC TỰ ĐỘNG TÍCH ĐIỂM

### ✅ **Cập nhật handleSubmit Function**

Khi admin nhấn "COMPLETE" hoặc "RETURNED" trong P5:

```typescript
const handleSubmit = (finalStatus?: Status) => {
  // ... existing discount logic ...

  // Calculate points earned if order is completed/returned
  let pointsEarned = 0;
  if ((finalStatus === "COMPLETE" || finalStatus === "RETURNED") && finalAmount > 0) {
    pointsEarned = calculatePoints(finalAmount);

    // Save to point history
    if (pointsEarned > 0) {
      addPointHistory({
        id: Date.now().toString(),
        customerPhone: form.phone,
        customerName: form.customerName,
        type: "earn",
        points: pointsEarned,
        date: new Date().toISOString(),
        description: `Đơn hàng #${machine?.id || "New"} - ${formatCurr(finalAmount)}`,
        relatedId: machine?.id?.toString() || "new",
      });
    }
  }

  // Save form with payment info and points
  const updatedForm = {
    ...form,
    discountAmount: discountApplied ? discountAmount : 0,
    finalAmount: finalAmount,
    paymentStatus: form.paymentStatus || "pending",
    pointsEarned: pointsEarned > 0 ? pointsEarned : undefined,
    status: finalStatus ?? STEP_STATUS[step]
  };

  onSave(updatedForm, machine?.id);
  
  // Show success message with points
  if (pointsEarned > 0) {
    setTimeout(() => {
      alert(`✅ Hoàn thành!\n\n🎉 Khách hàng nhận được ${pointsEarned} điểm thưởng!\n\n${getPointsExplanation(finalAmount).join("\n")}`);
    }, 100);
  }
  
  onClose();
};
```

---

## 📊 DEMO FLOW

### Scenario: Khách hàng đưa máy sửa

1. **P1 - Nhập thông tin:**
   - Chọn dịch vụ: "Vệ sinh máy" (50K), "Thay keo tản nhiệt" (30K)
   - Áp dụng mã giảm giá "SAVE10" (-8K)
   - **Chọn trạng thái thanh toán: "Đã thanh toán"**
   - Thành tiền: 72K

2. **P2-P4**: Quy trình test và sửa chữa

3. **P5 - Admin xác nhận:**
   - Hiển thị **HÓA ĐƠN CHI TIẾT**:
     ```
     DỊCH VỤ:
     • Vệ sinh máy          50,000đ
     • Thay keo tản nhiệt   30,000đ
     ─────────────────────────────
     Tổng dịch vụ:         80,000đ
     Mã giảm giá (SAVE10):  -8,000đ
     ═════════════════════════════
     THÀNH TIỀN:           72,000đ
     
     💳 Trạng thái: Đã thanh toán
     
     🎁 ĐIỂM TÍCH LŨY: +3 điểm
     • +1 điểm: Đưa máy sửa chữa
     • +2 điểm: Đơn hàng trên 50K
     ```

4. **Nhấn "RETURNED":**
   - ✅ Tự động cộng 3 điểm cho khách
   - ✅ Lưu lịch sử điểm
   - ✅ Hiển thị thông báo: "🎉 Khách hàng nhận được 3 điểm thưởng!"
   - ✅ Card trong danh sách cập nhật hiển thị:
     - Dịch vụ: "Vệ sinh máy" + "+1"
     - 💰 72,000đ | ✅ Đã thanh toán
     - ⭐ +3 điểm

---

## 🎯 Kết quả đạt được

### ✅ Card hiển thị (Hình 1):
- [x] Tên dịch vụ (tối đa 2, còn lại hiện "+X")
- [x] Số tiền thành tiền
- [x] Trạng thái thanh toán (Đã/Chưa/Miễn phí)
- [x] Điểm tích lũy (nếu có)

### ✅ Phiếu P1:
- [x] 3 nút chọn trạng thái thanh toán

### ✅ Phiếu P5:
- [x] Hóa đơn chi tiết với:
  - Danh sách dịch vụ + giá
  - Mã giảm giá (nếu có)
  - Thành tiền
  - Trạng thái thanh toán
  - Điểm tích lũy (tự động tính + giải thích quy tắc)

### ✅ Logic tự động:
- [x] Tính điểm khi hoàn thành
- [x] Lưu lịch sử điểm
- [x] Thông báo cho admin
- [x] Hiển thị trên card

---

## 📁 Files đã thay đổi

| File | Thay đổi |
|------|----------|
| `/src/app/pages/Machines.tsx` | ✅ Toàn bộ logic mới |

### Tổng số dòng code thêm mới: ~200 dòng

---

## 🚀 Cách sử dụng

1. Tạo/Sửa phiếu trong trang Machines
2. Ở P1: Chọn dịch vụ và trạng thái thanh toán
3. Ở P5: Xem hóa đơn chi tiết và điểm sẽ được cộng
4. Nhấn "COMPLETE" hoặc "RETURNED" → Tự động tích điểm
5. Xem card trong danh sách máy → Hiển thị đầy đủ thông tin

---

Hệ thống hoàn chỉnh! 🎉
