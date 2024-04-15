import { Component, Renderer2 } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-select',
  templateUrl: './company-select.component.html',
  styleUrl: './company-select.component.scss'
})
export class CompanySelectComponent {
constructor(
  private router: Router,
  private renderer: Renderer2,){}
  
  public companySelectForm: UntypedFormGroup;

  
  
ngOnInit(){
  this.renderer.addClass(
      document.querySelector('app-root'),
      'login-page'
  );
  this.companySelectForm = new UntypedFormGroup({
    company: new UntypedFormControl('default', Validators.required),
    financialYear: new UntypedFormControl('default', Validators.required)
  });
}
onSubmit() {
  console.log('works');
  
  this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.renderer.removeClass(
        document.querySelector('app-root'),
        'login-page'
    );
}
}
