# Backend Technical Documentation

## 📋 Tổng quan

Backend của hệ thống IT Supporter được implement dưới dạng client-side data management layer sử dụng LocalStorage làm persistent storage. Bao gồm business logic, data validation, và API-like functions.

## 🏗️ Kiến trúc và Công nghệ

### Core Technologies
- **TypeScript** - Type safety cho toàn bộ data layer
- **LocalStorage** - Client-side persistent storage
- **Zod** - Schema validation
- **Date APIs** - Timezone và date handling
- **Crypto APIs** - ID generation và security

### Business Logic Layer
- **Pure functions** - Không side effects, dễ test
- **Immutable updates** - Tránh mutation trực tiếp
- **Error handling** - Comprehensive error boundaries
- **Validation** - Input validation tại boundary

### Data Persistence
- **JSON serialization** - Data storage format
- **Atomic operations** - Consistent state updates
- **Backup/Restore** - Import/Export capabilities
- **Migration support** - Schema versioning

## 📁 Cấu trúc Data Layer

```
src/app/data/
├── machines.ts           # Machine/ticket management
├── customers.ts          # Customer profiles
├── services.ts           # Service catalog
├── discounts.ts          # Discount codes & points
├── finance.ts            # Transaction management
├── invoices.ts           # Invoice generation
├── points.ts             # Points system & rules
└── personnel.ts          # Staff management
```

## 🔧 Core Data Functions

### Storage Utilities
```typescript
// Generic storage functions
function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Failed to save ${key}:`, error);
  }
}
```

### CRUD Operations Pattern
```typescript
interface CRUDOperations<T> {
  getAll(): T[];
  getById(id: string | number): T | undefined;
  create(item: Omit<T, 'id'>): T;
  update(id: string | number, updates: Partial<T>): void;
  delete(id: string | number): void;
  save(items: T[]): void;
}
```

## 📊 Database Schema

### Machines Table
```typescript
interface Machine {
  id: number;                          // Primary key, auto-increment
  status: Status;                      // Current workflow status
  customerName: string;                // Customer full name
  phone: string;                       // Contact phone (unique per customer)
  time: string;                        // Creation timestamp
  description: string;                 // Issue description
  expired: string;                     // Warranty expiration date
  category: string;                    // Device category
  tester: string;                      // Assigned tester name
  technician: string;                  // Assigned technician name
  warranty: "con" | "het";             // Warranty status
  password?: string;                   // Device password
  charger: boolean;                    // Has charger
  appointmentTime?: string;            // Scheduled pickup time
  dropOffTime?: string;               // Actual drop-off time
  testerBefore: string;               // Initial tester
  testerAfter: string;                // Final tester
  registrationType: "online" | "in-person";
  isApproved?: boolean;                // Online registration approval
  machineCondition?: string;           // Physical condition notes
  needs?: string;                      // Repair requirements
  checklistBefore?: boolean[];         // Pre-repair checklist
  checklistAfter?: boolean[];          // Post-repair checklist
  techChecklist?: boolean[];           // Technical checklist
  techNotes?: string;                  // Technician notes
  adminConfirmNote?: string;           // Admin confirmation notes
  customerSignature?: string;          // Digital signature (base64)
  additionalServices?: string[];       // Selected additional services
  serviceAmount?: number;              // Additional services cost
  discountCode?: string;               // Applied discount code
  discountAmount?: number;             // Discount amount applied
  paymentStatus?: "paid" | "pending" | "free";
  finalAmount?: number;                // Total amount after discounts
  pointsEarned?: number;               // Points earned on completion
}
```

### Customers Table
```typescript
interface Customer {
  id: number;                          // Primary key, auto-increment
  name: string;                        // Full name
  phone: string;                       // Phone number (unique identifier)
  totalRepairs: number;                // Total repair count
  points: number;                      // Current points balance
  registeredAt?: string;               // Registration timestamp
}
```

### Point Rules Table
```typescript
interface PointRule {
  id: string;                          // UUID primary key
  name: string;                        // Rule display name
  type: "per_order" | "amount_threshold"; // Rule type
  points: number;                      // Points to award
  threshold?: number;                  // Amount threshold (for amount rules)
  enabled: boolean;                    // Rule active status
  description?: string;                // Rule description
}
```

### Point History Table
```typescript
interface PointHistory {
  id: string;                          // UUID primary key
  customerPhone: string;               // Customer phone (foreign key)
  customerName: string;                // Customer name (cached)
  type: "earn" | "redeem";             // Transaction type
  points: number;                      // Points amount (+ earn, - redeem)
  date: string;                        // ISO timestamp
  description: string;                 // Transaction description
  relatedId?: string;                  // Related machine or discount ID
}
```

### Services Table
```typescript
interface ServiceData {
  id: string;                          // UUID primary key
  name: string;                        // Service name
  price: number;                       // Service price (VND)
}
```

### Discount Codes Table
```typescript
interface DiscountCode {
  id: string;                          // UUID primary key
  code: string;                        // Discount code (uppercase)
  discountPercent: number;             // Discount percentage (1-100)
  maxDiscount: number;                 // Maximum discount amount
  usageLimit: number;                  // Maximum usage count
  usageCount: number;                  // Current usage count
  validFrom: string;                   // Valid from date
  validUntil: string;                  // Valid until date
  description?: string;                // Discount description
  isRedeemable?: boolean;              // Can be redeemed with points
  pointsRequired?: number;             // Points required for redemption
}
```

### Personnel Table
```typescript
interface Member {
  id: number;                          // Primary key, auto-increment
  name: string;                        // Full name
  username: string;                    // Login username
  dob: string;                         // Date of birth (DD/MM/YYYY)
  phone: string;                       // Contact phone
  gender: string;                      // Gender
  course: string;                      // Academic course (K15, K16, etc.)
  class: string;                       // Class name
  hometown: string;                    // Hometown
  position: string;                    // Job position
  type: "technician" | "tester";       // Staff type
  machinesDone: number;                // Machines repaired (technicians)
  testsRun: number;                    // Tests performed (testers)
  status: "active" | "inactive";       // Account status
  approvalStatus: "pending" | "approved" | "rejected";
  email?: string;                      // Email address
  registeredAt?: string;               // Registration timestamp
  isAdmin?: boolean;                   // Admin privileges
}
```

## 🔄 Business Logic Implementation

### Points Calculation Engine
```typescript
export function calculatePoints(orderAmount: number): number {
  const rules = getPointRules().filter(rule => rule.enabled);
  let totalPoints = 0;

  // Apply per-order rules
  rules
    .filter(rule => rule.type === "per_order")
    .forEach(rule => {
      totalPoints += rule.points;
    });

  // Apply highest threshold rule
  const thresholdRules = rules
    .filter(rule => rule.type === "amount_threshold" && rule.threshold! <= orderAmount)
    .sort((a, b) => b.threshold! - a.threshold!);

  if (thresholdRules.length > 0) {
    totalPoints += thresholdRules[0].points;
  }

  return totalPoints;
}
```

### Invoice Generation
```typescript
export function addInvoice(invoice: Omit<Invoice, "id" | "invoiceNumber">): Invoice {
  const invoices = getInvoices();
  const newId = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  // Generate invoice number (HD-XXXX format)
  const nextNumber = invoices.length + 1;
  const invoiceNumber = `HD-${nextNumber.toString().padStart(4, "0")}`;

  const newInvoice: Invoice = {
    ...invoice,
    id: newId,
    invoiceNumber,
  };

  invoices.push(newInvoice);
  saveInvoices(invoices);

  return newInvoice;
}
```

### Discount Validation
```typescript
export function validateDiscount(code: string, orderAmount: number): {
  isValid: boolean;
  discountAmount: number;
  error?: string;
} {
  const discounts = getDiscounts();
  const discount = discounts.find(d => d.code === code.toUpperCase());

  if (!discount) {
    return { isValid: false, discountAmount: 0, error: "Mã giảm giá không tồn tại" };
  }

  const now = new Date();
  const validFrom = new Date(discount.validFrom);
  const validUntil = new Date(discount.validUntil);

  if (now < validFrom || now > validUntil) {
    return { isValid: false, discountAmount: 0, error: "Mã giảm giá đã hết hạn" };
  }

  if (discount.usageCount >= discount.usageLimit) {
    return { isValid: false, discountAmount: 0, error: "Mã giảm giá đã hết lượt sử dụng" };
  }

  const discountAmount = Math.min(
    (orderAmount * discount.discountPercent) / 100,
    discount.maxDiscount
  );

  return { isValid: true, discountAmount };
}
```

## 🔒 Security Implementation

### Input Validation
```typescript
import { z } from 'zod';

// Customer schema
const customerSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  phone: z.string().regex(/^0\d{9,10}$/, "Số điện thoại không hợp lệ"),
});

// Machine schema
const machineSchema = z.object({
  customerName: customerSchema.shape.name,
  phone: customerSchema.shape.phone,
  category: z.string().min(1, "Vui lòng chọn loại thiết bị"),
  description: z.string().min(10, "Mô tả vấn đề phải có ít nhất 10 ký tự"),
});

// Validation helper
export function validateMachine(data: unknown): Machine {
  return machineSchema.parse(data);
}
```

### Data Sanitization
```typescript
export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential XSS characters
    .substring(0, 1000); // Limit length
}

export function sanitizePhone(phone: string): string {
  return phone.replace(/\D/g, ''); // Only digits
}
```

## 📈 Performance Optimization

### Indexing Strategy
- **Phone lookup**: Customer data indexed by phone number
- **Status filtering**: Machines pre-filtered by status
- **Date sorting**: Chronological sorting with efficient algorithms

### Caching Layer
```typescript
// Simple in-memory cache for frequent queries
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCached<T>(key: string, fetcher: () => T): T {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const data = fetcher();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}
```

### Batch Operations
```typescript
export function batchUpdateMachines(updates: Array<{ id: number; data: Partial<Machine> }>): void {
  const machines = getMachines();

  updates.forEach(({ id, data }) => {
    const index = machines.findIndex(m => m.id === id);
    if (index !== -1) {
      machines[index] = { ...machines[index], ...data };
    }
  });

  saveMachines(machines);
}
```

## 🧪 Testing Strategy

### Unit Tests
```typescript
import { calculatePoints, validateDiscount } from './points';

describe('calculatePoints', () => {
  test('calculates per-order points', () => {
    // Test per-order rules
  });

  test('calculates threshold points', () => {
    // Test amount threshold rules
  });

  test('ignores disabled rules', () => {
    // Test rule filtering
  });
});
```

### Integration Tests
```typescript
describe('Machine workflow', () => {
  test('complete repair cycle', () => {
    // Test P1 -> P5 workflow
    // Verify state transitions
    // Check point calculations
    // Validate invoice generation
  });
});
```

### Data Integrity Tests
```typescript
describe('Data persistence', () => {
  test('survives localStorage corruption', () => {
    // Test error recovery
  });

  test('maintains referential integrity', () => {
    // Test foreign key relationships
  });
});
```

## 📊 Monitoring & Analytics

### Business Metrics
```typescript
export function getBusinessMetrics() {
  const machines = getMachines();
  const customers = getCustomers();
  const transactions = getTransactions();

  return {
    totalRevenue: transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0),

    totalMachines: machines.length,
    completedMachines: machines.filter(m => m.status === 'COMPLETE').length,
    pendingMachines: machines.filter(m => m.status === 'WAITING').length,

    totalCustomers: customers.length,
    activeCustomers: customers.filter(c => c.totalRepairs > 0).length,

    averageRepairTime: calculateAverageRepairTime(machines),
    customerSatisfaction: calculateCustomerSatisfaction(machines),
  };
}
```

### Performance Metrics
```typescript
export function getPerformanceMetrics() {
  const startTime = performance.now();

  // Measure operation performance
  const machines = getMachines();
  const loadTime = performance.now() - startTime;

  return {
    dataLoadTime: loadTime,
    storageSize: calculateStorageSize(),
    operationCount: getOperationCount(),
  };
}
```

## 🔄 Data Migration

### Schema Versioning
```typescript
const CURRENT_SCHEMA_VERSION = '1.0.0';

export function migrateData(): void {
  const currentVersion = localStorage.getItem('schema_version');

  if (!currentVersion) {
    // Initial migration
    migrateFromV0ToV1();
    localStorage.setItem('schema_version', CURRENT_SCHEMA_VERSION);
  }

  // Future migrations...
}
```

### Migration Functions
```typescript
function migrateFromV0ToV1(): void {
  // Add new fields to existing data
  const machines = getMachines();
  const migratedMachines = machines.map(machine => ({
    ...machine,
    paymentStatus: machine.finalAmount ? 'paid' : 'pending',
    pointsEarned: machine.finalAmount ? calculatePoints(machine.finalAmount) : undefined,
  }));

  saveMachines(migratedMachines);
}
```

## 🚀 Deployment Considerations

### Environment Configuration
```typescript
// Environment-specific settings
export const CONFIG = {
  development: {
    enableDebugLogging: true,
    mockExternalServices: true,
  },
  production: {
    enableDebugLogging: false,
    mockExternalServices: false,
  },
};
```

### Backup Strategy
```typescript
export function createBackup(): string {
  const data = {
    machines: getMachines(),
    customers: getCustomers(),
    services: getServices(),
    discounts: getDiscounts(),
    pointRules: getPointRules(),
    pointHistory: getPointHistory(),
    timestamp: new Date().toISOString(),
  };

  return JSON.stringify(data, null, 2);
}

export function restoreFromBackup(backupData: string): void {
  try {
    const data = JSON.parse(backupData);
    // Validate and restore each dataset
    saveMachines(data.machines || []);
    saveCustomers(data.customers || []);
    // ... restore other data
  } catch (error) {
    throw new Error('Invalid backup data');
  }
}
```

## 📝 API Documentation

### Data Access Layer API
```typescript
// Machines API
export interface MachinesAPI {
  getAll(): Promise<Machine[]>;
  getById(id: number): Promise<Machine | null>;
  create(data: CreateMachineData): Promise<Machine>;
  update(id: number, data: UpdateMachineData): Promise<Machine>;
  delete(id: number): Promise<void>;
  search(query: string): Promise<Machine[]>;
  getByStatus(status: Status): Promise<Machine[]>;
}

// Points API
export interface PointsAPI {
  calculatePoints(amount: number): Promise<number>;
  getCustomerPoints(phone: string): Promise<number>;
  addPoints(phone: string, points: number, reason: string): Promise<void>;
  redeemPoints(phone: string, points: number, discountId: string): Promise<void>;
  getHistory(phone: string): Promise<PointHistory[]>;
}
```

This architecture provides a robust, scalable data management layer that supports the complex business logic required for the IT Support system while maintaining data integrity and performance.</content>
</xai:function_call">Create comprehensive backend technical documentation focusing on data management and business logic