import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalGlitchSketchComponent } from './horizontal-glitch-sketch.component';

describe('HorizontalGlitchSketchComponent', () => {
  let component: HorizontalGlitchSketchComponent;
  let fixture: ComponentFixture<HorizontalGlitchSketchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalGlitchSketchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalGlitchSketchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
