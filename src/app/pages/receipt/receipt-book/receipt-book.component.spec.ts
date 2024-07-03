import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptBookComponent } from './receipt-book.component';

describe('ReceiptBookComponent', () => {
  let component: ReceiptBookComponent;
  let fixture: ComponentFixture<ReceiptBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceiptBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiptBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
