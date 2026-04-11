# Font System (Montserrat)

Cấu trúc dựa trên tư duy tổ chức của Font Awesome: **family → style → variant**.

```
assets/fonts/
├── families/
│   └── montserrat/
│       ├── *.woff2
│       └── montserrat.css
├── index.ts
└── README.md
```

## 1) Import CSS

```ts
import './assets/fonts/families/montserrat/montserrat.css';
```

> Hoặc dùng alias từ `index.ts`:

```ts
import { MONTSERRAT_CSS } from './assets/fonts';
import MONTSERRAT_CSS from './assets/fonts/families/montserrat/montserrat.css';
```

## 2) Dùng mapping

```tsx
import { fontStyle, FONT_WEIGHT } from './assets/fonts';

<h1 style={fontStyle('heading', 'bold')}>Heading</h1>
<p style={fontStyle('sans', 'regular')}>Body text</p>
```

## 3) Tailwind

```js
import { TAILWIND_FONT_THEME } from './assets/fonts';

// tailwind.config.js
export default {
  theme: {
    extend: TAILWIND_FONT_THEME,
  },
};
```

## 4) Registry

Thêm font mới:
1. `assets/fonts/families/<font-id>/`
2. Tạo `<font-id>.css` với @font-face trỏ file local
3. Add vào `FONT_REGISTRY` trong `assets/fonts/index.ts`

## 5) Notes

- Montserrat là variable font (100–900), không cần tách file theo weight.
- Các subset được giữ đầy đủ (latin, latin-ext, vietnamese, cyrillic, cyrillic-ext).
