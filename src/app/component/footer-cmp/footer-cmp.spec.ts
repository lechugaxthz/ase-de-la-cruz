import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCmp } from './footer-cmp';

describe('FooterCmp', () => {
  let component: FooterCmp;
  let fixture: ComponentFixture<FooterCmp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterCmp],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterCmp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
