import { Level } from './domain';

const levelHierachy: Array<Level> = ['trace', 'debug', 'info', 'warn', 'error'];

function getLevel(level: Level): number {
  return levelHierachy.indexOf(level);
}

export function mute(enabledLevel: Level, currentLevel: Level): boolean {
  return getLevel(currentLevel) >= getLevel(enabledLevel);
}
