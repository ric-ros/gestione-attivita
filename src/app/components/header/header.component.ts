import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TemaService } from '../../services/tema.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isDarkMode$ = this.temaService.isDarkMode$;

  constructor(private temaService: TemaService) { }

  toggleDarkMode() {
    this.temaService.toggleDarkMode();
  }
}
