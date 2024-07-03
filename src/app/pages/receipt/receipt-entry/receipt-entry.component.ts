import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receipt-entry',
  templateUrl: './receipt-entry.component.html',
  styleUrl: './receipt-entry.component.scss'
})
export class ReceiptEntryComponent {
  receiptForm: FormGroup;
  isCash: boolean = true; // Default to cash payment type
  banks = ['Bank A', 'Bank B', 'Bank C']; // Example bank names
  accounts = ['Account 1', 'Account 2', 'Account 3']; // Example account names

  constructor(private fb: FormBuilder, private router: Router) {
    this.receiptForm = this.fb.group({
      receiptNo: [{ value: '12345', disabled: true }], // Example receipt number
      paymentType: ['Cash', Validators.required],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      bankName: [{ value: '', disabled: true }],
      accountName: ['', Validators.required],
      particulars: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
      cashDiscount: [0, [Validators.required, Validators.min(0)]],
      commission: [{ value: 0, disabled: true }, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {}

  onPaymentTypeChange(event): void {
    this.isCash = event.target.value === 'Cash';
    if (this.isCash) {
      this.receiptForm.get('bankName').disable();
      this.receiptForm.get('commission').disable();
    } else {
      this.receiptForm.get('bankName').enable();
      this.receiptForm.get('commission').enable();
    }
  }

  onSubmit(): void {
    if (this.receiptForm.valid) {
      console.log('Form Submitted', this.receiptForm.value);
      // Handle form submission logic
    }
  }
}
