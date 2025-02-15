import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerReportComponent } from './ledger-report.component';

describe('LedgerReportComponent', () => {
  let component: LedgerReportComponent;
  let fixture: ComponentFixture<LedgerReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LedgerReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LedgerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
