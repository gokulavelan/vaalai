export interface Transaction {
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
  
  export interface DayBookEntry {
    opening_balance: number;
    transactions: Transaction[];
    closing_balance: number;
    debit_total: number;
    credit_total: number;
  }
  
  export interface DayBookState {
    entries: { [date: string]: DayBookEntry };
  }
  
  export const initialDayBookState: DayBookState = {
    entries: {}
  };
  