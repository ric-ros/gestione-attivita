import { Routes } from '@angular/router';
import { ListaAttivitaComponent } from './components/lista-attivita/lista-attivita.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CestinoComponent } from './components/cestino/cestino.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'lista-attivita', component: ListaAttivitaComponent },
  { path: 'cestino', component: CestinoComponent }
];
