import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStaticUnitsPage } from './create-static-units.page';

describe('CreateStaticUnitsPage', () => {
  let component: CreateStaticUnitsPage;
  let fixture: ComponentFixture<CreateStaticUnitsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStaticUnitsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStaticUnitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
