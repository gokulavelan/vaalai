import * as AccountActions from './actions';
import { AccountState, initialAccountState } from './state';

export function accountReducer(state: AccountState = initialAccountState, action: AccountActions.AccountActions) {
    switch (action.type) {
        case AccountActions.SET_ACCOUNTS:
            return {
                ...state,
                accounts: action.payload
            };
        
        case AccountActions.SELECT_ACCOUNT:
            const selectedAccount = action.payload;
            console.log(selectedAccount);
            
            return {
                ...state,
                selectedAccount: selectedAccount || null
            };

        case AccountActions.CLEAR_ACCOUNTS:
            return {
                ...state,
                accounts: [],
                selectedAccount: null
            };

        default:
            return state;
    }
}
