import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettagliAttivitaComponent } from './dettagli-attivita.component';

describe('DettagliAttivitaComponent', () => {
  let component: DettagliAttivitaComponent;
  let fixture: ComponentFixture<DettagliAttivitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DettagliAttivitaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DettagliAttivitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
