# Hướng dẫn cập nhật Finance.tsx để hỗ trợ hệ thống điểm thưởng

## 1. Thêm imports

```typescript
import { Award } from "lucide-react";
import PointRulesTab from "../components/PointRulesTab";
```

## 2. Cập nhật activeTab type

Thay đổi dòng 103:
```typescript
// CŨ:
const [activeTab, setActiveTab] = useState<"transactions" | "services" | "discounts">("transactions");

// MỚI:
const [activeTab, setActiveTab] = useState<"transactions" | "services" | "discounts" | "point_rules">("transactions");
```

## 3. Cập nhật discountFormData state (dòng 143)

Thêm 2 fields mới:
```typescript
const [discountFormData, setDiscountFormData] = useState({
  code: "",
  discountPercent: "",
  maxDiscount: "",
  usageLimit: "",
  validFrom: "",
  validUntil: "",
  description: "",
  isRedeemable: false,      // THÊM MỚI
  pointsRequired: "",        // THÊM MỚI
});
```

## 4. Cập nhật handleOpenDiscountModal (dòng 397)

Thêm 2 fields vào formData khi edit:
```typescript
const handleOpenDiscountModal = (discount?: DiscountCode) => {
  if (discount) {
    setEditingDiscount(discount);
    setDiscountFormData({
      code: discount.code,
      discountPercent: discount.discountPercent.toString(),
      maxDiscount: discount.maxDiscount.toString(),
      usageLimit: discount.usageLimit.toString(),
      validFrom: discount.validFrom,
      validUntil: discount.validUntil,
      description: discount.description || "",
      isRedeemable: discount.isRedeemable || false,    // THÊM MỚI
      pointsRequired: discount.pointsRequired?.toString() || "",  // THÊM MỚI
    });
  } else {
    setEditingDiscount(null);
    setDiscountFormData({
      code: "",
      discountPercent: "",
      maxDiscount: "",
      usageLimit: "",
      validFrom: "",
      validUntil: "",
      description: "",
      isRedeemable: false,    // THÊM MỚI
      pointsRequired: "",      // THÊM MỚI
    });
  }
  setShowDiscountModal(true);
};
```

## 5. Cập nhật handleCloseDiscountModal (dòng 424)

Thêm reset cho 2 fields mới:
```typescript
const handleCloseDiscountModal = () => {
  setShowDiscountModal(false);
  setEditingDiscount(null);
  setDiscountFormData({
    code: "",
    discountPercent: "",
    maxDiscount: "",
    usageLimit: "",
    validFrom: "",
    validUntil: "",
    description: "",
    isRedeemable: false,    // THÊM MỚI
    pointsRequired: "",      // THÊM MỚI
  });
};
```

## 6. Cập nhật handleSaveDiscount (dòng 438)

Thêm validation và save cho fields mới:
```typescript
const handleSaveDiscount = () => {
  if (!discountFormData.code.trim()) {
    alert("Vui lòng nhập mã giảm giá");
    return;
  }

  const discountPercent = parseFloat(discountFormData.discountPercent) || 0;
  const maxDiscount = parseFloat(discountFormData.maxDiscount) || 0;
  const usageLimit = parseInt(discountFormData.usageLimit) || 0;

  if (discountPercent <= 0 || discountPercent > 100) {
    alert("Phần trăm giảm giá phải từ 1-100");
    return;
  }

  if (!discountFormData.validFrom || !discountFormData.validUntil) {
    alert("Vui lòng nhập thời gian áp dụng");
    return;
  }

  // VALIDATION MỚI: Kiểm tra nếu isRedeemable = true thì phải có pointsRequired
  if (discountFormData.isRedeemable) {
    const pointsRequired = parseInt(discountFormData.pointsRequired) || 0;
    if (pointsRequired <= 0) {
      alert("Vui lòng nhập số điểm yêu cầu để đổi mã");
      return;
    }
  }

  // Check if code already exists (for new discounts only)
  if (!editingDiscount) {
    const codeExists = discounts.some(
      (d) => d.code.toUpperCase() === discountFormData.code.toUpperCase()
    );
    if (codeExists) {
      alert("Mã giảm giá này đã tồn tại");
      return;
    }
  }

  if (editingDiscount) {
    const updated = discounts.map((d) =>
      d.id === editingDiscount.id
        ? {
            ...d,
            code: discountFormData.code.toUpperCase(),
            discountPercent,
            maxDiscount,
            usageLimit,
            validFrom: discountFormData.validFrom,
            validUntil: discountFormData.validUntil,
            description: discountFormData.description || undefined,
            isRedeemable: discountFormData.isRedeemable,  // THÊM MỚI
            pointsRequired: discountFormData.isRedeemable 
              ? parseInt(discountFormData.pointsRequired) 
              : undefined,  // THÊM MỚI
          }
        : d
    );
    setDiscounts(updated);
    saveDiscounts(updated);
  } else {
    const newDiscount: DiscountCode = {
      id: Date.now().toString(),
      code: discountFormData.code.toUpperCase(),
      discountPercent,
      maxDiscount,
      usageLimit,
      usageCount: 0,
      validFrom: discountFormData.validFrom,
      validUntil: discountFormData.validUntil,
      description: discountFormData.description || undefined,
      isRedeemable: discountFormData.isRedeemable,  // THÊM MỚI
      pointsRequired: discountFormData.isRedeemable 
        ? parseInt(discountFormData.pointsRequired) 
        : undefined,  // THÊM MỚI
    };
    const updated = [...discounts, newDiscount];
    setDiscounts(updated);
    saveDiscounts(updated);
  }
  handleCloseDiscountModal();
};
```

## 7. Thêm tab "Quy tắc điểm" vào phần Tabs (sau dòng 604)

Thêm tab button sau tab "Mã giảm giá":
```tsx
<button
  onClick={() => setActiveTab("point_rules")}
  className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
    activeTab === "point_rules"
      ? "border-b-2 border-orange-500 text-orange-600"
      : "text-gray-500 hover:text-gray-700"
  }`}
>
  <Award size={16} />
  Quy tắc điểm
</button>
```

## 8. Thêm nội dung tab Point Rules (sau phần Discounts Tab content)

Thêm sau phần `{/* Discounts Tab */}` khoảng dòng 1000+:
```tsx
{/* Point Rules Tab */}
{activeTab === "point_rules" && (
  <>
    <PointRulesTab />
  </>
)}
```

## 9. Cập nhật button header "Thêm..." (dòng 549)

Cập nhật logic để hiển thị text phù hợp:
```tsx
<button
  onClick={() =>
    activeTab === "transactions"
      ? handleOpenModal()
      : activeTab === "services"
      ? handleOpenServiceModal()
      : activeTab === "discounts"
      ? handleOpenDiscountModal()
      : () => {}  // point_rules tự quản lý modal
  }
  className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
>
  <Plus size={18} />
  {activeTab === "transactions"
    ? "Thêm giao dịch"
    : activeTab === "services"
    ? "Thêm dịch vụ"
    : activeTab === "discounts"
    ? "Thêm mã giảm giá"
    : "Thêm quy tắc"}
</button>
```

## 10. Cập nhật Discount Modal Form (tìm modal của discount)

Thêm vào body của modal (sau trường description):
```tsx
{/* Checkbox: Có thể đổi điểm */}
<div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
  <input
    type="checkbox"
    id="isRedeemable"
    checked={discountFormData.isRedeemable}
    onChange={(e) =>
      setDiscountFormData({
        ...discountFormData,
        isRedeemable: e.target.checked,
        pointsRequired: e.target.checked ? discountFormData.pointsRequired : "",
      })
    }
    className="mt-0.5 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
  />
  <div className="flex-1">
    <label htmlFor="isRedeemable" className="block text-sm font-medium text-gray-700 cursor-pointer">
      Có thể đổi bằng điểm thưởng
    </label>
    <p className="text-xs text-gray-500 mt-1">
      Khách hàng có thể dùng điểm tích lũy để đổi mã giảm giá này
    </p>
  </div>
</div>

{/* Số điểm yêu cầu (chỉ hiện nếu isRedeemable = true) */}
{discountFormData.isRedeemable && (
  <div className="animate-fadeIn">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Số điểm yêu cầu <span className="text-red-500">*</span>
    </label>
    <input
      type="number"
      value={discountFormData.pointsRequired}
      onChange={(e) =>
        setDiscountFormData({ ...discountFormData, pointsRequired: e.target.value })
      }
      placeholder="VD: 20"
      min="1"
      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
    />
    <p className="text-xs text-gray-500 mt-1">
      Khách hàng cần có ít nhất số điểm này để đổi mã
    </p>
  </div>
)}
```

## 11. Cập nhật Discount Table - thêm cột "Đổi điểm"

Trong phần hiển thị bảng discounts, thêm badge để hiện số điểm:
```tsx
<td className="px-4 py-3">
  <div className="flex flex-col gap-1">
    <span className="text-sm text-gray-900">{discount.code}</span>
    <div className="flex items-center gap-2">
      {discount.description && (
        <span className="text-xs text-gray-400">{discount.description}</span>
      )}
      {discount.isRedeemable && discount.pointsRequired && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Star size={10} className="fill-yellow-500" />
          {discount.pointsRequired} điểm
        </span>
      )}
    </div>
  </div>
</td>
```

---

## Tóm tắt các thay đổi:

1. ✅ Thêm import Award icon và PointRulesTab component
2. ✅ Cập nhật activeTab type để bao gồm "point_rules"
3. ✅ Thêm fields isRedeemable và pointsRequired vào discountFormData
4. ✅ Cập nhật handleOpenDiscountModal, handleCloseDiscountModal, handleSaveDiscount
5. ✅ Thêm tab button "Quy tắc điểm"
6. ✅ Thêm nội dung tab Point Rules
7. ✅ Cập nhật button header
8. ✅ Thêm form fields vào Discount Modal
9. ✅ Cập nhật hiển thị bảng discounts

Sau khi áp dụng các thay đổi này, hệ thống điểm thưởng sẽ hoàn chỉnh!
