import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppService } from '@services/app.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
  dtOptions: DataTables.Settings = {};
  payments$ = this.store.select(state => state.payment.transactions);
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

    // Fetch initial payments
    await this.getFilteredPayments();
  }

  // 🚀 Toggle Filter Section
  toggleFilter(): void {
    this.isFilterVisible = !this.isFilterVisible;
  }

  // 🚀 Fetch payments based on filter
  async getFilteredPayments(): Promise<void> {
    const filters = this.filterForm.value;
    await this.appService.getPaymentsForCompany(filters);
  }

  // 🚀 Navigate to Payment Entry (Create New)
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  // 🚀 Edit Payment
  async editPayment(payment: any): Promise<void> {
    this.appService.getPaymentById(payment.id);
    this.router.navigate([`/book-keeping/payment-book/payment-entry/${payment.id}`]);
  }

  // 🚀 Delete Payment
  async deletePayment(paymentId: number): Promise<void> {
    if (confirm('Are you sure you want to delete this payment?')) {
      this.appService.deletePayment(paymentId);
      await this.getFilteredPayments(); // Refresh payments after deletion  
    }
  }
}
