import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand-master',
  templateUrl: './brand-master.component.html',
  styleUrl: './brand-master.component.scss'
})
export class BrandMasterComponent {
  brands = [
    { brandNo: 1, brandName: 'Brand 1' },
    { brandNo: 2, brandName: 'Brand 2' },
    // Add more brands as necessary
  ];
 
  brandForm: FormGroup;
  dtOptions: DataTables.Settings = {};

  constructor(private fb: FormBuilder, private router: Router) {
    this.brandForm = this.fb.group({
      brandName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true
    };
  }

  onSubmit(): void {
    if (this.brandForm.valid) {
      // Add new brand logic here
      console.log('Form Submitted', this.brandForm.value);
      this.brands.push({
        brandNo: this.brands.length + 1,
        brandName: this.brandForm.value.brandName
      });
      this.brandForm.reset();
    }
  }

  editBrand(brand): void {
    // Edit brand logic here
    console.log('Edit Brand', brand);
  }

  deleteBrand(brand): void {
    // Delete brand logic here
    console.log('Delete Brand', brand);
    this.brands = this.brands.filter(b => b !== brand);
  }
}
