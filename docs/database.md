# Database Technical Documentation

## 📋 Tổng quan

Hệ thống IT Supporter sử dụng LocalStorage làm cơ sở dữ liệu client-side với JSON làm format lưu trữ. Database được thiết kế để hỗ trợ đầy đủ workflow 5 giai đoạn và hệ thống quản lý khách hàng, điểm thưởng.

## 🏗️ Kiến trúc Database

### Storage Engine
- **LocalStorage API** - Browser native storage
- **JSON Serialization** - Data format
- **Atomic Operations** - Consistent state updates
- **Error Recovery** - Fallback mechanisms

### Schema Design
- **Document-based** - JSON objects
- **Embedded relationships** - Nested data structures
- **Referential integrity** - Foreign key relationships
- **Indexing strategy** - Lookup optimization

## 📊 Schema Definitions

### Core Entities

#### 1. Machines Collection
```typescript
interface Machine {
  // Primary Key
  id: number;                          // Auto-increment ID

  // Workflow State
  status: Status;                      // Workflow status enum

  // Customer Information
  customerName: string;                // Full customer name
  phone: string;                       // Primary lookup key

  // Temporal Data
  time: string;                        // Creation timestamp
  appointmentTime?: string;            // Scheduled pickup
  dropOffTime?: string;               // Actual drop-off

  // Device Information
  category: string;                    // Device type
  description: string;                 // Issue description
  machineCondition?: string;           // Physical condition
  warranty: "con" | "het";             // Warranty status
  password?: string;                   // Device password
  charger: boolean;                    // Has charger

  // Assignment Data
  tester: string;                      // Assigned tester
  technician: string;                  // Assigned technician
  testerBefore: string;               // Initial assessment tester
  testerAfter: string;                // Final testing tester

  // Workflow Data
  needs?: string;                      // Repair requirements
  checklistBefore?: boolean[];         // Pre-repair checklist
  checklistAfter?: boolean[];          // Post-repair checklist
  techChecklist?: boolean[];           // Technical checklist
  techNotes?: string;                  // Technician notes
  adminConfirmNote?: string;           // Admin confirmation

  // Registration
  registrationType: "online" | "in-person";
  isApproved?: boolean;                // Online approval status

  // Financial Data
  additionalServices?: string[];       // Selected services
  serviceAmount?: number;              // Service costs
  discountCode?: string;               // Applied discount
  discountAmount?: number;             // Discount applied
  paymentStatus?: "paid" | "pending" | "free";
  finalAmount?: number;                // Total payable

  // Points System
  pointsEarned?: number;               // Points awarded

  // Legal
  customerSignature?: string;          // Digital signature
  expired: string;                     // Warranty expiry
}
```

#### 2. Customers Collection
```typescript
interface Customer {
  // Primary Key
  id: number;                          // Auto-increment ID

  // Identity
  name: string;                        // Full name
  phone: string;                       // Unique identifier

  // Statistics
  totalRepairs: number;                // Repair history count
  points: number;                      // Current points balance

  // Metadata
  registeredAt?: string;               // Registration timestamp
}
```

#### 3. Personnel Collection
```typescript
interface Member {
  // Primary Key
  id: number;                          // Auto-increment ID

  // Personal Information
  name: string;                        // Full name
  username: string;                    // Login username
  dob: string;                         // Date of birth
  phone: string;                       // Contact phone
  gender: string;                      // Gender
  email?: string;                      // Email address

  // Academic Information
  course: string;                      // Academic course (K15, K16)
  class: string;                       // Class name
  hometown: string;                    // Hometown

  // Professional Information
  position: string;                    // Job position
  type: "technician" | "tester";       // Staff type

  // Performance Metrics
  machinesDone: number;                // Machines repaired (technicians)
  testsRun: number;                    // Tests performed (testers)

  // Account Status
  status: "active" | "inactive";       // Account status
  approvalStatus: "pending" | "approved" | "rejected";
  isAdmin?: boolean;                   // Administrative privileges

  // Metadata
  registeredAt?: string;               // Registration timestamp
}
```

### Supporting Entities

#### 4. Services Collection
```typescript
interface ServiceData {
  // Primary Key
  id: string;                          // UUID

  // Service Details
  name: string;                        // Service name
  price: number;                       // Service price in VND
}
```

#### 5. Discount Codes Collection
```typescript
interface DiscountCode {
  // Primary Key
  id: string;                          // UUID

  // Discount Configuration
  code: string;                        // Discount code (uppercase)
  discountPercent: number;             // Discount percentage (1-100)
  maxDiscount: number;                 // Maximum discount amount

  // Usage Limits
  usageLimit: number;                  // Maximum uses
  usageCount: number;                  // Current uses

  // Validity Period
  validFrom: string;                   // Start date
  validUntil: string;                  // End date

  // Points Integration
  isRedeemable?: boolean;              // Can be redeemed with points
  pointsRequired?: number;             // Points needed for redemption

  // Metadata
  description?: string;                // Discount description
}
```

#### 6. Point Rules Collection
```typescript
interface PointRule {
  // Primary Key
  id: string;                          // UUID

  // Rule Configuration
  name: string;                        // Rule name
  type: "per_order" | "amount_threshold"; // Rule type
  points: number;                      // Points to award
  threshold?: number;                  // Amount threshold

  // Control
  enabled: boolean;                    // Rule active status

  // Metadata
  description?: string;                // Rule description
}
```

#### 7. Point History Collection
```typescript
interface PointHistory {
  // Primary Key
  id: string;                          // UUID

  // Customer Reference
  customerPhone: string;               // Customer phone (foreign key)
  customerName: string;                // Cached customer name

  // Transaction Details
  type: "earn" | "redeem";             // Transaction type
  points: number;                      // Points amount (+/-)
  date: string;                        // Transaction timestamp
  description: string;                 // Transaction description

  // Relations
  relatedId?: string;                  // Related machine/discount ID
}
```

#### 8. Transactions Collection
```typescript
interface Transaction {
  // Primary Key
  id: string;                          // UUID

  // Transaction Details
  date: string;                        // Transaction date
  type: "income" | "expense";          // Transaction type
  amount: number;                      // Transaction amount
  description: string;                 // Transaction description
  category: string;                    // Transaction category
}
```

#### 9. Invoices Collection
```typescript
interface Invoice {
  // Primary Key
  id: string;                          // Generated ID
  invoiceNumber: string;               // Display number (HD-XXXX)

  // Relations
  machineId?: number;                  // Related machine

  // Customer Information
  customerName: string;                // Customer name
  phone: string;                       // Customer phone

  // Registration
  registrationType: "online" | "in-person";

  // Services
  services: Array<{
    name: string;
    price: number;
  }>;

  // Device Information
  machineCondition?: string;
  needs?: string;
  category: string;
  warranty: "con" | "het";

  // Temporal
  createdAt: string;                   // Invoice creation date
  createdTime: string;                 // Invoice creation time
  dropOffTime?: string;               // Machine drop-off time
  appointmentTime?: string;            // Pickup appointment

  // Financial
  serviceAmount: number;               // Base service cost
  discountCode?: string;               // Applied discount
  discountAmount: number;              // Discount amount
  finalAmount: number;                 // Total payable
  paymentStatus: "paid" | "pending" | "free";

  // Points
  pointsEarned?: number;               // Points awarded

  // Staff
  tester?: string;                     // Tester name
  createdBy?: string;                  // Creator name

  // Notes
  notes?: string;                      // Additional notes
}
```

## 🔗 Relationships & Constraints

### Foreign Key Relationships
```
Machine.phone → Customer.phone
Machine.tester → Member.name
Machine.technician → Member.name
Machine.additionalServices[] → ServiceData.name
Machine.discountCode → DiscountCode.code
PointHistory.customerPhone → Customer.phone
PointHistory.relatedId → Machine.id (optional)
Invoice.machineId → Machine.id (optional)
```

### Business Rules Constraints
```sql
-- Machine status transitions
CHECK (status IN ('WAITING', 'RUNNING', 'RETESTING', 'RETURNING', 'COMPLETE', 'RETURNED'))

-- Payment status validation
CHECK (paymentStatus IN ('paid', 'pending', 'free'))

-- Warranty status
CHECK (warranty IN ('con', 'het'))

-- Personnel type validation
CHECK (type IN ('technician', 'tester'))

-- Discount percentage bounds
CHECK (discountPercent BETWEEN 1 AND 100)

-- Point transaction types
CHECK (type IN ('earn', 'redeem'))

-- Positive amounts
CHECK (finalAmount >= 0)
CHECK (points >= 0)
CHECK (price > 0)
```

### Data Integrity Rules
```typescript
// Unique constraints
Customer.phone: UNIQUE
Member.username: UNIQUE
DiscountCode.code: UNIQUE (case-insensitive)
ServiceData.name: UNIQUE

// Required fields
Machine: {customerName, phone, category, description}
Customer: {name, phone}
Member: {name, username, course, class, type}

// Default values
Machine.status: 'WAITING'
Machine.warranty: 'het'
Machine.charger: false
Customer.totalRepairs: 0
Customer.points: 0
Member.machinesDone: 0
Member.testsRun: 0
Member.status: 'active'
Member.approvalStatus: 'pending'
```

## 📈 Indexing Strategy

### Primary Indexes
- **Machine.id**: Auto-increment primary key
- **Customer.id**: Auto-increment primary key
- **Member.id**: Auto-increment primary key
- **UUID fields**: Generated unique identifiers

### Lookup Indexes (Conceptual)
- **Customer.phone**: Primary customer lookup
- **Member.username**: Authentication lookup
- **DiscountCode.code**: Discount validation
- **Machine.status**: Status-based filtering
- **PointHistory.customerPhone**: Customer point history

### Composite Indexes (Conceptual)
- **Machine(phone, status)**: Customer's active machines
- **PointHistory(customerPhone, date)**: Customer point timeline
- **Invoice(phone, createdAt)**: Customer invoice history

## 🔄 Data Operations

### CRUD Operations
```typescript
// Create
const newMachine: Machine = {
  id: generateId(),
  status: 'WAITING',
  customerName: 'John Doe',
  phone: '0123456789',
  // ... other fields
};

// Read
const machine = machines.find(m => m.id === targetId);

// Update
const updatedMachine = { ...machine, status: 'RUNNING' };

// Delete
const filteredMachines = machines.filter(m => m.id !== targetId);
```

### Query Operations
```typescript
// Find by phone
const customerMachines = machines.filter(m => m.phone === customerPhone);

// Find by status
const pendingMachines = machines.filter(m => m.status === 'WAITING');

// Search by text
const searchResults = machines.filter(m =>
  m.customerName.toLowerCase().includes(query) ||
  m.description.toLowerCase().includes(query)
);
```

### Aggregation Operations
```typescript
// Count by status
const statusCounts = machines.reduce((acc, machine) => {
  acc[machine.status] = (acc[machine.status] || 0) + 1;
  return acc;
}, {} as Record<Status, number>);

// Sum revenue
const totalRevenue = machines
  .filter(m => m.status === 'COMPLETE' && m.paymentStatus === 'paid')
  .reduce((sum, m) => sum + (m.finalAmount || 0), 0);

// Customer statistics
const customerStats = customers.map(customer => ({
  ...customer,
  completedRepairs: machines.filter(m =>
    m.phone === customer.phone && m.status === 'COMPLETE'
  ).length,
}));
```

## 🔄 Data Migration

### Version Control
```typescript
const SCHEMA_VERSION = '1.1.0';

export function migrateData(): void {
  const currentVersion = localStorage.getItem('schema_version');

  if (!currentVersion || currentVersion < SCHEMA_VERSION) {
    // Run migrations
    migrateToV1_1_0();
    localStorage.setItem('schema_version', SCHEMA_VERSION);
  }
}
```

### Migration Examples
```typescript
function migrateToV1_1_0(): void {
  // Add paymentStatus to existing machines
  const machines = getMachines();
  const updatedMachines = machines.map(machine => ({
    ...machine,
    paymentStatus: machine.finalAmount ? 'paid' : 'pending',
  }));
  saveMachines(updatedMachines);

  // Add pointsEarned to completed machines
  const completedMachines = updatedMachines
    .filter(m => m.status === 'COMPLETE' && m.finalAmount)
    .map(m => ({
      ...m,
      pointsEarned: calculatePoints(m.finalAmount!),
    }));
  saveMachines(updatedMachines.map(m =>
    completedMachines.find(cm => cm.id === m.id) || m
  ));
}
```

## 📊 Performance Characteristics

### Storage Limits
- **LocalStorage quota**: ~5-10MB per origin
- **Item size limit**: ~2MB per key
- **Operation performance**: O(n) for searches

### Optimization Strategies
```typescript
// Pre-computed indexes
const machineIndexes = {
  byPhone: new Map<string, Machine[]>(),
  byStatus: new Map<Status, Machine[]>(),
  byTechnician: new Map<string, Machine[]>(),
};

function buildIndexes(machines: Machine[]): void {
  machineIndexes.byPhone.clear();
  machineIndexes.byStatus.clear();
  machineIndexes.byTechnician.clear();

  machines.forEach(machine => {
    // Index by phone
    const phoneMachines = machineIndexes.byPhone.get(machine.phone) || [];
    phoneMachines.push(machine);
    machineIndexes.byPhone.set(machine.phone, phoneMachines);

    // Index by status
    const statusMachines = machineIndexes.byStatus.get(machine.status) || [];
    statusMachines.push(machine);
    machineIndexes.byStatus.set(machine.status, statusMachines);

    // Index by technician
    if (machine.technician) {
      const techMachines = machineIndexes.byTechnician.get(machine.technician) || [];
      techMachines.push(machine);
      machineIndexes.byTechnician.set(machine.technician, techMachines);
    }
  });
}

// Fast lookups using indexes
function getMachinesByPhone(phone: string): Machine[] {
  return machineIndexes.byPhone.get(phone) || [];
}
```

### Caching Strategy
```typescript
// In-memory cache for frequent queries
const queryCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function cachedQuery<T>(key: string, queryFn: () => T): T {
  const cached = queryCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const result = queryFn();
  queryCache.set(key, { data: result, timestamp: Date.now() });
  return result;
}
```

## 🔒 Security & Data Protection

### Input Validation
```typescript
const phoneRegex = /^0\d{9,10}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateCustomer(customer: Partial<Customer>): boolean {
  return !!(
    customer.name?.length >= 2 &&
    phoneRegex.test(customer.phone || '') &&
    (!customer.email || emailRegex.test(customer.email))
  );
}
```

### Data Sanitization
```typescript
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Prevent XSS
    .substring(0, 1000); // Length limit
}
```

### Encryption (Future)
```typescript
// Placeholder for future encryption
export function encryptData(data: string): string {
  // Implement AES encryption
  return btoa(data); // Base64 placeholder
}

export function decryptData(encrypted: string): string {
  // Implement AES decryption
  return atob(encrypted); // Base64 placeholder
}
```

## 📋 Backup & Recovery

### Export Functionality
```typescript
export function exportDatabase(): string {
  const data = {
    version: SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    machines: getMachines(),
    customers: getCustomers(),
    personnel: getPersonnel(),
    services: getServices(),
    discounts: getDiscounts(),
    pointRules: getPointRules(),
    pointHistory: getPointHistory(),
    transactions: getTransactions(),
    invoices: getInvoices(),
  };

  return JSON.stringify(data, null, 2);
}
```

### Import Functionality
```typescript
export function importDatabase(jsonData: string): void {
  try {
    const data = JSON.parse(jsonData);

    // Validate schema version
    if (data.version !== SCHEMA_VERSION) {
      throw new Error(`Incompatible schema version: ${data.version}`);
    }

    // Import data with validation
    if (data.machines) saveMachines(data.machines);
    if (data.customers) saveCustomers(data.customers);
    // ... import other collections

    console.log('Database imported successfully');
  } catch (error) {
    throw new Error(`Import failed: ${error.message}`);
  }
}
```

## 📈 Monitoring & Analytics

### Database Metrics
```typescript
export function getDatabaseMetrics() {
  return {
    storage: {
      used: calculateStorageUsage(),
      available: getStorageQuota(),
      collections: countCollections(),
    },
    performance: {
      queryTime: measureQueryPerformance(),
      cacheHitRate: calculateCacheHitRate(),
    },
    data: {
      totalRecords: countTotalRecords(),
      collectionSizes: getCollectionSizes(),
      relationships: validateRelationships(),
    },
  };
}

function calculateStorageUsage(): number {
  let total = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length;
    }
  }
  return total;
}
```

## 🚀 Scaling Considerations

### Data Partitioning
```typescript
// Partition large datasets
const PARTITION_SIZE = 1000;

function getPartitionedMachines(page: number): Machine[] {
  const allMachines = getMachines();
  const start = page * PARTITION_SIZE;
  const end = start + PARTITION_SIZE;
  return allMachines.slice(start, end);
}
```

### Compression (Future)
```typescript
// Implement data compression for large datasets
export function compressData(data: any): string {
  // Implement LZ compression
  return JSON.stringify(data);
}

export function decompressData(compressed: string): any {
  // Implement LZ decompression
  return JSON.parse(compressed);
}
```

This database design provides a robust, scalable foundation for the IT Support system while maintaining data integrity and performance within the constraints of client-side storage.</content>
</xai:function_call">Create comprehensive database technical documentation for the LocalStorage-based system