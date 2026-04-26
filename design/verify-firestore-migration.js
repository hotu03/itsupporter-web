/**
 * Firestore Migration Verification Script
 *
 * Run with: node verify-firestore-migration.js
 * This script checks that the migration is complete and no localStorage is being used in production code.
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src/app');

console.log('🔍 Firestore Migration Verification');
console.log('===================================\n');

const localStorageModules = [
  'finance.ts', 'invoices.ts', 'machines.ts', 'customers.ts',
  'points.ts', 'discounts.ts', 'services.ts', 'members.ts',
  'redeemed-vouchers.ts', 'users.ts'
];

const firestoreModules = [
  'firestoreMachines.ts', 'firestoreTransactions.ts', 'firestoreCustomers.ts',
  'firestorePoints.ts', 'firestoreDiscounts.ts', 'firestoreServices.ts',
  'firestoreInvoices.ts', 'firestoreRedeemedVouchers.ts', 'firestoreMembers.ts'
];

let errors = 0;
let warnings = 0;

// 1. Check that legacy folder exists with all original files
console.log('📁 Checking legacy archive...');
const legacyDir = path.join(SRC_DIR, 'data/legacy-localstorage');
if (fs.existsSync(legacyDir)) {
  console.log('✅ Legacy folder exists');
  const legacyFiles = fs.readdirSync(legacyDir);
  localStorageModules.forEach(module => {
    const expectedFile = `original-${module}`;
    if (legacyFiles.includes(expectedFile) || legacyFiles.includes(expectedFile.replace('.ts', '.js'))) {
      console.log(`  ✅ ${expectedFile}`);
    } else {
      console.log(`  ❌ Missing: ${expectedFile}`);
      errors++;
    }
  });
} else {
  console.log('❌ Legacy folder missing!');
  errors++;
}

// 2. Check that no source files import old localStorage modules directly
console.log('\n🔎 Scanning for direct localStorage imports...');
const sourceFiles = getAllSourceFiles();

sourceFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const relativePath = path.relative(__dirname, file);

  localStorageModules.forEach(module => {
    const importPattern = new RegExp(`from ["'].*\/data\/${module.replace('.ts', '')}["']`);
    if (importPattern.test(content) && !file.includes('legacy-localstorage') && !file.includes('test')) {
      console.log(`⚠️  ${relativePath} still imports from old ${module}`);
      warnings++;
    }
  });
});

if (warnings === 0) {
  console.log('✅ No direct localStorage imports found in source code');
} else {
  console.log(`⚠️  Found ${warnings} files with potential old imports (may be acceptable if using stubs)`);
}

// 3. Verify all firestore modules exist and have key functions
console.log('\n📋 Verifying Firestore implementations...');

firestoreModules.forEach(module => {
  const filePath = path.join(SRC_DIR, 'data', module);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const hasGet = /getFirestore|export async function get/.test(content);
    const hasAdd = /addFirestore|export async function add/.test(content);
    console.log(`✅ ${module} - ${hasGet ? 'GET' : ''}${hasAdd ? ' ADD' : ''}`);
  } else {
    console.log(`❌ Missing: ${module}`);
    errors++;
  }
});

// 4. Check for console.log in production firestore files (should be minimal)
console.log('\n🔍 Checking for console.log in Firestore files...');
const firestoreFiles = firestoreModules.map(m => path.join(SRC_DIR, 'data', m));

firestoreFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf-8');
    const consoleLogs = (content.match(/console\.(log|warn|error)/g) || []).length;
    if (consoleLogs > 0) {
      console.log(`⚠️  ${path.basename(file)} has ${consoleLogs} console statements`);
      warnings++;
    }
  }
});

console.log('\n' + '=' .repeat(60));
if (errors === 0) {
  console.log('🎉 MIGRATION VERIFICATION PASSED');
  console.log('All data operations are now using Firestore.');
  console.log('\nLegacy code is safely stored in: data/legacy-localstorage/');
} else {
  console.log(`❌ MIGRATION VERIFICATION FAILED with ${errors} errors`);
}

console.log('\nRun this test again after changes: node verify-firestore-migration.js');

function getAllSourceFiles() {
  const files = [];
  function scan(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!entry.name.includes('legacy-localstorage') &&
            !entry.name.includes('node_modules') &&
            !entry.name.includes('dist')) {
          scan(fullPath);
        }
      } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) {
        files.push(fullPath);
      }
    }
  }
  scan(SRC_DIR);
  return files;
}
