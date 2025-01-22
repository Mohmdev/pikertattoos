import * as migration_20250122_123742 from './20250122_123742';
import * as migration_20250122_203831 from './20250122_203831';

export const migrations = [
  {
    up: migration_20250122_123742.up,
    down: migration_20250122_123742.down,
    name: '20250122_123742',
  },
  {
    up: migration_20250122_203831.up,
    down: migration_20250122_203831.down,
    name: '20250122_203831'
  },
];
