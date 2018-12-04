import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritypolicyComponent } from './securitypolicy.component';

describe('SecuritypolicyComponent', () => {
  let component: SecuritypolicyComponent;
  let fixture: ComponentFixture<SecuritypolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecuritypolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecuritypolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
