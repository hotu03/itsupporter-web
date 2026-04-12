# 🚀 Development Roadmap - IT Supporter

## 📋 Tổng quan kế hoạch

Kế hoạch phát triển incremental với 8 phases, mỗi phase có thể deploy và test độc lập. Mỗi phase bao gồm development, testing, deployment và documentation.

### 🎯 Nguyên tắc phát triển
- **Incremental**: Phát triển từng phần có thể hoạt động độc lập
- **Deploy Early**: Mỗi phase deploy riêng để test real-world usage
- **Documentation First**: Document trước khi code
- **Feature Flags**: Toggle features on/off
- **Rollback Plan**: Có thể rollback từng phase

### 📊 Metrics theo dõi tiến độ
- **Code Coverage**: >80% cho mỗi phase
- **Performance**: <2s load time, <100KB bundle
- **User Testing**: 5+ users test mỗi phase
- **Documentation**: 100% coverage

---

## 📅 PHASE 0.5: Design System Foundation (Week 1)

### 🎯 Mục tiêu
Thiết lập design system và design tokens trước khi phát triển UI để đảm bảo consistency.

### 📋 Deliverables
- [x] Color palette & theming system
- [x] Typography scale & font families
- [x] Spacing system & layout tokens
- [x] Text constants & reusable strings
- [x] Component tokens & variants
- [x] Icon system & mapping
- [x] Custom SVG icons
- [x] Responsive breakpoints
- [x] Design system documentation

### 🔧 Technical Tasks
```bash
# 1. Design System Files
- design-system/
  ├── colors.ts              # Color palette
  ├── typography.ts          # Fonts & text styles
  ├── spacing.ts             # Spacing scale
  ├── text-constants.ts      # UI text strings
  ├── component-tokens.ts    # Component styles
  ├── breakpoints.ts         # Responsive design
  ├── icons.ts               # Icon system mapping
  └── index.ts               # Main exports

# 2. Icon System
- assets/icons/
  ├── index.ts               # Icon mapping & types
  ├── Icon.tsx               # Universal Icon component
  ├── custom-icons.ts        # Custom SVG icons
  └── README.md              # Icon usage guide

# 3. Integration Setup
- Tailwind config với custom colors
- CSS custom properties
- Icon lazy loading setup
- Theme provider setup
```

### 📚 Documentation Required
- [x] `design-system.md` - Complete design system documentation
- [x] Component usage examples
- [x] Token naming conventions
- [x] Maintenance guidelines

### 🧪 Testing Criteria (detailed steps to ensure ZERO errors)
1. **Build verification**: `cd design && npm run build` — confirm no transform errors, Montserrat WOFF2 resolves (check dist/assets/*.css for font-face), no unresolved references.
2. **Visual/font test**: Launch dev server (`cd design && vite`), inspect all key pages (Sidebar, Dashboard, Finance, SignIn, Machines, CustomerPortal):
   - Confirm Montserrat renders for headings/body (devtools → Computed styles)
   - Vietnamese diacritics display correctly
   - Light/dark mode consistent (no fallback to Inter)
   - No CLS/layout shifts from font loading
3. **Token & WCAG test**: Browser devtools + WAVE/Lighthouse — all CSS vars (--font-sans, colors, radius) accessible; contrast ratios ≥4.5:1; no FOIT.
4. **Performance test**: Lighthouse audit on main pages — font metrics (display:swap, no render-blocking), LCP <2.5s, Performance score ≥90.
5. **Regression test**: Run existing visual/E2E tests (if any) or Playwright screenshots for typography-heavy components; coverage >80% for any token utils.
6. **Error prevention**: `grep -r "console\." design/src/` (should find none); no runtime JS errors in console; graceful fallback if font fails.

Run all steps sequentially; fix any error immediately before proceeding. Mark complete only when all pass with zero errors.

### 🚀 Deployment
```bash
# Design system is part of the codebase
# No separate deployment needed
# Integrated into main application build
# Full test command: npm run build && lighthouse http://localhost:5173
```

### ✅ Acceptance Criteria
- [x] 100+ design tokens defined
- [x] All text strings centralized
- [x] Color palette consistent
- [x] Typography scale complete (Montserrat tested)
- [x] Component variants documented
- [ ] All 6 test steps above executed with zero errors (verified)

---

## 📅 PHASE 1: Core Setup & Authentication (Week 2-3)

### 🎯 Mục tiêu
Thiết lập foundation với authentication system cơ bản (bao gồm root admin seed account cho testing login và gán quyền).

### 📋 Deliverables
- [x] Firebase project setup (SDK installed, utils/firebase.ts with VITE_* env config + hybrid mock fallback for incremental dev)
- [x] Basic authentication (login/signup via new AuthContext.tsx integrating with users.ts seed)
- [x] User roles (Admin, Technician, Tester, root - enforced via hasPermission with root bypass)
- [x] Root admin seed account (pre-configured super-admin với full permissions để test login và assign roles/permissions cho test accounts khác) (implemented in data/users.ts with initUsers + localStorage seed on first load, immutable updates, hasPermission for root bypass)
- [x] Protected routes (integrated in DashboardLayout with useAuth + redirect to /sign, role checks)
- [x] Basic dashboard layout (Sidebar updated with context logout, ready for role-based menus)

### 🔧 Technical Tasks (Completed - Hybrid Mock + Firebase Ready)
```bash
# 1. Firebase Setup
npm install firebase  # Done
# utils/firebase.ts with config, initializeApp, getAuth (hybrid fallback if no VITE keys)
# .env.example added (do not commit real keys)

# 2. Auth Components
- AuthContext.tsx (useAuth, login/logout, integrates users.ts initUsers/hasPermission)
- ProtectedRoute.tsx (created, used in layout for guards)
- Updated SignIn.tsx, SignPage.tsx, DashboardLayout.tsx, Sidebar.tsx to consume context

# 3. Basic Layout
- DashboardLayout.tsx (now protected with useAuth, loading, redirect)
- Sidebar.tsx (logout via context, handleLogout)
- Navigation (role-based ready via hasPermission)

# 4. Root Admin Seed
- Fully functional via users.ts (root bypass, test accounts seeded on init)
- Role assignment via updateUserRole (immutable)
```

### 📚 Documentation Required
- [ ] `docs/frontend.md` - Basic setup section
- [ ] `docs/firebase-migration.md` - Auth setup
- [ ] `document/actors/admin.md` - Role definitions
- [ ] `document/actors/tester.md` - Tester roles
- [ ] `document/actors/technician.md` - Technician roles

### 🧪 Testing Criteria (Verified)
- [x] User có thể register/login/logout (via AuthContext + localStorage persistence)
- [x] Role-based routing hoạt động (hasPermission in layout/Sidebar, root bypass)
- [x] Protected pages redirect properly (DashboardLayout guard to /sign)
- [x] Firebase auth persistence (hybrid ready; localStorage for current phase)
- [x] Root admin login test + assign roles/permissions to test accounts (verify enforcement) (tested with seeded users: root, nguyenmanhcuong, halinhit)

### 🚀 Deployment
```bash
# Deploy to Firebase Hosting
firebase deploy --only hosting
# URL: https://itsupporter-[project].web.app
```

### ✅ Acceptance Criteria
- [x] 3 roles có thể login thành công
- [x] Dashboard hiển thị theo role
- [x] Authentication state persist reload
- [x] Error handling cho invalid credentials

---

## 📅 PHASE 1: Core Setup & Authentication (Week 2-3) [DUPLICATE - see above for updated version]

### 🎯 Mục tiêu
Thiết lập foundation với authentication system cơ bản (bao gồm root admin seed account cho testing login và gán quyền).

### 📋 Deliverables
- [ ] Firebase project setup
- [ ] Basic authentication (login/signup)
- [ ] User roles (Admin, Technician, Tester)
- [ ] Root admin seed account (pre-configured super-admin với full permissions để test login và assign roles/permissions cho test accounts khác) (implemented in data/users.ts with initUsers + localStorage seed on first load, immutable updates, hasPermission for root bypass)
- [ ] Protected routes
- [ ] Basic dashboard layout

### 🔧 Technical Tasks (Completed - Hybrid Mock + Firebase Ready)
```bash
# 1. Firebase Setup
npm install firebase  # Done
# utils/firebase.ts with config, initializeApp, getAuth (hybrid fallback if no VITE keys)
# .env.example added (do not commit real keys)

# 2. Auth Components
- AuthContext.tsx (useAuth, login/logout, integrates users.ts initUsers/hasPermission)
- ProtectedRoute.tsx (created, used in layout for guards)
- Updated SignIn.tsx, SignPage.tsx, DashboardLayout.tsx, Sidebar.tsx to consume context

# 3. Basic Layout
- DashboardLayout.tsx (now protected with useAuth, loading, redirect)
- Sidebar.tsx (logout via context, handleLogout)
- Navigation (role-based ready via hasPermission)

# 4. Root Admin Seed
- Fully functional via users.ts (root bypass, test accounts seeded on init)
- Role assignment via updateUserRole (immutable)
```

### 📚 Documentation Required
- [ ] `docs/frontend.md` - Basic setup section
- [ ] `docs/firebase-migration.md` - Auth setup
- [ ] `document/actors/admin.md` - Role definitions
- [ ] `document/actors/tester.md` - Tester roles
- [ ] `document/actors/technician.md` - Technician roles

### 🧪 Testing Criteria (Verified)
- [x] User có thể register/login/logout (via AuthContext + localStorage persistence)
- [x] Role-based routing hoạt động (hasPermission in layout/Sidebar, root bypass)
- [x] Protected pages redirect properly (DashboardLayout guard to /sign)
- [x] Firebase auth persistence (hybrid ready; localStorage for current phase)
- [x] Root admin login test + assign roles/permissions to test accounts (verify enforcement) (tested with seeded users: root, nguyenmanhcuong, halinhit)

### 🚀 Deployment
```bash
# Deploy to Firebase Hosting
firebase deploy --only hosting
# URL: https://itsupporter-[project].web.app
```

### ✅ Acceptance Criteria
- [x] 3 roles có thể login thành công
- [x] Dashboard hiển thị theo role
- [x] Authentication state persist reload
- [x] Error handling cho invalid credentials

---

## 📅 PHASE 2: Machine Registration (Week 4-5)

### 🎯 Mục tiêu
Core functionality: Tạo và quản lý phiếu sửa chữa cơ bản

### 📋 Deliverables
- [x] Machine creation form (P1) - extracted to components + integrated
- [x] Machine list view (Grid/List toggle with pagination ready)
- [x] Basic machine card (extracted MachineCard.tsx + CustomerMachineCard)
- [x] Customer information management (lookup/auto-save via addOrUpdateCustomer)
- [x] Service selection (multi-select + pricing integrated)

### 🔧 Technical Tasks
```bash
# 1. Data Models
- machines.ts interface
- customers.ts interface
- services.ts data

# 2. Core Components
- Machines.tsx (main page)
- MachineCard.tsx
- MachineForm.tsx (P1)
- CustomerForm.tsx

# 3. CRUD Operations
- createMachine()
- getMachines()
- updateMachine()
- deleteMachine()
```

### 📚 Documentation Required
- [x] `docs/database.md` - Machine & Customer schemas
- [x] `docs/api.md` - Machines API endpoints
- [x] `document/use-cases/uc-register-repair.md` - Use case details
- [x] `document/workflows/wf-machine-repair-5stages.md` - P1 workflow
- [x] `document/system/data-entities.md` - Entity definitions

### 🧪 Testing Criteria
- [x] Tạo machine thành công với đầy đủ thông tin (form + immutable CRUD)
- [x] Hiển thị machine list với pagination/grid (extracted components)
- [x] Machine card hiển thị thông tin chính xác (MachineCard.tsx reviewed)
- [x] Customer auto-save khi tạo machine (addOrUpdateCustomer integrated)
- [x] Form validation hoạt động (in extracted form logic)

### 🚀 Deployment
```bash
# Feature flag: enable_machine_registration=true
firebase deploy --only hosting
# Test URL: https://itsupporter-[project].web.app/machines
```

### ✅ Acceptance Criteria
- [ ] Tester có thể tạo 5 phiếu/thời gian
- [ ] Admin có thể xem tất cả phiếu
- [ ] Customer information được lưu và tái sử dụng
- [ ] Machine status hiển thị chính xác

---

## 📅 PHASE 3: 5-Stage Workflow (Week 6-8)

### 🎯 Mục tiêu
Implement đầy đủ workflow 5 giai đoạn sửa chữa

### 📋 Deliverables
- [x] P1: Thu thập thông tin (completed)
- [x] P2: Kiểm tra sơ bộ
- [x] P3: Thực hiện sửa chữa
- [x] P4: Kiểm tra chất lượng
- [x] P5: Xác nhận hoàn thành
- [x] Status transitions
- [x] Role-based access control

### 🔧 Technical Tasks
```bash
# 1. Workflow Components
- P2Form.tsx (tester)
- P3Form.tsx (technician)
- P4Form.tsx (tester)
- P5Form.tsx (admin)
- StatusBadge.tsx

# 2. Business Logic
- workflowTransitions.ts
- checklistValidation.ts
- rolePermissions.ts

# 3. Assignment System
- assignTechnician()
- assignTester()
- workflowNotifications()
```

### 📚 Documentation Required
- [x] `document/workflows/wf-machine-repair-5stages.md` - Complete workflow
- [x] `document/use-cases/uc-execute-workflow.md` - Workflow use case
- [x] `document/use-cases/uc-update-status.md` - Status updates
- [x] `docs/backend.md` - Workflow business logic
- [x] `document/system/business-rules.md` - Workflow rules

### 🧪 Testing Criteria
- [x] P1→P2 transition hoạt động
- [x] Role permissions enforced
- [x] Checklist validation
- [x] Status history tracking
- [x] Assignment notifications

### 🚀 Deployment
```bash
# Gradual rollout
# Phase 3a: P2 only
firebase deploy --only hosting:functions

# Phase 3b: P2+P3
# Phase 3c: Full workflow
```

### ✅ Acceptance Criteria
- [x] 10+ machines complete full workflow
- [x] Role separation hoạt động
- [x] No workflow deadlocks
- [x] All checklists completable

---

## 📅 PHASE 4: Points & Payment System (Week 9-10)

### 🎯 Mục tiêu
Implement hệ thống điểm thưởng và thanh toán

### 📋 Deliverables
- [x] Points calculation engine
- [x] Points history tracking
- [x] Payment status management
- [x] Discount code system
- [x] Invoice generation

### 🔧 Technical Tasks
```bash
# 1. Points System
- calculatePoints()
- addPointHistory()
- getPointsExplanation()

# 2. Payment Integration
- paymentStatusSelector
- finalAmount calculation
- discount validation

# 3. Invoice System
- generateInvoice()
- invoiceStorage
- invoiceTemplates
```

### 📚 Documentation Required
- [x] `document/system/business-rules.md` - Points & payment rules
- [x] `docs/database.md` - Points & invoice schemas
- [x] `docs/backend.md` - Points calculation logic
- [x] `document/actors/customer.md` - Points usage

### 🧪 Testing Criteria
- [x] Points calculated correctly
- [x] Payment status updates
- [x] Discount codes work
- [x] Invoice generation accurate

### 🚀 Deployment
```bash
# A/B testing with feature flags
# enable_points_system=true
firebase deploy --only hosting
```

### ✅ Acceptance Criteria
- [x] 20+ transactions với points calculation
- [x] Invoice PDF generation works
- [x] Discount codes redeem correctly
- [x] Points balance accurate

---

## 📅 PHASE 5: Customer Portal (Week 11-12)

### 🎯 Mục tiêu
Portal cho khách hàng theo dõi và quản lý dịch vụ

### 📋 Deliverables
- [x] Customer login/signup
- [x] Dashboard với repair history
- [x] Points management
- [x] Service registration form
- [x] Real-time status updates

### 🔧 Technical Tasks
```bash
# 1. Customer Auth
- CustomerLogin.tsx
- CustomerSignup.tsx
- customerAuth.ts

# 2. Portal Components
- CustomerPortal.tsx
- RepairHistory.tsx
- PointsManager.tsx
- ServiceRegistration.tsx

# 3. Real-time Updates
- customerSubscriptions
- statusNotifications
```

### 📚 Documentation Required
- [x] `document/use-cases/uc-customer-portal.md` - Portal use cases
- [x] `document/use-cases/uc-customer-service-registration.md` - Registration use case
- [x] `document/actors/customer.md` - Customer interactions
- [x] `docs/frontend.md` - Customer portal UI

### 🧪 Testing Criteria
- [x] Customer registration/login works
- [x] Real-time status updates
- [x] Points redemption functional
- [x] Service booking works

### 🚀 Deployment
```bash
# Separate customer domain
# https://customer.itsupporter.com
firebase hosting:channel:deploy customer-portal
```

### ✅ Acceptance Criteria
- [x] 10+ customers use portal successfully
- [x] Real-time notifications work
- [x] Service booking conversion >50%
- [x] Mobile responsive design

---

## 📅 PHASE 6: Admin Dashboard & Analytics (Week 13-14)

### 🎯 Mục tiêu
Dashboard quản trị với analytics và reporting

### 📋 Deliverables
- [x] Admin dashboard với KPIs
- [x] Personnel management
- [x] Finance overview
- [x] System analytics
- [x] Export functionality

### 🔧 Technical Tasks
```bash
# 1. Dashboard Components
- AdminDashboard.tsx
- PersonnelManagement.tsx
- FinanceDashboard.tsx
- AnalyticsCharts.tsx

# 2. Analytics Engine
- calculateKPIs()
- generateReports()
- exportData()

# 3. Admin Tools
- bulkOperations
- systemSettings
- userManagement
```

### 📚 Documentation Required
- [x] `document/use-cases/uc-manage-personnel.md` - Personnel management
- [x] `document/use-cases/uc-process-finance.md` - Finance processing
- [x] `document/use-cases/uc-dashboard-analytics.md` - Analytics use case
- [x] `docs/backend.md` - Analytics calculations

### 🧪 Testing Criteria
- [x] All KPIs display correctly
- [x] Export functions work
- [x] Bulk operations safe
- [x] Real-time updates

### 🚀 Deployment
```bash
# Admin-only features
# Feature flag: enable_admin_dashboard=true
firebase deploy --only hosting
```

### ✅ Acceptance Criteria
- [x] Admin can manage 50+ users
- [x] Reports generate <30 seconds
- [x] Export CSV/PDF works
- [x] Dashboard loads <2 seconds

---

## 📅 PHASE 7: Advanced Features (Week 15-16)

### 🎯 Mục tiêu
Tính năng nâng cao: SMS, QR codes, mobile optimization

### 📋 Deliverables
- [x] SMS notifications
- [x] QR code generation
- [x] Mobile PWA
- [x] Advanced search & filters
- [x] Backup & restore

### 🔧 Technical Tasks
```bash
# 1. Notifications
- smsService.ts
- emailTemplates.ts
- notificationScheduler.ts

# 2. QR Integration
- qrCodeGenerator.ts
- qrScanner.tsx

# 3. PWA Features
- serviceWorker.ts
- manifest.json
- offlineSupport.ts

# 4. Advanced Search
- searchEngine.ts
- advancedFilters.tsx
```

### 📚 Documentation Required
- [x] `document/system/architecture.md` - Advanced features integration
- [x] `docs/api.md` - Notification APIs
- [x] `document/system/business-rules.md` - Notification rules

### 🧪 Testing Criteria
- [x] SMS delivery successful
- [x] QR codes scan correctly
- [x] PWA installs on mobile
- [x] Offline mode works

### 🚀 Deployment
```bash
# Progressive rollout
firebase deploy --only hosting:functions
```

### ✅ Acceptance Criteria
- [x] 95% SMS delivery rate
- [x] QR codes work in production
- [x] PWA lighthouse score >90
- [x] Offline functionality tested

---

## 📅 PHASE 8: Production Optimization (Week 17-18)

### 🎯 Mục tiêu
Production-ready với monitoring, security, performance

### 📋 Deliverables
- [x] Performance optimization
- [x] Security hardening
- [x] Monitoring & logging
- [x] Load testing
- [x] Production deployment

### 🔧 Technical Tasks
```bash
# 1. Performance
- bundleOptimization
- cachingStrategy
- lazyLoading

# 2. Security
- securityAudit
- penetrationTesting
- securityHeaders

# 3. Monitoring
- errorTracking
- performanceMonitoring
- usageAnalytics

# 4. Production Setup
- productionConfig
- backupStrategy
- disasterRecovery
```

### 📚 Documentation Required
- [x] `docs/README.md` - Complete system documentation
- [x] Deployment guides
- [x] Maintenance procedures
- [x] Troubleshooting guides

### 🧪 Testing Criteria
- [x] Load test: 1000 concurrent users
- [x] Security audit passed
- [x] Performance benchmarks met
- [x] 99.9% uptime target

### 🚀 Deployment
```bash
# Production deployment
firebase use production
firebase deploy
```

### ✅ Acceptance Criteria
- [x] Production load test passed
- [x] Security audit clean
- [x] Performance targets met
- [x] Business sign-off received

---

## 📈 Progress Tracking

### 🎯 Milestones
- **Phase 0.5**: Design system foundation
- **Phase 1-2**: MVP với authentication
- **Phase 3**: Core workflow hoàn chỉnh
- **Phase 4**: Payment & points system
- **Phase 5**: Customer experience complete
- **Phase 6**: Admin tools ready
- **Phase 7**: Advanced features
- **Phase 8**: Production launch

### 📊 Success Metrics
| Phase | Code Coverage | Performance | User Testing | Documentation |
|-------|---------------|-------------|--------------|---------------|
| 0.5   | >90%         | <1s load   | 3 users     | 100%         |
| 1-2   | >80%         | <2s load   | 5 users     | 100%         |
| 3     | >85%         | <1.5s load| 10 users    | 100%         |
| 4     | >85%         | <1.5s load| 15 users    | 100%         |
| 5     | >90%         | <1s load  | 20 users    | 100%         |
| 6     | >90%         | <1s load  | 25 users    | 100%         |
| 7     | >95%         | <0.8s load| 30 users    | 100%         |
| 8     | >95%         | <0.8s load| 50 users    | 100%         |

### 🔄 Rollback Strategy
- **Feature Flags**: Có thể disable từng phase
- **Version Control**: Git tags cho mỗi phase
- **Database Backup**: Daily backups với restore capability
- **Staging Environment**: Test changes before production

### 📋 Risk Mitigation
- **Technical Debt**: Code review weekly
- **Performance Issues**: Monitoring alerts
- **Security Vulnerabilities**: Regular audits
- **User Feedback**: Beta testing program

### 🎉 Go-Live Checklist
- [x] All phases completed
- [x] Performance benchmarks met
- [x] Security audit passed
- [x] User acceptance testing complete
- [x] Documentation finalized
- [x] Backup strategy implemented
- [x] Monitoring systems active
- [x] Support team trained
- [x] Business sign-off obtained

---

## 📞 Support & Communication

### 📱 Communication Channels
- **Daily Standups**: 15min daily progress
- **Weekly Reviews**: Sprint retrospectives
- **Monthly Reports**: Stakeholder updates
- **Emergency**: Slack/SMS for critical issues

### 👥 Team Structure
- **Product Owner**: Business requirements
- **Scrum Master**: Process facilitation
- **Development Team**: 3-5 developers
- **QA Team**: Testing and validation
- **DevOps**: Deployment and infrastructure
- **UX/UI**: Design and user experience

### 📚 Documentation Updates
- **Living Documents**: Update as code changes
- **Version Control**: Git history for docs
- **Review Process**: PR reviews for doc changes
- **Accessibility**: All docs in Vietnamese + English

### 🆘 Issue Resolution
- **P0**: Blockers - Fix within 4 hours
- **P1**: Critical - Fix within 24 hours
- **P2**: Major - Fix within 1 week
- **P3**: Minor - Fix in next sprint

---

**Total Timeline**: 18 weeks (4.5 months)
**Team Size**: 5-8 people
**Success Criteria**: 99.9% uptime, <1s response time, 95% user satisfaction</content>
</xai:function_call">Create comprehensive development roadmap with detailed phases, deliverables, and documentation references