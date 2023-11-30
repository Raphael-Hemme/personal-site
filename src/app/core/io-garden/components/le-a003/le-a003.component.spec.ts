import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeA003Component } from './le-a003.component';

describe('LeA003Component', () => {
  let component: LeA003Component;
  let fixture: ComponentFixture<LeA003Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [LeA003Component]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeA003Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
