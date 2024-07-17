import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AttivitaService } from '../../services/attivita.service';
import { Attivita } from '../../models/attivita.model';

@Component({
  selector: 'app-quick-insert',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quick-insert.component.html',
  styleUrls: ['./quick-insert.component.scss']
})
export class QuickInsertComponent {
  nuovaAttivita: Partial<Attivita> = { titolo: '', descrizione: '', completato: false };

  constructor(private attivitaService: AttivitaService) { }

  onSubmit() {
    if (!this.nuovaAttivita.titolo) {
      return;
    }

    const nuovaAttivitaCompleta: Attivita = {
      ...this.nuovaAttivita,
      id: 0  // ID verrà generato dal service
    } as Attivita;
    this.attivitaService.aggiungiAttivita(nuovaAttivitaCompleta);
    this.nuovaAttivita = { titolo: '', descrizione: '', completato: false };
  }
}
