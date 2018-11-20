import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatedpageComponent } from './authenticatedpage.component';

describe('AuthenticatedpageComponent', () => {
  let component: AuthenticatedpageComponent;
  let fixture: ComponentFixture<AuthenticatedpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticatedpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatedpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
