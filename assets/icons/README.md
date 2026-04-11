# Icon System (Font Awesome Inspired)

Cấu trúc dựa trên tư duy tổ chức của Font Awesome: **family → style → variant**.

```
assets/icons/
├── families/
│   └── fontawesome/
│       ├── solid/
│       │   ├── fontawesome.woff2  # Phải tải file font thực từ FA free
│       │   └── fontawesome.css
│       ├── regular/
│       └── brands/
├── index.ts           # ICON_MAP + IconName
├── Icon.tsx           # <i className={ICON_MAP[name]}>
└── README.md
```

Lưu ý: woff2 = file font glyph thực. Phải tải Font Awesome 6 Free webfonts (solid.woff2) đặt vào đây. Chỉ import CSS local, không CDN/Lucide.

## 1) Icon Mapping từ UI Pictures

Dựa trên các ảnh giao diện, mapping icons cho các module:

### Dashboard
- `dashboard`: Home/Dashboard overview
- `machines`: Cog hoặc Tools (máy móc)
- `customers`: Users (khách hàng)
- `personnel`: User-group (nhân sự)
- `finance`: Dollar-sign (tài chính)
- `notifications`: Bell (thông báo)
- `search`: Search icon
- `filter`: Filter icon

### Machine Management
- `laptop`: Laptop icon (máy tính xách tay)
- `desktop`: Monitor icon (máy tính để bàn)
- `monitor`: Display icon (màn hình)
- `printer`: Printer icon (máy in)
- `receipt`: File-text (phiếu nhận máy)
- `add_machine`: Plus icon
- `status_pending`: Clock (chờ xử lý)
- `status_running`: Wrench (đang sửa)
- `status_complete`: Check-circle (hoàn thành)

### Personnel Management
- `admin`: Shield (quản trị viên)
- `technician`: User-cog (kỹ thuật viên)
- `tester`: Clipboard-check (kiểm tra viên)
- `users`: Users (nhân sự)
- `add_user`: Plus
- `approve`: Check
- `create`: Plus-circle

### Finance
- `transactions`: Dollar-sign (giao dịch)
- `services`: Settings (dịch vụ)
- `discounts`: Tag (giảm giá)
- `invoices`: File (hóa đơn)
- `add_service`: Plus
- `add_discount`: Tag icon

### Customer
- `customer`: User (khách hàng)
- `my_machines`: Laptop (máy của tôi)
- `invoices`: File-text (hóa đơn)
- `profile`: User-circle (thông tin cá nhân)

### Actions (Common)
- `add`: Plus
- `edit`: Pencil
- `delete`: Trash
- `save`: Save
- `cancel`: X
- `search`: Search
- `filter`: Filter
- `print`: Printer
- `download`: Download
- `refresh`: Refresh
- `loading`: Loader

### Status
- `success`: Check-circle
- `error`: X-circle
- `warning`: Alert-triangle
- `info`: Info

### Navigation
- `menu`: Menu (hamburger)
- `close`: X
- `back`: Arrow-left
- `forward`: Arrow-right
- `logout`: Log-out

## 2) Import CSS (nếu dùng Font Awesome files)

```ts
import './assets/icons/families/fontawesome/solid/fontawesome.css';
```

## 3) Icon Mapping Usage

```tsx
import { ICONS, Icon } from './assets/icons';

// Simple usage
<Icon name={ICONS.dashboard} size="md" />

// With custom styling
<Icon name={ICONS.success} size="lg" color="success" className="mr-2" />
```

## 4) Font Awesome Integration

Sử dụng Font Awesome files được import qua CSS để có performance và consistency tốt nhất:

```tsx
// Trong index.ts - mapping icons với FA classes
export const ICON_MAP = {
  dashboard: 'fas fa-home',
  search: 'fas fa-search',
  user: 'fas fa-user',
  // ...
};
```

## 5) Adding New Icons

1. Thêm vào `ICON_MAP` trong `index.ts`
2. Map với Font Awesome class tương ứng
3. Add type vào `IconName`
4. Update documentation

## 6) Custom Icons (CSS-only)

Cho icons đặc thù của IT Support - dùng Font Awesome alternatives hoặc custom CSS class (không dùng nguồn icon khác):

```css
/* Trong fontawesome.css hoặc override riêng */
.custom-repair::before { content: "\f0ad"; } /* wrench */
.custom-qr::before { content: "\f029"; } /* qrcode */
```

## 7) Notes

- Chỉ dùng Font Awesome CSS import; không dùng Lucide/custom SVG libs
- Icons được categorize theo module: navigation, actions, status, business
- Type-safe với TypeScript
- Fallback system nếu icon không tồn tại