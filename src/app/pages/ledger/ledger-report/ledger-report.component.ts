import { LoadLedger } from '@/store/ledger/actions';
import { AppState } from '@/store/state';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppService } from '@services/app.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-ledger-report',
  templateUrl: './ledger-report.component.html',
  styleUrl: './ledger-report.component.scss',
    animations: [
      trigger('filterAnimation', [
        state('open', style({ height: '*', opacity: 1, overflow: 'hidden' })),
        state('closed', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
        transition('open <=> closed', animate('300ms ease-in-out'))
      ])
    ]
})
export class LedgerReportComponent {
  filterForm: FormGroup;
  ledgerEntries: any = {};
  accounts$: any;
  monthlyLedger: any ={ transactions: [], closing_balance: 0, debit_total: 0, credit_total: 0 };
  isFilterVisible = false;
  selectedCompany: any;
  totalCredit: string|number;
  closingBalance: string|number;
  totalDebit: string|number;
  constructor(private store: Store<AppState>, private fb: FormBuilder,
              private appService: AppService
  ) {
    this.filterForm = this.fb.group({
      account_id: [''],
      date_from: [''],
      date_to: [''],
      monthly_closing: [false]
    });
  }

  async ngOnInit(): Promise<void> {
    this.accounts$ = this.store.select(state => state.account.accounts);

    this.selectedCompany = await firstValueFrom(this.store.select(state => state.company.selectedCompany));
    this.filterForm = this.fb.group({
      account_id: ['1'],
      date_from: ['2025-01-13'],
      date_to: ['2025-02-14'],
      monthly_closing: [false]
    });

    this.loadLedgerData();
  }

  async loadLedgerData(): Promise<void> {
    await this.appService.getLedgerBookForPrint(this.filterForm.value.account_id,this.filterForm.value.date_from,this.filterForm.value.date_to,this.filterForm.value.monthly_closing);
    this.store.select(state => state.ledger.entries).subscribe(entries => {
      this.ledgerEntries = entries;
    });
    this.store.select(state => state.monthlyLedger).subscribe(data => {
      if (data) {
        this.monthlyLedger = data;
      } else {
        this.monthlyLedger = { transactions: [], closing_balance: 0, debit_total: 0, credit_total: 0 };
      }
    });
    
  }
  
  toggleFilter(): void {
    this.isFilterVisible = !this.isFilterVisible;
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
