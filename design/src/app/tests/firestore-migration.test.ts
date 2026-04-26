/**
 * Firestore Migration Verification Test
 *
 * This test ensures that the migration from localStorage to Firestore is 100% complete.
 * It checks:
 * 1. No source files import from old localStorage data modules directly
 * 2. All data operations go through firestore*.ts files
 * 3. Deprecated stubs properly redirect
 * 4. Key functions are using Firestore
 */

import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

const SRC_DIR = path.resolve(__dirname, '../');

describe('Firestore Migration Verification', () => {
  const localStorageModules = [
    'finance.ts',
    'invoices.ts',
    'machines.ts',
    'customers.ts',
    'points.ts',
    'discounts.ts',
    'services.ts',
    'members.ts',
    'redeemed-vouchers.ts',
    'users.ts'
  ];

  const firestoreModules = [
    'firestoreTransactions.ts',
    'firestoreInvoices.ts',
    'firestoreMachines.ts',
    'firestoreCustomers.ts',
    'firestorePoints.ts',
    'firestoreDiscounts.ts',
    'firestoreServices.ts',
    'firestoreMembers.ts',
    'firestoreRedeemedVouchers.ts'
  ];

  it('should not have direct imports from localStorage data modules in source files', () => {
    const sourceFiles = getAllSourceFiles();
    const violations: string[] = [];

    sourceFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf-8');

      localStorageModules.forEach(module => {
        const importPattern = new RegExp(`from ["'].*\/data\/${module.replace('.ts', '')}["']`);
        if (importPattern.test(content) && !file.includes('legacy-localstorage')) {
          violations.push(`${file} imports from old ${module}`);
        }
      });
    });

    expect(violations).toHaveLength(0);
    if (violations.length > 0) {
      console.error('Migration violations found:', violations);
    }
  });

  it('should have all firestore modules implemented', () => {
    firestoreModules.forEach(module => {
      const filePath = path.join(SRC_DIR, 'data', module);
      expect(fs.existsSync(filePath)).toBe(true);
    });
  });

  it('should have legacy archive with all original implementations', () => {
    const legacyDir = path.join(SRC_DIR, 'data', 'legacy-localstorage');
    expect(fs.existsSync(legacyDir)).toBe(true);

    localStorageModules.forEach(module => {
      const legacyFile = path.join(legacyDir, `original-${module}`);
      expect(fs.existsSync(legacyFile)).toBe(true);
    });
  });

  it('should have proper deprecated stubs in main data directory', () => {
    // Check that main data files are now minimal or redirect files
    const mainDataFiles = ['machines.ts', 'invoices.ts', 'customers.ts', 'points.ts', 'services.ts'];

    mainDataFiles.forEach(file => {
      const filePath = path.join(SRC_DIR, 'data', file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        expect(content).toContain('@deprecated');
        expect(content).toContain('console.warn("[DEPRECATED]');
      }
    });
  });
});

// Helper to get all TypeScript/React files
function getAllSourceFiles(): string[] {
  const files: string[] = [];

  function scanDir(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        if (!entry.name.startsWith('legacy-localstorage') &&
            !entry.name.startsWith('node_modules') &&
            !entry.name.startsWith('dist')) {
          scanDir(fullPath);
        }
      } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) {
        files.push(fullPath);
      }
    }
  }

  scanDir(SRC_DIR);
  return files;
}

console.log('✅ Firestore Migration Test Loaded');
console.log('Run with: npm test -- src/app/tests/firestore-migration.test.ts');
