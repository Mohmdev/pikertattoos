import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "users_username_idx";
  ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL;
  CREATE UNIQUE INDEX IF NOT EXISTS "users_username_idx" ON "users" USING btree ("username");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "users_username_idx";
  ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;
  CREATE INDEX IF NOT EXISTS "users_username_idx" ON "users" USING btree ("username");`)
}
