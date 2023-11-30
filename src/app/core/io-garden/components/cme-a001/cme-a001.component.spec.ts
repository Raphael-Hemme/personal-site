import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmeA001Component } from './cme-a001.component';

describe('CmeA001Component', () => {
  let component: CmeA001Component;
  let fixture: ComponentFixture<CmeA001Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CmeA001Component]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmeA001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
