import { collection, doc, getDoc, getDocs, query, where, writeBatch } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { deleteFirestoreInvoicesByMachineId } from './firestoreInvoices';
import { deleteFirestoreTransactionsByMachineId } from './firestoreTransactions';
import { decrementCustomerPointsAndRepairs } from './firestoreCustomers';

/**
 * Delete a machine and all its related data.
 *
 * Related data deleted:
 * - discount_usage_ledger entries (just the entries, NOT discount usageCount)
 * - transactions
 * - invoices
 * - point_history entries
 *
 * Related data adjusted (not deleted):
 * - Customer: points and totalRepairs decremented
 *
 * What is NOT touched:
 * - discount usageCount (kept for audit integrity)
 * - customer record (only adjusted balance)
 */
export async function deleteMachineWithRelatedData(
  machineId: string
): Promise<{ success: boolean; error?: string }> {
  if (!machineId || typeof machineId !== 'string' || machineId.trim() === '') {
    return { success: false, error: 'Invalid machine ID' };
  }

  const trimmedId = machineId.trim();

  try {
    const machineRef = doc(db, 'machines', trimmedId);

    // Read machine data first
    const machineSnap = await getDoc(machineRef);
    if (!machineSnap.exists()) {
      return { success: false, error: 'Machine not found' };
    }

    const machineData = machineSnap.data();
    const phone = machineData.phone || '';
    const pointsEarned = machineData.pointsEarned || 0;

    // Use batch write for simpler, more reliable deletions within transaction
    const batch = writeBatch(db);

    // 1. Delete discount_usage_ledger entries if discount was used
    const discountCode = machineData.discountCode;
    if (discountCode && typeof discountCode === 'string' && discountCode.trim() !== '') {
      const ledgerCollection = collection(db, 'discount_usage_ledger');
      const ledgerQuery = query(ledgerCollection, where('discountId', '==', discountCode));
      const ledgerSnap = await getDocs(ledgerQuery);

      for (const ledgerDoc of ledgerSnap.docs) {
        const ledgerData = ledgerDoc.data();
        if (ledgerData.operationId && ledgerData.operationId.startsWith('inperson-discount_')) {
          batch.delete(doc(db, 'discount_usage_ledger', ledgerDoc.id));
        }
      }
    }

    // 2. Delete point_history entries
    const pointHistoryCollection = collection(db, 'point_history');
    const phQuery = query(pointHistoryCollection, where('relatedId', '==', trimmedId));
    const phSnap = await getDocs(phQuery);
    for (const phDoc of phSnap.docs) {
      batch.delete(doc(db, 'point_history', phDoc.id));
    }

    // 3. Delete the machine document
    batch.delete(machineRef);

    // Commit batch
    await batch.commit();

    // Post-batch cleanup (outside transaction - not critical)
    const deleteErrors: string[] = [];

    try {
      await deleteFirestoreTransactionsByMachineId(trimmedId);
    } catch (e) {
      deleteErrors.push(`transactions: ${e instanceof Error ? e.message : String(e)}`);
    }

    try {
      await deleteFirestoreInvoicesByMachineId(trimmedId);
    } catch (e) {
      deleteErrors.push(`invoices: ${e instanceof Error ? e.message : String(e)}`);
    }

    // Adjust customer points and totalRepairs
    if (phone && pointsEarned > 0) {
      const customerResult = await decrementCustomerPointsAndRepairs(phone, pointsEarned);
      if (!customerResult.success) {
        deleteErrors.push(`customer adjustment: ${customerResult.error}`);
      }
    }

    if (deleteErrors.length > 0) {
      console.warn('[DeleteMachine] Partial cleanup errors:', deleteErrors);
    }

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[DeleteMachine] Error:', message);
    return { success: false, error: message };
  }
}