export interface LedgerTransaction {
  id: number;
  transaction_no: string;
  transaction_type: string;
  date: string;
  payment_type: string;
  account_id: number;
  account: any;
  particulars: string;
  amount: number;
}

export interface LedgerEntry {
  opening_balance: number;
  transactions: LedgerTransaction[];
  closing_balance: number;
  credit_total: number;
  debit_total: number;
}

export interface LedgerState {
  entries: { [period: string]: LedgerEntry };
}

export const initialLedgerState: LedgerState = {
  entries: {}
};



/* LEDGER MONTHLY STATE */

export interface LedgerMonthlyState {
  opening_balance: number;
  transactions: LedgerTransaction[];
  closing_balance: number;
  debit_total: number;
  credit_total: number;
}

export const initialLedgerMonthlyState: LedgerMonthlyState = {
  opening_balance: 0,
  transactions: [],
  closing_balance: 0,
  debit_total: 0,
  credit_total: 0
};
