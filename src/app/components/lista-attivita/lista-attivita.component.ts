import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AttivitaService } from '../../services/attivita.service';
import { Attivita } from '../../models/attivita.model';
import { DettagliAttivitaComponent } from '../dettagli-attivita/dettagli-attivita.component';
import { CestinoComponent } from '../cestino/cestino.component';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-attivita',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, DettagliAttivitaComponent, CestinoComponent],
  templateUrl: './lista-attivita.component.html'
})
export class ListaAttivitaComponent {
  @Input() mostraSoltantoNonCompletate: boolean = false;

  filtroStato$ = new BehaviorSubject<boolean | undefined>(undefined);
  keyword$ = new BehaviorSubject<string>('');
  attivitaFiltrate$: Observable<Attivita[]> = combineLatest([
    this.attivitaService.attivita$,
    this.filtroStato$,
    this.keyword$
  ]).pipe(
    map(([attivita, filtroStato, keyword]) => this.filtraAttivita(attivita, filtroStato, keyword))
  );

  attivitaSelezionata: Attivita | null = null;
  anyAttivitaCancellate$: Observable<boolean> = this.attivitaService.attivita$.pipe(
    map(attivita => attivita.some(a => a.cancellato))
  );

  constructor(private attivitaService: AttivitaService) { }

  filtraAttivita(attivita: Attivita[], filtroStato: boolean | undefined, keyword: string): Attivita[] {
    return attivita.filter(a => {
      const matchKeyword = !(!!keyword) || a.descrizione.includes(keyword.toLowerCase());
      const matchStato = filtroStato === undefined || a.completato === filtroStato;

      return matchKeyword && matchStato && !a.cancellato && (!this.mostraSoltantoNonCompletate || !a.completato);
    });
  }

  cambiaStato(attivita: Attivita, event: Event) {
    event.stopPropagation();
    const nuovaAttivita = { ...attivita, completato: !attivita.completato };
    this.attivitaService.aggiornaAttivita(nuovaAttivita);
  }

  rimuoviAttivita(id: number, event: Event) {
    event.stopPropagation();
    this.attivitaService.rimuoviAttivita(id);
  }

  onKeywordChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.keyword$.next(input.value);
  }

  onStatoChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.filtroStato$.next(select.value === '' ? undefined : select.value === 'true');
  }

  apriDettagli(attivita: Attivita) {
    this.attivitaSelezionata = attivita;
  }

  chiudiModal() {
    this.attivitaSelezionata = null;
  }

  salvaModifiche(attivita: Attivita) {
    this.attivitaService.aggiornaAttivita(attivita);
    this.chiudiModal();
  }
}
