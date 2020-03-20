import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehousesPage } from './warehouses.page';

describe('WarehousesPage', () => {
  let component: WarehousesPage;
  let fixture: ComponentFixture<WarehousesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehousesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehousesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
