import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-master',
  templateUrl: './category-master.component.html',
  styleUrl: './category-master.component.scss'
})
export class CategoryMasterComponent {
  categories = [
    { categoryNo: 1, categoryName: 'Category 1' },
    { categoryNo: 2, categoryName: 'Category 2' },
    // Add more categories as necessary
  ];

  categoryForm: FormGroup;
  dtOptions: DataTables.Settings = {};

  constructor(private fb: FormBuilder, private router: Router) {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required]
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
    if (this.categoryForm.valid) {
      // Add new category logic here
      console.log('Form Submitted', this.categoryForm.value);
      this.categories.push({
        categoryNo: this.categories.length + 1,
        categoryName: this.categoryForm.value.categoryName
      });
      this.categoryForm.reset();
    }
  }

  editCategory(category): void {
    // Edit category logic here
    console.log('Edit Category', category);
  }

  deleteCategory(category): void {
    // Delete category logic here
    console.log('Delete Category', category);
    this.categories = this.categories.filter(c => c !== category);
  }
}
