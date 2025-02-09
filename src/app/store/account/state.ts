import { SubGroup } from "../groups/state";

export interface AccountState {
    accounts: Account[];  // List of accounts
    selectedAccount: Account | null;  // Selected account details
}

export const initialAccountState: AccountState = {
    accounts: [],
    selectedAccount: null
};

export interface Account {
    id: number;
    name: string;
    company_id: number;
    sub_group_id: number;
    sub_group?: SubGroup | null;
    opening_balance: number;
    transaction_type: 'credit' | 'debit';
    gstn?: string;
    fssi?: string;
    pan?: string;
    address1?: string;
    address2?: string;
    address3?: string;
    area?: string;
    city: string;
    pincode?: string;
    state?: string;
    office_phone?: string;
    factory_phone?: string;
    mobile?: string;
    residence_phone?: string;
    contact_person?: string;
    email?: string;
    website?: string;
    bank_name?: string;
    branch?: string;
    ifsc_code?: string;
    account_number?: string;
    account_type?: string;
    created_at: string;
    updated_at: string;
}
