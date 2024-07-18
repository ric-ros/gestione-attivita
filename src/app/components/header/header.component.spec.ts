import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { HeaderComponent } from './header.component';
import { TemaService } from '../../services/tema.service';
import { BehaviorSubject } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let temaServiceSpy: jasmine.SpyObj<TemaService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TemaService', ['toggleDarkMode']);
    spy.isDarkMode$ = new BehaviorSubject<boolean>(false);

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideRouter(routes),
        { provide: TemaService, useValue: spy }
      ]
    }).compileComponents();

    temaServiceSpy = TestBed.inject(TemaService) as jasmine.SpyObj<TemaService>;
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crea il componente', () => {
    expect(component).toBeTruthy();
  });

  it('chiama toggleDarkMode del service al click del bottone', () => {
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(temaServiceSpy.toggleDarkMode).toHaveBeenCalled();
  });

  it("mostra l'icona corretta in base al tema", () => {
    const icon = fixture.nativeElement.querySelector('i.material-icons');

    // Test light mode
    temaServiceSpy.isDarkMode$.next(false);
    fixture.detectChanges();
    expect(icon.textContent.trim()).toBe('brightness_4');

    // Test dark mode
    temaServiceSpy.isDarkMode$.next(true);
    fixture.detectChanges();
    expect(icon.textContent.trim()).toBe('brightness_7');
  });

  it('verifica i link', () => {
    const links = fixture.nativeElement.querySelectorAll('.nav-link');
    expect(links.length).toBe(3); // Including the title link

    expect(links[0].textContent.trim()).toBe('Gestione Attività');
    expect(links[0].getAttribute('routerLink')).toBe('/');

    expect(links[1].textContent.trim()).toBe('Home');
    expect(links[1].getAttribute('routerLink')).toBe('/');

    expect(links[2].textContent.trim()).toBe('Lista Attività');
    expect(links[2].getAttribute('routerLink')).toBe('/lista-attivita');
  });
});
