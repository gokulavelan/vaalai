import * as GroupActions from './actions';
import { GroupState, SubGroupState, initialGroupState, initialSubGroupState } from './state';

// Reducer for Groups
export function groupReducer(state: GroupState = initialGroupState, action: GroupActions.GroupActions) {
    switch (action.type) {
        case GroupActions.SET_GROUPS:
            return {
                ...state,
                groups: action.payload
            };

        case GroupActions.SELECT_GROUP:
            const selectedGroup = action.payload;
            // console.log(action.payload);
            
            return {
                ...state,
                selectedGroup: selectedGroup || null
            };

        case GroupActions.CLEAR_GROUPS:
            return {
                ...state,
                groups: [],
                selectedGroup: null
            };

        default:
            return state;
    }
}

// Reducer for SubGroups
export function subGroupReducer(state: SubGroupState = initialSubGroupState, action: GroupActions.SubGroupActions) {
    switch (action.type) {
        case GroupActions.SET_SUBGROUPS:
            return {
                ...state,
                subGroups: action.payload
            };

        case GroupActions.SELECT_SUBGROUP:
            const selectedSubGroup = action.payload;
            console.log(selectedSubGroup);
            
            return {
                ...state,
                selectedSubGroup: selectedSubGroup || null
            };

        case GroupActions.CLEAR_SUBGROUPS:
            return {
                ...state,
                subGroups: [],
                selectedSubGroup: null
            };

        default:
            return state;
    }
}
