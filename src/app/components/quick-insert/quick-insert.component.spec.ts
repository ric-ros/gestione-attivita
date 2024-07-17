import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickInsertComponent } from './quick-insert.component';

describe('QuickInsertComponent', () => {
  let component: QuickInsertComponent;
  let fixture: ComponentFixture<QuickInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickInsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuickInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
