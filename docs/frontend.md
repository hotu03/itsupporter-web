# Frontend Technical Documentation

## 📋 Tổng quan

Frontend của hệ thống IT Supporter được xây dựng bằng React với TypeScript, sử dụng Vite làm build tool và shadcn/ui làm component library.

## 🏗️ Kiến trúc và Công nghệ

### Core Technologies
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool và dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library dựa trên Radix UI
- **Lucide React** - Icon library
- **React Router** - Client-side routing
- **React Hook Form** - Form management
- **Zod** - Schema validation

### State Management
- **React Hooks** - Local component state
- **LocalStorage** - Persistent data storage
- **Context API** - Shared state management

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript Compiler** - Type checking

## 📁 Cấu trúc thư mục

```
src/
├── app/
│   ├── components/          # Reusable components
│   │   ├── CustomerMachineCard.tsx
│   │   ├── Pagination.tsx
│   │   ├── PointRulesTab.tsx
│   │   ├── Sidebar.tsx
│   │   ├── SignatureCanvas.tsx
│   │   └── ui/              # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       └── ...
│   ├── data/                # Data management
│   │   ├── customers.ts     # Customer CRUD
│   │   ├── discounts.ts     # Discount management
│   │   ├── finance.ts       # Transaction management
│   │   ├── invoices.ts      # Invoice management
│   │   ├── machines.ts      # Machine/ticket management
│   │   ├── points.ts        # Points system
│   │   └── services.ts      # Service catalog
│   ├── pages/               # Page components
│   │   ├── CustomerLogin.tsx
│   │   ├── CustomerOTP.tsx
│   │   ├── CustomerPortal.tsx
│   │   ├── Customers.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Finance.tsx
│   │   ├── Invoices.tsx
│   │   ├── Machines.tsx
│   │   ├── Personnel.tsx
│   │   ├── ServiceRegistration.tsx
│   │   ├── SignIn.tsx
│   │   ├── SignUp.tsx
│   │   └── ...
│   └── routes.tsx           # Application routes
├── main.tsx                 # Application entry point
└── index.css                # Global styles
```

## 🔧 Cài đặt và Chạy

### Prerequisites
```bash
Node.js >= 18.0.0
npm >= 8.0.0 or pnpm >= 7.0.0
```

### Installation
```bash
# Clone repository
git clone <repository-url>
cd itsupporter/design

# Install dependencies
pnpm install
```

### Development
```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Type checking
pnpm type-check

# Linting
pnpm lint

# Format code
pnpm format
```

## 🎨 Component Architecture

### Page Components
Mỗi trang tương ứng với một route và chứa logic chính của tính năng đó.

#### Machines.tsx
- **Chức năng**: Quản lý phiếu sửa chữa 5 giai đoạn
- **State**: machines, activeTab, selectedMachine
- **Sub-components**: MachineCard, phiếu P1-P5 forms

#### Finance.tsx
- **Chức năng**: Quản lý giao dịch, dịch vụ, mã giảm giá
- **State**: transactions, services, discounts, activeTab
- **Sub-components**: TransactionList, ServiceForm, DiscountForm, PointRulesTab

### Reusable Components

#### CustomerMachineCard
```typescript
interface CustomerMachineCardProps {
  machine: Machine;
}
```
- Hiển thị thông tin phiếu cho khách hàng
- Trạng thái phiếu với màu sắc phân biệt
- Thông tin chi phí và điểm thưởng (khi hoàn thành)

#### Pagination
```typescript
interface PaginationProps {
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}
```
- Phân trang với tùy chọn số item/trang
- Tích hợp với table và list components

#### SignatureCanvas
```typescript
interface SignatureCanvasProps {
  onSave: (signature: string) => void;
  width?: number;
  height?: number;
}

interface SignatureCanvasHandle {
  clear: () => void;
  isEmpty: () => boolean;
}
```
- Chữ ký điện tử cho xác nhận hoàn thành
- Xuất dưới dạng base64 image
- Imperative handle để control từ parent

## 🔄 Data Management

### Data Layer Structure
Mỗi module trong `src/app/data/` quản lý một domain cụ thể:

#### machines.ts
```typescript
interface Machine {
  id: number;
  status: Status;
  customerName: string;
  phone: string;
  // ... other fields
}

export function getMachines(): Machine[]
export function saveMachines(machines: Machine[]): void
export function addMachine(machine: Omit<Machine, 'id'>): Machine
export function updateMachine(id: number, updates: Partial<Machine>): void
export function deleteMachine(id: number): void
```

#### customers.ts
```typescript
interface Customer {
  id: number;
  name: string;
  phone: string;
  totalRepairs: number;
  points: number;
}

export function getCustomers(): Customer[]
export function saveCustomers(customers: Customer[]): void
export function addOrUpdateCustomer(customer: Omit<Customer, 'id'>): Customer
```

### LocalStorage Strategy
- **Key naming**: `its_{domain}` (its_machines, its_customers, etc.)
- **Persistence**: Auto-save khi có thay đổi
- **Error handling**: Fallback to empty array nếu parse thất bại
- **Type safety**: Full TypeScript typing

## 🎯 Routing System

### Route Configuration
```typescript
export const router = createBrowserRouter([
  { path: "/", Component: SignIn },
  { path: "/signup", Component: SignUp },
  { path: "/dashboard", Component: DashboardLayout, children: [...] },
  { path: "/customer/login", Component: CustomerLogin },
  // ... other routes
]);
```

### Protected Routes
- **Authentication check**: Kiểm tra session trong localStorage
- **Role-based access**: Component hiển thị theo quyền user
- **Redirect logic**: Chuyển hướng về login nếu chưa đăng nhập

## 📱 Responsive Design

### Breakpoints
```css
/* Tailwind default breakpoints */
.sm: 640px
.md: 768px
.lg: 1024px
.xl: 1280px
.2xl: 1536px
```

### Mobile-First Approach
- Grid layouts responsive
- Touch-friendly buttons (min 44px)
- Swipe gestures cho mobile
- Optimized forms cho mobile keyboard

## ♿ Accessibility

### ARIA Support
- Semantic HTML elements
- ARIA labels cho screen readers
- Keyboard navigation
- Focus management

### Form Validation
- Real-time validation feedback
- Error messages rõ ràng
- Required field indicators
- Success/error states

## 🔍 Performance Optimization

### Code Splitting
```typescript
// Lazy loading pages
const Machines = lazy(() => import('./pages/Machines'));
const Finance = lazy(() => import('./pages/Finance'));

// Suspense boundaries
<Suspense fallback={<div>Loading...</div>}>
  <Routes>...</Routes>
</Suspense>
```

### Memoization
```typescript
const filteredMachines = useMemo(() =>
  machines.filter(m => m.status === activeFilter),
  [machines, activeFilter]
);
```

### Bundle Analysis
```bash
# Analyze bundle size
pnpm build && npx vite-bundle-analyzer dist
```

## 🧪 Testing Strategy

### Unit Tests
```typescript
// Component testing with React Testing Library
import { render, screen } from '@testing-library/react';
import { MachineCard } from './MachineCard';

test('renders machine info', () => {
  render(<MachineCard machine={mockMachine} />);
  expect(screen.getByText(mockMachine.category)).toBeInTheDocument();
});
```

### Integration Tests
```typescript
// Form submission testing
test('submits machine form', async () => {
  render(<MachineForm onSave={mockOnSave} />);

  await userEvent.type(screen.getByLabelText(/customer name/i), 'John Doe');
  await userEvent.click(screen.getByRole('button', { name: /save/i }));

  expect(mockOnSave).toHaveBeenCalledWith(expect.objectContaining({
    customerName: 'John Doe'
  }));
});
```

## 🚀 Deployment

### Build Process
```bash
# Production build
pnpm build

# Output: dist/ folder
# - index.html
# - assets/ (JS, CSS, images)
# - Static files
```

### Environment Variables
```bash
# .env file
VITE_API_URL=https://api.itsupporter.com
VITE_APP_NAME=IT Supporter
```

### CDN Deployment
- Upload `dist/` folder to CDN
- Configure cache headers
- Set up error pages

## 📊 Monitoring

### Error Tracking
```typescript
// Global error boundary
class ErrorBoundary extends Component {
  componentDidCatch(error, errorInfo) {
    // Send to error tracking service
    logError(error, errorInfo);
  }
}
```

### Performance Monitoring
```typescript
// Web Vitals tracking
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

onCLS(console.log);
onFID(console.log);
// ... other metrics
```

## 🔐 Security

### Input Validation
- Zod schemas cho tất cả forms
- Sanitize user inputs
- Type-safe API calls

### Authentication
- Session-based auth
- Secure localStorage usage
- Auto-logout on inactivity

## 📝 Development Guidelines

### Code Style
- TypeScript strict mode
- ESLint rules enforcement
- Prettier auto-formatting
- Conventional commits

### Git Workflow
```bash
# Feature branch workflow
git checkout -b feature/machine-card-improvements
git commit -m "feat: enhance machine card display"
git push origin feature/machine-card-improvements
```

### Pull Request Template
- Description of changes
- Screenshots for UI changes
- Testing instructions
- Breaking changes (if any)</content>
</xai:function_call">Create comprehensive frontend technical documentation