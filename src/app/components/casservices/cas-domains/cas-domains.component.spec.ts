import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasDomainsComponent } from './cas-domains.component';

describe('CasDomainsComponent', () => {
  let component: CasDomainsComponent;
  let fixture: ComponentFixture<CasDomainsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasDomainsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasDomainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
