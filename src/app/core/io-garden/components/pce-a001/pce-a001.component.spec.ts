import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PceA001Component } from './pce-a001.component';

describe('PceA001Component', () => {
  let component: PceA001Component;
  let fixture: ComponentFixture<PceA001Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PceA001Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PceA001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
