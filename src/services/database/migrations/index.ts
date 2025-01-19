import * as migration_20250119_160424 from './20250119_160424';

export const migrations = [
  {
    up: migration_20250119_160424.up,
    down: migration_20250119_160424.down,
    name: '20250119_160424'
  },
];
