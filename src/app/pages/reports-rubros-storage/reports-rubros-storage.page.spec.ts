import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsRubrosStoragePage } from './reports-rubros-storage.page';

describe('ReportsRubrosStoragePage', () => {
  let component: ReportsRubrosStoragePage;
  let fixture: ComponentFixture<ReportsRubrosStoragePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsRubrosStoragePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsRubrosStoragePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
