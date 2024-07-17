import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'elapsedTime',
  standalone: true
})
export class ElapsedTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);

      if (seconds < 9) return 'Adesso';

      const intervals: { [key: string]: { singular: string, plural: string, value: number } } = {
        'anno': { singular: 'anno', plural: 'anni', value: 31536000 },
        'mese': { singular: 'mese', plural: 'mesi', value: 2592000 },
        'settimana': { singular: 'settimana', plural: 'settimane', value: 604800 },
        'giorno': { singular: 'giorno', plural: 'giorni', value: 86400 },
        'ora': { singular: 'ora', plural: 'ore', value: 3600 },
        'minuto': { singular: 'minuto', plural: 'minuti', value: 60 },
        'secondo': { singular: 'secondo', plural: 'secondi', value: 1 }
      };

      let counter;

      for (const key in intervals) {
        counter = Math.floor(seconds / intervals[key].value);
        if (counter > 0) {
          if (counter === 1) {
            return counter + ' ' + intervals[key].singular + ' fa';
          } else {
            return counter + ' ' + intervals[key].plural + ' fa';
          }
        }
      }
    }
    return value;
  }
}
