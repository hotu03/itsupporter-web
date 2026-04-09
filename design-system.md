# 🎨 Design System - IT Supporter

## 📋 Tổng quan

Design System là foundation cho UI consistency, bao gồm colors, typography, spacing, components, và text constants.

## 📁 Cấu trúc Design System

```
design-system/
├── colors.ts              # Color palette & theming
├── typography.ts          # Font families & text styles
├── spacing.ts             # Spacing scale & layout
├── text-constants.ts      # Reusable text strings
├── component-tokens.ts    # Component-specific tokens
├── breakpoints.ts         # Responsive breakpoints
└── index.ts               # Main exports
```

---

## 🎨 Color System

### Primary Colors
```typescript
export const colors = {
  // Brand Colors
  primary: {
    50: '#eff6ff',   // Lightest
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',  // Main brand color
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',  // Darkest
  },

  // Semantic Colors
  success: {
    50: '#f0fdf4',
    500: '#22c55e',
    600: '#16a34a',
  },

  warning: {
    50: '#fffbeb',
    500: '#f59e0b',
    600: '#d97706',
  },

  error: {
    50: '#fef2f2',
    500: '#ef4444',
    600: '#dc2626',
  },

  // Neutral Colors
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
} as const;
```

### Usage Examples
```typescript
// Component styling
const buttonStyles = {
  primary: `bg-blue-500 hover:bg-blue-600 text-white`,
  success: `bg-green-500 hover:bg-green-600 text-white`,
  danger: `bg-red-500 hover:bg-red-600 text-white`,
};

// Status colors
const statusColors = {
  WAITING: colors.warning[500],
  RUNNING: colors.primary[500],
  COMPLETE: colors.success[500],
} as const;
```

---

## 📝 Typography System

### Font Families
```typescript
export const typography = {
  fontFamily: {
    primary: ['Inter', 'system-ui', 'sans-serif'],
    secondary: ['Roboto', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },

  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
  },

  fontWeight: {
    thin: 100,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  lineHeight: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
} as const;
```

### Text Styles
```typescript
export const textStyles = {
  h1: `
    font-size: ${typography.fontSize['4xl']};
    font-weight: ${typography.fontWeight.bold};
    line-height: ${typography.lineHeight.tight};
    color: ${colors.gray[900]};
  `,

  h2: `
    font-size: ${typography.fontSize['3xl']};
    font-weight: ${typography.fontWeight.semibold};
    line-height: ${typography.lineHeight.tight};
    color: ${colors.gray[900]};
  `,

  body: `
    font-size: ${typography.fontSize.base};
    font-weight: ${typography.fontWeight.normal};
    line-height: ${typography.lineHeight.normal};
    color: ${colors.gray[700]};
  `,

  caption: `
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.normal};
    line-height: ${typography.lineHeight.normal};
    color: ${colors.gray[500]};
  `,
} as const;
```

---

## 📏 Spacing System

### Spacing Scale
```typescript
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
} as const;
```

### Layout Spacing
```typescript
export const layout = {
  container: {
    maxWidth: '1200px',
    padding: spacing[4],
  },

  section: {
    paddingY: spacing[12],
    paddingX: spacing[4],
  },

  card: {
    padding: spacing[6],
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
} as const;
```

---

## 📝 Text Constants

### UI Text
```typescript
export const uiText = {
  // Navigation
  nav: {
    dashboard: 'Trang chủ',
    machines: 'Máy móc',
    customers: 'Khách hàng',
    personnel: 'Nhân sự',
    finance: 'Tài chính',
    settings: 'Cài đặt',
  },

  // Actions
  actions: {
    save: 'Lưu',
    cancel: 'Hủy',
    delete: 'Xóa',
    edit: 'Chỉnh sửa',
    create: 'Tạo mới',
    search: 'Tìm kiếm',
    filter: 'Lọc',
    export: 'Xuất dữ liệu',
    import: 'Nhập dữ liệu',
  },

  // Status
  status: {
    waiting: 'Chờ xử lý',
    running: 'Đang sửa chữa',
    complete: 'Hoàn thành',
    pending: 'Chờ xác nhận',
    cancelled: 'Đã hủy',
  },

  // Messages
  messages: {
    loading: 'Đang tải...',
    error: 'Có lỗi xảy ra',
    success: 'Thành công',
    confirmDelete: 'Bạn có chắc muốn xóa?',
    noData: 'Không có dữ liệu',
  },
} as const;
```

### Business Text
```typescript
export const businessText = {
  // Machine categories
  categories: {
    laptop: 'Máy tính xách tay',
    desktop: 'Máy tính để bàn',
    monitor: 'Màn hình',
    printer: 'Máy in',
    other: 'Khác',
  },

  // Warranty status
  warranty: {
    con: 'Còn bảo hành',
    het: 'Hết bảo hành',
  },

  // Payment status
  payment: {
    paid: 'Đã thanh toán',
    pending: 'Chưa thanh toán',
    free: 'Miễn phí',
  },

  // User roles
  roles: {
    admin: 'Quản trị viên',
    technician: 'Kỹ thuật viên',
    tester: 'Kiểm tra viên',
    customer: 'Khách hàng',
  },
} as const;
```

### Form Labels & Placeholders
```typescript
export const formText = {
  // Machine form
  machine: {
    customerName: {
      label: 'Tên khách hàng',
      placeholder: 'Nhập tên khách hàng',
    },
    phone: {
      label: 'Số điện thoại',
      placeholder: '0123456789',
    },
    category: {
      label: 'Loại thiết bị',
      placeholder: 'Chọn loại thiết bị',
    },
    description: {
      label: 'Mô tả vấn đề',
      placeholder: 'Mô tả chi tiết vấn đề cần sửa',
    },
  },

  // Customer form
  customer: {
    name: {
      label: 'Họ tên',
      placeholder: 'Nguyễn Văn A',
    },
    phone: {
      label: 'Số điện thoại',
      placeholder: '0123456789',
    },
    email: {
      label: 'Email (tùy chọn)',
      placeholder: 'example@email.com',
    },
  },
} as const;
```

---

## 🔧 Component Tokens

### Button Variants
```typescript
export const buttonTokens = {
  variants: {
    primary: {
      backgroundColor: colors.primary[500],
      color: 'white',
      hoverBackgroundColor: colors.primary[600],
      borderRadius: '0.375rem',
      padding: `${spacing[2]} ${spacing[4]}`,
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
    },

    secondary: {
      backgroundColor: 'white',
      color: colors.gray[700],
      border: `1px solid ${colors.gray[300]}`,
      hoverBackgroundColor: colors.gray[50],
    },

    danger: {
      backgroundColor: colors.error[500],
      color: 'white',
      hoverBackgroundColor: colors.error[600],
    },
  },

  sizes: {
    sm: {
      padding: `${spacing[1]} ${spacing[3]}`,
      fontSize: typography.fontSize.xs,
    },

    md: {
      padding: `${spacing[2]} ${spacing[4]}`,
      fontSize: typography.fontSize.sm,
    },

    lg: {
      padding: `${spacing[3]} ${spacing[6]}`,
      fontSize: typography.fontSize.base,
    },
  },
} as const;
```

### Input Styles
```typescript
export const inputTokens = {
  base: {
    borderRadius: '0.375rem',
    border: `1px solid ${colors.gray[300]}`,
    padding: `${spacing[2]} ${spacing[3]}`,
    fontSize: typography.fontSize.sm,
    backgroundColor: 'white',
    transition: 'border-color 0.15s ease-in-out',
  },

  states: {
    focus: {
      borderColor: colors.primary[500],
      boxShadow: `0 0 0 3px ${colors.primary[100]}`,
    },

    error: {
      borderColor: colors.error[500],
      boxShadow: `0 0 0 3px ${colors.error[100]}`,
    },

    disabled: {
      backgroundColor: colors.gray[50],
      color: colors.gray[400],
      cursor: 'not-allowed',
    },
  },
} as const;
```

### Card Styles
```typescript
export const cardTokens = {
  variants: {
    default: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: `1px solid ${colors.gray[200]}`,
    },

    elevated: {
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },

    outlined: {
      backgroundColor: 'transparent',
      border: `2px solid ${colors.gray[200]}`,
      boxShadow: 'none',
    },
  },

  padding: {
    sm: spacing[4],
    md: spacing[6],
    lg: spacing[8],
  },
} as const;
```

---

## 📱 Responsive Breakpoints

### Breakpoint System
```typescript
export const breakpoints = {
  sm: '640px',   // Small devices (phones)
  md: '768px',   // Medium devices (tablets)
  lg: '1024px',  // Large devices (desktops)
  xl: '1280px',  // Extra large devices
  '2xl': '1536px', // 2X large devices
} as const;

// Media queries
export const mediaQueries = {
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
} as const;
```

### Responsive Utilities
```typescript
export const responsive = {
  // Hide/show utilities
  hidden: {
    mobile: `block ${mediaQueries.md} { display: none; }`,
    tablet: `block ${mediaQueries.lg} { display: none; }`,
    desktop: `hidden ${mediaQueries.lg} { display: block; }`,
  },

  // Grid systems
  grid: {
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    },
  },
} as const;
```

---

## 🎯 Usage Guidelines

### Importing Design Tokens
```typescript
// Import specific tokens
import { colors, typography, spacing } from '../design-system';

// Import all
import * as DS from '../design-system';

// Usage in components
const buttonStyle = {
  backgroundColor: DS.colors.primary[500],
  padding: DS.spacing[4],
  fontSize: DS.typography.fontSize.sm,
};
```

### Component Implementation
```typescript
import { colors, buttonTokens } from '../design-system';

interface ButtonProps {
  variant?: keyof typeof buttonTokens.variants;
  size?: keyof typeof buttonTokens.sizes;
  children: React.ReactNode;
}

export function Button({ variant = 'primary', size = 'md', children }: ButtonProps) {
  const variantStyles = buttonTokens.variants[variant];
  const sizeStyles = buttonTokens.sizes[size];

  return (
    <button
      className="..."
      style={{
        ...variantStyles,
        ...sizeStyles,
      }}
    >
      {children}
    </button>
  );
}
```

### Text Constants Usage
```typescript
import { uiText, businessText } from '../design-system';

// In components
const deleteButton = (
  <button onClick={handleDelete}>
    {uiText.actions.delete}
  </button>
);

const statusBadge = (
  <span className={getStatusClass(status)}>
    {businessText.status[status.toLowerCase()]}
  </span>
);
```

---

## 🔄 Maintenance & Updates

### Adding New Colors
```typescript
// 1. Add to colors.ts
export const colors = {
  // ... existing colors
  accent: {
    50: '#fdf4ff',
    500: '#a855f7',
    600: '#9333ea',
  },
} as const;

// 2. Update TypeScript types
export type ColorKey = keyof typeof colors;

// 3. Update usage in components
const accentButton = `bg-accent-500 hover:bg-accent-600`;
```

### Adding Text Constants
```typescript
// 1. Add to text-constants.ts
export const uiText = {
  // ... existing
  actions: {
    // ... existing
    duplicate: 'Nhân bản',
    archive: 'Lưu trữ',
  },
} as const;

// 2. Update components to use new constants
const archiveButton = (
  <button>{uiText.actions.archive}</button>
);
```

### Version Control
- **Semantic Versioning**: 1.0.0, 1.1.0, 2.0.0
- **Breaking Changes**: Major version bump
- **New Features**: Minor version bump
- **Bug Fixes**: Patch version bump

---

## 📊 Quality Assurance

### Design System Testing
```typescript
// Color contrast testing
describe('Design System', () => {
  test('primary colors meet contrast requirements', () => {
    const contrast = getContrastRatio(colors.primary[500], 'white');
    expect(contrast).toBeGreaterThan(4.5); // WCAG AA
  });

  test('text constants are not empty', () => {
    Object.values(uiText.actions).forEach(text => {
      expect(text).toBeTruthy();
      expect(typeof text).toBe('string');
    });
  });
});
```

### Visual Regression Testing
```typescript
// Component visual testing
describe('Button Component', () => {
  test('primary button matches design', () => {
    const { container } = render(<Button variant="primary">Click me</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
```

---

## 📚 Documentation

### Component Documentation
```typescript
interface ButtonProps {
  /**
   * Button variant that determines color and style
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'danger';

  /**
   * Button size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Button content
   */
  children: React.ReactNode;
}
```

### Design Token Documentation
- **Color Usage**: When to use each color
- **Typography Scale**: Heading hierarchy
- **Spacing Scale**: Consistent spacing rules
- **Component Variants**: When to use each variant

---

## 🎨 Customization Guidelines

### Brand Colors
- **Primary**: Main brand color (#3b82f6)
- **Secondary**: Supporting color
- **Accent**: Highlight/special elements
- **Neutral**: Grays for text and backgrounds

### Dark Mode Support
```typescript
export const darkColors = {
  primary: {
    500: '#60a5fa', // Lighter for dark backgrounds
    600: '#3b82f6',
    700: '#2563eb',
  },
  // ... other dark mode colors
} as const;
```

### Theme Switching
```typescript
export const themes = {
  light: lightColors,
  dark: darkColors,
} as const;

export type Theme = keyof typeof themes;
```

---

This design system ensures consistency, maintainability, and scalability across the entire IT Supporter application. All components, colors, typography, and text should reference these tokens to maintain visual coherence.</content>
</xai:function_call">Create comprehensive design system documentation with all the design tokens, text constants, and usage guidelines