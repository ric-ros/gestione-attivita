import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Attivita } from '../../models/attivita.model';

@Component({
  selector: 'app-dettagli-attivita',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dettagli-attivita.component.html',
  styleUrls: ['./dettagli-attivita.component.scss']
})
export class DettagliAttivitaComponent implements OnDestroy {
  @Input() attivita: Attivita | null = null;
  @Output() chiudiModal = new EventEmitter<void>();
  @Output() salvaModifiche = new EventEmitter<Attivita>();

  titolo: string = '';
  descrizione: string = '';

  escCallback = this.onEscKey.bind(this);

  constructor() {
    // registra l'evento per la pressione del tasto ESC
    document.addEventListener('keydown', this.escCallback);
  }

  ngOnChanges() {
    if (this.attivita) {
      this.titolo = this.attivita.titolo;
      this.descrizione = this.attivita.descrizione;
    }
  }

  onSave() {
    if (this.attivita) {
      const updatedAttivita = { ...this.attivita, titolo: this.titolo, descrizione: this.descrizione };
      this.salvaModifiche.emit(updatedAttivita);
    }
  }

  toggleCompletato() {
    if (this.attivita) {
      const updatedAttivita = { ...this.attivita, completato: !this.attivita.completato };
      this.salvaModifiche.emit(updatedAttivita);
    }
  }

  onClose() {
    this.chiudiModal.emit();
  }

  onEscKey(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.onClose();
    }
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.escCallback);
  }
}
