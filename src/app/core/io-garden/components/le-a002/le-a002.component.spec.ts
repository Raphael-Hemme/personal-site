import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeA002Component } from './le-a002.component';

describe('LeA001Component', () => {
  let component: LeA002Component;
  let fixture: ComponentFixture<LeA002Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [LeA002Component]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeA002Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
