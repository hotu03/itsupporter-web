# API Technical Documentation

## 📋 Tổng quan

API của hệ thống IT Supporter được implement dưới dạng data access layer với các functions tương tác như REST API endpoints. API cung cấp interface thống nhất để frontend truy cập và thao tác dữ liệu.

## 🏗️ API Architecture

### Design Principles
- **Functional Programming**: Pure functions, immutable operations
- **Type Safety**: Full TypeScript typing
- **Error Handling**: Comprehensive error boundaries
- **Consistency**: Standardized function signatures
- **Performance**: Optimized queries and caching

### Response Format
```typescript
// Success response
{
  success: true,
  data: T,
  message?: string
}

// Error response
{
  success: false,
  error: string,
  code?: string
}
```

## 🔗 API Endpoints

### Machines API

#### GET /api/machines
Lấy danh sách tất cả phiếu sửa chữa.

```typescript
interface GetMachinesOptions {
  status?: Status;
  phone?: string;
  technician?: string;
  page?: number;
  limit?: number;
}

getMachines(options?: GetMachinesOptions): Machine[]
```

**Parameters:**
- `status`: Lọc theo trạng thái
- `phone`: Lọc theo số điện thoại khách hàng
- `technician`: Lọc theo kỹ thuật viên
- `page`: Số trang (phân trang)
- `limit`: Số item mỗi trang

**Response:**
```typescript
[
  {
    id: 1,
    status: "WAITING",
    customerName: "Nguyễn Văn A",
    phone: "0123456789",
    // ... other fields
  }
]
```

#### GET /api/machines/:id
Lấy thông tin chi tiết của một phiếu.

```typescript
getMachineById(id: number): Machine | null
```

**Parameters:**
- `id`: ID của phiếu (number)

**Response:**
```typescript
{
  id: 1,
  status: "WAITING",
  customerName: "Nguyễn Văn A",
  phone: "0123456789",
  // ... full machine object
}
```

#### POST /api/machines
Tạo phiếu sửa chữa mới.

```typescript
interface CreateMachineData {
  customerName: string;
  phone: string;
  category: string;
  description: string;
  warranty?: "con" | "het";
  registrationType?: "online" | "in-person";
  // ... other optional fields
}

createMachine(data: CreateMachineData): Machine
```

**Request Body:**
```typescript
{
  customerName: "Nguyễn Văn A",
  phone: "0123456789",
  category: "Laptop",
  description: "Máy chậm, cần vệ sinh",
  warranty: "het",
  registrationType: "in-person"
}
```

**Response:**
```typescript
{
  id: 1,
  status: "WAITING",
  // ... created machine object
}
```

#### PUT /api/machines/:id
Cập nhật thông tin phiếu sửa chữa.

```typescript
interface UpdateMachineData {
  status?: Status;
  technician?: string;
  tester?: string;
  finalAmount?: number;
  paymentStatus?: "paid" | "pending" | "free";
  // ... other updatable fields
}

updateMachine(id: number, data: UpdateMachineData): void
```

**Parameters:**
- `id`: ID của phiếu (number)

**Request Body:**
```typescript
{
  status: "RUNNING",
  technician: "Nguyễn Văn B",
  finalAmount: 500000
}
```

#### DELETE /api/machines/:id
Xóa phiếu sửa chữa.

```typescript
deleteMachine(id: number): void
```

**Parameters:**
- `id`: ID của phiếu (number)

### Customers API

#### GET /api/customers
Lấy danh sách khách hàng.

```typescript
interface GetCustomersOptions {
  search?: string;
  page?: number;
  limit?: number;
}

getCustomers(options?: GetCustomersOptions): Customer[]
```

#### GET /api/customers/:phone
Lấy thông tin khách hàng theo số điện thoại.

```typescript
getCustomerByPhone(phone: string): Customer | null
```

#### POST /api/customers
Tạo hoặc cập nhật thông tin khách hàng.

```typescript
interface CreateCustomerData {
  name: string;
  phone: string;
  email?: string;
}

addOrUpdateCustomer(data: CreateCustomerData): Customer
```

### Points API

#### GET /api/points/rules
Lấy danh sách quy tắc tích điểm.

```typescript
getPointRules(): PointRule[]
```

#### POST /api/points/rules
Tạo quy tắc tích điểm mới.

```typescript
interface CreatePointRuleData {
  name: string;
  type: "per_order" | "amount_threshold";
  points: number;
  threshold?: number;
  description?: string;
}

createPointRule(data: CreatePointRuleData): PointRule
```

#### POST /api/points/calculate
Tính điểm thưởng cho đơn hàng.

```typescript
calculatePoints(orderAmount: number): number
```

**Request Body:**
```typescript
{
  orderAmount: 750000
}
```

**Response:**
```typescript
{
  points: 3,
  explanation: [
    "+1 điểm: Đưa máy sửa chữa",
    "+2 điểm: Đơn hàng trên 50K"
  ]
}
```

#### GET /api/points/history/:phone
Lấy lịch sử điểm của khách hàng.

```typescript
getCustomerPointHistory(phone: string): PointHistory[]
```

#### POST /api/points/earn
Cộng điểm cho khách hàng.

```typescript
interface EarnPointsData {
  phone: string;
  points: number;
  description: string;
  relatedId?: string;
}

addPointHistory(data: EarnPointsData): void
```

#### POST /api/points/redeem
Đổi điểm lấy giảm giá.

```typescript
interface RedeemPointsData {
  phone: string;
  points: number;
  discountId: string;
}

redeemPoints(data: RedeemPointsData): DiscountCode
```

### Discounts API

#### GET /api/discounts
Lấy danh sách mã giảm giá.

```typescript
getDiscounts(): DiscountCode[]
```

#### POST /api/discounts
Tạo mã giảm giá mới.

```typescript
interface CreateDiscountData {
  code: string;
  discountPercent: number;
  maxDiscount: number;
  usageLimit: number;
  validFrom: string;
  validUntil: string;
  description?: string;
  isRedeemable?: boolean;
  pointsRequired?: number;
}

createDiscount(data: CreateDiscountData): DiscountCode
```

#### POST /api/discounts/validate
Kiểm tra tính hợp lệ của mã giảm giá.

```typescript
validateDiscount(code: string, orderAmount: number): {
  isValid: boolean;
  discountAmount: number;
  error?: string;
}
```

**Request Body:**
```typescript
{
  code: "SAVE10",
  orderAmount: 1000000
}
```

**Response:**
```typescript
{
  isValid: true,
  discountAmount: 80000,
  finalAmount: 920000
}
```

#### PUT /api/discounts/:id
Cập nhật mã giảm giá.

```typescript
updateDiscount(id: string, data: Partial<DiscountCode>): void
```

### Services API

#### GET /api/services
Lấy danh sách dịch vụ.

```typescript
getServices(): ServiceData[]
```

#### GET /api/services/:name
Lấy thông tin dịch vụ theo tên.

```typescript
getServiceByName(name: string): ServiceData | null
```

#### GET /api/services/:name/price
Lấy giá của dịch vụ.

```typescript
getServicePrice(name: string): number
```

### Personnel API

#### GET /api/personnel
Lấy danh sách nhân viên.

```typescript
interface GetPersonnelOptions {
  type?: "technician" | "tester";
  status?: "active" | "inactive";
  approvalStatus?: "pending" | "approved" | "rejected";
}

getPersonnel(options?: GetPersonnelOptions): Member[]
```

#### POST /api/personnel
Đăng ký thành viên mới.

```typescript
interface CreateMemberData {
  name: string;
  username: string;
  dob: string;
  phone: string;
  gender: string;
  course: string;
  class: string;
  hometown: string;
  position: string;
  type: "technician" | "tester";
}

createMember(data: CreateMemberData): Member
```

#### PUT /api/personnel/:id/approve
Phê duyệt thành viên.

```typescript
approveMember(id: number): void
```

#### PUT /api/personnel/:id/status
Cập nhật trạng thái thành viên.

```typescript
updateMemberStatus(id: number, status: "active" | "inactive"): void
```

### Invoices API

#### GET /api/invoices
Lấy danh sách hóa đơn.

```typescript
interface GetInvoicesOptions {
  phone?: string;
  status?: "paid" | "pending" | "free";
  page?: number;
  limit?: number;
}

getInvoices(options?: GetInvoicesOptions): Invoice[]
```

#### POST /api/invoices
Tạo hóa đơn mới.

```typescript
interface CreateInvoiceData {
  machineId?: number;
  customerName: string;
  phone: string;
  registrationType: "online" | "in-person";
  services: Array<{ name: string; price: number }>;
  serviceAmount: number;
  discountCode?: string;
  discountAmount: number;
  finalAmount: number;
  paymentStatus: "paid" | "pending" | "free";
  pointsEarned?: number;
  notes?: string;
}

createInvoice(data: CreateInvoiceData): Invoice
```

### Transactions API

#### GET /api/transactions
Lấy danh sách giao dịch tài chính.

```typescript
interface GetTransactionsOptions {
  type?: "income" | "expense";
  category?: string;
  startDate?: string;
  endDate?: string;
}

getTransactions(options?: GetTransactionsOptions): Transaction[]
```

#### POST /api/transactions
Tạo giao dịch mới.

```typescript
interface CreateTransactionData {
  type: "income" | "expense";
  amount: number;
  description: string;
  category: string;
}

createTransaction(data: CreateTransactionData): Transaction
```

## 🔐 Authentication API

### POST /api/auth/login
Đăng nhập vào hệ thống.

```typescript
interface LoginData {
  username: string;
  password: string;
  rememberMe?: boolean;
}

login(data: LoginData): {
  success: boolean;
  user?: Member;
  token?: string;
  error?: string;
}
```

**Request Body:**
```typescript
{
  username: "nguyenvana",
  password: "password123",
  rememberMe: true
}
```

**Response (Success):**
```typescript
{
  success: true,
  user: {
    id: 1,
    name: "Nguyễn Văn A",
    username: "nguyenvana",
    type: "technician",
    isAdmin: false
  },
  token: "session_token_here"
}
```

### POST /api/auth/logout
Đăng xuất khỏi hệ thống.

```typescript
logout(): { success: boolean }
```

### GET /api/auth/me
Lấy thông tin người dùng hiện tại.

```typescript
getCurrentUser(): Member | null
```

## 📊 Analytics API

### GET /api/analytics/dashboard
Lấy dữ liệu tổng quan dashboard.

```typescript
getDashboardAnalytics(): {
  totalMachines: number;
  completedMachines: number;
  pendingMachines: number;
  totalRevenue: number;
  totalCustomers: number;
  activeCustomers: number;
  averageRepairTime: number;
  monthlyRevenue: Array<{ month: string; revenue: number }>;
}
```

### GET /api/analytics/personnel
Lấy thống kê hiệu suất nhân viên.

```typescript
getPersonnelAnalytics(): Array<{
  member: Member;
  machinesDone: number;
  testsRun: number;
  averageRating: number;
  efficiency: number;
}>
```

### GET /api/analytics/financial
Lấy báo cáo tài chính.

```typescript
getFinancialAnalytics(): {
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
  topServices: Array<{ name: string; revenue: number; count: number }>;
  revenueByMonth: Array<{ month: string; income: number; expense: number }>;
}
```

## 🔍 Search API

### GET /api/search/machines
Tìm kiếm phiếu sửa chữa.

```typescript
searchMachines(query: string, filters?: {
  status?: Status;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
}): Machine[]
```

### GET /api/search/customers
Tìm kiếm khách hàng.

```typescript
searchCustomers(query: string): Customer[]
```

### GET /api/search/personnel
Tìm kiếm nhân viên.

```typescript
searchPersonnel(query: string, type?: "technician" | "tester"): Member[]
```

## 📤 Export/Import API

### GET /api/export/database
Xuất toàn bộ dữ liệu hệ thống.

```typescript
exportDatabase(): string // JSON string
```

### POST /api/import/database
Nhập dữ liệu vào hệ thống.

```typescript
importDatabase(jsonData: string): { success: boolean; error?: string }
```

### GET /api/export/machines
Xuất danh sách phiếu sửa chữa.

```typescript
exportMachines(format: "json" | "csv" = "json"): string
```

### GET /api/export/invoices
Xuất danh sách hóa đơn.

```typescript
exportInvoices(format: "json" | "csv" = "json"): string
```

## ⚡ Rate Limiting

### Client-side Limits
```typescript
// Prevent excessive API calls
const apiCallLimits = {
  search: { max: 10, window: 60000 }, // 10 calls per minute
  create: { max: 5, window: 60000 },  // 5 creates per minute
  update: { max: 20, window: 60000 }, // 20 updates per minute
};
```

## 🧪 Testing API

### Unit Tests
```typescript
describe('Machines API', () => {
  test('createMachine validates input', () => {
    const invalidData = { customerName: '' };
    expect(() => createMachine(invalidData)).toThrow();
  });

  test('getMachines returns array', () => {
    const machines = getMachines();
    expect(Array.isArray(machines)).toBe(true);
  });
});
```

### Integration Tests
```typescript
describe('Machine Workflow', () => {
  test('complete workflow updates correctly', async () => {
    const machine = await createMachine(validMachineData);
    await updateMachine(machine.id, { status: 'RUNNING' });
    await updateMachine(machine.id, { status: 'COMPLETE' });

    const updated = await getMachineById(machine.id);
    expect(updated.status).toBe('COMPLETE');
  });
});
```

## 📈 Performance Monitoring

### API Metrics
```typescript
interface APIMetrics {
  endpoint: string;
  method: string;
  responseTime: number;
  success: boolean;
  error?: string;
  timestamp: number;
}

// Track API performance
function trackAPICall(endpoint: string, method: string, startTime: number, success: boolean, error?: string) {
  const metrics: APIMetrics = {
    endpoint,
    method,
    responseTime: Date.now() - startTime,
    success,
    error,
    timestamp: Date.now(),
  };

  // Store metrics for analysis
  storeMetrics(metrics);
}
```

### Usage Analytics
```typescript
getAPIUsageStats(): {
  totalCalls: number;
  averageResponseTime: number;
  errorRate: number;
  topEndpoints: Array<{ endpoint: string; calls: number }>;
  slowEndpoints: Array<{ endpoint: string; avgTime: number }>;
}
```

This API provides a comprehensive interface for the IT Support system, enabling efficient data management and business operations while maintaining type safety and performance.</content>
</xai:function_call">Create comprehensive API technical documentation for the data access layer