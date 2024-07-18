import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AttivitaService } from '../../services/attivita.service';
import { Attivita } from '../../models/attivita.model';

@Component({
  selector: 'app-quick-insert',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './quick-insert.component.html',
  styleUrls: ['./quick-insert.component.scss']
})
export class QuickInsertComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private attivitaService: AttivitaService) {
    this.form = this.formBuilder.group({
      titolo: ['', Validators.required],
      // Forse possiamo anche aggiungere la validazione sui duplicati ma non so se ha senso per i task...
      descrizione: [''],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.attivitaService.aggiungiAttivita(this.form.value as Partial<Attivita>);
    this.form.reset();
  }
}
