import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppService } from '@services/app.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-receipt-book',
  templateUrl: './receipt-book.component.html',
  styleUrls: ['./receipt-book.component.scss'],
  animations: [
    trigger('filterAnimation', [
      state('open', style({ height: '*', opacity: 1, overflow: 'hidden' })),
      state('closed', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
      transition('open <=> closed', animate('300ms ease-in-out'))
    ])
  ]
})
export class ReceiptBookComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  receipts$ = this.store.select(state => state.receipt.transactions);
  filterForm: FormGroup;
  isFilterVisible = false; // 🚀 Filter hidden initially

  constructor(
    private router: Router,
    private store: Store<any>,
    private appService: AppService,
    private fb: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    this.dtOptions = { pagingType: 'full_numbers', pageLength: 10, processing: true };

    // Initialize filter form
    this.filterForm = this.fb.group({
      date_from: [''],
      date_to: [''],
      payment_type: ['']
    });

    // Fetch initial receipts
    await this.getFilteredReceipts();
  }

  // 🚀 Toggle Filter Section
  toggleFilter(): void {
    this.isFilterVisible = !this.isFilterVisible;
  }

  // 🚀 Fetch receipts based on filter
  async getFilteredReceipts(): Promise<void> {
    const filters = this.filterForm.value;
    await this.appService.getReceiptsForCompany(filters);
  }

  // 🚀 Navigate to Receipt Entry (Create New)
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  // 🚀 Edit Receipt
  async editReceipt(receipt: any): Promise<void> {
    this.appService.getReceiptById(receipt.id);
    this.router.navigate([`/book-keeping/receipt-book/receipt-entry/${receipt.id}`]);
  }

  // 🚀 Delete Receipt
  async deleteReceipt(receiptId: number): Promise<void> {
    if (confirm('Are you sure you want to delete this receipt?')) {
      this.appService.deleteReceipt(receiptId);
      await this.getFilteredReceipts(); // Refresh receipts after deletion
    }
  }
}
