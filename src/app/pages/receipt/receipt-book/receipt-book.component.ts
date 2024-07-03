import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receipt-book',
  templateUrl: './receipt-book.component.html',
  styleUrl: './receipt-book.component.scss'
})
export class ReceiptBookComponent {
  receipts = [
    { receiptNo: '12345', accountName: 'Account 1', paymentType: 'Cash', amount: 1000 },
    { receiptNo: '12346', accountName: 'Account 2', paymentType: 'Bank', amount: 2000 },
    // Add more receipts as needed
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

  editReceipt(receipt: any): void {
    // Implement edit functionality here
  }

  deleteReceipt(receipt: any): void {
    // Implement delete functionality here
  }
}
