import { Action } from '@ngrx/store';

// Group Actions
export const LOAD_GROUPS = 'LOAD_GROUPS';
export const SET_GROUPS = 'SET_GROUPS';
export const SELECT_GROUP = 'SELECT_GROUP';
export const CLEAR_GROUPS = 'CLEAR_GROUPS';

export class LoadGroups implements Action {
    readonly type = LOAD_GROUPS;
}

export class SetGroups implements Action {
    readonly type = SET_GROUPS;
    constructor(public payload: any) {} // Store group data
}

export class SelectGroup implements Action {
    readonly type = SELECT_GROUP;
    constructor(public payload: any) {}  // Store group ID
}

export class ClearGroups implements Action {
    readonly type = CLEAR_GROUPS;
}

// SubGroup Actions
export const LOAD_SUBGROUPS = 'LOAD_SUBGROUPS';
export const SET_SUBGROUPS = 'SET_SUBGROUPS';
export const SELECT_SUBGROUP = 'SELECT_SUBGROUP';
export const CLEAR_SUBGROUPS = 'CLEAR_SUBGROUPS';

export class LoadSubGroups implements Action {
    readonly type = LOAD_SUBGROUPS;
}

export class SetSubGroups implements Action {
    readonly type = SET_SUBGROUPS;
    constructor(public payload: any) {} // Store subgroup data
}

export class SelectSubGroup implements Action {
    readonly type = SELECT_SUBGROUP;
    constructor(public payload: any) {}  // Store subgroup ID
}

export class ClearSubGroups implements Action {
    readonly type = CLEAR_SUBGROUPS;
}

// Export All Actions
export type GroupActions = LoadGroups | SetGroups | SelectGroup | ClearGroups;
export type SubGroupActions = LoadSubGroups | SetSubGroups | SelectSubGroup | ClearSubGroups;
