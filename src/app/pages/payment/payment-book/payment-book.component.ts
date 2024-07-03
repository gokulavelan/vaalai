import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-book',
  templateUrl: './payment-book.component.html',
  styleUrl: './payment-book.component.scss'
})
export class PaymentBookComponent {
  payments = [
    { paymentNo: 'P001', accountName: 'Account 1', paymentType: 'Cash', amount: 500 },
    { paymentNo: 'P002', accountName: 'Account 2', paymentType: 'Bank', amount: 1000 },
    // Add more payment records as needed
  ];
  dtOptions: DataTables.Settings = {};

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  editPayment(payment: any): void {
    // Implement edit functionality here
  }

  deletePayment(payment: any): void {
    // Implement delete functionality here
  }
}
