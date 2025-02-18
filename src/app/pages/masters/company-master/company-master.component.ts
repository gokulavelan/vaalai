import { AppState } from '@/store/state';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppService } from '@services/app.service';

@Component({
  selector: 'app-company-master',
  templateUrl: './company-master.component.html',
  styleUrl: './company-master.component.scss'
})
export class CompanyMasterComponent {
  dtOptions: DataTables.Settings = {};
  companies$ = this.store.select(state => state.company.companies);

  constructor(
    private router: Router,
    private store: Store<any>,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.dtOptions = { pagingType: 'full_numbers' };
    this.appService.getCompanies();  // Fetch companies from service
  }

  async editCompany(company: any) {
    this.appService.getCompanyById(company.id);
    this.router.navigate([`/company-master/edit-company/${company.id}`]);
  }

  async deleteCompany(companyId: number) {
    if (confirm('Are you sure you want to delete this company?')) {
      this.appService.deleteCompany(companyId);
      this.appService.getCompanies();  // Refresh the list
    }
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
