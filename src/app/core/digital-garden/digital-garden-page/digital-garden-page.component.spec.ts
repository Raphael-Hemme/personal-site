import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalGardenPageComponent } from './digital-garden-page.component';

describe('ProjectsPageComponent', () => {
  let component: DigitalGardenPageComponent;
  let fixture: ComponentFixture<DigitalGardenPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalGardenPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalGardenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
