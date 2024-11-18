/* ---------- External ---------- */
import { Request, Response } from 'express';

/* ---------- Common ---------- */
import { logger } from '../../common/utils/logs';

/* ---------- Repositories ---------- */
import { transactions_repository } from '../../repositories/transactions/transactions.repository';
import { categories_repository } from '../../repositories/categories/categories.repository';

/**
 * @description Get all transactions from the database
 * @returns
 */
const get_all_transactions = async (
  _: Request,
  response: Response,
): Promise<Response> => {
  try {
    const transactions = await transactions_repository.get_all_transactions();

    return response.status(200).json({
      transactions,
    });
  } catch (error) {
    logger.error(error);
    logger.error('Error at "get_all_transactions" method');

    return response.status(500).json({
      code: '500',
      message: 'Internal server error',
    });
  }
};

/**
 * @description Create a new transaction
 * @param request
 * @param response
 * @returns
 */
const create_transaction = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  try {
    const {
      category_name,
      transaction_amount,
      transaction_date,
      transaction_name,
      user_id,
    } = request.body;

    if (!transaction_name || !category_name || !transaction_amount) {
      return response.status(400).json({
        code: '400',
        message: 'Required params are missing.',
      });
    }

    const category = await categories_repository.get_category_by_name({
      name: category_name,
    });

    if (!category) {
      return response.status(404).json({
        code: '404',
        message: 'Category not found.',
      });
    }

    const created_transaction =
      await transactions_repository.create_transaction({
        category_id: category.category_id,
        user_id,
        transaction_amount,
        transaction_date: new Date(transaction_date).toISOString(),
        transaction_name,
      });

    return response.status(201).json({
      transaction: created_transaction,
    });
  } catch (error) {
    logger.error(error);
    logger.error('Error at "create_transaction" method');

    return response.status(500).json({
      code: '500',
      message: 'Internal server error',
    });
  }
};

/**
 * @description Delete a transaction
 * @param request
 * @param response
 * @returns
 */
const delete_transaction = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  try {
    const { transaction_id } = request.params;

    if (!transaction_id) {
      return response.status(400).json({
        code: '400',
        message: 'Required params are missing.',
      });
    }

    const transaction = await transactions_repository.get_transaction_by_id({
      transaction_id: Number(transaction_id),
    });

    if (!transaction) {
      return response.status(400).json({
        code: '404',
        message: 'Transaction not found',
      });
    }

    await transactions_repository.delete_transaction({
      transaction_id: Number(transaction_id),
    });

    return response.status(200).json({
      transaction,
    });
  } catch (error) {
    logger.error(error);
    logger.error('Error at "delete_transaction" method');

    return response.status(500).json({
      code: '500',
      message: 'Internal server error',
    });
  }
};

/**
 * @description Update a transaction
 * @param request
 * @param response
 * @returns
 */
const update_transaction = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  try {
    const { transaction_id } = request.params;
    const {
      category_name,
      transaction_name,
      transaction_amount,
      transaction_date,
    } = request.body;

    if (!transaction_id) {
      return response.status(400).json({
        code: '400',
        message: 'Required params are missing.',
      });
    }

    const transaction = await transactions_repository.get_transaction_by_id({
      transaction_id: Number(transaction_id),
    });

    if (!transaction) {
      return response.status(404).json({
        code: '404',
        message: 'Transaction not found',
      });
    }

    const category = await categories_repository.get_category_by_name({
      name: category_name,
    });

    const updated_transaction = {
      ...transaction,
      transaction_id: transaction.transaction_id,
      transaction_name: transaction_name || transaction.transaction_name,
      transaction_amount: transaction_amount || transaction.transaction_amount,
      transaction_date: transaction_date || transaction.transaction_date,
    };

    if (category) updated_transaction['category'] = category;

    await transactions_repository.update_transaction({
      transaction_id: Number(transaction_id),
      transaction_name,
      transaction_amount,
      transaction_date,
      category_id: category?.category_id || transaction.category.category_id,
    });

    return response.status(200).json({
      transaction: updated_transaction,
    });
  } catch (error) {
    logger.error(error);
    logger.error('Error at "update_transaction" method');

    return response.status(500).json({
      code: '500',
      message: 'Internal server error',
    });
  }
};

const transactions_controller = {
  create_transaction,
  delete_transaction,
  get_all_transactions,
  update_transaction,
};

export { transactions_controller };
