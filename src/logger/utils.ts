import { LoggLevel } from './domain';

const logLevelHierachy = [
  LoggLevel.TRACE,
  LoggLevel.DEBUG,
  LoggLevel.INFO,
  LoggLevel.WARN,
  LoggLevel.ERROR,
];

function getLogLevel(level: LoggLevel): number {
  return logLevelHierachy.indexOf(level);
}

export function muteLogg(
  enabledLevel: LoggLevel,
  currentLevel: LoggLevel,
): boolean {
  return getLogLevel(currentLevel) >= getLogLevel(enabledLevel);
}
