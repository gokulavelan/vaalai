import * as ReceiptActions from "./actions";
import { initialReceiptState, ReceiptState } from "./state";

// Reducer for Receipts
export function receiptReducer(state: ReceiptState = initialReceiptState, action: ReceiptActions.ReceiptActions) {
    switch (action.type) {
        case ReceiptActions.SET_RECEIPTS:
            return {
                ...state,
                transactions: action.payload
            };

        case ReceiptActions.SELECT_RECEIPT:
            return {
                ...state,
                selectedReceipt: action.payload || { transaction_type: 'credit' }
            };

        case ReceiptActions.CLEAR_RECEIPTS:
            return {
                ...state,
                transactions: [],
                selectedReceipt: { transaction_type: 'credit' }
            };

        default:
            return state;
    }
}