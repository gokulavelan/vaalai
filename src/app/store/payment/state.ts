import { Account } from "../account/state";

export interface PaymentState {
    payments: Payment[];
    selectedPayment: Payment | null;
}

export const initialPaymentState: PaymentState = {
    payments: [],
    selectedPayment: null// Default to Payment
};

export interface Payment {
    id?: number;
    transaction_no: string;
    transaction_type: 'debit'; 
    date: string;
    payment_type: string;
    account_id: number;
    account?: Account | null,
    bank_name?: string;
    particulars?: string;
    amount: number;
    bank_commission?: number;
    purchase_commission?: number;
    cash_discount?: number;
    commission?: number;
    deleted_at?: string;
}
