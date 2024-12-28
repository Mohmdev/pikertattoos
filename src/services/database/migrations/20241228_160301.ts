import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_global_settings_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_footer_v_version_columns_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_footer_v_version_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_footer_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_footer_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_global_settings_v" CASCADE;
  DROP TABLE "_footer_v_version_columns_nav_items" CASCADE;
  DROP TABLE "_footer_v_version_columns" CASCADE;
  DROP TABLE "_footer_v" CASCADE;
  DROP TABLE "_footer_v_rels" CASCADE;
  DROP INDEX IF EXISTS "global_settings__status_idx";
  DROP INDEX IF EXISTS "footer__status_idx";
  ALTER TABLE "footer_columns_nav_items" ALTER COLUMN "link_label" SET NOT NULL;
  ALTER TABLE "footer_columns" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "global_settings" DROP COLUMN IF EXISTS "_status";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "_status";
  DROP TYPE "public"."enum_global_settings_status";
  DROP TYPE "public"."enum__global_settings_v_version_status";
  DROP TYPE "public"."enum_footer_status";
  DROP TYPE "public"."enum__footer_v_version_columns_nav_items_link_type";
  DROP TYPE "public"."enum__footer_v_version_status";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_global_settings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__global_settings_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_footer_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__footer_v_version_columns_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__footer_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE IF NOT EXISTS "_global_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_site_identity_site_name" varchar,
  	"version_site_identity_site_description" varchar,
  	"version_branding_logo_id" integer,
  	"version_branding_logo_square_id" integer,
  	"version_branding_favicon_id" integer,
  	"version_contact_info_contact_name" varchar,
  	"version_contact_info_contact_email" varchar,
  	"version_contact_info_contact_phone" varchar,
  	"version_contact_info_contact_address" varchar,
  	"version_contact_info_social_media_facebook" varchar,
  	"version_contact_info_social_media_twitter" varchar,
  	"version_contact_info_social_media_instagram" varchar,
  	"version_contact_info_social_media_linkedin" varchar,
  	"version_contact_info_social_media_youtube" varchar,
  	"version_contact_info_social_media_whatsapp" varchar,
  	"version_contact_info_social_media_telegram" varchar,
  	"version_global_seo_keywords" varchar,
  	"version_global_seo_og_image_id" integer,
  	"version__status" "enum__global_settings_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_footer_v_version_columns_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__footer_v_version_columns_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_custom_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_footer_v_version_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_footer_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__footer_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_footer_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  ALTER TABLE "footer_columns_nav_items" ALTER COLUMN "link_label" DROP NOT NULL;
  ALTER TABLE "footer_columns" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "global_settings" ADD COLUMN "_status" "enum_global_settings_status" DEFAULT 'draft';
  ALTER TABLE "footer" ADD COLUMN "_status" "enum_footer_status" DEFAULT 'draft';
  DO $$ BEGIN
   ALTER TABLE "_global_settings_v" ADD CONSTRAINT "_global_settings_v_version_branding_logo_id_assets_id_fk" FOREIGN KEY ("version_branding_logo_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_global_settings_v" ADD CONSTRAINT "_global_settings_v_version_branding_logo_square_id_assets_id_fk" FOREIGN KEY ("version_branding_logo_square_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_global_settings_v" ADD CONSTRAINT "_global_settings_v_version_branding_favicon_id_assets_id_fk" FOREIGN KEY ("version_branding_favicon_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_global_settings_v" ADD CONSTRAINT "_global_settings_v_version_global_seo_og_image_id_assets_id_fk" FOREIGN KEY ("version_global_seo_og_image_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_footer_v_version_columns_nav_items" ADD CONSTRAINT "_footer_v_version_columns_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v_version_columns"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_footer_v_version_columns" ADD CONSTRAINT "_footer_v_version_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_footer_v_rels" ADD CONSTRAINT "_footer_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_footer_v_rels" ADD CONSTRAINT "_footer_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "_global_settings_v_version_branding_version_branding_logo_idx" ON "_global_settings_v" USING btree ("version_branding_logo_id");
  CREATE INDEX IF NOT EXISTS "_global_settings_v_version_branding_version_branding_logo_square_idx" ON "_global_settings_v" USING btree ("version_branding_logo_square_id");
  CREATE INDEX IF NOT EXISTS "_global_settings_v_version_branding_version_branding_favicon_idx" ON "_global_settings_v" USING btree ("version_branding_favicon_id");
  CREATE INDEX IF NOT EXISTS "_global_settings_v_version_global_seo_version_global_seo_og_image_idx" ON "_global_settings_v" USING btree ("version_global_seo_og_image_id");
  CREATE INDEX IF NOT EXISTS "_global_settings_v_version_version__status_idx" ON "_global_settings_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_global_settings_v_created_at_idx" ON "_global_settings_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_global_settings_v_updated_at_idx" ON "_global_settings_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_global_settings_v_latest_idx" ON "_global_settings_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_global_settings_v_autosave_idx" ON "_global_settings_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_footer_v_version_columns_nav_items_order_idx" ON "_footer_v_version_columns_nav_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_footer_v_version_columns_nav_items_parent_id_idx" ON "_footer_v_version_columns_nav_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_footer_v_version_columns_order_idx" ON "_footer_v_version_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_footer_v_version_columns_parent_id_idx" ON "_footer_v_version_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_footer_v_version_version__status_idx" ON "_footer_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_footer_v_created_at_idx" ON "_footer_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_footer_v_updated_at_idx" ON "_footer_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_footer_v_latest_idx" ON "_footer_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_footer_v_autosave_idx" ON "_footer_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_footer_v_rels_order_idx" ON "_footer_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_footer_v_rels_parent_idx" ON "_footer_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_footer_v_rels_path_idx" ON "_footer_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_footer_v_rels_pages_id_idx" ON "_footer_v_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "global_settings__status_idx" ON "global_settings" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "footer__status_idx" ON "footer" USING btree ("_status");`)
}
