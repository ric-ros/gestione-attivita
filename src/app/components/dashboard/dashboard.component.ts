import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickInsertComponent } from '../quick-insert/quick-insert.component';
import { ListaAttivitaComponent } from '../lista-attivita/lista-attivita.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, QuickInsertComponent, ListaAttivitaComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent { }
