import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" DROP COLUMN IF EXISTS "category";
  DROP TYPE "public"."enum_media_category";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_media_category" AS ENUM('tattoo', 'video', 'style', 'tag', 'other');
  ALTER TABLE "media" ADD COLUMN "category" "enum_media_category";`)
}
