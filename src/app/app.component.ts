import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { SplashScreenService } from './services/splashscreen.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  constructor(private splashScreenService: SplashScreenService) { }

  ngOnInit() {
    if (!document.documentElement.classList.contains('skip-splash')) {
      this.splashScreenService.mostra();

      // Simula il caricamento dell'app in caso di operazioni più pesanti
      setTimeout(() => {
        this.splashScreenService.nascondi();
      }, 1000);
    } else {
      this.splashScreenService.nascondi();
    }
  }
}
