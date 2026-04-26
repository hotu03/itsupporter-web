/**
 * Firestore Test Utilities
 *
 * Helper functions for testing Firestore migration and data stability.
 * Uses Firebase Emulator for isolated testing.
 */

import { initializeTestEnvironment, type RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { vi } from 'vitest';
import type { Customer } from '../../data/customers';
import type { Machine } from '../../data/machines';
import type { Transaction } from '../../data/finance';
import type { PointHistory } from '../../data/points';

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

  return testEnv.authenticatedContext(uid).firestore();
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
  createTestCustomer: (overrides: Partial<Omit<Customer, 'id'>> = {}): Omit<Customer, 'id'> => ({
    name: 'Test Customer',
    phone: '0123456789',
    email: 'test@example.com',
    points: 10,
    totalRepairs: 2,
    createdAt: new Date().toISOString().split('T')[0],
    ...overrides,
  }),

  createTestMachine: (overrides: Partial<Omit<Machine, 'id'>> = {}): Omit<Machine, 'id'> => ({
    status: 'WAITING',
    customerName: 'Test Customer',
    customerEmail: 'test@example.com',
    phone: '0123456789',
    time: new Date().toLocaleString('vi-VN'),
    description: 'Kiểm tra máy',
    expired: '—',
    category: 'Hardware',
    tester: 'Tester A',
    technician: 'Technician A',
    warranty: 'het',
    password: '',
    charger: false,
    appointmentTime: '',
    dropOffTime: '',
    testerBefore: '',
    testerAfter: '',
    registrationType: 'in-person',
    isApproved: true,
    machineCondition: '',
    needs: '',
    additionalServices: [],
    serviceAmount: 0,
    discountCode: '',
    discountAmount: 0,
    paymentStatus: 'pending',
    finalAmount: 0,
    pointsEarned: 0,
    checklistBefore: Array(10).fill(false),
    checklistAfter: Array(10).fill(false),
    notesBefore: Array(10).fill(''),
    notesAfter: Array(10).fill(''),
    techChecklist: Array(3).fill(false),
    techNotes: '',
    adminConfirmNote: '',
    customerSignature: '',
    ...overrides,
  }),

  createTestTransaction: (overrides: Partial<Omit<Transaction, 'id'>> = {}): Omit<Transaction, 'id'> => ({
    machineId: 'test-machine-id',
    customerName: 'Test Customer',
    phone: '0123456789',
    service: 'Sửa chữa laptop',
    amount: 500000,
    paymentStatus: 'paid',
    date: new Date().toISOString().split('T')[0],
    discountCode: '',
    discountAmount: 0,
    ...overrides,
  }),

  createTestPointHistory: (overrides: Partial<Omit<PointHistory, 'id'>> = {}): Omit<PointHistory, 'id'> => ({
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
