import * as migration_20250102_152124 from './20250102_152124';

export const migrations = [
  {
    up: migration_20250102_152124.up,
    down: migration_20250102_152124.down,
    name: '20250102_152124'
  },
];
