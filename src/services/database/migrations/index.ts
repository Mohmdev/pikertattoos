import * as migration_20250110_165747 from './20250110_165747';

export const migrations = [
  {
    up: migration_20250110_165747.up,
    down: migration_20250110_165747.down,
    name: '20250110_165747'
  },
];
