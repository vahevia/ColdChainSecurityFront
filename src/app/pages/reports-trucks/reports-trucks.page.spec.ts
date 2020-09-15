import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsTrucksPage } from './reports-trucks.page';

describe('ReportsTrucksPage', () => {
  let component: ReportsTrucksPage;
  let fixture: ComponentFixture<ReportsTrucksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsTrucksPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsTrucksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
