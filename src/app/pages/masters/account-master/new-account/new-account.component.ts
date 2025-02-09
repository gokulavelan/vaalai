import { SelectAccount } from '@/store/account/actions';
import { AppState } from '@/store/state';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppService } from '@services/app.service';
import Stepper from 'bs-stepper';
import { firstValueFrom, Observable } from 'rxjs';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrl: './new-account.component.scss'
})
export class NewAccountComponent {
  private stepper: Stepper;
  accountForm: FormGroup;
  isEditMode = false;
  header = 'New Account'
  accountId: number | null = null;
  subGroups$: Observable<any>;
  
  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.subGroups$ = this.store.select(state => state.subGroup.subGroups);
  }

  next(event: Event) {
    event.preventDefault();
    this.stepper.next();
  }

  async ngOnInit() {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })

    this.appService.getSubGroups();
     const selectedCompany = await firstValueFrom(this.store.select(state => state.company.selectedCompany));
    this.accountForm = this.fb.group({
      name: ['', Validators.required],
      company_id: [selectedCompany.id, Validators.required],
      sub_group_id: [''],
      opening_balance: ['', Validators.required],
      transaction_type: ['credit', Validators.required],
      gstn: [''],
      fssi: [''],
      pan: [''],
      address1: [''],
      address2: [''],
      address3: [''],
      area: [''],
      city: ['', Validators.required],
      pincode: [''],
      state: [''],
      office_phone: [''],
      factory_phone: [''],
      mobile: [''],
      residence_phone: [''],
      contact_person: [''],
      email: [''],
      website: [''],
      bank_name: [''],
      branch: [''],
      ifsc_code: [''],
      account_number: [''],
      account_type: ['']
    });  

    // Check if we are in edit mode
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.accountId = parseInt(id, 10);
        this.header = 'Edit Account'
        this.loadAccountData(this.accountId);
      }
    });
  }

  async loadAccountData(accountId: number): Promise<void> {
    try {
      // Fetch account data from API and store it in state
      await this.appService.getAccountById(accountId);
  
      // Retrieve selected account from state
      const selectedAccount = await firstValueFrom(
        this.store.select(state => state.account.selectedAccount)
      );
  
      if (selectedAccount) {
        // Patch form values using the retrieved account data
        this.accountForm.patchValue({
          name: selectedAccount.name,
          company_id: selectedAccount.company_id,
          sub_group_id: selectedAccount.sub_group_id,
          opening_balance: selectedAccount.opening_balance,
          transaction_type: selectedAccount.transaction_type,
          gstn: selectedAccount.gstn,
          fssi: selectedAccount.fssi,
          pan: selectedAccount.pan,
          address1: selectedAccount.address1,
          address2: selectedAccount.address2,
          address3: selectedAccount.address3,
          area: selectedAccount.area,
          city: selectedAccount.city,
          pincode: selectedAccount.pincode,
          state: selectedAccount.state,
          office_phone: selectedAccount.office_phone,
          factory_phone: selectedAccount.factory_phone,
          mobile: selectedAccount.mobile,
          residence_phone: selectedAccount.residence_phone,
          contact_person: selectedAccount.contact_person,
          email: selectedAccount.email,
          website: selectedAccount.website,
          bank_name: selectedAccount.bank_name,
          branch: selectedAccount.branch,
          ifsc_code: selectedAccount.ifsc_code,
          account_number: selectedAccount.account_number,
          account_type: selectedAccount.account_type
        });
      }
    } catch (error) {
      console.error('Error loading account:', error);
    }
  }
  

  async onSubmit(): Promise<void> {
    console.log(this.accountForm.valid);
      if (this.accountForm.valid) {
        // Preserve the ID if editing, otherwise use form data
        const accountToSave = this.isEditMode && this.accountId
            ? { id: this.accountId, ...this.accountForm.value } 
            : this.accountForm.value;
        console.log(accountToSave);
        
        // Dispatch updated group to the store
        this.store.dispatch(new SelectAccount(accountToSave));
        const group$ = await firstValueFrom(this.store.select(state => state.account.accounts));
        console.log(group$);
        
        if (this.isEditMode && this.accountId) {
          await this.appService.updateAccount(this.accountId);
        } else {
          await this.appService.setAccount();
        }
      }
    }
}
