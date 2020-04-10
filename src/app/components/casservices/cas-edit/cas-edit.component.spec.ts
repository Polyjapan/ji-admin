import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasEditComponent } from './cas-edit.component';

describe('CasEditComponent', () => {
  let component: CasEditComponent;
  let fixture: ComponentFixture<CasEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
