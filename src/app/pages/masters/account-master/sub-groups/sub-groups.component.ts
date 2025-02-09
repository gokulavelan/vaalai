import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppService } from '@services/app.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-sub-groups',
  templateUrl: './sub-groups.component.html',
  styleUrl: './sub-groups.component.scss'
})
export class SubGroupsComponent {
  dtOptions: DataTables.Settings = {};
  group$ = this.store.select(state => state.group.groups);
  subgroups$ = this.store.select(state => state.subGroup.subGroups);
  subGroups: any[] = []; 

  constructor(
    private router: Router,
    private store: Store<any>,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };

    this.appService.getGroups();
    this.appService.getSubGroups();
  }

  async editGroup(group: any) {
    console.log('Navigating to:', `/account-master/sub-groups/edit-group/${group.id}`);
    this.appService.getGroupById(group.id);
    this.router.navigate([`/account-master/sub-groups/edit-group/${group.id}`]);
  }

  async deleteGroup(groupId: number) {
    if (confirm('Are you sure you want to delete this group?')) {
      this.appService.deleteGroup(groupId);
      this.appService.getGroups(); // Refresh group list
    }
  }

  async editSubGroup(subGroup: any) {
    this.appService.getSubGroupById(subGroup.id);
    this.router.navigate([`/account-master/sub-groups/edit-sub-group/${subGroup.id}`]);
  }

  async deleteSubGroup(subGroupId: number) {
    if (confirm('Are you sure you want to delete this sub-group?')) {
      this.appService.deleteSubGroup(subGroupId);
      this.appService.getSubGroups(); // Refresh sub-group list
    }
  }


  public navigateTo(str: string){
    this.router.navigate([str]);
  }
}
