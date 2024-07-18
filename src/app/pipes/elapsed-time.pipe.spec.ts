import { ElapsedTimePipe } from './elapsed-time.pipe';

describe('ElapsedTimePipe', () => {
  let pipe: ElapsedTimePipe;

  beforeEach(() => {
    pipe = new ElapsedTimePipe();

    jasmine.clock().install();
  });

  it('crea la pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('restituisci "Adesso" per meno di 5 secondi fa', () => {
    const now = new Date();
    const fiveSecondsAgo = new Date(now.getTime() - 5000);
    expect(pipe.transform(fiveSecondsAgo)).toBe('Adesso');
  });

  it('restituisci "10 secondi fa" per meno di 10 secondi fa', () => {
    const now = new Date();
    const tenSecondsAgo = new Date(now.getTime() - 10000);
    expect(pipe.transform(tenSecondsAgo)).toBe('10 secondi fa');
  });

  it('restituisci "1 minuto fa" per 1 minuto fa', () => {
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 60000);
    expect(pipe.transform(oneMinuteAgo)).toBe('1 minuto fa');
  });

  it('restituisci "2 minuti fa" per 2 minuti fa', () => {
    const now = new Date();
    const twoMinutesAgo = new Date(now.getTime() - 120000);
    expect(pipe.transform(twoMinutesAgo)).toBe('2 minuti fa');
  });

  it('should return "1 ora fa" for 1 hour ago', () => {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 3600000);
    expect(pipe.transform(oneHourAgo)).toBe('1 ora fa');
  });

  it('should return "2 ore fa" for 2 hours ago', () => {
    const now = new Date();
    const twoHoursAgo = new Date(now.getTime() - 7200000);
    expect(pipe.transform(twoHoursAgo)).toBe('2 ore fa');
  });

  // ... e così via

  it('restituisci la data se non è una data valida', () => {
    expect(pipe.transform('not a date')).toBe('not a date');
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });
});
