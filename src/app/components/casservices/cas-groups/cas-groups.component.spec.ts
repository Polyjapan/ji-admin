import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasGroupsComponent } from './cas-groups.component';

describe('CasGroupsComponent', () => {
  let component: CasGroupsComponent;
  let fixture: ComponentFixture<CasGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
