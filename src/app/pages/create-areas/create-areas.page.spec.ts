import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAreasPage } from './create-areas.page';

describe('CreateAreasPage', () => {
  let component: CreateAreasPage;
  let fixture: ComponentFixture<CreateAreasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAreasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAreasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
