import { LoadDayBook } from '@/store/daybook/actions';
import { AppState } from '@/store/state';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppService } from '@services/app.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-daybook-report',
  templateUrl: './daybook-report.component.html',
  styleUrls: ['./daybook-report.component.scss'],
  animations: [
    trigger('filterAnimation', [
      state('open', style({ height: '*', opacity: 1, overflow: 'hidden' })),
      state('closed', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
      transition('open <=> closed', animate('300ms ease-in-out'))
    ])
  ]
})
export class DaybookReportComponent implements OnInit {
  filterForm: FormGroup;
  dayBookEntries: any = {};
  selectedCompany: any;
  isFilterVisible = false;
  financialYears = [
    { label: 'F24-F25', from: '2024-04-01', to: '2025-03-31' },
    { label: 'F23-F24', from: '2023-04-01', to: '2024-03-31' }
  ];

  constructor(private appService: AppService, private store: Store<AppState>, private fb: FormBuilder) {
    this.filterForm = this.fb.group({   // 🛠️ Ensure form is initialized first!
      from_date: [''],
      to_date: [''],
      financial_year: ['']
    });
  }

  async ngOnInit(): Promise<void> {
    this.selectedCompany = await firstValueFrom(this.store.select(state => state.company.selectedCompany));

    this.filterForm = this.fb.group({
      from_date: [this.financialYears[0].from],
      to_date: [this.financialYears[0].to],
      financial_year: [this.financialYears[0].label]
    });

    this.filterForm.get('financial_year')?.valueChanges.subscribe(selectedYear => {
      const year = this.financialYears.find(y => y.label === selectedYear);
      if (year) {
        this.filterForm.patchValue({
          from_date: year.from,
          to_date: year.to
        });
      }
    });

    this.loadDayBookData();
  }

  async loadDayBookData(): Promise<void> {
    await this.appService.getDayBookForPrint(this.filterForm.value.from_date, this.filterForm.value.to_date);
    this.store.select(state => state.daybook.entries).subscribe(entries => {
      if (entries) {
        this.dayBookEntries = entries;
      }
    });
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
  

  toggleFilter(): void {
    this.isFilterVisible = !this.isFilterVisible;
  }
}
