export interface CreateTransaction {
  category_id: number;
  transaction_amount: number;
  transaction_date: string;
  transaction_name: string;
  user_id: number;
}

export interface GetTransactionById {
  transaction_id: number;
}

export interface DeleteTransaction {
  transaction_id: number;
}

export interface UpdateTransaction {
  category_id: number;
  transaction_amount: number;
  transaction_id: number;
  transaction_name: string;
  transaction_date: string;
}

export interface GetAllTransactions {
  user_id?: number;
}
