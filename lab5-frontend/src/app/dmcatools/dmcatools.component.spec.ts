import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmcatoolsComponent } from './dmcatools.component';

describe('DmcatoolsComponent', () => {
  let component: DmcatoolsComponent;
  let fixture: ComponentFixture<DmcatoolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmcatoolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmcatoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
