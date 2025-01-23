import * as migration_20250123_180756 from './20250123_180756';

export const migrations = [
  {
    up: migration_20250123_180756.up,
    down: migration_20250123_180756.down,
    name: '20250123_180756'
  },
];
