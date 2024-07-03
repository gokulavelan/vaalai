import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentBookComponent } from './payment-book.component';

describe('PaymentBookComponent', () => {
  let component: PaymentBookComponent;
  let fixture: ComponentFixture<PaymentBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
