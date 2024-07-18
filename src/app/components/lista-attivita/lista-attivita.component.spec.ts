import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaAttivitaComponent } from './lista-attivita.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { AttivitaService } from '../../services/attivita.service';
import { of } from 'rxjs';
import { Attivita } from '../../models/attivita.model';
import { FormsModule } from '@angular/forms';

describe('ListaAttivitaComponent', () => {
  let component: ListaAttivitaComponent;
  let fixture: ComponentFixture<ListaAttivitaComponent>;
  let attivitaServiceSpy: jasmine.SpyObj<AttivitaService>;

  const mockAttivita: Attivita[] = [
    { id: 1, titolo: 'Test 1', descrizione: 'Desc 1', completato: false, cancellato: false, creatoIl: new Date() },
    { id: 2, titolo: 'Test 2', descrizione: 'Desc 2', completato: true, cancellato: false, creatoIl: new Date() },
  ];

  beforeEach(async () => {
    attivitaServiceSpy = jasmine.createSpyObj('AttivitaService', ['aggiornaAttivita', 'rimuoviAttivita'], {
      attivita$: of(mockAttivita),
    });

    await TestBed.configureTestingModule({
      imports: [FormsModule, ListaAttivitaComponent],
      providers: [
        provideRouter(routes),
        { provide: AttivitaService, useValue: attivitaServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaAttivitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crea il componente', () => {
    expect(component).toBeTruthy();
  });

  it('filtra le attivita per keyword', () => {
    component.keyword$.next('1');
    fixture.detectChanges();

    component.attivitaFiltrate$.subscribe(attivita => {
      expect(attivita.length).toBe(1);
      expect(attivita[0].titolo).toBe('Test 1');
    });
  });

  it('filtra le attivita per stato', () => {
    component.filtroStato$.next(true);
    fixture.detectChanges();

    component.attivitaFiltrate$.subscribe(attivita => {
      expect(attivita.length).toBe(1);
      expect(attivita[0].completato).toBe(true);
    });
  });

  it('cambia stato attivita', () => {
    const attivita = { ...mockAttivita[0], completato: false };
    const event = new Event('click');
    component.cambiaStato(attivita, event);

    expect(attivitaServiceSpy.aggiornaAttivita).toHaveBeenCalledWith({ ...attivita, completato: true });
  });

  it('rimuove attivita', () => {
    const attivita = mockAttivita[0];
    const event = new Event('click');
    component.rimuoviAttivita(attivita.id, event);

    expect(attivitaServiceSpy.rimuoviAttivita).toHaveBeenCalledWith(attivita.id);
  });

  it('apri dettagli modale', () => {
    const attivita = mockAttivita[0];
    component.apriDettagli(attivita);

    expect(component.attivitaSelezionata).toEqual(attivita);
  });

  it('chiudi modale', () => {
    component.attivitaSelezionata = mockAttivita[0];
    component.chiudiModal();

    expect(component.attivitaSelezionata).toBeNull();
  });

  it('salva modifiche', () => {
    const attivita = mockAttivita[0];
    component.salvaModifiche(attivita);

    expect(attivitaServiceSpy.aggiornaAttivita).toHaveBeenCalledWith(attivita);
    expect(component.attivitaSelezionata).toBeNull();
  });
});
