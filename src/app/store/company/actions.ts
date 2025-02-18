import { Action } from '@ngrx/store';

export const CREATE_COMPANY = 'CREATE_COMPANY';
export const LOAD_COMPANIES = 'LOAD_COMPANIES';
export const SET_COMPANIES = 'SET_COMPANIES';
export const CLEAR_COMPANIES = 'CLEAR_COMPANIES';
export const SELECT_COMPANY = 'SELECT_COMPANY';

export class CreateCompany implements Action {
    readonly type = CREATE_COMPANY;
    constructor(public payload: any) {}  // Store new company data
}

export class LoadCompanies implements Action {
    readonly type = LOAD_COMPANIES; 
}

export class SetCompanies implements Action {
    readonly type = SET_COMPANIES;
    constructor(public payload: any) {} // Store company data
}

export class ClearCompanies implements Action {
    readonly type = CLEAR_COMPANIES;
}

export class SelectCompany implements Action {
    readonly type = SELECT_COMPANY;
    constructor(public payload: number) {}  // Store company ID
}

export type CompanyActions = CreateCompany | SelectCompany  | LoadCompanies | SetCompanies | ClearCompanies;
