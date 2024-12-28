import * as migration_20241228_155425 from './20241228_155425';
import * as migration_20241228_160301 from './20241228_160301';
import * as migration_20241228_163823 from './20241228_163823';

export const migrations = [
  {
    up: migration_20241228_155425.up,
    down: migration_20241228_155425.down,
    name: '20241228_155425',
  },
  {
    up: migration_20241228_160301.up,
    down: migration_20241228_160301.down,
    name: '20241228_160301',
  },
  {
    up: migration_20241228_163823.up,
    down: migration_20241228_163823.down,
    name: '20241228_163823'
  },
];
