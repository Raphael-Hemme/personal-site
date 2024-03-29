import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteNavBarComponent } from './site-nav-bar.component';

describe('SiteNavBarComponent', () => {
  let component: SiteNavBarComponent;
  let fixture: ComponentFixture<SiteNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteNavBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SiteNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
