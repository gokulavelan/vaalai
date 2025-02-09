import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '@services/app.service';
import { firstValueFrom } from 'rxjs';
import { SelectGroup } from '@/store/groups/actions';
import { AppState } from '@/store/state';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit {
  groupForm: FormGroup;
  groupId: number | null = null;
  isEditMode = false;
  header = 'Create Group'
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.groupForm = this.fb.group({
      name: ['', Validators.required],
      description: ['Profit and Loss', Validators.required]
    });

    // Check if it's edit mode (URL contains ID)
    this.route.paramMap.subscribe(async params => {
      const id = params.get('id');
      if (id) {
        this.groupId = Number(id);
        this.isEditMode = true;
        this.header = 'Edit Group'
        await this.loadGroupData(this.groupId);
      }
    });
  }

  async loadGroupData(groupId: number): Promise<void> {
    try {
      await this.appService.getGroupById(groupId);

      const selectedGroup = await firstValueFrom(
        this.store.select(state => state.group.selectedGroup)
      );
      console.log(selectedGroup);
      
      if (selectedGroup) {
        this.groupForm.patchValue({
          name: selectedGroup.name,
          description: selectedGroup.description
        });
      }
    } catch (error) {
      console.error('Error loading group:', error);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.groupForm.valid) {

        // Preserve the ID if editing, otherwise use form data
        const groupToSave = this.isEditMode && this.groupId
            ? { id: this.groupId, ...this.groupForm.value } // ✅ Include ID for update
            : this.groupForm.value;

        // Dispatch updated group to the store
        this.store.dispatch(new SelectGroup(groupToSave));

        // Determine whether to create or update
        if (this.isEditMode && this.groupId) {
            await this.appService.updateGroup(this.groupId);
        } else {
            await this.appService.setGroup();
        }
    }
}

}
