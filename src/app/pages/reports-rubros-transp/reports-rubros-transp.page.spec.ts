import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsRubrosTranspPage } from './reports-rubros-transp.page';

describe('ReportsRubrosTranspPage', () => {
  let component: ReportsRubrosTranspPage;
  let fixture: ComponentFixture<ReportsRubrosTranspPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsRubrosTranspPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsRubrosTranspPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
