# Legacy LocalStorage Implementations

This folder contains the **original localStorage-based implementations** of all data layers before the migration to Firebase Firestore.

**Purpose:**
- Historical reference
- Easy comparison between old and new implementations
- Rollback capability if needed
- Educational purposes

**Files:**
- `original-machines.ts` - Machine management with sequential ID logic
- `original-invoices.ts` - Invoice generation and management
- `original-finance.ts` - Transaction management
- `original-customers.ts` - Customer CRUD operations
- `original-points.ts` - Point rules and history
- `original-discounts.ts` - Discount code management
- `original-services.ts` - Service catalog
- `original-members.ts` - Personnel/member management
- `original-redeemed-vouchers.ts` - Voucher redemption tracking
- `original-users.ts` - User and auth related data

**Note:** These files are **no longer used in production**. All active code uses the `firestore*.ts` equivalents through deprecated stubs in the main `data/` directory.

Last updated: 2026-04-21
Migration completed: 100% (with stubs for backward compatibility)
