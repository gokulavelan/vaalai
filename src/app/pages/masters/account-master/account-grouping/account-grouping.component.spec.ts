import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountGroupingComponent } from './account-grouping.component';

describe('AccountGroupingComponent', () => {
  let component: AccountGroupingComponent;
  let fixture: ComponentFixture<AccountGroupingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountGroupingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountGroupingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
