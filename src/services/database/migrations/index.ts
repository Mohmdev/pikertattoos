import * as migration_20250124_091943 from './20250124_091943';

export const migrations = [
  {
    up: migration_20250124_091943.up,
    down: migration_20250124_091943.down,
    name: '20250124_091943'
  },
];
