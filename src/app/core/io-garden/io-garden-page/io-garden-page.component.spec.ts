import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IoGardenPageComponent } from './io-garden-page.component';

describe('IoGardenPageComponent', () => {
  let component: IoGardenPageComponent;
  let fixture: ComponentFixture<IoGardenPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [IoGardenPageComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IoGardenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
