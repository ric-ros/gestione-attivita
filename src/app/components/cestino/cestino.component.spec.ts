import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AttivitaService } from '../../services/attivita.service';
import { CestinoComponent } from './cestino.component';
import { Attivita } from '../../models/attivita.model';

describe('CestinoComponent', () => {
  let component: CestinoComponent;
  let fixture: ComponentFixture<CestinoComponent>;
  let attivitaServiceSpy: jasmine.SpyObj<AttivitaService>;

  beforeEach(async () => {
    attivitaServiceSpy = jasmine.createSpyObj(
      'AttivitaService',
      ['recuperaAttivita', 'rimuoviAttivitaPermanente', 'attivita$']
    );

    attivitaServiceSpy.attivita$ = of([{
      id: 1,
      titolo: 'Test Attivita',
      descrizione: 'Descrizione test',
      cancellato: true
    } as Attivita]);

    await TestBed.configureTestingModule({
      imports: [CestinoComponent],
      providers: [
        { provide: AttivitaService, useValue: attivitaServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CestinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crea il componente', () => {
    expect(component).toBeTruthy();
  });

  it('chiama recuperaAttivita dal service', () => {
    const testId = 1;
    component.recuperaAttivita(testId);
    expect(attivitaServiceSpy.recuperaAttivita).toHaveBeenCalledWith(testId);
  });

  it('chiama rimuoviAttivitaPermanente dal service', () => {
    const testId = 1;
    component.rimuoviAttivitaPermanente(testId);
    expect(attivitaServiceSpy.rimuoviAttivitaPermanente).toHaveBeenCalledWith(testId);
  });
});
