import * as migration_20250101_212545 from './20250101_212545';

export const migrations = [
  {
    up: migration_20250101_212545.up,
    down: migration_20250101_212545.down,
    name: '20250101_212545'
  },
];
