import * as migration_20250209_132804 from './20250209_132804';
import * as migration_20250209_171619 from './20250209_171619';
import * as migration_20250209_172036 from './20250209_172036';

export const migrations = [
  {
    up: migration_20250209_132804.up,
    down: migration_20250209_132804.down,
    name: '20250209_132804',
  },
  {
    up: migration_20250209_171619.up,
    down: migration_20250209_171619.down,
    name: '20250209_171619',
  },
  {
    up: migration_20250209_172036.up,
    down: migration_20250209_172036.down,
    name: '20250209_172036'
  },
];
