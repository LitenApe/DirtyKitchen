import { Level } from './domain';

const logLevelHierachy: Array<Level> = [
  'trace',
  'debug',
  'info',
  'warn',
  'error',
];

function getLogLevel(level: Level): number {
  return logLevelHierachy.indexOf(level);
}

export function muteLogg(enabledLevel: Level, currentLevel: Level): boolean {
  return getLogLevel(currentLevel) >= getLogLevel(enabledLevel);
}
