import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemaService {
  isDarkMode$ = new BehaviorSubject<boolean>(document.documentElement.getAttribute('data-colore-tema') === 'scuro');

  constructor() {
    this.caricaTema();
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
    const tema = localStorage.getItem('tema');
    if (tema === 'scuro') {
      document.documentElement.setAttribute('data-colore-tema', 'scuro');

      this.isDarkMode$.next(true);
    }
  }
}
