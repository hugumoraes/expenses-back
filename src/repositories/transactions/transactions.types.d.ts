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
