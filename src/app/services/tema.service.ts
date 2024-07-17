import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemaService {
  private darkModeClass = 'dark-mode';

  isDarkMode$ = new BehaviorSubject<boolean>(document.body.classList.contains(this.darkModeClass));

  constructor() {
    this.caricaTema();
  }

  toggleDarkMode(): void {
    if (document.body.classList.contains(this.darkModeClass)) {
      document.body.classList.remove(this.darkModeClass);
      localStorage.setItem('tema', 'chiaro');

      this.isDarkMode$.next(false);
      return;
    }

    document.body.classList.add(this.darkModeClass);
    localStorage.setItem('tema', 'scuro');

    this.isDarkMode$.next(true);
  }

  caricaTema(): void {
    const tema = localStorage.getItem('tema');
    if (tema === 'scuro') {
      document.body.classList.add(this.darkModeClass);

      this.isDarkMode$.next(true);
    }
  }
}
