import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasServicesListComponent } from './cas-services-list.component';

describe('CasServicesListComponent', () => {
  let component: CasServicesListComponent;
  let fixture: ComponentFixture<CasServicesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasServicesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasServicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
