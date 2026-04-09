# Firebase Migration Guide

## 📋 Tổng quan

Hướng dẫn chi tiết về việc migrate hệ thống IT Supporter từ LocalStorage sang Firebase, bao gồm Firestore database, Authentication, và Hosting.

## 🎯 Tại sao nên dùng Firebase?

### Ưu điểm
- **Real-time Sync**: Dữ liệu đồng bộ realtime giữa các thiết bị
- **Offline Support**: Firebase SDK hỗ trợ offline mode
- **Authentication**: Built-in user management
- **Security Rules**: Granular access control
- **Scalability**: Không giới hạn như LocalStorage (5-10MB)
- **Backup & Recovery**: Automatic cloud backup
- **Multi-platform**: Web, mobile, desktop support
- **Analytics**: Built-in usage analytics

### Nhược điểm
- **Cost**: Phí theo usage (reads/writes)
- **Vendor Lock-in**: Phụ thuộc vào Google ecosystem
- **Learning Curve**: Firebase-specific patterns
- **Network Dependency**: Cần internet cho core features
- **Security Rules Complexity**: Rule-based access control

## 🏗️ Migration Architecture

### Current vs Future Architecture

#### Current (LocalStorage)
```
┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   LocalStorage  │
│   (React)       │◄──►│   (JSON)        │
│                 │    │                 │
│ • Components    │    │ • JSON files    │
│ • Business Logic│    │ • Browser-only  │
│ • Data Layer    │    │ • No sync       │
└─────────────────┘    └─────────────────┘
```

#### Future (Firebase)
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Firebase SDK  │    │   Firestore     │
│   (React)       │◄──►│   (Client)      │◄──►│   (Cloud DB)   │
│                 │    │                 │    │                 │
│ • Components    │    │ • Auth          │    │ • Real-time    │
│ • Business Logic│    │ • Offline       │    │ • Sync         │
│ • Data Layer    │    │ • Security      │    │ • Backup       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Firebase Services sử dụng

#### 1. Firebase Authentication
- **Purpose**: Thay thế custom auth system
- **Features**: Email/password, Google sign-in, custom claims
- **Integration**: Role-based access (Admin, Technician, Tester)

#### 2. Firestore Database
- **Purpose**: Thay thế LocalStorage
- **Type**: NoSQL document database
- **Features**: Real-time listeners, offline support, queries

#### 3. Firebase Hosting
- **Purpose**: Deploy frontend application
- **Features**: CDN, SSL, custom domains
- **Benefits**: Fast, secure, global distribution

#### 4. Firebase Security Rules
- **Purpose**: Access control và data validation
- **Type**: Declarative rules language
- **Scope**: Database và file access

## 📊 Data Model Migration

### Firestore Collection Structure

#### /machines (Collection)
```typescript
interface MachineDoc {
  id: string; // Document ID
  status: Status;
  customerName: string;
  phone: string;
  time: Timestamp; // Firebase Timestamp
  description: string;
  expired: string;
  category: string;
  tester: string;
  technician: string;
  warranty: "con" | "het";
  password?: string;
  charger: boolean;
  appointmentTime?: Timestamp;
  dropOffTime?: Timestamp;
  testerBefore: string;
  testerAfter: string;
  registrationType: "online" | "in-person";
  isApproved?: boolean;
  machineCondition?: string;
  needs?: string;
  checklistBefore?: boolean[];
  checklistAfter?: boolean[];
  techChecklist?: boolean[];
  techNotes?: string;
  adminConfirmNote?: string;
  customerSignature?: string; // Base64 or Storage URL
  additionalServices?: string[];
  serviceAmount?: number;
  discountCode?: string;
  discountAmount?: number;
  paymentStatus?: "paid" | "pending" | "free";
  finalAmount?: number;
  pointsEarned?: number;

  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string; // User ID
  updatedBy: string; // User ID
}
```

#### /customers (Collection)
```typescript
interface CustomerDoc {
  id: string; // Document ID (phone number)
  name: string;
  phone: string;
  totalRepairs: number;
  points: number;
  registeredAt: Timestamp;

  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

#### /users (Collection - Auth integration)
```typescript
interface UserDoc {
  uid: string; // Firebase Auth UID
  email: string;
  displayName: string;
  role: "admin" | "technician" | "tester";
  isActive: boolean;
  approvalStatus: "pending" | "approved" | "rejected";

  // Profile data
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

  // Stats
  machinesDone: number;
  testsRun: number;

  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLoginAt: Timestamp;
}
```

#### /point-rules (Collection)
```typescript
interface PointRuleDoc {
  id: string;
  name: string;
  type: "per_order" | "amount_threshold";
  points: number;
  threshold?: number;
  enabled: boolean;
  description?: string;

  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
}
```

#### /point-history (Collection)
```typescript
interface PointHistoryDoc {
  id: string;
  customerPhone: string;
  customerName: string;
  type: "earn" | "redeem";
  points: number;
  date: Timestamp;
  description: string;
  relatedId?: string; // Machine ID

  createdAt: Timestamp;
}
```

### Subcollections Pattern
```typescript
// machines/{machineId}/checklist-items (Subcollection)
interface ChecklistItemDoc {
  id: string;
  type: "before" | "after" | "technical";
  item: string;
  completed: boolean;
  completedAt?: Timestamp;
  completedBy?: string;
}

// customers/{customerId}/repair-history (Subcollection)
interface RepairHistoryDoc {
  id: string;
  machineId: string;
  date: Timestamp;
  amount: number;
  status: Status;
  pointsEarned: number;
}
```

## 🔐 Security Rules

### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Admin can read/write all users
    match /users/{userId} {
      allow read, write: if isAdmin();
    }

    // Authenticated users can read customers
    match /customers/{customerId} {
      allow read: if request.auth != null;
      allow write: if isAuthenticatedUser();
    }

    // Machines access based on role
    match /machines/{machineId} {
      allow read: if canReadMachine();
      allow write: if canWriteMachine();
    }

    // Point rules - admin only
    match /point-rules/{ruleId} {
      allow read: if request.auth != null;
      allow write: if isAdmin();
    }

    // Point history - read for all, write for system
    match /point-history/{historyId} {
      allow read: if request.auth != null;
      allow write: if isSystemWrite();
    }
  }

  // Helper functions
  function isAdmin() {
    return request.auth != null &&
           exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
           get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
  }

  function isAuthenticatedUser() {
    return request.auth != null &&
           exists(/databases/$(database)/documents/users/$(request.auth.uid));
  }

  function canReadMachine() {
    return request.auth != null;
  }

  function canWriteMachine() {
    return isAuthenticatedUser() ||
           (request.auth != null && request.resource.data.registrationType == 'online');
  }

  function isSystemWrite() {
    // Allow writes from Cloud Functions or admin
    return isAdmin() || request.auth.token.firebase.sign_in_provider == 'admin';
  }
}
```

## 🚀 Implementation Plan

### Phase 1: Setup & Authentication (Week 1)
1. **Firebase Project Setup**
   ```bash
   npm install firebase
   # Configure Firebase config
   ```

2. **Authentication Implementation**
   ```typescript
   import { initializeApp } from 'firebase/app';
   import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     // ...
   };

   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
   ```

3. **User Management**
   - Migrate existing users to Firebase Auth
   - Implement role-based access
   - Custom claims for admin roles

### Phase 2: Database Migration (Week 2-3)
1. **Firestore Setup**
   ```typescript
   import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

   export const db = getFirestore(app);

   // Migration function
   export async function migrateLocalStorageToFirestore() {
     const machines = getMachines(); // From localStorage
     const batch = writeBatch(db);

     machines.forEach(machine => {
       const docRef = doc(collection(db, 'machines'));
       batch.set(docRef, {
         ...machine,
         createdAt: Timestamp.now(),
         updatedAt: Timestamp.now(),
       });
     });

     await batch.commit();
   }
   ```

2. **Data Layer Refactoring**
   ```typescript
   // Before (LocalStorage)
   export function getMachines(): Machine[] {
     const stored = localStorage.getItem("its_machines");
     return stored ? JSON.parse(stored) : [];
   }

   // After (Firestore)
   export async function getMachines(): Promise<Machine[]> {
     const querySnapshot = await getDocs(collection(db, 'machines'));
     return querySnapshot.docs.map(doc => ({
       id: doc.id,
       ...doc.data()
     })) as Machine[];
   }
   ```

3. **Real-time Listeners**
   ```typescript
   export function subscribeToMachines(callback: (machines: Machine[]) => void) {
     const unsubscribe = onSnapshot(collection(db, 'machines'), (snapshot) => {
       const machines = snapshot.docs.map(doc => ({
         id: doc.id,
         ...doc.data()
       })) as Machine[];
       callback(machines);
     });

     return unsubscribe; // Call to stop listening
   }
   ```

### Phase 3: Offline Support (Week 4)
1. **Enable Offline Persistence**
   ```typescript
   import { enableIndexedDbPersistence } from 'firebase/firestore';

   enableIndexedDbPersistence(db)
     .catch((err) => {
       if (err.code == 'failed-precondition') {
         console.log('Multiple tabs open, persistence can only be enabled in one tab at a time.');
       } else if (err.code == 'unimplemented') {
         console.log('Browser doesn\'t support persistence.');
       }
     });
   ```

2. **Offline Queue**
   ```typescript
   // Queue operations when offline
   export class OfflineQueue {
     private queue: Array<() => Promise<void>> = [];

     add(operation: () => Promise<void>) {
       this.queue.push(operation);
     }

     async process() {
       while (this.queue.length > 0) {
         const operation = this.queue.shift();
         if (operation) {
           try {
             await operation();
           } catch (error) {
             // Handle offline operation failure
             this.queue.unshift(operation); // Retry later
             break;
           }
         }
       }
     }
   }
   ```

### Phase 4: UI Integration (Week 5)
1. **Loading States**
   ```typescript
   const [machines, setMachines] = useState<Machine[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
     const unsubscribe = subscribeToMachines((data) => {
       setMachines(data);
       setLoading(false);
     });

     return unsubscribe;
   }, []);
   ```

2. **Error Handling**
   ```typescript
   try {
     await createMachine(newMachineData);
   } catch (error) {
     if (error.code === 'permission-denied') {
       setError('Bạn không có quyền tạo phiếu này');
     } else if (error.code === 'unavailable') {
       setError('Không thể kết nối đến server. Vui lòng thử lại.');
     } else {
       setError('Có lỗi xảy ra. Vui lòng thử lại.');
     }
   }
   ```

### Phase 5: Testing & Optimization (Week 6)
1. **Unit Tests**
   ```typescript
   describe('Firebase Machines API', () => {
     test('creates machine successfully', async () => {
       const machineData = { /* test data */ };
       const machine = await createMachine(machineData);
       expect(machine.id).toBeDefined();
       expect(machine.status).toBe('WAITING');
     });
   });
   ```

2. **Performance Optimization**
   ```typescript
   // Pagination for large datasets
   export async function getMachinesPaginated(lastDoc?: DocumentSnapshot, limit = 20) {
     let query = collection(db, 'machines')
       .orderBy('createdAt', 'desc')
       .limit(limit);

     if (lastDoc) {
       query = query.startAfter(lastDoc);
     }

     const snapshot = await getDocs(query);
     return {
       machines: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
       lastDoc: snapshot.docs[snapshot.docs.length - 1],
       hasMore: snapshot.docs.length === limit
     };
   }
   ```

## 💰 Cost Estimation

### Firebase Pricing (Free Tier)
- **Authentication**: 50,000 monthly active users FREE
- **Firestore**: 1GB storage, 50,000 reads/day, 20,000 writes/day FREE
- **Hosting**: 10GB storage, 360MB transfer/month FREE

### Paid Tier Estimates
```typescript
// Estimated monthly usage
const estimatedUsage = {
  users: 100,           // Active users
  machines: 500,        // Monthly machine records
  reads: 10000,         // Daily reads
  writes: 2000,         // Daily writes
  storage: 50,          // MB storage
};

// Estimated monthly cost: ~$5-15/month
```

## 🔒 Security Considerations

### Data Protection
1. **Encryption**: Firebase encrypts data at rest and in transit
2. **Access Control**: Security rules prevent unauthorized access
3. **Audit Logs**: Firebase provides audit trails
4. **Backup**: Automatic daily backups

### Authentication Security
1. **Email Verification**: Require email verification
2. **Password Policy**: Enforce strong passwords
3. **Session Management**: Automatic token refresh
4. **MFA**: Enable multi-factor authentication

## 📊 Migration Benefits

### Immediate Benefits
- **Data Persistence**: No more LocalStorage limits
- **Real-time Sync**: Multiple device support
- **Offline Mode**: Works without internet
- **Backup**: Automatic cloud backup

### Long-term Benefits
- **Scalability**: Handle thousands of users
- **Analytics**: Built-in usage analytics
- **APIs**: REST and GraphQL APIs
- **Integration**: Connect with other Google services

## 🚨 Migration Risks & Mitigations

### Data Loss Risk
- **Mitigation**: Backup all LocalStorage data before migration
- **Rollback Plan**: Keep LocalStorage code for fallback

### Performance Impact
- **Mitigation**: Implement pagination and lazy loading
- **Monitoring**: Track query performance and optimize

### Network Dependency
- **Mitigation**: Robust offline support with sync queues
- **Fallback**: Graceful degradation when offline

## 🛠️ Development Tools

### Firebase CLI
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize project
firebase init

# Deploy
firebase deploy
```

### Firebase Emulator
```bash
# Start emulators locally
firebase emulators:start

# Run tests against emulator
firebase emulators:exec "npm test"
```

## 📈 Monitoring & Analytics

### Firebase Analytics
```typescript
import { getAnalytics } from 'firebase/analytics';

const analytics = getAnalytics(app);

// Track custom events
logEvent(analytics, 'machine_created', {
  category: 'laptop',
  technician: 'user123'
});
```

### Performance Monitoring
```typescript
import { getPerformance } from 'firebase/performance';

const perf = getPerformance(app);
// Automatic performance monitoring
```

## 🎯 Implementation Timeline

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| Setup & Auth | 1 week | Firebase project, auth system |
| Database Migration | 2 weeks | Firestore schema, data migration |
| Offline Support | 1 week | Offline persistence, sync queues |
| UI Integration | 1 week | Real-time updates, error handling |
| Testing & Optimization | 1 week | Performance tuning, security audit |

## 📞 Support & Resources

### Firebase Documentation
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Authentication Guide](https://firebase.google.com/docs/auth)
- [Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

### Community Resources
- [Firebase Slack Community](https://firebase.community/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/firebase)
- [Firebase YouTube Channel](https://www.youtube.com/firebase)

### Professional Support
- Firebase Support Plans
- Google Cloud Professional Services
- Certified Firebase Consultants

---

**Total Migration Effort**: 6 weeks
**Risk Level**: Medium
**Business Impact**: High (scalability, reliability)
**Recommended**: Yes for production deployment</content>
</xai:function_call">Create comprehensive Firebase migration guide with detailed implementation plan