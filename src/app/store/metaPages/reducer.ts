import { MetaState } from './state';
import { MetaActions,MetaActionTypes } from './actions';

const initialState: MetaState = {
    currentPage: 1,
    lastPage: 1,
    perPage: 10,
    totalRecords: 0,
    nextPageUrl: null,
    prevPageUrl: null
};

export function metaReducer(state = initialState, action: MetaActions): MetaState {
    switch (action.type) {
        case MetaActionTypes.SET_META:
            return {
                ...state,
                currentPage: action.payload.current_page,
                lastPage: action.payload.last_page,
                perPage: action.payload.per_page,
                totalRecords: action.payload.total,
                nextPageUrl: action.payload.links.find((link: any) => link.label === 'Next »')?.url || null,
                prevPageUrl: action.payload.links.find((link: any) => link.label === '« Previous')?.url || null
            };

        case MetaActionTypes.RESET_META:
            return initialState;

        default:
            return state;
    }
}
