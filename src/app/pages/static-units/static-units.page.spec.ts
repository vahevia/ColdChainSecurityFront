import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticUnitsPage } from './static-units.page';

describe('StaticUnitsPage', () => {
  let component: StaticUnitsPage;
  let fixture: ComponentFixture<StaticUnitsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticUnitsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticUnitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
