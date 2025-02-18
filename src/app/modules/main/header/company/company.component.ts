import { SelectCompany } from '@/store/company/actions';
import { Company } from '@/store/company/state';
import { AppState } from '@/store/state';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss'
})
export class CompanyComponent {
  companies$ = this.store.select(state => state.company.companies);
  selectedCompany$ = this.store.select(state => state.company.selectedCompany);

  constructor(private store: Store<AppState>) {}

  async selectCompany(company: any): Promise<void> {
    this.store.dispatch(new SelectCompany(company));
    location.reload();
  }
}
