import { Action } from '@ngrx/store';
import { LedgerEntry, LedgerTransaction } from './state';

export const LOAD_LEDGER = '[Ledger] Load Ledger';
export const SET_LEDGER = '[Ledger] Set Ledger';

export class LoadLedger implements Action {
  readonly type = LOAD_LEDGER;
  constructor(public payload: { accountId: number; fromDate: string; toDate: string; monthlyClosing: boolean }) {}
}

export class SetLedger implements Action {
  readonly type = SET_LEDGER;
  constructor(public payload: { entries: { [period: string]: LedgerEntry } }) {}
}

export type LedgerActions = LoadLedger | SetLedger;

/* LEDGER MONTHLY STATE */

export const SET_LEDGER_MONTHLY = '[Ledger Monthly] Set Ledger Monthly';
export const RESET_LEDGER_MONTHLY = '[Ledger Monthly] Reset Ledger Monthly';

export class SetLedgerMonthly implements Action {
  readonly type = SET_LEDGER_MONTHLY;
  constructor(public payload: { opening_balance: number; transactions: LedgerTransaction[]; closing_balance: number; debit_total: number; credit_total: number }) {}
}

export class ResetLedgerMonthly implements Action {
  readonly type = RESET_LEDGER_MONTHLY;
}

export type LedgerMonthlyActions = SetLedgerMonthly | ResetLedgerMonthly;
