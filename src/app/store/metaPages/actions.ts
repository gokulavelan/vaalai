import { Action } from '@ngrx/store';

export enum MetaActionTypes {
    SET_META = '[Meta] Set Meta Data',
    RESET_META = '[Meta] Reset Meta Data'
}

export class SetMeta implements Action {
    readonly type = MetaActionTypes.SET_META;
    constructor(public payload: any) {} // Accepts API meta response
}

export class ResetMeta implements Action {
    readonly type = MetaActionTypes.RESET_META;
}

export type MetaActions = SetMeta | ResetMeta;
