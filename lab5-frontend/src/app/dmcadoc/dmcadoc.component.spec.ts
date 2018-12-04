import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DMCAdocComponent } from './dmcadoc.component';

describe('DMCAdocComponent', () => {
  let component: DMCAdocComponent;
  let fixture: ComponentFixture<DMCAdocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DMCAdocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DMCAdocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
