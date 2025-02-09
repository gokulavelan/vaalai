import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '@services/app.service';
import { firstValueFrom, Observable } from 'rxjs';
import { SelectSubGroup } from '@/store/groups/actions';
import { AppState } from '@/store/state';

@Component({
  selector: 'app-new-subgroup',
  templateUrl: './new-subgroup.component.html',
  styleUrls: ['./new-subgroup.component.scss']
})
export class NewSubgroupComponent implements OnInit {
  subGroupForm: FormGroup;
  groups$: Observable<any>;
  subGroupId: number | null = null;
  isEditMode = false;
  header = 'Create Sub Group'
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.groups$ = this.store.select(state => state.group.groups);
  }

  async ngOnInit(): Promise<void> {
    this.appService.getGroups();
    this.subGroupForm = this.fb.group({
      name: ['', Validators.required],
      group_id: ['', Validators.required],
      description: ['']
    });

    // Check if it's edit mode (URL contains ID)
    this.route.paramMap.subscribe(async params => {
      const id = params.get('id');
      if (id) {
        this.subGroupId = Number(id);
        this.isEditMode = true;
        this.header = 'Edit Sub Group'
        await this.loadSubGroupData(this.subGroupId);
      }
    });
  }

  async loadSubGroupData(subGroupId: number): Promise<void> {
    try {
      await this.appService.getSubGroupById(subGroupId);

      const selectedSubGroup = await firstValueFrom(
        this.store.select(state => state.subGroup.selectedSubGroup)
      );

      if (selectedSubGroup) {
        this.subGroupForm.patchValue({
          name: selectedSubGroup.name,
          group_id: selectedSubGroup.group_id,
          description: selectedSubGroup.description
        });
      }
    } catch (error) {
      console.error('Error loading sub-group:', error);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.subGroupForm.valid) {
      // Preserve the ID if editing, otherwise use form data
      const subGroupToSave = this.isEditMode && this.subGroupId
          ? { id: this.subGroupId, ...this.subGroupForm.value } // ✅ Include ID for update
          : this.subGroupForm.value;

      // Dispatch updated group to the store
      this.store.dispatch(new SelectSubGroup(subGroupToSave));
      if (this.isEditMode && this.subGroupId) {
        await this.appService.updateSubGroup(this.subGroupId);
      } else {
        await this.appService.setSubGroup();
      }
    }
  }
}
