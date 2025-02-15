import { Company } from '@/store/company/state';
import { AppState } from '@/store/state';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppService } from '@services/app.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-payment-report',
  templateUrl: './payment-report.component.html',
  styleUrl: './payment-report.component.scss'
})
export class PaymentReportComponent {
  payments: any[] = [];
  dateRange = '';
  totalAmount = 0;
  selectedCompany: Company =null; 

  constructor(private route: ActivatedRoute, private appService: AppService, private router: Router, private store: Store<AppState>) {}

  async ngOnInit(): Promise<void> {
    const date_from = this.route.snapshot.queryParamMap.get('date_from') || '';
    const date_to = this.route.snapshot.queryParamMap.get('date_to') || '';
    const payment_type = this.route.snapshot.queryParamMap.get('payment_type') || '';
    const page = this.route.snapshot.queryParamMap.get('page') || 1;
    this.selectedCompany = await firstValueFrom(this.store.select(state => state.company.selectedCompany));
    this.dateRange = `${date_from || 'Start'} to ${date_to || 'End'}`;

    const response = await this.appService.getPaymentsForPrint({date_from,date_to,payment_type})
    if (response != null) {
      this.payments = response
      this.totalAmount = this.payments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0);
      //setTimeout(() => this.printContainer(), 500);  // Trigger print after data loads
    } else {
      console.error('Failed to load payments for printing');
      this.router.navigate(['/book-keeping/payment-book']);  // Redirect if error
    }
  }
  printContainer(): void {
    const printContents = document.querySelector('.print-container')?.innerHTML;
  
    if (printContents) {
      const printWindow = window.open('', '_blank');
      printWindow!.document.open();
      printWindow!.document.write(`
        <html>
          <head>
            <title>Print Ledger Report</title>
            <style>
              @media print {
                body { 
                  font-family: monospace;
                  font-size: 12px;
                }
                pre {
                  white-space: pre-wrap;
                }
              }
            </style>
          </head>
          <body onload="window.print(); window.close();">
            ${printContents}
          </body>
        </html>
      `);
      printWindow!.document.close();
    } else {
      console.error('No print content found!');
    }
  }
  
  
}
