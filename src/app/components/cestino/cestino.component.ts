import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AttivitaService } from '../../services/attivita.service';
import { Attivita } from '../../models/attivita.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cestino',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cestino.component.html'
})
export class CestinoComponent {
  cestino$: Observable<Attivita[]>;

  constructor(private attivitaService: AttivitaService, private router: Router) {
    this.cestino$ = this.attivitaService.attivita$.pipe(
      map(attivita => attivita.filter(a => a.cancellato))
    );
  }

  recuperaAttivita(id: number): void {
    this.attivitaService.recuperaAttivita(id);
  }

  rimuoviAttivitaPermanente(id: number): void {
    this.attivitaService.rimuoviAttivitaPermanente(id);
  }

  tornaIndietro(): void {
    this.router.navigate(['/lista-attivita']);
  }
}
