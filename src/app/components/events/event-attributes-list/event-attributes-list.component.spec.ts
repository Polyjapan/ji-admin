import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAttributesListComponent } from './event-attributes-list.component';

describe('EventAttributesListComponent', () => {
  let component: EventAttributesListComponent;
  let fixture: ComponentFixture<EventAttributesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventAttributesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventAttributesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
