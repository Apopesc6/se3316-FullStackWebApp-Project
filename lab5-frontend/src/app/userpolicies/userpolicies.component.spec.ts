import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpoliciesComponent } from './userpolicies.component';

describe('UserpoliciesComponent', () => {
  let component: UserpoliciesComponent;
  let fixture: ComponentFixture<UserpoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserpoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
