import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSubgroupComponent } from './new-subgroup.component';

describe('NewSubgroupComponent', () => {
  let component: NewSubgroupComponent;
  let fixture: ComponentFixture<NewSubgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSubgroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewSubgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
