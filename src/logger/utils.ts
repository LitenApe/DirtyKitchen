import { Level } from './domain';

const hierachy: Array<Level> = ['trace', 'debug', 'info', 'warn', 'error'];

function getLevel(level: Level): number {
  const index = hierachy.indexOf(level);

  if (index === -1) {
    throw new Error(
      `Encountered an illegal logg level of [level=${level}]. Logg levels must be one of [${hierachy.join(
        ', ',
      )}]`,
    );
  }

  return index;
}

export function enabled(enabledLevel: Level, currentLevel: Level): boolean {
  return getLevel(currentLevel) >= getLevel(enabledLevel);
}
