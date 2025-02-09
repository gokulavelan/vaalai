import { Action } from '@ngrx/store';
import { Payment } from './state';

// Payment Actions
export const LOAD_PAYMENTS = 'LOAD_PAYMENTS';
export const SET_PAYMENTS = 'SET_PAYMENTS';
export const SELECT_PAYMENT = 'SELECT_PAYMENT';
export const CLEAR_PAYMENTS = 'CLEAR_PAYMENTS';

export class LoadPayments implements Action {
    readonly type = LOAD_PAYMENTS;
}

export class SetPayments implements Action {
    readonly type = SET_PAYMENTS;
    constructor(public payload: Payment[]) {} // Store transactions
}

export class SelectPayment implements Action {
    readonly type = SELECT_PAYMENT;
    constructor(public payload: Payment) {} // Store selected payment
}

export class ClearPayments implements Action {
    readonly type = CLEAR_PAYMENTS;
}
export type PaymentActions = LoadPayments | SetPayments | SelectPayment | ClearPayments;