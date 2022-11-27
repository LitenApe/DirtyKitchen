import { Level, Source } from './domain';

import { mute } from './utils';

export class Logger {
  #name: string;
  #src: Source;
  #level: Level;

  constructor(name: string, level: Level, src: Source) {
    this.#name = name;
    this.#src = src;
    this.#level = level;
  }

  private logg(level: Level, ...message: Array<unknown>): void {
    if (!mute(this.#level, level)) {
      this.#src[level](`[name=${this.#name}]: ${message.join(' ')}`);
    }
  }

  trace(...args: Array<unknown>): void {
    this.logg('trace', args);
  }

  debug(...args: Array<unknown>): void {
    this.logg('debug', args);
  }

  info(...args: Array<unknown>): void {
    this.logg('info', args);
  }

  warn(...args: Array<unknown>): void {
    this.logg('warn', args);
  }

  error(...args: Array<unknown>): void {
    this.logg('error', args);
  }
}

export function factory(level: Level, src: Source): (name: string) => Logger {
  return (name: string): Logger => new Logger(name, level, src);
}
