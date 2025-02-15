import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppService } from '@services/app.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PaymentReportComponent } from '../payment-report/payment-report.component';

@Component({
  selector: 'app-payment-book',
  templateUrl: './payment-book.component.html',
  styleUrls: ['./payment-book.component.scss'],
  animations: [
    trigger('filterAnimation', [
      state('open', style({ height: '*', opacity: 1, overflow: 'hidden' })),
      state('closed', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
      transition('open <=> closed', animate('300ms ease-in-out'))
    ])
  ]
})
export class PaymentBookComponent implements OnInit {
  @ViewChild(PaymentReportComponent) paymentPrintComponent!: PaymentReportComponent;
  
  dtOptions: DataTables.Settings = {};
  payments$ = this.store.select(state => state.payment.transactions);
  filterForm: FormGroup;
  isFilterVisible = false;
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

    this.filterForm = this.fb.group({
      date_from: [''],
      date_to: [''],
      payment_type: ['']
    });

    await this.fetchPayments(1);
  }

  // 🚀 Fetch payments with manual pagination
  async fetchPayments(page: number): Promise<void> {
    console.log('🔄 Fetching payments for page:', page);

    const filters = this.filterForm.value;
    await this.appService.getPaymentsForCompany(filters, page);

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

  // 🚀 Fetch payments based on filter
  async getFilteredPayments(): Promise<void> {
    console.log('🔍 Applying Filters...');
    await this.fetchPayments(1);
  }

  // 🚀 Navigate between pages
  async goToPage(page: number): Promise<void> {
    if (page >= 1 && page <= this.pagination.lastPage) {
      await this.fetchPayments(page);
    }
  }

  toggleFilter(): void {
    this.isFilterVisible = !this.isFilterVisible;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  async editPayment(payment: any): Promise<void> {
    this.appService.getPaymentById(payment.id);
    this.router.navigate([`/book-keeping/payment-book/payment-entry/${payment.id}`]);
  }

  async deletePayment(paymentId: number): Promise<void> {
    if (confirm('Are you sure you want to delete this payment?')) {
      await this.appService.deletePayment(paymentId);
      await this.fetchPayments(this.pagination.currentPage);
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
    this.router.navigate(['/book-keeping/payment-book/payment-report'], { queryParams });
  }
  
  
}
