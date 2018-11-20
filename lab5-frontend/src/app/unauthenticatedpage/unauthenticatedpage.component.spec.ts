import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthenticatedpageComponent } from './unauthenticatedpage.component';

describe('UnauthenticatedpageComponent', () => {
  let component: UnauthenticatedpageComponent;
  let fixture: ComponentFixture<UnauthenticatedpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnauthenticatedpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthenticatedpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
