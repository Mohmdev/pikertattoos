import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" ADD COLUMN "sizes_original_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_original_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_original_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_original_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_original_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_original_filename" varchar;
  CREATE INDEX IF NOT EXISTS "media_sizes_original_sizes_original_filename_idx" ON "media" USING btree ("sizes_original_filename");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "media_sizes_original_sizes_original_filename_idx";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_original_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_original_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_original_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_original_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_original_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_original_filename";`)
}
