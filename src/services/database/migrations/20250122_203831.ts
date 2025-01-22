import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_homepage_gradient_background_first_color" AS ENUM('#00E6BB', '#01D7E6', '#00B1E5', '#008AE6', '#015DE5', '#013AE6', '#1000E5', '#4B00E5', '#8D00E5', '#C900E5', '#E600B1', '#E6008A', '#E6005D', '#E6003A');
  CREATE TYPE "public"."enum_homepage_gradient_background_second_color" AS ENUM('#00E6BB', '#01D7E6', '#00B1E5', '#008AE6', '#015DE5', '#013AE6', '#1000E5', '#4B00E5', '#8D00E5', '#C900E5', '#E600B1', '#E6008A', '#E6005D', '#E6003A');
  CREATE TYPE "public"."enum__homepage_v_version_gradient_background_first_color" AS ENUM('#00E6BB', '#01D7E6', '#00B1E5', '#008AE6', '#015DE5', '#013AE6', '#1000E5', '#4B00E5', '#8D00E5', '#C900E5', '#E600B1', '#E6008A', '#E6005D', '#E6003A');
  CREATE TYPE "public"."enum__homepage_v_version_gradient_background_second_color" AS ENUM('#00E6BB', '#01D7E6', '#00B1E5', '#008AE6', '#015DE5', '#013AE6', '#1000E5', '#4B00E5', '#8D00E5', '#C900E5', '#E600B1', '#E6008A', '#E6005D', '#E6003A');
  CREATE TABLE IF NOT EXISTS "homepage_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_homepage_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  ALTER TABLE "homepage" ADD COLUMN "gradient_background_enable" boolean DEFAULT true;
  ALTER TABLE "homepage" ADD COLUMN "gradient_background_first_color" "enum_homepage_gradient_background_first_color" DEFAULT '#00E6BB';
  ALTER TABLE "homepage" ADD COLUMN "gradient_background_second_color" "enum_homepage_gradient_background_second_color" DEFAULT '#008AE6';
  ALTER TABLE "homepage" ADD COLUMN "gradient_background_opacity" numeric DEFAULT 1;
  ALTER TABLE "homepage" ADD COLUMN "search_input_text" varchar DEFAULT 'Search for anything';
  ALTER TABLE "_homepage_v" ADD COLUMN "version_gradient_background_enable" boolean DEFAULT true;
  ALTER TABLE "_homepage_v" ADD COLUMN "version_gradient_background_first_color" "enum__homepage_v_version_gradient_background_first_color" DEFAULT '#00E6BB';
  ALTER TABLE "_homepage_v" ADD COLUMN "version_gradient_background_second_color" "enum__homepage_v_version_gradient_background_second_color" DEFAULT '#008AE6';
  ALTER TABLE "_homepage_v" ADD COLUMN "version_gradient_background_opacity" numeric DEFAULT 1;
  ALTER TABLE "_homepage_v" ADD COLUMN "version_search_input_text" varchar DEFAULT 'Search for anything';
  DO $$ BEGIN
   ALTER TABLE "homepage_populated_authors" ADD CONSTRAINT "homepage_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_homepage_v_version_populated_authors" ADD CONSTRAINT "_homepage_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "homepage_populated_authors_order_idx" ON "homepage_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "homepage_populated_authors_parent_id_idx" ON "homepage_populated_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_homepage_v_version_populated_authors_order_idx" ON "_homepage_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_homepage_v_version_populated_authors_parent_id_idx" ON "_homepage_v_version_populated_authors" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "homepage_populated_authors" CASCADE;
  DROP TABLE "_homepage_v_version_populated_authors" CASCADE;
  ALTER TABLE "homepage" DROP COLUMN IF EXISTS "gradient_background_enable";
  ALTER TABLE "homepage" DROP COLUMN IF EXISTS "gradient_background_first_color";
  ALTER TABLE "homepage" DROP COLUMN IF EXISTS "gradient_background_second_color";
  ALTER TABLE "homepage" DROP COLUMN IF EXISTS "gradient_background_opacity";
  ALTER TABLE "homepage" DROP COLUMN IF EXISTS "search_input_text";
  ALTER TABLE "_homepage_v" DROP COLUMN IF EXISTS "version_gradient_background_enable";
  ALTER TABLE "_homepage_v" DROP COLUMN IF EXISTS "version_gradient_background_first_color";
  ALTER TABLE "_homepage_v" DROP COLUMN IF EXISTS "version_gradient_background_second_color";
  ALTER TABLE "_homepage_v" DROP COLUMN IF EXISTS "version_gradient_background_opacity";
  ALTER TABLE "_homepage_v" DROP COLUMN IF EXISTS "version_search_input_text";
  DROP TYPE "public"."enum_homepage_gradient_background_first_color";
  DROP TYPE "public"."enum_homepage_gradient_background_second_color";
  DROP TYPE "public"."enum__homepage_v_version_gradient_background_first_color";
  DROP TYPE "public"."enum__homepage_v_version_gradient_background_second_color";`)
}
