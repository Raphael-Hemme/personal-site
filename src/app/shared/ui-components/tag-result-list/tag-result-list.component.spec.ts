import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagResultListComponent } from './tag-result-list.component';

describe('TagResultListComponent', () => {
  let component: TagResultListComponent;
  let fixture: ComponentFixture<TagResultListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagResultListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
