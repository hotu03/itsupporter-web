import { test, expect } from '@playwright/test';

test.describe('Firebase Connectivity', () => {

  test('Staff Firebase Firestore - Machines collection connection', async ({ page }) => {
    await page.goto('/dashboard/machines');
    await page.waitForLoadState('networkidle');

    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.waitForTimeout(2000);

    const criticalErrors = consoleErrors.filter(err =>
      !err.includes('Warning') &&
      !err.includes('React') &&
      !err.includes('downloadable font') &&
      !err.includes('favicon')
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test('Staff Firebase Firestore - Customers collection connection', async ({ page }) => {
    await page.goto('/dashboard/customers');
    await page.waitForLoadState('networkidle');

    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.waitForTimeout(2000);

    const criticalErrors = consoleErrors.filter(err =>
      !err.includes('Warning') &&
      !err.includes('React') &&
      !err.includes('downloadable font') &&
      !err.includes('favicon')
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test('Customer Firebase - Portal accessibility', async ({ page }) => {
    await page.goto('/customer/portal');
    await page.waitForLoadState('networkidle');

    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.waitForTimeout(2000);

    const criticalErrors = consoleErrors.filter(err =>
      !err.includes('Warning') &&
      !err.includes('React') &&
      !err.includes('downloadable font') &&
      !err.includes('favicon')
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test('Service Registration - Page loads without Firebase errors', async ({ page }) => {
    await page.goto('/dang-ky-dich-vu');
    await page.waitForLoadState('networkidle');

    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.waitForTimeout(2000);

    // Check page renders - look for form elements
    const pageContent = await page.content();
    const hasForm = pageContent.includes('Họ và tên') || pageContent.includes('Điện thoại');
    expect(hasForm).toBeTruthy();

    const criticalErrors = consoleErrors.filter(err =>
      !err.includes('Warning') &&
      !err.includes('React') &&
      !err.includes('downloadable font') &&
      !err.includes('favicon')
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test('SignIn - Page loads without Firebase errors', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.waitForTimeout(2000);

    // Check page renders - look for sign in elements
    const pageContent = await page.content();
    const hasSignIn = pageContent.includes('Đăng nhập') || pageContent.includes('Thành viên');
    expect(hasSignIn).toBeTruthy();

    const criticalErrors = consoleErrors.filter(err =>
      !err.includes('Warning') &&
      !err.includes('React') &&
      !err.includes('downloadable font') &&
      !err.includes('favicon')
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test('Dashboard - Page loads without Firebase errors after auth', async ({ page }) => {
    // First sign in at root path
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Wait for form to load
    await page.waitForTimeout(2000);

    // Fill in credentials
    await page.locator('input[type="text"], input[name="username"]').first().fill('root@itsupporter.com');
    await page.locator('input[type="password"]').fill('RootAdminPass2026!');

    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(3000);

    // Navigate to dashboard
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.waitForTimeout(3000);

    const criticalErrors = consoleErrors.filter(err =>
      !err.includes('Warning') &&
      !err.includes('React') &&
      !err.includes('downloadable font') &&
      !err.includes('favicon')
    );

    expect(criticalErrors).toHaveLength(0);
  });

});