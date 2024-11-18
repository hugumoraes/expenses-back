/* ---------- External ---------- */

/* ---------- Common ---------- */
import { PostgresDataSource } from '../../common/databases/postgres.database';

/* ---------- Models ---------- */
import { Transaction } from '../../models/transaction/transaction.entity';

/* ---------- Types ---------- */
import {
  CreateTransaction,
  DeleteTransaction,
  GetTransactionById,
} from './transactions.types';

const transaction_repository = PostgresDataSource.getRepository(Transaction);

/**
 *
 * @description Get all transactions from the database
 * @returns {Promise<Transaction[]>} List of transactions
 */
const get_all_transactions = async (): Promise<Transaction[]> => {
  const transactions = await transaction_repository.find();

  return transactions;
};

/**
 *
 * @description Get transaction from the database by id
 * @returns {Promise<Transaction>} Transaction
 */
const get_transaction_by_id = async ({
  transaction_id,
}: GetTransactionById): Promise<Transaction | null> => {
  const transaction = await transaction_repository.findOne({
    where: {
      transaction_id: transaction_id,
    },
  });

  return transaction;
};

/**
 *
 * @description Create a new transaction
 * @param {CreateTransaction} params
 * @param {number} params.category_id
 * @param {number} params.transaction_amount
 * @param {string} params.transaction_name
 * @returns {Promise<Transaction>} Transaction created
 */
const create_transaction = async ({
  category_id,
  transaction_amount,
  transaction_date,
  transaction_name,
  user_id,
}: CreateTransaction): Promise<Transaction> => {
  const transaction = await transaction_repository.save({
    category: {
      category_id,
    },
    user: {
      user_id,
    },
    transaction_amount,
    transaction_date,
    transaction_name,
  });

  return transaction;
};

/**
 *
 * @description Delete a transaction from the database
 * @param {number} transaction_id
 * @returns {Promise<void>}
 */
const delete_transaction = async ({
  transaction_id,
}: DeleteTransaction): Promise<void> => {
  await transaction_repository.delete({ transaction_id: transaction_id });
};

const transactions_repository = {
  create_transaction,
  delete_transaction,
  get_all_transactions,
  get_transaction_by_id,
};

export { transactions_repository };
