import { Action } from '@ngrx/store';

export const LOAD_ACCOUNTS = 'LOAD_ACCOUNTS';
export const SET_ACCOUNTS = 'SET_ACCOUNTS';
export const CLEAR_ACCOUNTS = 'CLEAR_ACCOUNTS';
export const SELECT_ACCOUNT = 'SELECT_ACCOUNT';

export class LoadAccounts implements Action {
    readonly type = LOAD_ACCOUNTS;
}

export class SetAccounts implements Action {
    readonly type = SET_ACCOUNTS;
    constructor(public payload: any) {} // Store account data
}

export class ClearAccounts implements Action {
    readonly type = CLEAR_ACCOUNTS;
}

export class SelectAccount implements Action {
    readonly type = SELECT_ACCOUNT;
    constructor(public payload: number) {}  // Store account ID
}

export type AccountActions = LoadAccounts | SetAccounts | ClearAccounts | SelectAccount;
