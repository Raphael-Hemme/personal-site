import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IoGardenExperimentPreviewComponent } from './io-garden-experiment-preview.component';

describe('IoGardenExperimentPreviewComponent', () => {
  let component: IoGardenExperimentPreviewComponent;
  let fixture: ComponentFixture<IoGardenExperimentPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IoGardenExperimentPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IoGardenExperimentPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
