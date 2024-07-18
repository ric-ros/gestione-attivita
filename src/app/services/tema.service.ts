import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemaService {
  isDarkMode$ = new BehaviorSubject<boolean>(document.documentElement.getAttribute('data-colore-tema') === 'scuro');

  constructor() {
    this.caricaTema();
    this.registraCambiamentoTemaDispositivo();
  }

  toggleDarkMode(): void {
    if (document.documentElement.getAttribute('data-colore-tema') === 'scuro') {
      document.documentElement.setAttribute('data-colore-tema', 'chiaro');
      localStorage.setItem('tema', 'chiaro');

      this.isDarkMode$.next(false);
      return;
    }

    document.documentElement.setAttribute('data-colore-tema', 'scuro');
    localStorage.setItem('tema', 'scuro');

    this.isDarkMode$.next(true);
  }

  caricaTema(): void {
    // data-colore-tema è gestito per ora in index.html

    let darkMode: boolean = document.documentElement.getAttribute('data-colore-tema') === 'scuro';
    this.isDarkMode$.next(darkMode);
  }

  registraCambiamentoTemaDispositivo(): void {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (localStorage.getItem('tema') === null) {
        document.documentElement.setAttribute('data-colore-tema', e.matches ? 'scuro' : 'chiaro');
      }
    });
  }
}
