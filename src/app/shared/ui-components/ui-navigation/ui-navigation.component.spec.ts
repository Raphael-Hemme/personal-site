import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiNavigationComponent } from './ui-navigation.component';

describe('NavigationComponent', () => {
  let component: UiNavigationComponent;
  let fixture: ComponentFixture<UiNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
