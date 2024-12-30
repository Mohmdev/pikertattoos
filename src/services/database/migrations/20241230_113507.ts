import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tattoo" ADD COLUMN "video_id" integer;
  ALTER TABLE "tattoo" ADD COLUMN "description" varchar;
  ALTER TABLE "tattoo_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "tattoo_rels" ADD COLUMN "tattoo_id" integer;
  ALTER TABLE "_tattoo_v" ADD COLUMN "version_video_id" integer;
  ALTER TABLE "_tattoo_v" ADD COLUMN "version_description" varchar;
  ALTER TABLE "_tattoo_v_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "_tattoo_v_rels" ADD COLUMN "tattoo_id" integer;
  DO $$ BEGIN
   ALTER TABLE "tattoo" ADD CONSTRAINT "tattoo_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tattoo_rels" ADD CONSTRAINT "tattoo_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tattoo_rels" ADD CONSTRAINT "tattoo_rels_tattoo_fk" FOREIGN KEY ("tattoo_id") REFERENCES "public"."tattoo"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tattoo_v" ADD CONSTRAINT "_tattoo_v_version_video_id_media_id_fk" FOREIGN KEY ("version_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tattoo_v_rels" ADD CONSTRAINT "_tattoo_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tattoo_v_rels" ADD CONSTRAINT "_tattoo_v_rels_tattoo_fk" FOREIGN KEY ("tattoo_id") REFERENCES "public"."tattoo"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "tattoo_video_idx" ON "tattoo" USING btree ("video_id");
  CREATE INDEX IF NOT EXISTS "tattoo_rels_media_id_idx" ON "tattoo_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "tattoo_rels_tattoo_id_idx" ON "tattoo_rels" USING btree ("tattoo_id");
  CREATE INDEX IF NOT EXISTS "_tattoo_v_version_version_video_idx" ON "_tattoo_v" USING btree ("version_video_id");
  CREATE INDEX IF NOT EXISTS "_tattoo_v_rels_media_id_idx" ON "_tattoo_v_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_tattoo_v_rels_tattoo_id_idx" ON "_tattoo_v_rels" USING btree ("tattoo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tattoo" DROP CONSTRAINT "tattoo_video_id_media_id_fk";
  
  ALTER TABLE "tattoo_rels" DROP CONSTRAINT "tattoo_rels_media_fk";
  
  ALTER TABLE "tattoo_rels" DROP CONSTRAINT "tattoo_rels_tattoo_fk";
  
  ALTER TABLE "_tattoo_v" DROP CONSTRAINT "_tattoo_v_version_video_id_media_id_fk";
  
  ALTER TABLE "_tattoo_v_rels" DROP CONSTRAINT "_tattoo_v_rels_media_fk";
  
  ALTER TABLE "_tattoo_v_rels" DROP CONSTRAINT "_tattoo_v_rels_tattoo_fk";
  
  DROP INDEX IF EXISTS "tattoo_video_idx";
  DROP INDEX IF EXISTS "tattoo_rels_media_id_idx";
  DROP INDEX IF EXISTS "tattoo_rels_tattoo_id_idx";
  DROP INDEX IF EXISTS "_tattoo_v_version_version_video_idx";
  DROP INDEX IF EXISTS "_tattoo_v_rels_media_id_idx";
  DROP INDEX IF EXISTS "_tattoo_v_rels_tattoo_id_idx";
  ALTER TABLE "tattoo" DROP COLUMN IF EXISTS "video_id";
  ALTER TABLE "tattoo" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "tattoo_rels" DROP COLUMN IF EXISTS "media_id";
  ALTER TABLE "tattoo_rels" DROP COLUMN IF EXISTS "tattoo_id";
  ALTER TABLE "_tattoo_v" DROP COLUMN IF EXISTS "version_video_id";
  ALTER TABLE "_tattoo_v" DROP COLUMN IF EXISTS "version_description";
  ALTER TABLE "_tattoo_v_rels" DROP COLUMN IF EXISTS "media_id";
  ALTER TABLE "_tattoo_v_rels" DROP COLUMN IF EXISTS "tattoo_id";`)
}
