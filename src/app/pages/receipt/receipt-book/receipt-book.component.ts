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
  isFilterVisible = false;

  // 🚀 Pagination State
  pagination = { currentPage: 1, lastPage: 1, totalRecords: 0, pageSize: 10 };
  showingFrom = 0;
  showingTo = 0;

  constructor(
    private router: Router,
    private store: Store<any>,
    private appService: AppService,
    private fb: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    this.dtOptions = { paging: false, info: false, searching: false };

    // Initialize filter form
    this.filterForm = this.fb.group({
      date_from: [''],
      date_to: [''],
      payment_type: ['']
    });

    await this.fetchReceipts(1);
  }

  // 🚀 Fetch receipts with pagination
  async fetchReceipts(page: number): Promise<void> {
    console.log('🔄 Fetching receipts for page:', page);

    const filters = this.filterForm.value;
    await this.appService.getReceiptsForCompany(filters, page);

    // ✅ Get updated pagination metadata
    const meta = await firstValueFrom(this.store.select(state => state.meta));
    if (meta) {
      this.pagination.currentPage = meta.currentPage;
      this.pagination.lastPage = meta.lastPage;
      this.pagination.totalRecords = meta.totalRecords;

      // ✅ Calculate "Showing X to Y of Z entries"
      this.showingFrom = this.pagination.totalRecords === 0 ? 0 : (this.pagination.currentPage - 1) * this.pagination.pageSize + 1;
      this.showingTo = Math.min(this.pagination.currentPage * this.pagination.pageSize, this.pagination.totalRecords);
    }
  }

  // 🚀 Fetch receipts based on filters
  async getFilteredReceipts(): Promise<void> {
    console.log('🔍 Applying Filters...');
    await this.fetchReceipts(1);
  }

  // 🚀 Pagination Navigation
  async goToPage(page: number): Promise<void> {
    if (page >= 1 && page <= this.pagination.lastPage) {
      await this.fetchReceipts(page);
    }
  }

  // 🚀 Toggle Filter Visibility
  toggleFilter(): void {
    this.isFilterVisible = !this.isFilterVisible;
  }

  // 🚀 Navigate to Receipt Entry (Create/Edit)
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
      await this.appService.deleteReceipt(receiptId);
      await this.fetchReceipts(this.pagination.currentPage);
    }
  }

  navigateToPrint(): void {
    const filters = this.filterForm.value;
    const queryParams = {
      date_from: filters.date_from || '',
      date_to: filters.date_to || '',
      payment_type: filters.payment_type || '',
      page: this.pagination.currentPage
    };
    this.router.navigate(['/book-keeping/receipt-book/receipt-report'], { queryParams });
  }
}
