import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-groups',
  templateUrl: './sub-groups.component.html',
  styleUrl: './sub-groups.component.scss'
})
export class SubGroupsComponent {
  dtOptions: DataTables.Settings = {};
  accounts: any[] = []; // Replace any[] with your actual account interface/type
  subGroups: any[] = []; 

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };

    // Replace this with your actual data retrieval logic
    this.accounts = [
      { name: 'Capital A/C', type: 'Profit and Loss'},
      { name: 'Current A/C', type: 'Balance'},
      // Add more accounts as needed
    ];
    this.subGroups = [
      { sub: 'Capital A/C', group: 'Profit and Loss'},
      { sub: 'Current A/C', group: 'Balance'},
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
