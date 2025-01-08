import * as migration_20250106_083040 from './20250106_083040';
import * as migration_20250108_093149 from './20250108_093149';
import * as migration_20250108_093501 from './20250108_093501';

export const migrations = [
  {
    up: migration_20250106_083040.up,
    down: migration_20250106_083040.down,
    name: '20250106_083040',
  },
  {
    up: migration_20250108_093149.up,
    down: migration_20250108_093149.down,
    name: '20250108_093149',
  },
  {
    up: migration_20250108_093501.up,
    down: migration_20250108_093501.down,
    name: '20250108_093501'
  },
];
