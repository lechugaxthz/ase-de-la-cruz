import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCmp } from './nav-cmp';

describe('NavCmp', () => {
  let component: NavCmp;
  let fixture: ComponentFixture<NavCmp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavCmp],
    }).compileComponents();

    fixture = TestBed.createComponent(NavCmp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
