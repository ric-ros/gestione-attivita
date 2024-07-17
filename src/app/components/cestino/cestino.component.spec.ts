import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CestinoComponent } from './cestino.component';

describe('CestinoComponent', () => {
  let component: CestinoComponent;
  let fixture: ComponentFixture<CestinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CestinoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CestinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
