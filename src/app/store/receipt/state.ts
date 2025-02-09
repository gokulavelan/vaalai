import { Account } from "../account/state";

export interface ReceiptState {
    receipts: Receipt[];
    selectedReceipt: Receipt | null;
}

export const initialReceiptState: ReceiptState = {
    receipts: [],
    selectedReceipt: null
};

export interface Receipt {
    id?: number;
    transaction_no: string;
    transaction_type: 'credit'; // Differentiates Payment & Receipt
    date: string;
    payment_type: string;
    account_id: number;
    account?: Account | null;
    bank_name?: string;
    particulars?: string;
    amount: number;
    bank_commission?: number;
    purchase_commission?: number;
    cash_discount?: number;
    commission?: number;
    deleted_at?: string;
}