import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUsersPage } from './create-users.page';

describe('CreateUsersPage', () => {
  let component: CreateUsersPage;
  let fixture: ComponentFixture<CreateUsersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUsersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
