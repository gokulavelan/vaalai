import {UiState} from './ui/state';
import { CompanyState } from './company/state';
import { AccountState } from './account/state';
import { GroupState, SubGroupState } from './groups/state';
import { PaymentState } from './payment/state';
import { ReceiptState } from './receipt/state';
export interface AppState {
    auth: any;
    ui: UiState;
    company: CompanyState;
    account: AccountState;
    group: GroupState;
    subGroup: SubGroupState;
    payment: PaymentState;
    receipt: ReceiptState;
}
