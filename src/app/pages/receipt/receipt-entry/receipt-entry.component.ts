import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '@services/app.service';
import { firstValueFrom, Observable } from 'rxjs';
import { SelectReceipt } from '@/store/receipt/actions';
import { AppState } from '@/store/state';

@Component({
  selector: 'app-receipt-entry',
  templateUrl: './receipt-entry.component.html',
  styleUrls: ['./receipt-entry.component.scss']
})
export class ReceiptEntryComponent implements OnInit {
  receiptForm: FormGroup;
  receiptId: number | null = null;
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

    this.receiptForm = this.fb.group({
      transaction_no: [{ value: '', disabled: true }],
      transaction_type: ['credit'], // Fixed value for receipt
      date: [this.todayDate, Validators.required],
      payment_type: ['cash', Validators.required],
      account_id: ['', Validators.required],
      bank_name: [{ value: '', disabled: true }],
      particulars: [''],
      amount: ['', Validators.required],
      cash_discount: [''],
      commission: [{ value: '', disabled: true }]
    });

    // Fetch accounts
    await this.appService.getAccountsForCompany();

    // Check if it's edit mode (URL contains ID)
    this.route.paramMap.subscribe(async params => {
      const id = params.get('id');
      if (id) {
        this.receiptId = Number(id);
        this.isEditMode = true;
        await this.loadReceiptData(this.receiptId);
      }
    });
  }

  async loadReceiptData(receiptId: number): Promise<void> {
    try {
      this.appService.getReceiptById(receiptId);

      const selectedReceipt = await firstValueFrom(
        this.store.select(state => state.receipt.selectedReceipt)
      );

      if (selectedReceipt) {
        // ✅ Convert date format if needed
        const formattedDate = selectedReceipt.date ? selectedReceipt.date.split('T')[0] : this.todayDate;

        this.receiptForm.patchValue({
          transaction_no: selectedReceipt.transaction_no,
          transaction_type: selectedReceipt.transaction_type,
          date: formattedDate, // ✅ Ensure correct format
          payment_type: selectedReceipt.payment_type,
          account_id: selectedReceipt.account_id,
          bank_name: selectedReceipt.bank_name,
          particulars: selectedReceipt.particulars,
          amount: selectedReceipt.amount,
          cash_discount: selectedReceipt.cash_discount,
          commission: selectedReceipt.commission
        });

        this.isCash = selectedReceipt.payment_type === 'Cash';
        this.onPaymentTypeChange();
      }
    } catch (error) {
      console.error('Error loading receipt:', error);
    }
  }

  onPaymentTypeChange(): void {
    this.isCash = this.receiptForm.get('payment_type')?.value === 'Cash';
    if (this.isCash) {
      this.receiptForm.get('bank_name')?.disable();
      this.receiptForm.get('commission')?.disable();
    } else {
      this.receiptForm.get('bank_name')?.enable();
      this.receiptForm.get('commission')?.enable();
    }
  }

  async onSubmit(): Promise<void> {
    if (this.receiptForm.valid) {
      const receiptData = {
        id: this.isEditMode && this.receiptId ? this.receiptId : undefined,
        ...this.receiptForm.value
      };

      this.store.dispatch(new SelectReceipt(receiptData));

      if (this.isEditMode && this.receiptId) {
        await this.appService.updateReceipt(this.receiptId);
      } else {
        await this.appService.setReceipt();
      }

      this.router.navigate(['/book-keeping/receipt-book']); // Redirect to list
    }
  }

  // ✅ Convert "02 Feb 2025" → "2025-02-02" for HTML <input type="date">
  convertDateFormat(dateString: string): string {
    if (!dateString) return '';
    
    const months: { [key: string]: string } = {
        Jan: '01', Feb: '02', Mar: '03', Apr: '04',
        May: '05', Jun: '06', Jul: '07', Aug: '08',
        Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    };

    const parts = dateString.split(' '); // ["02", "Feb", "2025"]
    if (parts.length === 3) {
        const day = parts[0].padStart(2, '0'); // Ensure two-digit day
        const month = months[parts[1]]; // Convert month abbreviation to number
        const year = parts[2];

        return `${year}-${month}-${day}`; // Convert to "YYYY-MM-DD"
    }
    return '';
  }
}
