import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IoGardenExperimentContainerComponent } from './io-garden-experiment-container.component';

describe('IoGardenExperimentContainerComponent', () => {
  let component: IoGardenExperimentContainerComponent;
  let fixture: ComponentFixture<IoGardenExperimentContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IoGardenExperimentContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IoGardenExperimentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
