import { Component, Renderer2 } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppService } from '@services/app.service';
import { SelectCompany } from '@/store/company/actions';
@Component({
  selector: 'app-company-select',
  templateUrl: './company-select.component.html',
  styleUrl: './company-select.component.scss'
})
export class CompanySelectComponent {
  companies$ = this.store.select(state => state.company.companies); 
constructor(
  private router: Router,
  private renderer: Renderer2,
  private store: Store<any>,
  private appService: AppService){}
  
  public companySelectForm: UntypedFormGroup;

  
  
  ngOnInit(){
    this.renderer.addClass(
        document.querySelector('app-root'),
        'login-page'
    );
    this.appService.getCompanies();
    this.companySelectForm = new UntypedFormGroup({
      company: new UntypedFormControl('default', Validators.required),
      financialYear: new UntypedFormControl('default', Validators.required)
    });
    console.log(this.companies$);
    
  }
  onSubmit() {
    console.log('works');
    if (this.companySelectForm.valid) {
      const selectedCompanyId = this.companySelectForm.value.company;
      this.store.dispatch(new SelectCompany(selectedCompanyId));
    }
    this.router.navigate(['/']);
    }

  ngOnDestroy() {
    this.renderer.removeClass(
        document.querySelector('app-root'),
        'login-page'
    );
  }
}
