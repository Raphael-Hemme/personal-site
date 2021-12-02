import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePhotoSketchComponent } from './profile-photo-sketch.component';

describe('P5SketchContainerComponent', () => {
  let component: ProfilePhotoSketchComponent;
  let fixture: ComponentFixture<ProfilePhotoSketchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePhotoSketchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePhotoSketchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
