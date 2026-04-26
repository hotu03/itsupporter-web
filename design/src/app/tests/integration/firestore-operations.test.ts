/**
 * Integration Tests for Firestore Operations
 *
 * Tests real Firestore CRUD operations and cross-module data consistency
 * after the migration from localStorage.
 *
 * Requires Firebase Emulator to be running.
 * Run with: npm run test:integration
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { setupTestEnvironment, getTestFirestore, cleanupTestData, TestDataFactory } from '../test-utils/firestore-test-utils';
import { addFirestoreMachine, getFirestoreMachines, updateFirestoreMachine } from '../../data/firestoreMachines';
import { addFirestoreCustomer, getFirestoreCustomers, updateFirestoreCustomer } from '../../data/firestoreCustomers';
import { addFirestoreTransaction, getFirestoreTransactions } from '../../data/firestoreTransactions';
import { addFirestorePointHistory, getFirestoreCustomerPointHistory } from '../../data/firestorePoints';
import { calculatePoints } from '../../data/points';

let testEnv: any;

beforeAll(async () => {
  testEnv = await setupTestEnvironment('test-firestore-migration');
  console.log('✅ Firebase Test Environment initialized');
});

afterAll(async () => {
  if (testEnv) {
    await cleanupTestData();
    await testEnv.cleanup();
    console.log('✅ Test environment cleaned up');
  }
});

describe('Firestore Integration - Data Consistency & Stability', () => {
  it('should create machine and link with customer and transaction correctly', async () => {
    const testCustomer = TestDataFactory.createTestCustomer();
    const testMachineData = TestDataFactory.createTestMachine({
      customerName: testCustomer.name,
      phone: testCustomer.phone,
    });

    // 1. Create customer
    const customerId = await addFirestoreCustomer(testCustomer);
    expect(customerId).toBeDefined();

    // 2. Create machine
    const machineId = await addFirestoreMachine(testMachineData);
    expect(machineId).toBeDefined();

    // 3. Create transaction
    const transactionData = TestDataFactory.createTestTransaction({
      machineId,
      customerName: testCustomer.name,
      phone: testCustomer.phone,
    });
    const transactionId = await addFirestoreTransaction(transactionData);
    expect(transactionId).toBeDefined();

    // 4. Verify data consistency
    const machines = await getFirestoreMachines();
    const foundMachine = machines.find(m => m.id === machineId);
    expect(foundMachine).toBeDefined();
    expect(foundMachine?.customerName).toBe(testCustomer.name);

    const transactions = await getFirestoreTransactions();
    const foundTransaction = transactions.find(t => t.id === transactionId);
    expect(foundTransaction).toBeDefined();
    expect(foundTransaction?.machineId).toBe(machineId);

    console.log('✅ Machine-Customer-Transaction consistency test passed');
  });

  it('should correctly handle point earning and history after machine completion', async () => {
    const testCustomer = TestDataFactory.createTestCustomer({ points: 0 });
    const customerId = await addFirestoreCustomer(testCustomer);

    const machineData = TestDataFactory.createTestMachine({
      customerName: testCustomer.name,
      phone: testCustomer.phone,
      finalAmount: 500000,
      pointsEarned: 5,
    });

    const machineId = await addFirestoreMachine(machineData);

    // Simulate point earning (normally done in Machines.tsx)
    await addFirestorePointHistory({
      customerPhone: testCustomer.phone,
      customerName: testCustomer.name,
      type: 'earn',
      points: 5,
      date: new Date().toISOString(),
      description: `Đơn hàng #${machineId} - 500000`,
      relatedId: machineId,
    });

    // Update customer points
    await updateFirestoreCustomer(customerId, {
      points: testCustomer.points + 5,
      totalRepairs: testCustomer.totalRepairs + 1,
    });

    // Verify point history
    const history = await getFirestoreCustomerPointHistory(testCustomer.phone);
    expect(history.length).toBeGreaterThan(0);
    expect(history[0].points).toBe(5);
    expect(history[0].type).toBe('earn');

    console.log('✅ Point earning and history test passed');
  });

  it('should handle concurrent operations without data corruption', async () => {
    const promises = [];

    for (let i = 0; i < 5; i++) {
      promises.push(
        addFirestoreMachine(TestDataFactory.createTestMachine({
          customerName: `Concurrent Customer ${i}`,
          phone: `09${i}0000000`,
        }))
      );
    }

    const results = await Promise.all(promises);
    expect(results.length).toBe(5);
    expect(results.every(id => id)).toBe(true);

    const allMachines = await getFirestoreMachines();
    expect(allMachines.length).toBeGreaterThanOrEqual(5);

    console.log('✅ Concurrent operations test passed');
  });

  it('should maintain data consistency across modules', async () => {
    const customer = TestDataFactory.createTestCustomer({ points: 100 });
    const customerId = await addFirestoreCustomer(customer);

    const machine = TestDataFactory.createTestMachine({
      customerName: customer.name,
      phone: customer.phone,
    });
    const machineId = await addFirestoreMachine(machine);

    const transaction = TestDataFactory.createTestTransaction({
      machineId,
      customerName: customer.name,
      phone: customer.phone,
      amount: 0,
      paymentStatus: 'free',
    });
    await addFirestoreTransaction(transaction);

    // Verify all data exists and is consistent
    const customers = await getFirestoreCustomers();
    const foundCustomer = customers.find(c => c.phone === customer.phone);
    expect(foundCustomer).toBeDefined();

    const machines = await getFirestoreMachines();
    const foundMachine = machines.find(m => m.phone === customer.phone);
    expect(foundMachine).toBeDefined();

    console.log('✅ Cross-module data consistency test passed');
  });
});

console.log('✅ Integration Tests for Firestore Operations loaded.');
console.log('Note: Run with Firebase Emulator: firebase emulators:start --only firestore');
console.log('Then: npm run test:integration');
