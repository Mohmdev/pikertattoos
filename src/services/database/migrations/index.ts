import * as migration_20241230_092046 from './20241230_092046';
import * as migration_20241230_102222 from './20241230_102222';
import * as migration_20241230_113507 from './20241230_113507';

export const migrations = [
  {
    up: migration_20241230_092046.up,
    down: migration_20241230_092046.down,
    name: '20241230_092046',
  },
  {
    up: migration_20241230_102222.up,
    down: migration_20241230_102222.down,
    name: '20241230_102222',
  },
  {
    up: migration_20241230_113507.up,
    down: migration_20241230_113507.down,
    name: '20241230_113507'
  },
];
