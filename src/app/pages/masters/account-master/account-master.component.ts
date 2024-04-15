import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-master',
  templateUrl: './account-master.component.html',
  styleUrl: './account-master.component.scss'
})
export class AccountMasterComponent {
 dtOptions: DataTables.Settings = {};
  accounts: any[] = []; // Replace any[] with your actual account interface/type

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };

    // Replace this with your actual data retrieval logic
    this.accounts = [
      { name: 'Account 1', city: 'City 1',subGroup: 'Current A/C' },
      { name: 'Account 2', city: 'City 2', subGroup: 'Income A/C' },
      // Add more accounts as needed
    ];
  }

  editAccount(account: any) {
    // Handle edit action
    console.log('Editing account:', account);
  }

  deleteAccount(account: any) {
    // Handle delete action
    console.log('Deleting account:', account);
  }

  public navigateTo(str: string){
    this.router.navigate([str]);
  }
}
