import { LoggLevel, LoggSource } from './domain';

import { muteLogg } from './utils';

export class Logger {
  #name: string;
  #src: LoggSource;
  #level: LoggLevel;

  constructor(name: string, level?: LoggLevel, src?: LoggSource) {
    this.#name = name;
    this.#src = src ?? globalThis.console;
    this.#level = level ?? LoggLevel.WARN;
  }

  private loggMessage(level: LoggLevel, ...message: Array<unknown>): void {
    if (!muteLogg(this.#level, level)) {
      this.#src[level](`[name=${this.#name}] ${message}`);
    }
  }

  trace(...args: Array<unknown>): void {
    this.loggMessage(LoggLevel.TRACE, args);
  }

  debug(...args: Array<unknown>): void {
    this.loggMessage(LoggLevel.DEBUG, args);
  }

  info(...args: Array<unknown>): void {
    this.loggMessage(LoggLevel.INFO, args);
  }

  warn(...args: Array<unknown>): void {
    this.loggMessage(LoggLevel.WARN, args);
  }

  error(...args: Array<unknown>): void {
    this.loggMessage(LoggLevel.ERROR, args);
  }
}
