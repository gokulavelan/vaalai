import * as PaymentActions from './actions';
import {PaymentState , initialPaymentState } from './state';

// Reducer for Payments
export function paymentReducer(state: PaymentState = initialPaymentState, action: PaymentActions.PaymentActions ) {
    switch (action.type) {
        case PaymentActions.SET_PAYMENTS:
            return {
                ...state,
                transactions: action.payload
            };

        case PaymentActions.SELECT_PAYMENT:
            console.log(action.payload);
            
            return {
                ...state,
                selectedPayment: action.payload || { transaction_type: 'debit' }
            };

        case PaymentActions.CLEAR_PAYMENTS:
            return {
                ...state,
                transactions: [],
                selectedPayment: { transaction_type: 'debit' }
            };

        default:
            return state;
    }
}
