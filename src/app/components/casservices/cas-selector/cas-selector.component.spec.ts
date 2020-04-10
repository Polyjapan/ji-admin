import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasSelectorComponent } from './cas-selector.component';

describe('CasSelectorComponent', () => {
  let component: CasSelectorComponent;
  let fixture: ComponentFixture<CasSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
