import { collection, doc, getDoc, query, where, deleteDoc, runTransaction } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { deleteFirestoreInvoicesByMachineId } from './firestoreInvoices';
import { deleteFirestoreTransactionsByMachineId } from './firestoreTransactions';
import { decrementCustomerPointsAndRepairs } from './firestoreCustomers';

/**
 * Delete a machine and all its related data in a single transaction.
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
  try {
    const machineRef = doc(db, 'machines', machineId);

    // Read machine data first to get needed IDs
    const machineSnap = await getDoc(machineRef);
    if (!machineSnap.exists()) {
      return { success: false, error: 'Machine not found' };
    }

    const machineData = machineSnap.data();
    const { discountCode, phone, pointsEarned } = machineData;

    // Start transaction - all reads use transaction.get() for snapshot isolation
    await runTransaction(db, async (transaction) => {
      // Re-read machine inside transaction to ensure it still exists
      const freshMachineSnap = await transaction.get(machineRef);
      if (!freshMachineSnap.exists()) {
        throw new Error('Machine not found');
      }

      const freshData = freshMachineSnap.data();
      const freshDiscountCode = freshData.discountCode;
      const freshPhone = freshData.phone;
      const freshPointsEarned = freshData.pointsEarned;

      // 1. Delete discount_usage_ledger entries if discount was used
      if (freshDiscountCode) {
        // Use transaction.get() for consistent snapshot
        const discountRef = doc(db, 'discounts', freshDiscountCode);
        const discountSnap = await transaction.get(discountRef);

        if (discountSnap.exists()) {
          const ledgerCollection = collection(db, 'discount_usage_ledger');
          const ledgerQuery = query(ledgerCollection, where('discountId', '==', freshDiscountCode));
          const ledgerSnap = await transaction.get(ledgerQuery);

          for (const ledgerDoc of ledgerSnap.docs) {
            const ledgerData = ledgerDoc.data();
            if (ledgerData.operationId?.startsWith('inperson-discount_')) {
              transaction.delete(doc(db, 'discount_usage_ledger', ledgerDoc.id));
            }
          }
        }
      }

      // 2. Delete point_history entries by relatedId using transaction.get()
      const pointHistoryCollection = collection(db, 'point_history');
      const phQuery = query(pointHistoryCollection, where('relatedId', '==', String(machineId)));
      const phSnap = await transaction.get(phQuery);
      for (const phDoc of phSnap.docs) {
        transaction.delete(doc(db, 'point_history', phDoc.id));
      }

      // 3. Delete the machine document last
      transaction.delete(machineRef);

      // Store values for post-transaction cleanup
      (transaction as any)._phone = freshPhone;
      (transaction as any)._pointsEarned = freshPointsEarned;
    });

    // Post-transaction deletions (not critical for machine deletion success)
    const deleteErrors: string[] = [];

    try {
      await deleteFirestoreTransactionsByMachineId(machineId);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      deleteErrors.push(`transactions: ${msg}`);
    }

    try {
      await deleteFirestoreInvoicesByMachineId(machineId);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      deleteErrors.push(`invoices: ${msg}`);
    }

    // Adjust customer points and totalRepairs
    if (phone && pointsEarned && pointsEarned > 0) {
      const customerResult = await decrementCustomerPointsAndRepairs(phone, pointsEarned);
      if (!customerResult.success) {
        deleteErrors.push(`customer adjustment: ${customerResult.error}`);
      }
    }

    // If any deletions failed, log but don't fail the whole operation
    // The machine itself was deleted successfully
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