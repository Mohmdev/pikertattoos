import * as migration_20241228_231147 from './20241228_231147';
import * as migration_20241228_232725 from './20241228_232725';
import * as migration_20241228_234429 from './20241228_234429';

export const migrations = [
  {
    up: migration_20241228_231147.up,
    down: migration_20241228_231147.down,
    name: '20241228_231147',
  },
  {
    up: migration_20241228_232725.up,
    down: migration_20241228_232725.down,
    name: '20241228_232725',
  },
  {
    up: migration_20241228_234429.up,
    down: migration_20241228_234429.down,
    name: '20241228_234429'
  },
];
