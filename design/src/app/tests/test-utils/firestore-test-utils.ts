/**
 * Firestore Test Utilities
 *
 * Helper functions for testing Firestore migration and data stability.
 * Uses Firebase Emulator for isolated testing.
 */

import { initializeTestEnvironment, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { vi } from 'vitest';

let testEnv: RulesTestEnvironment | null = null;

/**
 * Setup Firebase Emulator for testing
 */
export async function setupTestEnvironment(projectId = 'test-project'): Promise<RulesTestEnvironment> {
  if (testEnv) return testEnv;

  testEnv = await initializeTestEnvironment({
    projectId,
    firestore: {
      rules: `
        rules_version = '2';
        service cloud.firestore {
          match /databases/{database}/documents {
            match /{document=**} {
              allow read, write: if true; // For testing - in production use proper rules
            }
          }
        }
      `,
      host: 'localhost',
      port: 8080,
    },
  });

  return testEnv;
}

/**
 * Get authenticated Firestore instance for testing
 */
export function getTestFirestore(uid = 'test-user') {
  if (!testEnv) throw new Error('Test environment not initialized');

  const app = testEnv.authenticatedContext(uid).app;
  const db = getFirestore(app);
  connectFirestoreEmulator(db, 'localhost', 8080);
  return db;
}

/**
 * Clean up test data
 */
export async function cleanupTestData() {
  if (testEnv) {
    await testEnv.clearFirestore();
  }
}

/**
 * Mock Firestore for unit tests (when emulator is not needed)
 */
export function mockFirestore() {
  const mockDb = {
    collection: vi.fn().mockReturnThis(),
    doc: vi.fn().mockReturnThis(),
    getDocs: vi.fn().mockResolvedValue({ docs: [] }),
    addDoc: vi.fn().mockResolvedValue({ id: 'test-id' }),
    updateDoc: vi.fn().mockResolvedValue(undefined),
    deleteDoc: vi.fn().mockResolvedValue(undefined),
    query: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
  };
  return mockDb;
}

/**
 * Create test data factory
 */
export const TestDataFactory = {
  createTestCustomer: (overrides = {}) => ({
    name: 'Test Customer',
    phone: '0123456789',
    email: 'test@example.com',
    points: 10,
    totalRepairs: 2,
    createdAt: new Date().toISOString().split('T')[0],
    ...overrides,
  }),

  createTestMachine: (overrides = {}) => ({
    customerName: 'Test Customer',
    phone: '0123456789',
    status: 'WAITING',
    registrationType: 'in-person',
    isApproved: true,
    time: new Date().toLocaleString('vi-VN'),
    ...overrides,
  }),

  createTestTransaction: (overrides = {}) => ({
    customerName: 'Test Customer',
    phone: '0123456789',
    service: 'Sửa chữa laptop',
    amount: 500000,
    paymentStatus: 'paid',
    date: new Date().toISOString().split('T')[0],
    ...overrides,
  }),

  createTestPointHistory: (overrides = {}) => ({
    customerPhone: '0123456789',
    customerName: 'Test Customer',
    type: 'earn',
    points: 5,
    date: new Date().toISOString(),
    description: 'Test point earning',
    ...overrides,
  }),
};

export default {
  setupTestEnvironment,
  getTestFirestore,
  cleanupTestData,
  mockFirestore,
  TestDataFactory,
};
