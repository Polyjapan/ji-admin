import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasProxiesComponent } from './cas-proxies.component';

describe('CasProxiesComponent', () => {
  let component: CasProxiesComponent;
  let fixture: ComponentFixture<CasProxiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasProxiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasProxiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
