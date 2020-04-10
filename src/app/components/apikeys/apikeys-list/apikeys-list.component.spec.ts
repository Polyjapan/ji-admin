import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApikeysListComponent } from './apikeys-list.component';

describe('ApikeysListComponent', () => {
  let component: ApikeysListComponent;
  let fixture: ComponentFixture<ApikeysListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApikeysListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApikeysListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
