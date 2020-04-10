import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApikeysEditComponent } from './apikeys-edit.component';

describe('ApikeysEditComponent', () => {
  let component: ApikeysEditComponent;
  let fixture: ComponentFixture<ApikeysEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApikeysEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApikeysEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
