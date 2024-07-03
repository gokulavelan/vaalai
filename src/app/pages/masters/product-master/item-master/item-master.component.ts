import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.component.html',
  styleUrl: './item-master.component.scss'
})
export class ItemMasterComponent {
  dtOptions: DataTables.Settings = {};
  items = [
    { itemNo: 1, itemName: 'Item 1', category: 'Category 1', brand: 'Brand 1', supplier: 'Supplier 1', costRate: 100, retailRate: 120, mrp: 130 },
    { itemNo: 2, itemName: 'Item 2', category: 'Category 2', brand: 'Brand 2', supplier: 'Supplier 2', costRate: 200, retailRate: 220, mrp: 230 },
    // Add more items as necessary
  ];

 // dtOptions: DataTablesOptions = {};

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true
    };
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
