import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaeA001Component } from './mae-a001.component';

describe('MaeA001Component', () => {
  let component: MaeA001Component;
  let fixture: ComponentFixture<MaeA001Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [MaeA001Component]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaeA001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
