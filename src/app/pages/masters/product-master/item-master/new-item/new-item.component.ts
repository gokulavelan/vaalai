import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.scss'
})
export class NewItemComponent {
  itemMasterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.itemMasterForm = this.fb.group({
      itemName: ['', Validators.required],
      unit: ['', Validators.required],
      dimension: ['', Validators.required],
      weight: ['', Validators.required],
      description: ['', Validators.required],
      purchaseRate: ['', Validators.required],
      costRate: ['', Validators.required],
      wsRate: ['', Validators.required],
      retailRate: ['', Validators.required],
      mop: ['', Validators.required],
      mrp: ['', Validators.required],
      purchaseDiscountPercent: ['', Validators.required],
      purchaseDiscountPrice: ['', Validators.required],
      salesDiscountPercent: ['', Validators.required],
      salesDiscountAmount: ['', Validators.required],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      supplier: ['', Validators.required],
      specialDiscountFrom: ['', Validators.required],
      specialDiscountTo: ['', Validators.required],
      specialDiscountPercent: ['', Validators.required],
      specialDiscountAmount: ['', Validators.required],
      incentivePercent: ['', Validators.required],
      incentiveAmount: ['', Validators.required],
      taxName: ['', Validators.required],
      taxPercent: ['', Validators.required]
    });
  }
  
  private stepper: Stepper;
  
  next(event: Event) {
    event.preventDefault();
    this.stepper.next();
  }

  onSubmit(): void {
    if (this.itemMasterForm.valid) {
      // Handle form submission
      console.log(this.itemMasterForm.value);
    } else {
      // Handle form errors
      console.log('Form is invalid');
    }
  }

  ngOnInit() {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
  }
}
