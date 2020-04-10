import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupScopesComponent } from './group-scopes.component';

describe('GroupScopesComponent', () => {
  let component: GroupScopesComponent;
  let fixture: ComponentFixture<GroupScopesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupScopesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupScopesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
