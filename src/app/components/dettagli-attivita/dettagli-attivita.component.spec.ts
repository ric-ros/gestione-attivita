import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DettagliAttivitaComponent } from './dettagli-attivita.component';
import { Attivita } from '../../models/attivita.model';
import { FormsModule } from '@angular/forms';

describe('DettagliAttivitaComponent', () => {
  let component: DettagliAttivitaComponent;
  let fixture: ComponentFixture<DettagliAttivitaComponent>;
  const attivita: Attivita = {
    id: 1,
    titolo: 'Test Attivita',
    descrizione: 'Descrizione test',
    completato: false,
    cancellato: false,
    creatoIl: new Date()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DettagliAttivitaComponent, FormsModule],
      declarations: []
    }).compileComponents();

    fixture = TestBed.createComponent(DettagliAttivitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crea il componente', () => {
    expect(component).toBeTruthy();
  });

  it("inizializza i campi con i valori dell'attivita", () => {
    component.attivita = attivita;
    component.ngOnChanges();
    expect(component.titolo).toBe(attivita.titolo);
    expect(component.descrizione).toBe(attivita.descrizione);
  });

  it('salvaModifiche onSave', () => {
    spyOn(component.salvaModifiche, 'emit');
    component.attivita = attivita;
    component.titolo = 'Titolo Modificato';
    component.descrizione = 'Descrizione Modificata';
    component.onSave();
    expect(component.salvaModifiche.emit).toHaveBeenCalledWith(jasmine.objectContaining({ titolo: 'Titolo Modificato', descrizione: 'Descrizione Modificata' }));
  });

  it('chiude il modal onClose', () => {
    spyOn(component.chiudiModal, 'emit');
    component.onClose();
    expect(component.chiudiModal.emit).toHaveBeenCalled();
  });

  it('cambia lo stato in "completato" con toggleCompletato', () => {
    spyOn(component.salvaModifiche, 'emit');
    component.attivita = attivita;
    component.toggleCompletato();
    expect(component.salvaModifiche.emit).toHaveBeenCalledWith(jasmine.objectContaining({ completato: true }));
  });

  it('cambia lo stato in "cancellato" con toggleCancellato', () => {
    spyOn(component, 'onClose');
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);
    expect(component.onClose).toHaveBeenCalled();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });
});
