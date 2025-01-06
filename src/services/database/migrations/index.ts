import * as migration_20250106_083040 from './20250106_083040';

export const migrations = [
  {
    up: migration_20250106_083040.up,
    down: migration_20250106_083040.down,
    name: '20250106_083040'
  },
];
