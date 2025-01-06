import * as migration_20250104_124452 from './20250104_124452';
import * as migration_20250105_082452 from './20250105_082452';
import * as migration_20250105_083524 from './20250105_083524';

export const migrations = [
  {
    up: migration_20250104_124452.up,
    down: migration_20250104_124452.down,
    name: '20250104_124452',
  },
  {
    up: migration_20250105_082452.up,
    down: migration_20250105_082452.down,
    name: '20250105_082452',
  },
  {
    up: migration_20250105_083524.up,
    down: migration_20250105_083524.down,
    name: '20250105_083524'
  },
];
