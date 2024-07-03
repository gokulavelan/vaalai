import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-payment-entry',
  templateUrl: './payment-entry.component.html',
  styleUrl: './payment-entry.component.scss'
})
export class PaymentEntryComponent {
  paymentForm: FormGroup;
  todayDate: string;
  isCash: boolean = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.todayDate = new Date().toISOString().split('T')[0];
    this.paymentForm = this.fb.group({
      paymentNo: [{ value: '', disabled: true }],
      paymentType: ['Cash'],
      date: [this.todayDate],
      bankName: [{ value: '', disabled: true }],
      accountName: [''],
      particulars: [''],
      amount: [''],
      bankCommission: [{ value: '', disabled: true }],
      purchaseCommission: [{ value: '', disabled: true }]
    });
  }

  onPaymentTypeChange(): void {
    this.isCash = this.paymentForm.get('paymentType')?.value === 'Cash';
    if (this.isCash) {
      this.paymentForm.get('bankName')?.disable();
      this.paymentForm.get('bankCommission')?.disable();
      this.paymentForm.get('purchaseCommission')?.disable();
    } else {
      this.paymentForm.get('bankName')?.enable();
      this.paymentForm.get('bankCommission')?.enable();
      this.paymentForm.get('purchaseCommission')?.enable();
    }
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      console.log('Form Submitted', this.paymentForm.value);
    }
  }
}
