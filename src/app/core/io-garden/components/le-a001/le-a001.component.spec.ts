import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeA001Component } from './le-a001.component';

describe('LeA001Component', () => {
  let component: LeA001Component;
  let fixture: ComponentFixture<LeA001Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [LeA001Component]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeA001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
