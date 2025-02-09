import { Action } from "@ngrx/store";
import { Receipt } from "./state";

// Receipt Actions
export const LOAD_RECEIPTS = 'LOAD_RECEIPTS';
export const SET_RECEIPTS = 'SET_RECEIPTS';
export const SELECT_RECEIPT = 'SELECT_RECEIPT';
export const CLEAR_RECEIPTS = 'CLEAR_RECEIPTS';

export class LoadReceipts implements Action {
    readonly type = LOAD_RECEIPTS;
}

export class SetReceipts implements Action {
    readonly type = SET_RECEIPTS;
    constructor(public payload: Receipt[]) {} // Store transactions
}

export class SelectReceipt implements Action {
    readonly type = SELECT_RECEIPT;
    constructor(public payload: Receipt) {} // Store selected receipt
}

export class ClearReceipts implements Action {
    readonly type = CLEAR_RECEIPTS;
}
export type ReceiptActions = LoadReceipts | SetReceipts | SelectReceipt | ClearReceipts;