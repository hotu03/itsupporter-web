# Assets/Images

Thư mục này dùng để chứa các file ảnh (PNG, JPG, SVG, WebP...) cho toàn bộ dự án.

## Cấu trúc khuyến nghị

```
assets/images/
├── logos/           # Logo, brand assets
├── backgrounds/     # Background images, hero images
├── icons/           # Custom SVG icons (nếu không dùng Lucide)
├── screenshots/     # Screenshots cho documentation
├── ui/              # UI elements, illustrations
└── placeholders/    # Placeholder images
```

## Usage trong React/Vite

```tsx
import logo from '../assets/images/logos/it-supporter.png';
// or for public folder: <img src="/images/logo.png" />
```

**Lưu ý**: 
- Ưu tiên SVG cho icons
- Sử dụng WebP cho ảnh lớn
- Tối ưu kích thước trước khi commit
```

## Export index (nếu cần)

Tạo file `index.ts` nếu bạn muốn import centralised.
