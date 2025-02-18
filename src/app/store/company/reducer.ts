import * as CompanyActions from './actions';
import { CompanyState, initialCompanyState } from './state';
export function companyReducer(state: CompanyState = initialCompanyState, action: CompanyActions.CompanyActions) {
    switch (action.type) {
        case CompanyActions.SET_COMPANIES:
            return {
                ...state,
                companies: action.payload
            };
        case CompanyActions.SELECT_COMPANY:
            const selectedCompany = state.companies.find(company => company.id === Number(action.payload));
            return {
                ...state,
                selectedCompany: selectedCompany || null
            };
        case CompanyActions.CREATE_COMPANY:
            return {
                ...state,
                createCompany: action.payload
            };
        case CompanyActions.CLEAR_COMPANIES:
            return {
                ...state,
                companies: []
            };

        default:
            return state;
    }
}
