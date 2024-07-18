import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuickInsertComponent } from './quick-insert.component';
import { AttivitaService } from '../../services/attivita.service';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('QuickInsertComponent', () => {
  let component: QuickInsertComponent;
  let fixture: ComponentFixture<QuickInsertComponent>;
  let attivitaServiceSpy: jasmine.SpyObj<AttivitaService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AttivitaService', ['aggiungiAttivita']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, QuickInsertComponent],
      providers: [
        { provide: AttivitaService, useValue: spy }
      ]
    }).compileComponents();

    attivitaServiceSpy = TestBed.inject(AttivitaService) as jasmine.SpyObj<AttivitaService>;
    fixture = TestBed.createComponent(QuickInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crea il componente', () => {
    expect(component).toBeTruthy();
  });

  it('inizializza il form con i campi vuoti', () => {
    expect(component.form.get('titolo')?.value).toBe('');
    expect(component.form.get('descrizione')?.value).toBe('');
  });

  it('contrassegna il form come non valido quando titolo è vuoto', () => {
    const titoloControl = component.form.get('titolo');
    titoloControl?.setValue('');
    expect(component.form.valid).toBeFalsy();
  });

  it('contrassegna il form come valido quando titolo è compilato', () => {
    const titoloControl = component.form.get('titolo');
    titoloControl?.setValue('Test Titolo');
    expect(component.form.valid).toBeTruthy();
  });

  it('chiama attivitaService.aggiungiAttivita con i valori del form', () => {
    const titoloControl = component.form.get('titolo');
    const descrizioneControl = component.form.get('descrizione');
    titoloControl?.setValue('Test Titolo');
    descrizioneControl?.setValue('Test Descrizione');

    component.onSubmit();

    expect(attivitaServiceSpy.aggiungiAttivita).toHaveBeenCalledWith({
      titolo: 'Test Titolo',
      descrizione: 'Test Descrizione'
    });
  });

  it('non chiama attivitaService.aggiungiAttivita se il form è invalido', () => {
    component.onSubmit();
    expect(attivitaServiceSpy.aggiungiAttivita).not.toHaveBeenCalled();
  });

  it('resetta il form dopo il submit', () => {
    const titoloControl = component.form.get('titolo');
    const descrizioneControl = component.form.get('descrizione');
    titoloControl?.setValue('Test Titolo');
    descrizioneControl?.setValue('Test Descrizione');

    component.onSubmit();

    expect(titoloControl?.value).toBe(null);
    expect(descrizioneControl?.value).toBe(null);
  });

  it('disabilita il submit button quando il form è invalido', () => {
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(submitButton.disabled).toBeTruthy();
  });

  it('abilita il submit button quando il form è valido', () => {
    const titoloControl = component.form.get('titolo');
    titoloControl?.setValue('Test Titolo');
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(submitButton.disabled).toBeFalsy();
  });
});
