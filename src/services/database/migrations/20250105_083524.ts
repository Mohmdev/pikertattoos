import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage" DROP CONSTRAINT "homepage_featured_id_media_id_fk";
  
  ALTER TABLE "_homepage_v" DROP CONSTRAINT "_homepage_v_version_featured_id_media_id_fk";
  
  DROP INDEX IF EXISTS "homepage_featured_idx";
  DROP INDEX IF EXISTS "_homepage_v_version_version_featured_idx";
  ALTER TABLE "homepage_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "_homepage_v_rels" ADD COLUMN "media_id" integer;
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
  ALTER TABLE "homepage" DROP COLUMN IF EXISTS "featured_id";
  ALTER TABLE "_homepage_v" DROP COLUMN IF EXISTS "version_featured_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage_rels" DROP CONSTRAINT "homepage_rels_media_fk";
  
  ALTER TABLE "_homepage_v_rels" DROP CONSTRAINT "_homepage_v_rels_media_fk";
  
  DROP INDEX IF EXISTS "homepage_rels_media_id_idx";
  DROP INDEX IF EXISTS "_homepage_v_rels_media_id_idx";
  ALTER TABLE "homepage" ADD COLUMN "featured_id" integer;
  ALTER TABLE "_homepage_v" ADD COLUMN "version_featured_id" integer;
  DO $$ BEGIN
   ALTER TABLE "homepage" ADD CONSTRAINT "homepage_featured_id_media_id_fk" FOREIGN KEY ("featured_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_featured_id_media_id_fk" FOREIGN KEY ("version_featured_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "homepage_featured_idx" ON "homepage" USING btree ("featured_id");
  CREATE INDEX IF NOT EXISTS "_homepage_v_version_version_featured_idx" ON "_homepage_v" USING btree ("version_featured_id");
  ALTER TABLE "homepage_rels" DROP COLUMN IF EXISTS "media_id";
  ALTER TABLE "_homepage_v_rels" DROP COLUMN IF EXISTS "media_id";`)
}
