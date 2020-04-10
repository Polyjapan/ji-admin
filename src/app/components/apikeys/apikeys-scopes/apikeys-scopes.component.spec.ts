import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApikeysScopesComponent } from './apikeys-scopes.component';

describe('ApikeysScopesComponent', () => {
  let component: ApikeysScopesComponent;
  let fixture: ComponentFixture<ApikeysScopesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApikeysScopesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApikeysScopesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
