import { Company } from '@/store/company/state';
import { Receipt } from '@/store/receipt/state';
import { AppState } from '@/store/state';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppService } from '@services/app.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-receipt-report',
  templateUrl: './receipt-report.component.html',
  styleUrl: './receipt-report.component.scss'
})
export class ReceiptReportComponent {
  receipts: Receipt[] = [];
  dateRange = '';
  totalAmount = 0;
  selectedCompany: Company = null;

  constructor(private route: ActivatedRoute, private appService: AppService, private router: Router, private store: Store<AppState>) {}

  async ngOnInit(): Promise<void> {
    const date_from = this.route.snapshot.queryParamMap.get('date_from') || '';
    const date_to = this.route.snapshot.queryParamMap.get('date_to') || '';
    const receipt_type = this.route.snapshot.queryParamMap.get('payment_type') || '';
    this.selectedCompany = await firstValueFrom(this.store.select(state => state.company.selectedCompany));
    this.dateRange = `${date_from || 'Start'} to ${date_to || 'End'}`;

    const response = await this.appService.getReceiptsForPrint({ date_from, date_to, receipt_type });
    if (response != null) {
      this.receipts = response;
      this.totalAmount = this.receipts.reduce((sum, receipt) => sum + (typeof receipt.amount === 'number' ? receipt.amount : parseFloat(receipt.amount) || 0), 0);
    } else {
      console.error('Failed to load receipts for printing');
      this.router.navigate(['/book-keeping/receipt-book']);
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
