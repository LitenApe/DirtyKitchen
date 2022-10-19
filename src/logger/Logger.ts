import { Level, Source } from './domain';

import { mute } from './utils';

export class Logger {
  #name: string;
  #src: Source;
  #level: Level;

  constructor(name: string, level?: Level, src?: Source) {
    this.#name = name;
    this.#src = src ?? globalThis.console;
    this.#level = level ?? 'warn';
  }

  private loggMessage(level: Level, ...message: Array<unknown>): void {
    if (!mute(this.#level, level)) {
      this.#src[level](`[name=${this.#name}][level=${level}]: ${message}`);
    }
  }

  trace(...args: Array<unknown>): void {
    this.loggMessage('trace', args);
  }

  debug(...args: Array<unknown>): void {
    this.loggMessage('debug', args);
  }

  info(...args: Array<unknown>): void {
    this.loggMessage('info', args);
  }

  warn(...args: Array<unknown>): void {
    this.loggMessage('warn', args);
  }

  error(...args: Array<unknown>): void {
    this.loggMessage('error', args);
  }
}

export function factory(level: Level, src?: Source): (name: string) => Logger {
  return (name: string): Logger => new Logger(name, level, src);
}
