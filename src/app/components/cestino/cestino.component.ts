import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AttivitaService } from '../../services/attivita.service';
import { Attivita } from '../../models/attivita.model';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ElapsedTimePipe } from "../../pipes/elapsed-time.pipe";


@Component({
  selector: 'app-cestino',
  standalone: true,
  imports: [CommonModule, ElapsedTimePipe],
  templateUrl: './cestino.component.html'
})
export class CestinoComponent {
  keyword$ = new BehaviorSubject<string>('');

  attivitaCancellate$: Observable<Attivita[]> = combineLatest([
    this.attivitaService.attivita$,
    this.keyword$
  ]).pipe(
    map(([attivita, keyword]) => attivita.filter(a => {
      const matchKeyword = !(!!keyword) || a.descrizione.includes(keyword.toLowerCase()) || a.titolo.includes(keyword.toLowerCase());

      return matchKeyword && a.cancellato;
    }))
  );

  anyAttivitaCancellate$: Observable<boolean> = this.attivitaService.attivita$.pipe(
    map(attivita => attivita.some(a => a.cancellato))
  );

  constructor(private attivitaService: AttivitaService, private router: Router) { }

  recuperaAttivita(id: number): void {
    this.attivitaService.recuperaAttivita(id);
  }

  rimuoviAttivitaPermanente(id: number): void {
    this.attivitaService.rimuoviAttivitaPermanente(id);
  }

  tornaIndietro(): void {
    this.router.navigate(['/lista-attivita']);
  }

  onKeywordChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.keyword$.next(input.value);
  }
}
