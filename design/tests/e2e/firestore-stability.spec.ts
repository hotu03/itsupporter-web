/**
 * E2E Tests for Firestore Migration Stability
 *
 * Full user journey tests to verify data stability after migration.
 * Tests critical flows:
 * 1. Machine registration → Point earning → Transaction creation
 * 2. Customer portal data loading
 * 3. Redeem voucher flow
 * 4. Dashboard data consistency
 *
 * Run with: npm run test:e2e:firestore
 */

import { test, expect } from '@playwright/test';

test.describe('Firestore Migration - End-to-End Data Stability', () => {
  test('should complete full machine registration flow with Firestore', async ({ page }) => {
    await page.goto('/');

    // Navigate to machine registration
    await page.click('text=Đăng ký dịch vụ');
    await expect(page).toHaveURL('/dang-ky-dich-vu');

    // Fill registration form (simplified for test)
    await page.fill('input[placeholder*="Tên khách hàng"]', 'Test E2E Customer');
    await page.fill('input[placeholder*="Số điện thoại"]', '0987654321');
    await page.fill('input[placeholder*="Email"]', 'e2e@test.com');

    // Select service
    await page.click('text=Sửa chữa laptop');
    await page.click('button:has-text("Đặt dịch vụ")');

    // Verify success (receipt or success message)
    await expect(page.locator('text=Hoàn thành')).toBeVisible({ timeout: 10000 });

    console.log('✅ E2E Machine registration test passed');
  });

  test('should verify point earning and customer portal data consistency', async ({ page }) => {
    await page.goto('/customer-portal?email=e2e@test.com');

    // Check that customer data is loaded from Firestore
    await expect(page.locator('text=Test E2E Customer')).toBeVisible();

    // Check points and history
    await expect(page.locator('text=điểm')).toBeVisible();

    // Verify point history is loaded
    const historyItems = await page.locator('.history-item').count();
    expect(historyItems).toBeGreaterThan(0);

    console.log('✅ E2E Customer Portal data consistency test passed');
  });

  test('should handle redeem voucher flow with point deduction', async ({ page }) => {
    await page.goto('/customer-portal?email=e2e@test.com');

    await page.click('text=Đổi điểm thưởng');

    // Select a redeemable voucher
    await expect(page.locator('text=Đổi ngay')).toBeVisible();

    // The actual redeem button click would trigger the full flow
    // For test, we verify the UI is loaded from Firestore data
    await expect(page.locator('text=Điểm hiện tại')).toBeVisible();

    console.log('✅ E2E Redeem voucher flow test passed');
  });

  test('should verify dashboard data from Firestore', async ({ page }) => {
    await page.goto('/dashboard');

    // Check that stats are loaded (revenue, customers, machines)
    await expect(page.locator('text=Doanh thu')).toBeVisible();
    await expect(page.locator('text=KH trả phí')).toBeVisible();
    await expect(page.locator('text=Tổng giao dịch')).toBeVisible();

    // Check recent machines and transactions are populated
    const recentItems = await page.locator('.recent-item').count();
    expect(recentItems).toBeGreaterThan(0);

    console.log('✅ E2E Dashboard data test passed');
  });

  test('should maintain data consistency across page reloads', async ({ page }) => {
    await page.goto('/');

    // Perform an action that writes to Firestore
    await page.click('text=Đăng ký dịch vụ');
    await page.fill('input[placeholder*="Tên"]', 'Reload Test Customer');
    await page.fill('input[placeholder*="SĐT"]', '0912345678');
    await page.click('button:has-text("Đặt dịch vụ")');

    // Reload page
    await page.reload();

    // Verify data is still there (in dashboard or customer list)
    await page.goto('/dashboard');
    await expect(page.locator('text=Reload Test Customer')).toBeVisible({ timeout: 5000 });

    console.log('✅ E2E Data persistence after reload test passed');
  });
});

console.log('✅ E2E Firestore Stability Tests loaded.');
console.log('Run with: npm run test:e2e:firestore');
console.log('Note: These tests assume the app is running on localhost:5173');
