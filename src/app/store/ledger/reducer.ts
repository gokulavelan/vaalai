import { LedgerMonthlyState, LedgerState, initialLedgerMonthlyState, initialLedgerState } from './state';
import { LedgerActions, LedgerMonthlyActions, RESET_LEDGER_MONTHLY, SET_LEDGER, SET_LEDGER_MONTHLY } from './actions';

export function ledgerReducer(state = initialLedgerState, action: LedgerActions): LedgerState {
  switch (action.type) {
    case SET_LEDGER:
      console.log('Ledger Data:', action.payload.entries);
      return { ...state, entries: action.payload.entries };
    default:
      return state;
  }
}


/* LEDGER MONTHLY STATE */

export function ledgerMonthlyReducer(state = initialLedgerMonthlyState, action: LedgerMonthlyActions): LedgerMonthlyState {
  switch (action.type) {
    case SET_LEDGER_MONTHLY:
      return {
        ...state,
        opening_balance: action.payload.opening_balance,
        transactions: action.payload.transactions,
        closing_balance: action.payload.closing_balance,
        debit_total: action.payload.debit_total,
        credit_total: action.payload.credit_total,
      };

    case RESET_LEDGER_MONTHLY:
      return initialLedgerMonthlyState;

    default:
      return state;
  }
}