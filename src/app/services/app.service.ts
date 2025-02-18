import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { sleep } from '@/utils/helpers';
import { ApiService } from './api.service';
import { firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { SetCompanies, ClearCompanies, SelectCompany, CreateCompany } from '@/store/company/actions';
import { SelectAccount, SetAccounts } from '@/store/account/actions';
import { AppState } from '@/store/state';
import { SelectGroup, SelectSubGroup, SetGroups, SetSubGroups } from '@/store/groups/actions';
import { Group } from '@/store/groups/state';
import { SelectPayment, SetPayments } from '@/store/payment/actions';
import { SelectReceipt, SetReceipts } from '@/store/receipt/actions';
import { SetMeta } from '@/store/metaPages/actions';
import { Payment } from '@/store/payment/state';
import { Receipt } from '@/store/receipt/state';
import { SetDayBook } from '@/store/daybook/actions';
import { SetLedger, SetLedgerMonthly } from '@/store/ledger/actions';
@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user: any = null;

    constructor(private router: Router, private toastr: ToastrService, 
                private apiService: ApiService,
                private store: Store<AppState> ) {}

    async loginByAuth({ email, password }) {
        try {
            const response = await firstValueFrom(this.apiService.login(email, password));
            
            if (response?.response.status === 'success') {
                const authData = response.response.data;
                console.log(authData);
                localStorage.setItem('token', authData.access_token);  
                localStorage.setItem('authentication', JSON.stringify(authData));

                await sleep(500);
                await this.getProfile();
                this.router.navigate(['/company-select']);
                this.toastr.success(response.response.message);
            } else {
                this.toastr.error(response.response.message || 'Login failed');
            }
        } catch (error) {
            this.toastr.error(error.error?.message || 'Login failed');
        }
    }

    async registerByAuth({ email, password }) {
        try {
            const response = await this.apiService.login(email, password).toPromise();
            
            if (response.response.status === 'success') {
                localStorage.setItem('authentication', JSON.stringify(response.response.data));
                localStorage.setItem('token', response.response.data.access_token);
                
                await this.getProfile();
                this.router.navigate(['/']);
                this.toastr.success('Register success');
            } else {
                this.toastr.error('Registration failed');
            }
        } catch (error) {
            this.toastr.error(error.error?.message || 'Registration failed');
        }
    }

    async getProfile() {
        try {
           
            
            const userProfile = await firstValueFrom(this.apiService.getUserProfile());

            if (userProfile?.response.status === 'success') {
                this.user = userProfile?.data;
                // console.log(userProfile?.data);
            } else {
               this.logout();
            }
        } catch (error) {
            this.logout();
            throw error;
        }
    }

    //#region company

    async getCompanies(){
      try 
      {
          const response = await firstValueFrom(this.apiService.getCompanies());
          
          if (response?.response?.status === 'success') {
              this.store.dispatch(new SetCompanies(response.data));
              this.toastr.success(response.response.message);
          } else {
              this.toastr.error(response.response.message || 'Failed to retrieve companies');
          }
      } catch (error) {
          this.toastr.error(error.error?.message || 'Error loading companies');
      }
    }

    async setCompany() {
        try {
          const selectedCompanyState = await firstValueFrom(this.store.select(state => state.company.createCompany));
          console.log(selectedCompanyState);
          
          const response = await firstValueFrom(this.apiService.setCompany(selectedCompanyState));
          
          if (response?.response?.status === 'success') {
            this.router.navigate(['/company-management']);
            this.toastr.success(response.response.message);
          } else {
            this.toastr.error(response.response.message || 'Failed to create company');
          }
        } catch (error) {
          this.toastr.error(error.error?.message || 'Error creating company');
        }
      }
    
      async getCompanyById(companyId: number) {
        try {
          const response = await firstValueFrom(this.apiService.getCompanyById(companyId));
    
          if (response?.response?.status === 'success') {
            this.store.dispatch(new CreateCompany(response.data));
          } else {
            this.toastr.error(response.response.message || 'Failed to retrieve company');
          }
        } catch (error) {
          this.toastr.error(error.error?.message || 'Error fetching company details');
        }
      }
    
      async updateCompany(companyId: number) {
        try {
          const selectedCompanyState = await firstValueFrom(this.store.select(state => state.company.createCompany));
          const response = await firstValueFrom(this.apiService.updateCompany(companyId, selectedCompanyState));
    
          if (response?.response?.status === 'success') {
            this.router.navigate(['/company-management']);
            this.toastr.success(response.response.message);
          } else {
            this.toastr.error(response.response.message || 'Failed to update company');
          }
        } catch (error) {
          this.toastr.error(error.error?.message || 'Error updating company');
        }
      }
    
      async deleteCompany(companyId: number) {
        try {
          const response = await firstValueFrom(this.apiService.deleteCompany(companyId));
    
          if (response?.response?.status === 'success') {
            this.toastr.success(response.response.message);
            this.store.dispatch(new SetCompanies([])); // Clear state after delete
          } else {
            this.toastr.error(response.response.message || 'Failed to delete company');
          }
        } catch (error) {
          this.toastr.error(error.error?.message || 'Error deleting company');
        }
      }

    //#endregion

//#region  accounts

    async getAccountsForCompany() {
      try {
          // Get selected company ID from store
          const companyState = await firstValueFrom(this.store.select(state => state.company));

          const selectedCompanyId = companyState?.selectedCompany?.id;

          if (!selectedCompanyId) {
              this.toastr.error('No company selected!');
              return;
          }
  
          // Fetch accounts for the selected company
          const response = await firstValueFrom(this.apiService.getAccounts(selectedCompanyId));
  
          if (response?.response?.status === 'success') {
            console.log(response.data);
            
              this.store.dispatch(new SetAccounts(response.data)); // Dispatch to accounts state
              this.toastr.success(response.response.message);
          } else {
              this.toastr.error(response.response.message || 'Failed to retrieve accounts');
          }
      } catch (error) {
          this.toastr.error(error.error?.message || 'Error loading accounts');
      }
    }

    async setAccount() {
        try {
            const selectedAccoutState = await firstValueFrom(this.store.select(state => state.account.selectedAccount));
            console.log(selectedAccoutState);
          const selectedAccountState = await firstValueFrom(this.store.select(state => state.account.selectedAccount));
          console.log(selectedAccountState);
          
          const response = await firstValueFrom(this.apiService.setAccounts(selectedAccountState));
    
          if (response?.response?.status === 'success') {
            this.router.navigate(['/account-master']);
            this.toastr.success(response.response.message);
          } else {
            this.toastr.error(response.response.message || 'Failed to create account');
          }
        } catch (error) {
            console.log(error);
            
          this.toastr.error(error.error?.message || 'Error creating account');
        }
      }

      async getAccountById(accountId: number) {
        try {
          const response = await firstValueFrom(this.apiService.getAccountById(accountId));
          
          if (response?.response?.status === 'success') {
            this.store.dispatch(new SelectAccount(response.data)); 
          } else {
            this.toastr.error(response.response.message || 'Failed to retrieve account');
          }
        } catch (error) {
          this.toastr.error(error.error?.message || 'Error fetching account details');
        }
      }
    
      async updateAccount(accountId: number) {
        try {
          const selectedAccountState = await firstValueFrom(this.store.select(state => state.account.selectedAccount));
          const response = await firstValueFrom(this.apiService.updateAccount(accountId, selectedAccountState));
    
          if (response?.response?.status === 'success') {
            this.router.navigate(['/account-master']);
            this.toastr.success(response.response.message);
          } else {
            this.toastr.error(response.response.message || 'Failed to update account');
          }
        } catch (error) {
          this.toastr.error(error.error?.message || 'Error updating account');
        }
      }

      async deleteAccount(accountId: number) {
        try {
          const response = await firstValueFrom(this.apiService.deleteAccount(accountId));
    
          if (response?.response?.status === 'success') {
            this.toastr.success(response.response.message);
            this.store.dispatch(new SetAccounts([])); // Clear state after delete
          } else {
            this.toastr.error(response.response.message || 'Failed to delete account');
          }
        } catch (error) {
          this.toastr.error(error.error?.message || 'Error deleting account');
        }
      }

//#endregion

//#region  Groups
    async getGroups(){
        try 
        {
            const response = await firstValueFrom(this.apiService.getGroups());
            
            if (response?.response?.status === 'success') {
                this.store.dispatch(new SetGroups(response.data));
                this.toastr.success(response.response.message);
            } else {
                this.toastr.error(response.response.message || 'Failed to retrieve groups');
            }
        } catch (error) {
            this.toastr.error(error.error?.message || 'Error loading groups');
        }
    }

    async getSubGroups(){
        try 
      {
          const response = await firstValueFrom(this.apiService.getSubGroups());
          
          if (response?.response?.status === 'success') {
              this.store.dispatch(new SetSubGroups(response.data));
              this.toastr.success(response.response.message);
          } else {
              this.toastr.error(response.response.message || 'Failed to retrieve groups');
          }
      } catch (error) {
          this.toastr.error(error.error?.message || 'Error loading groups');
      }
    }
  
    async setGroup(){
        try 
        {
            
            const selectedGroupState = await firstValueFrom(this.store.select(state => state.group.selectedGroup));
            const response = await firstValueFrom(this.apiService.setGroup(selectedGroupState));
            if (response?.response?.status === 'success') {
                this.router.navigate(['/account-master/sub-groups']);
                this.toastr.success(response.response.message);
            } else {
                this.toastr.error(response.response.message || 'Failed to save group');
            }
        } catch (error) {
            this.toastr.error(error.error?.message || 'Error saving group');
        }
    }
    async setSubGroup(){
        try 
        {
            const groups = await firstValueFrom(this.store.select(state => state.subGroup));
            console.log(groups);
            const selectedGroupState = await firstValueFrom(this.store.select(state => state.subGroup.selectedSubGroup));
            
            
            const response = await firstValueFrom(this.apiService.setSubGroup(selectedGroupState));
            if (response?.response?.status === 'success') {
                this.router.navigate(['/account-master/sub-groups']);
                this.toastr.success(response.response.message);
            } else {
                this.toastr.error(response.response.message || 'Failed to save sub group');
            }
        } catch (error) {
            this.toastr.error(error.error?.message || 'Error saving sub group');
        }
    }

    async getGroupById(groupId: number) {
        try {
            const response = await firstValueFrom(this.apiService.getGroupById(groupId));
            if (response?.response?.status === 'success') {
                console.log(response.data);
                
                this.store.dispatch(new SelectGroup(response.data)); 
            } else {
                this.toastr.error(response.response.message || 'Failed to save sub group');
            }

        } catch (error) {
            this.toastr.error(error.error?.message || 'Error fetching group details');
        }
    }
1
    async getSubGroupById(subGroupId: number) {
        try {
            const response = await firstValueFrom(this.apiService.getSubGroupById(subGroupId));
             
            if (response?.response?.status === 'success') {
                this.store.dispatch(new SelectSubGroup(response.data)); 
            } else {
                this.toastr.error(response.response.message || 'Failed to save sub group');
            }
        } catch (error) {
            this.toastr.error(error.error?.message || 'Error fetching sub-group details');
        }
    }

    async updateGroup(groupId: number) {
        try {
            const selectedGroupState = await firstValueFrom(this.store.select(state => state.group.selectedGroup));
            const response = await firstValueFrom(this.apiService.updateGroup(groupId, selectedGroupState));
            if (response?.response?.status === 'success') {
                this.router.navigate(['/account-master/sub-groups']);
                this.toastr.success(response.response.message);
            } else {
                this.toastr.error(response.response.message || 'Failed to update group');
            }
        } catch (error) {
            this.toastr.error(error.error?.message || 'Error updating group');
        }
    }

    async updateSubGroup(subGroupId: number) {
        try {
            const selectedSubGroupState = await firstValueFrom(this.store.select(state => state.subGroup.selectedSubGroup));
            const response = await firstValueFrom(this.apiService.updateSubGroup(subGroupId, selectedSubGroupState));
            if (response?.response?.status === 'success') {
                this.router.navigate(['/account-master/sub-groups']);
                this.toastr.success(response.response.message);
            } else {
                this.toastr.error(response.response.message || 'Failed to update sub-group');
            }
        } catch (error) {
            this.toastr.error(error.error?.message || 'Error updating sub-group');
        }
    }

    // 🚀 DELETE
    async deleteGroup(groupId: number) {
        try {
            const response = await firstValueFrom(this.apiService.deleteGroup(groupId));
            if (response?.response?.status === 'success') {
                this.toastr.success(response.response.message);
                this.store.dispatch(new SetGroups([])); // Clear group state after delete
            } else {
                this.toastr.error(response.response.message || 'Failed to delete group');
            }
        } catch (error) {
            this.toastr.error(error.error?.message || 'Error deleting group');
        }
    }

    async deleteSubGroup(subGroupId: number) {
        try {
            const response = await firstValueFrom(this.apiService.deleteSubGroup(subGroupId));
            if (response?.response?.status === 'success') {
                this.toastr.success(response.response.message);
                this.store.dispatch(new SetSubGroups([])); // Clear sub-group state after delete
            } else {
                this.toastr.error(response.response.message || 'Failed to delete sub-group');
            }
        } catch (error) {
            this.toastr.error(error.error?.message || 'Error deleting sub-group');
        }
    }

//#endregion

//#region  Payment
    async getPaymentsForCompany(filters: { date_from?: string; date_to?: string; payment_type?: string } = {},page: number) {
        try {
            
            const companyState = await firstValueFrom(this.store.select(state => state.company));

            const selectedCompanyId = companyState?.selectedCompany?.id;

            if (!selectedCompanyId) {
                this.toastr.error('No company selected!');
                return;
            }
            const response = await firstValueFrom(
                this.apiService.getPayments(selectedCompanyId,filters.date_from, filters.date_to, filters.payment_type,page)
            );

            if (response?.response?.status === 'success') {
                console.log(response.data);
                
                this.store.dispatch(new SetPayments(response.data));
                this.store.dispatch(new SetMeta(response.meta));
            } else {
                this.toastr.error(response.response.message || 'Failed to retrieve payments');
            }
        } catch (error) {
            this.toastr.error(error.error?.message || 'Error loading payments');
        }
    }


    // 🚀 Create a New Payment
    async setPayment() {
        try {
            const selectedPayment = await firstValueFrom(
                this.store.select(state => state.payment.selectedPayment)
            );
            console.log(selectedPayment);
            
            const response = await firstValueFrom(this.apiService.setPayment(selectedPayment));

            if (response?.response?.status === 'success') {
                this.router.navigate(['/book-keeping/payment-book']);
                this.toastr.success(response.response.message);
            } else {
                this.toastr.error(response.response.message || 'Failed to create payment');
            }
        } catch (error) {
            this.toastr.error(error.error?.message || 'Error creating payment');
        }
    }

    // 🚀 Get Payment by ID (For Editing)
    async getPaymentById(paymentId: number) {
        try {
            const response = await firstValueFrom(this.apiService.getPaymentById(paymentId));

            if (response?.response?.status === 'success') {
                this.store.dispatch(new SelectPayment(response.data));
            } else {
                this.toastr.error(response.response.message || 'Failed to retrieve payment');
            }
        } catch (error) {
            this.toastr.error(error.error?.message || 'Error fetching payment details');
        }
    }

    // 🚀 Update an Existing Payment
    async updatePayment(paymentId: number) {
        try {
            const selectedPayment = await firstValueFrom(
                this.store.select(state => state.payment.selectedPayment)
            );

            const response = await firstValueFrom(
                this.apiService.updatePayment(paymentId, selectedPayment)
            );

            if (response?.response?.status === 'success') {
                this.router.navigate(['/book-keeping/payment-book']);
                this.toastr.success(response.response.message);
            } else {
                this.toastr.error(response.response.message || 'Failed to update payment');
            }
        } catch (error) {
            this.toastr.error(error.error?.message || 'Error updating payment');
        }
    }

    // 🚀 Delete a Payment
    async deletePayment(paymentId: number) {
        try {
            const response = await firstValueFrom(this.apiService.deletePayment(paymentId));

            if (response?.response?.status === 'success') {
                this.toastr.success(response.response.message);
                this.store.dispatch(new SetPayments([])); // Clear state after delete
            } else {
                this.toastr.error(response.response.message || 'Failed to delete payment');
            }
        } catch (error) {
            this.toastr.error(error.error?.message || 'Error deleting payment');
        }
    }

    async getPaymentsForPrint(filters: { date_from?: string; date_to?: string; payment_type?: string } = {}): Promise<Payment[]> {
        try {
            const companyState = await firstValueFrom(this.store.select(state => state.company));

            const selectedCompanyId = companyState?.selectedCompany?.id;

            if (!selectedCompanyId) {
                this.toastr.error('No company selected!');
                return;
            }
            const response = await firstValueFrom(
                this.apiService.getPaymentsForReport(selectedCompanyId,filters.date_from, filters.date_to, filters.payment_type)
            );
    
            if (response?.response?.status === 'success') {
                console.log('Payments for Print:', response.data);
                this.toastr.info('Payments loaded successfully for printing');
                return response.data as Payment[];
            } else {
                this.toastr.error(response.response.message || 'Failed to retrieve payments for printing');
                return [];
            }
        } catch (error) {
            this.toastr.error(error.error?.message || 'Error loading payments for printing');
            return [];
        }
    }

//#endregion

//#region  Receipts
    async getReceiptsForCompany(filters: { date_from?: string; date_to?: string; payment_type?: string } = {},page:number) {
        try {

            const companyState = await firstValueFrom(this.store.select(state => state.company));

            const selectedCompanyId = companyState?.selectedCompany?.id;

            if (!selectedCompanyId) {
                this.toastr.error('No company selected!');
                return;
            }

            const response = await firstValueFrom(
                this.apiService.getReceipts(selectedCompanyId,filters.date_from, filters.date_to, filters.payment_type,page)
            );

            if (response?.response?.status === 'success') {
                this.store.dispatch(new SetReceipts(response.data));
                this.store.dispatch(new SetMeta(response.meta));
            } else {
                this.toastr.error(response.response.message || 'Failed to retrieve receipts');
            }
        } catch (error) {
            this.toastr.error(error.error?.message || 'Error loading receipts');
        }
    }


    // 🚀 Create a New Receipt
    async setReceipt() {
        try {
            const selectedReceipt = await firstValueFrom(
                this.store.select(state => state.receipt.selectedReceipt)
            );

            const response = await firstValueFrom(this.apiService.setReceipt(selectedReceipt));

            if (response?.response?.status === 'success') {
                this.router.navigate(['/account-master/receipts']);
                this.toastr.success(response.response.message);
            } else {
                this.toastr.error(response.response.message || 'Failed to create receipt');
            }
        } catch (error) {
            this.toastr.error(error.error?.message || 'Error creating receipt');
        }
    }

    // 🚀 Get Receipt by ID (For Editing)
    async getReceiptById(receiptId: number) {
        try {
            const response = await firstValueFrom(this.apiService.getReceiptById(receiptId));

            if (response?.response?.status === 'success') {
                this.store.dispatch(new SelectReceipt(response.data));
            } else {
                this.toastr.error(response.response.message || 'Failed to retrieve receipt');
            }
        } catch (error) {
            this.toastr.error(error.error?.message || 'Error fetching receipt details');
        }
    }

    // 🚀 Update an Existing Receipt
    async updateReceipt(receiptId: number) {
        try {
            const selectedReceipt = await firstValueFrom(
                this.store.select(state => state.receipt.selectedReceipt)
            );

            const response = await firstValueFrom(
                this.apiService.updateReceipt(receiptId, selectedReceipt)
            );

            if (response?.response?.status === 'success') {
                this.router.navigate(['/account-master/receipts']);
                this.toastr.success(response.response.message);
            } else {
                this.toastr.error(response.response.message || 'Failed to update receipt');
            }
        } catch (error) {
            this.toastr.error(error.error?.message || 'Error updating receipt');
        }
    }

    // 🚀 Delete a Receipt
    async deleteReceipt(receiptId: number) {
        try {
            const response = await firstValueFrom(this.apiService.deleteReceipt(receiptId));

            if (response?.response?.status === 'success') {
                this.toastr.success(response.response.message);
                this.store.dispatch(new SetReceipts([])); // Clear state after delete
            } else {
                this.toastr.error(response.response.message || 'Failed to delete receipt');
            }
        } catch (error) {
            this.toastr.error(error.error?.message || 'Error deleting receipt');
        }
    }
    async getReceiptsForPrint(filters: { date_from?: string; date_to?: string; receipt_type?: string } = {}): Promise<Receipt[]> {
        try {
            const companyState = await firstValueFrom(this.store.select(state => state.company));

            const selectedCompanyId = companyState?.selectedCompany?.id;

            if (!selectedCompanyId) {
                this.toastr.error('No company selected!');
                return;
            }
            const response = await firstValueFrom(
                this.apiService.getReceiptsForReport(selectedCompanyId,filters.date_from, filters.date_to, filters.receipt_type)
            );
    
            if (response?.response?.status === 'success') {
                this.toastr.info('Receipts loaded successfully for printing');
                return response.data as Receipt[];
            } else {
                this.toastr.error(response.response.message || 'Failed to retrieve receipts for printing');
                return [];
            }
        } catch (error) {
            this.toastr.error(error.error?.message || 'Error loading receipts for printing');
            return [];
        }
    }
//#endregion

//#region  Day Book
    async getDayBookForPrint(fromDate: string, toDate: string): Promise<any> {
        try {
            const companyState = await firstValueFrom(this.store.select(state => state.company));

            const selectedCompanyId = companyState?.selectedCompany?.id;

            if (!selectedCompanyId) {
                this.toastr.error('No company selected!');
                return;
            }
            const response = await firstValueFrom(this.apiService.getDayBook(fromDate, toDate, selectedCompanyId));
        
            if (response?.response?.status === 'success') {
                this.store.dispatch(new SetDayBook({ entries: response.data }));
                this.toastr.info('DayBook data loaded successfully');
                return response.data;
            } else {
                this.toastr.error(response.response.message || 'Failed to retrieve DayBook data');
                return null;
            }
        } catch (error) {
            this.toastr.error(error.error?.message || 'Error loading DayBook data');
            return null;
        }
    }
//#endregion

//#region Ledger Book
async getLedgerBookForPrint(accountId: number, fromDate: string, toDate: string, monthlyClosing: boolean): Promise<any> {
    try {
      const companyState = await firstValueFrom(this.store.select(state => state.company));
      const selectedCompanyId = companyState?.selectedCompany?.id;
  
      if (!selectedCompanyId) {
        this.toastr.error('No company selected!');
        return;
      }
  
      const response = await firstValueFrom(this.apiService.getLedgerBook(accountId, fromDate, toDate, monthlyClosing));
  
      if (response?.response?.status === 'success') {
        if (monthlyClosing) {
          this.store.dispatch(new SetLedger({ entries: response.data }));  // For monthly closing
        } else {
          this.store.dispatch(new SetLedgerMonthly( response.data ));  // For detailed ledger
        }
        this.toastr.info('Ledger data loaded successfully');
        return response.data;
      } else {
        this.toastr.error(response.response.message || 'Failed to retrieve Ledger data');
        return null;
      }
    } catch (error) {
      this.toastr.error(error.error?.message || 'Error loading Ledger data');
      return null;
    }
  }
  
  //#endregion
  

logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('gatekeeper_token');
        //this.user = null;
        this.router.navigate(['/login']);
    }
}


export const authLogin = (email: string, password: string) => {
  return new Promise(async (res, rej) => {
    await sleep(500);
    if (email === 'admin@example.com' && password === 'admin') {
      localStorage.setItem(
        'authentication',
        JSON.stringify({ profile: { email: 'admin@example.com' , name: 'admin'} })
      );
      return res({ profile: { email: 'admin@example.com' } });
    }
    return rej({ message: 'Credentials are wrong!' });
  });
};

export const getAuthStatus = () => {
  return new Promise(async (res, rej) => {
    await sleep(500);
    try {
      let authentication = localStorage.getItem('authentication');
      if (authentication) {
        authentication = JSON.parse(authentication);
        return res(authentication);
      }
      return res(undefined);
    } catch (error) {
      return res(undefined);
    }
  });
};
