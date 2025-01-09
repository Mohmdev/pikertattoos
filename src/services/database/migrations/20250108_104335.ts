import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage_rels" RENAME COLUMN "media_id" TO "tattoo_id";
  ALTER TABLE "_homepage_v_rels" RENAME COLUMN "media_id" TO "tattoo_id";
  ALTER TABLE "homepage_rels" DROP CONSTRAINT "homepage_rels_media_fk";
  
  ALTER TABLE "_homepage_v_rels" DROP CONSTRAINT "_homepage_v_rels_media_fk";
  
  DROP INDEX IF EXISTS "homepage_rels_media_id_idx";
  DROP INDEX IF EXISTS "_homepage_v_rels_media_id_idx";
  DROP INDEX IF EXISTS "media_filename_idx";
  DO $$ BEGIN
   ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_tattoo_fk" FOREIGN KEY ("tattoo_id") REFERENCES "public"."tattoo"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_homepage_v_rels" ADD CONSTRAINT "_homepage_v_rels_tattoo_fk" FOREIGN KEY ("tattoo_id") REFERENCES "public"."tattoo"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "homepage_rels_tattoo_id_idx" ON "homepage_rels" USING btree ("tattoo_id");
  CREATE INDEX IF NOT EXISTS "_homepage_v_rels_tattoo_id_idx" ON "_homepage_v_rels" USING btree ("tattoo_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage_rels" RENAME COLUMN "tattoo_id" TO "media_id";
  ALTER TABLE "_homepage_v_rels" RENAME COLUMN "tattoo_id" TO "media_id";
  ALTER TABLE "homepage_rels" DROP CONSTRAINT "homepage_rels_tattoo_fk";
  
  ALTER TABLE "_homepage_v_rels" DROP CONSTRAINT "_homepage_v_rels_tattoo_fk";
  
  DROP INDEX IF EXISTS "homepage_rels_tattoo_id_idx";
  DROP INDEX IF EXISTS "_homepage_v_rels_tattoo_id_idx";
  DROP INDEX IF EXISTS "media_filename_idx";
  DO $$ BEGIN
   ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_homepage_v_rels" ADD CONSTRAINT "_homepage_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "homepage_rels_media_id_idx" ON "homepage_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_homepage_v_rels_media_id_idx" ON "_homepage_v_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");`)
}
