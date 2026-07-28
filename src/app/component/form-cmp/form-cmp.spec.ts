import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCmp } from './form-cmp';

describe('FormCmp', () => {
  let component: FormCmp;
  let fixture: ComponentFixture<FormCmp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCmp],
    }).compileComponents();

    fixture = TestBed.createComponent(FormCmp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
