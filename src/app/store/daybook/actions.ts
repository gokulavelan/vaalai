import { Action } from '@ngrx/store';
import { DayBookEntry, DayBookState } from './state';

export const LOAD_DAYBOOK = '[DayBook] Load DayBook';
export const SET_DAYBOOK = '[DayBook] Set DayBook';

export class LoadDayBook implements Action {
  readonly type = LOAD_DAYBOOK;
  constructor(public payload: { fromDate: string; toDate: string; companyId: number }) {}
}

export class SetDayBook implements Action {
  readonly type = SET_DAYBOOK;
  constructor(public payload: { entries: { [date: string]: DayBookEntry } }) {}
}

export type DayBookActions = LoadDayBook | SetDayBook;
