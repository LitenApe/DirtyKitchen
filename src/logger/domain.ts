export interface Source {
  trace: (message: string) => void;
  debug: (message: string) => void;
  info: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
}

export type Level = 'trace' | 'debug' | 'info' | 'warn' | 'error';
