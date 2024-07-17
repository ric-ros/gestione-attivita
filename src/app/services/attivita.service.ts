import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Attivita } from '../models/attivita.model';

@Injectable({
  providedIn: 'root'
})
export class AttivitaService {
  private attivitaSubject = new BehaviorSubject<Attivita[]>(this.caricaAttivita());
  attivita$: Observable<Attivita[]> = this.attivitaSubject.asObservable();
  private nextId = this.attivitaSubject.value.length ? Math.max(...this.attivitaSubject.value.map(a => a.id)) + 1 : 1;

  private salvaAttivita(attivita: Attivita[]): void {
    localStorage.setItem('attivita', JSON.stringify(attivita));
  }

  private caricaAttivita(): Attivita[] {
    const attivita = localStorage.getItem('attivita');
    return attivita ? JSON.parse(attivita) : [];
  }

  aggiungiAttivita(attivita: Attivita): void {
    attivita.id = this.nextId++;
    attivita.cancellato = false;
    const attivitaCorrenti = [...this.attivitaSubject.value, attivita];
    this.attivitaSubject.next(attivitaCorrenti);
    this.salvaAttivita(attivitaCorrenti);
  }

  aggiornaAttivita(attivita: Attivita): void {
    const attivitaCorrenti = this.attivitaSubject.value.map(a => a.id === attivita.id ? attivita : a);
    this.attivitaSubject.next(attivitaCorrenti);
    this.salvaAttivita(attivitaCorrenti);
  }

  rimuoviAttivita(id: number): void {
    const attivitaCorrenti = this.attivitaSubject.value.map(a => a.id === id ? { ...a, cancellato: true } : a);
    this.attivitaSubject.next(attivitaCorrenti);
    this.salvaAttivita(attivitaCorrenti);
  }

  recuperaAttivita(id: number): void {
    const attivitaCorrenti = this.attivitaSubject.value.map(a => a.id === id ? { ...a, cancellato: false } : a);
    this.attivitaSubject.next(attivitaCorrenti);
    this.salvaAttivita(attivitaCorrenti);
  }

  rimuoviAttivitaPermanente(id: number): void {
    const attivitaCorrenti = this.attivitaSubject.value.filter(a => a.id !== id);
    this.attivitaSubject.next(attivitaCorrenti);
    this.salvaAttivita(attivitaCorrenti);
  }
}
