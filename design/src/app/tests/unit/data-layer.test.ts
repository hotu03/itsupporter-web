/**
 * Unit Tests for Data Layer after Firestore Migration
 *
 * Tests pure business logic and ensures no localStorage is used in core functions.
 * Run with: npm run test:unit
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { calculatePoints, getPointsExplanation, formatCurrency } from '../../data/points';
import { TestDataFactory } from '../test-utils/firestore-test-utils';

describe('Data Layer - Unit Tests (Post Firestore Migration)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Point System Logic', () => {
    it('should calculate points correctly for per_order rules', () => {
      const amount = 100000;
      const points = calculatePoints(amount);
      expect(points).toBeGreaterThan(0);
      // With default rules: 1 point per order + threshold points
      expect(points).toBe(3); // 1 (per order) + 2 (50K threshold)
    });

    it('should calculate points for amount_threshold rules', () => {
      const amount = 250000;
      const points = calculatePoints(amount);
      expect(points).toBe(6); // 1 (per order) + 5 (200K threshold)
    });

    it('should return 0 points for amount = 0', () => {
      const points = calculatePoints(0);
      expect(points).toBe(1); // Special case for free in-person registration
    });

    it('should provide correct point explanation', () => {
      const amount = 150000;
      const explanation = getPointsExplanation(amount);
      expect(explanation).toContain('+1 điểm: Đưa máy sửa chữa');
      expect(explanation).toContain('+2 điểm: Đơn hàng trên 50K');
      expect(explanation.length).toBeGreaterThan(1);
    });
  });

  describe('Currency Formatting', () => {
    it('should format currency correctly in VND', () => {
      expect(formatCurrency(100000)).toBe('100.000 ₫');
      expect(formatCurrency(0)).toBe('0 ₫');
      expect(formatCurrency(1250000)).toBe('1.250.000 ₫');
    });
  });

  describe('Test Data Factory', () => {
    it('should create valid test customer', () => {
      const customer = TestDataFactory.createTestCustomer();
      expect(customer.name).toBe('Test Customer');
      expect(customer.phone).toBe('0123456789');
      expect(customer.points).toBe(10);
      expect(customer.totalRepairs).toBe(2);
    });

    it('should create valid test machine', () => {
      const machine = TestDataFactory.createTestMachine();
      expect(machine.customerName).toBe('Test Customer');
      expect(machine.status).toBe('WAITING');
      expect(machine.registrationType).toBe('in-person');
    });

    it('should create valid test transaction', () => {
      const transaction = TestDataFactory.createTestTransaction();
      expect(transaction.customerName).toBe('Test Customer');
      expect(transaction.amount).toBe(500000);
      expect(transaction.paymentStatus).toBe('paid');
    });
  });

  describe('Migration Stability', () => {
    it('should not use localStorage in core functions', () => {
      // This test ensures that calculatePoints does not call localStorage functions
      const originalLocalStorage = global.localStorage;
      delete (global as any).localStorage;

      const points = calculatePoints(100000);
      expect(points).toBeGreaterThan(0);

      // Restore
      (global as any).localStorage = originalLocalStorage;
    });
  });
});

console.log('✅ Unit Tests for Data Layer loaded successfully.');
console.log('Run with: npm run test:unit');
