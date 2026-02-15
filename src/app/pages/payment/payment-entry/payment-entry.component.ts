import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '@services/app.service';
import { firstValueFrom, Observable } from 'rxjs';
import { SelectPayment } from '@/store/payment/actions';
import { AppState } from '@/store/state';

@Component({
  selector: 'app-payment-entry',
  templateUrl: './payment-entry.component.html',
  styleUrls: ['./payment-entry.component.scss']
})
export class PaymentEntryComponent implements OnInit {
  paymentForm: FormGroup;
  paymentId: number | null = null;
  isEditMode = false;
  todayDate: string;
  isCash: boolean = true;
  accounts$: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.accounts$ = this.store.select(state => state.account.accounts);
  }

  async ngOnInit(): Promise<void> {
    this.todayDate = new Date().toISOString().split('T')[0];

    this.paymentForm = this.fb.group({
      transaction_no: [{ value: '', disabled: true }],
      transaction_type: ['debit'], // Fixed value for payment
      date: [this.todayDate, Validators.required],
      payment_type: ['cash', Validators.required],
      account_id: ['', Validators.required],
      bank_name: [{ value: '', disabled: true }],
      particulars: [''],
      amount: ['', Validators.required],
      bank_commission: [{ value: '', disabled: true }],
      purchase_commission: [{ value: '', disabled: true }],
      cash_discount: [''],
      commission: ['']
    });

    // Fetch accounts
    await this.appService.getAccountsForCompany();

    // Check if it's edit mode (URL contains ID)
    this.route.paramMap.subscribe(async params => {
      const id = params.get('id');
      if (id) {
        this.paymentId = Number(id);
        this.isEditMode = true;
        await this.loadPaymentData(this.paymentId);
      }
    });
  }

  async loadPaymentData(paymentId: number): Promise<void> {
    try {
      this.appService.getPaymentById(paymentId);

      const selectedPayment = await firstValueFrom(
        this.store.select(state => state.payment.selectedPayment)
      );

      if (selectedPayment) {
        console.log(selectedPayment.date);
        const formattedDate = selectedPayment.date ? selectedPayment.date.split('T')[0] : this.todayDate;
        this.paymentForm.patchValue({
          transaction_no: selectedPayment.transaction_no,
          transaction_type: selectedPayment.transaction_type,
          date: formattedDate,
          payment_type: selectedPayment.payment_type,
          account_id: selectedPayment.account_id,
          bank_name: selectedPayment.bank_name,
          particulars: selectedPayment.particulars,
          amount: selectedPayment.amount,
          bank_commission: selectedPayment.bank_commission,
          purchase_commission: selectedPayment.purchase_commission,
          cash_discount: selectedPayment.cash_discount,
          commission: selectedPayment.commission
        });

        this.isCash = selectedPayment.payment_type === 'cash';
        this.onPaymentTypeChange();
      }
    } catch (error) {
      console.error('Error loading payment:', error);
    }
  }

  onPaymentTypeChange(): void {
    this.isCash = this.paymentForm.get('payment_type')?.value === 'cash';
    if (this.isCash) {
      this.paymentForm.get('bank_name')?.disable();
      this.paymentForm.get('bank_commission')?.disable();
      this.paymentForm.get('purchase_commission')?.disable();
    } else {
      this.paymentForm.get('bank_name')?.enable();
      this.paymentForm.get('bank_commission')?.enable();
      this.paymentForm.get('purchase_commission')?.enable();
    }
  }

  async onSubmit(): Promise<void> {
    console.log(this.paymentForm);
    
    if (this.paymentForm.valid) {
      const paymentData = {
        id: this.isEditMode && this.paymentId ? this.paymentId : undefined,
        ...this.paymentForm.value
      };
      console.log(paymentData);
      
      this.store.dispatch(new SelectPayment(paymentData));

      if (this.isEditMode && this.paymentId) {
        await this.appService.updatePayment(this.paymentId);
      } else {
        await this.appService.setPayment();
      }

    //  this.router.navigate(['/book-keeping/payment-book']); // Redirect to list
    }
  }
}
