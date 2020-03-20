import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWarehousesPage } from './create-warehouses.page';

describe('CreateWarehousesPage', () => {
  let component: CreateWarehousesPage;
  let fixture: ComponentFixture<CreateWarehousesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWarehousesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWarehousesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
