// splash-screen.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SplashScreenService {
  private splashScreen: HTMLElement | null = null;

  mostra() {
    const splashScreen = document.getElementById('splashScreen');
    if (splashScreen) {
      splashScreen.classList.remove('hidden');
    }
  }

  nascondi() {
    const splashScreen = document.getElementById('splashScreen');
    if (splashScreen) {
      splashScreen.classList.add('hidden');
    }
  }
}
