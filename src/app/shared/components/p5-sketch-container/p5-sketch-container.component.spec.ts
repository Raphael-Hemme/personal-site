import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P5SketchContainerComponent } from './p5-sketch-container.component';

describe('P5SketchContainerComponent', () => {
  let component: P5SketchContainerComponent;
  let fixture: ComponentFixture<P5SketchContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P5SketchContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(P5SketchContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
