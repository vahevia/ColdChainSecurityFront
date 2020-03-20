import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTrucksPage } from './create-trucks.page';

describe('CreateTrucksPage', () => {
  let component: CreateTrucksPage;
  let fixture: ComponentFixture<CreateTrucksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTrucksPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTrucksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
