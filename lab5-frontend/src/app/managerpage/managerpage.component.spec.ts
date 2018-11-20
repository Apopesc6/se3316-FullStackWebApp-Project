import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerpageComponent } from './managerpage.component';

describe('ManagerpageComponent', () => {
  let component: ManagerpageComponent;
  let fixture: ComponentFixture<ManagerpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
