import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeA001Component } from './te-a001.component';

describe('TeA001Component', () => {
  let component: TeA001Component;
  let fixture: ComponentFixture<TeA001Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [TeA001Component]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeA001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
