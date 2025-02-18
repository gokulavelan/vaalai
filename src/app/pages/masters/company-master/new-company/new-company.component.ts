import { CreateCompany, SelectCompany } from '@/store/company/actions';
import { AppState } from '@/store/state';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppService } from '@services/app.service';
import Stepper from 'bs-stepper';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrl: './new-company.component.scss'
})
export class NewCompanyComponent {
  private stepper: Stepper;
  companyForm: FormGroup;
  isEditMode = false;
  header = 'New Company';
  companyId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    });

    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      surname: [''],
      address: ['', Validators.required],
      city: ['', Validators.required],
      pincode: [''],
      phone: [''],
      mobile: ['', Validators.required],
      email: ['', Validators.email],
      pan_no: [''],
      tin_no: [''],
      cst_no: [''],
      area: [''],
      ho: ['']
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.companyId = parseInt(id, 10);
        this.header = 'Edit Company';
        this.loadCompanyData(this.companyId);
      }
    });
  }

  next(event: Event) {
    event.preventDefault();
    this.stepper.next();
  }

  async loadCompanyData(companyId: number): Promise<void> {
    try {
      await this.appService.getCompanyById(companyId);
      const selectedCompany = await firstValueFrom(this.store.select(state => state.company.createCompany));

      if (selectedCompany) {
        this.companyForm.patchValue(selectedCompany);
      }
    } catch (error) {
      console.error('Error loading company:', error);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.companyForm.valid) {
      const companyToSave = this.isEditMode && this.companyId
        ? { id: this.companyId, ...this.companyForm.value }
        : this.companyForm.value;
      console.log(companyToSave);
      
      this.store.dispatch(new CreateCompany(companyToSave));

      if (this.isEditMode && this.companyId) {
        await this.appService.updateCompany(this.companyId);
      } else {
        await this.appService.setCompany();
      }
    }
  }
}
