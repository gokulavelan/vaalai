import { AppState } from '@/store/state';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppService } from '@services/app.service';

@Component({
  selector: 'app-account-master',
  templateUrl: './account-master.component.html',
  styleUrl: './account-master.component.scss'
})
export class AccountMasterComponent {
  accounts$ = this.store.select(state => state.account.accounts);
  dtOptions: DataTables.Settings = {};
  //accounts: any[] = []; // Replace any[] with your actual account interface/type

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.appService.getAccountsForCompany();
  }

  async editAccount(account: any) {
    this.appService.getAccountById(account.id);
    this.router.navigate([`/account-master/edit-account/${account.id}`]);
  }

  async deleteAccount(accountId: number) {
    if (confirm('Are you sure you want to delete this sub-group?')) {
      this.appService.deleteAccount(accountId);
      this.appService.getAccountsForCompany(); // Refresh sub-group list
    }
  }

  public navigateTo(str: string){
    this.router.navigate([str]);
  }
}
