import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_tattoo_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__tattoo_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_area_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__area_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_style_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__style_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_artist_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__artist_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_tag_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__tag_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE IF NOT EXISTS "_tattoo_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__tattoo_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_tattoo_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"area_id" integer,
  	"style_id" integer,
  	"artist_id" integer,
  	"tag_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_area_v_version_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_area_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_parent_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__area_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_style_v_version_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_style_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_parent_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__style_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_artist_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_user_id" integer,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__artist_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_artist_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"style_id" integer,
  	"tag_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_tag_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__tag_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "tattoo" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "tattoo" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "area" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "area" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "style" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "style" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "artist" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "artist" ALTER COLUMN "user_id" DROP NOT NULL;
  ALTER TABLE "artist" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "tag" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "tag" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "tattoo" ADD COLUMN "_status" "enum_tattoo_status" DEFAULT 'draft';
  ALTER TABLE "area" ADD COLUMN "_status" "enum_area_status" DEFAULT 'draft';
  ALTER TABLE "style" ADD COLUMN "_status" "enum_style_status" DEFAULT 'draft';
  ALTER TABLE "artist" ADD COLUMN "_status" "enum_artist_status" DEFAULT 'draft';
  ALTER TABLE "tag" ADD COLUMN "_status" "enum_tag_status" DEFAULT 'draft';
  DO $$ BEGIN
   ALTER TABLE "_tattoo_v" ADD CONSTRAINT "_tattoo_v_parent_id_tattoo_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tattoo"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tattoo_v" ADD CONSTRAINT "_tattoo_v_version_meta_image_id_assets_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tattoo_v_rels" ADD CONSTRAINT "_tattoo_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_tattoo_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tattoo_v_rels" ADD CONSTRAINT "_tattoo_v_rels_area_fk" FOREIGN KEY ("area_id") REFERENCES "public"."area"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tattoo_v_rels" ADD CONSTRAINT "_tattoo_v_rels_style_fk" FOREIGN KEY ("style_id") REFERENCES "public"."style"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tattoo_v_rels" ADD CONSTRAINT "_tattoo_v_rels_artist_fk" FOREIGN KEY ("artist_id") REFERENCES "public"."artist"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tattoo_v_rels" ADD CONSTRAINT "_tattoo_v_rels_tag_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_area_v_version_breadcrumbs" ADD CONSTRAINT "_area_v_version_breadcrumbs_doc_id_area_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."area"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_area_v_version_breadcrumbs" ADD CONSTRAINT "_area_v_version_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_area_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_area_v" ADD CONSTRAINT "_area_v_parent_id_area_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."area"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_area_v" ADD CONSTRAINT "_area_v_version_parent_id_area_id_fk" FOREIGN KEY ("version_parent_id") REFERENCES "public"."area"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_style_v_version_breadcrumbs" ADD CONSTRAINT "_style_v_version_breadcrumbs_doc_id_style_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."style"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_style_v_version_breadcrumbs" ADD CONSTRAINT "_style_v_version_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_style_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_style_v" ADD CONSTRAINT "_style_v_parent_id_style_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."style"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_style_v" ADD CONSTRAINT "_style_v_version_parent_id_style_id_fk" FOREIGN KEY ("version_parent_id") REFERENCES "public"."style"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_artist_v" ADD CONSTRAINT "_artist_v_parent_id_artist_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."artist"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_artist_v" ADD CONSTRAINT "_artist_v_version_user_id_users_id_fk" FOREIGN KEY ("version_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_artist_v" ADD CONSTRAINT "_artist_v_version_meta_image_id_assets_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_artist_v_rels" ADD CONSTRAINT "_artist_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_artist_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_artist_v_rels" ADD CONSTRAINT "_artist_v_rels_style_fk" FOREIGN KEY ("style_id") REFERENCES "public"."style"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_artist_v_rels" ADD CONSTRAINT "_artist_v_rels_tag_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tag_v" ADD CONSTRAINT "_tag_v_parent_id_tag_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tag"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tag_v" ADD CONSTRAINT "_tag_v_version_meta_image_id_assets_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "_tattoo_v_parent_idx" ON "_tattoo_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_tattoo_v_version_version_slug_idx" ON "_tattoo_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_tattoo_v_version_meta_version_meta_image_idx" ON "_tattoo_v" USING btree ("version_meta_image_id");
  CREATE INDEX IF NOT EXISTS "_tattoo_v_version_version_updated_at_idx" ON "_tattoo_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_tattoo_v_version_version_created_at_idx" ON "_tattoo_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_tattoo_v_version_version__status_idx" ON "_tattoo_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_tattoo_v_created_at_idx" ON "_tattoo_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_tattoo_v_updated_at_idx" ON "_tattoo_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_tattoo_v_latest_idx" ON "_tattoo_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_tattoo_v_autosave_idx" ON "_tattoo_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_tattoo_v_rels_order_idx" ON "_tattoo_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_tattoo_v_rels_parent_idx" ON "_tattoo_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_tattoo_v_rels_path_idx" ON "_tattoo_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_tattoo_v_rels_area_id_idx" ON "_tattoo_v_rels" USING btree ("area_id");
  CREATE INDEX IF NOT EXISTS "_tattoo_v_rels_style_id_idx" ON "_tattoo_v_rels" USING btree ("style_id");
  CREATE INDEX IF NOT EXISTS "_tattoo_v_rels_artist_id_idx" ON "_tattoo_v_rels" USING btree ("artist_id");
  CREATE INDEX IF NOT EXISTS "_tattoo_v_rels_tag_id_idx" ON "_tattoo_v_rels" USING btree ("tag_id");
  CREATE INDEX IF NOT EXISTS "_area_v_version_breadcrumbs_order_idx" ON "_area_v_version_breadcrumbs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_area_v_version_breadcrumbs_parent_id_idx" ON "_area_v_version_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_area_v_version_breadcrumbs_doc_idx" ON "_area_v_version_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX IF NOT EXISTS "_area_v_parent_idx" ON "_area_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_area_v_version_version_slug_idx" ON "_area_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_area_v_version_version_parent_idx" ON "_area_v" USING btree ("version_parent_id");
  CREATE INDEX IF NOT EXISTS "_area_v_version_version_updated_at_idx" ON "_area_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_area_v_version_version_created_at_idx" ON "_area_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_area_v_version_version__status_idx" ON "_area_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_area_v_created_at_idx" ON "_area_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_area_v_updated_at_idx" ON "_area_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_area_v_latest_idx" ON "_area_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_style_v_version_breadcrumbs_order_idx" ON "_style_v_version_breadcrumbs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_style_v_version_breadcrumbs_parent_id_idx" ON "_style_v_version_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_style_v_version_breadcrumbs_doc_idx" ON "_style_v_version_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX IF NOT EXISTS "_style_v_parent_idx" ON "_style_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_style_v_version_version_slug_idx" ON "_style_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_style_v_version_version_parent_idx" ON "_style_v" USING btree ("version_parent_id");
  CREATE INDEX IF NOT EXISTS "_style_v_version_version_updated_at_idx" ON "_style_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_style_v_version_version_created_at_idx" ON "_style_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_style_v_version_version__status_idx" ON "_style_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_style_v_created_at_idx" ON "_style_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_style_v_updated_at_idx" ON "_style_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_style_v_latest_idx" ON "_style_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_artist_v_parent_idx" ON "_artist_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_artist_v_version_version_user_idx" ON "_artist_v" USING btree ("version_user_id");
  CREATE INDEX IF NOT EXISTS "_artist_v_version_version_slug_idx" ON "_artist_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_artist_v_version_meta_version_meta_image_idx" ON "_artist_v" USING btree ("version_meta_image_id");
  CREATE INDEX IF NOT EXISTS "_artist_v_version_version_updated_at_idx" ON "_artist_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_artist_v_version_version_created_at_idx" ON "_artist_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_artist_v_version_version__status_idx" ON "_artist_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_artist_v_created_at_idx" ON "_artist_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_artist_v_updated_at_idx" ON "_artist_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_artist_v_latest_idx" ON "_artist_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_artist_v_rels_order_idx" ON "_artist_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_artist_v_rels_parent_idx" ON "_artist_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_artist_v_rels_path_idx" ON "_artist_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_artist_v_rels_style_id_idx" ON "_artist_v_rels" USING btree ("style_id");
  CREATE INDEX IF NOT EXISTS "_artist_v_rels_tag_id_idx" ON "_artist_v_rels" USING btree ("tag_id");
  CREATE INDEX IF NOT EXISTS "_tag_v_parent_idx" ON "_tag_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_tag_v_version_version_slug_idx" ON "_tag_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_tag_v_version_meta_version_meta_image_idx" ON "_tag_v" USING btree ("version_meta_image_id");
  CREATE INDEX IF NOT EXISTS "_tag_v_version_version_updated_at_idx" ON "_tag_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_tag_v_version_version_created_at_idx" ON "_tag_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_tag_v_version_version__status_idx" ON "_tag_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_tag_v_created_at_idx" ON "_tag_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_tag_v_updated_at_idx" ON "_tag_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_tag_v_latest_idx" ON "_tag_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "tattoo__status_idx" ON "tattoo" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "area__status_idx" ON "area" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "style__status_idx" ON "style" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "artist__status_idx" ON "artist" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "tag__status_idx" ON "tag" USING btree ("_status");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_tattoo_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tattoo_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_area_v_version_breadcrumbs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_area_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_style_v_version_breadcrumbs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_style_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_artist_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_artist_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tag_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_tattoo_v" CASCADE;
  DROP TABLE "_tattoo_v_rels" CASCADE;
  DROP TABLE "_area_v_version_breadcrumbs" CASCADE;
  DROP TABLE "_area_v" CASCADE;
  DROP TABLE "_style_v_version_breadcrumbs" CASCADE;
  DROP TABLE "_style_v" CASCADE;
  DROP TABLE "_artist_v" CASCADE;
  DROP TABLE "_artist_v_rels" CASCADE;
  DROP TABLE "_tag_v" CASCADE;
  DROP INDEX IF EXISTS "tattoo__status_idx";
  DROP INDEX IF EXISTS "area__status_idx";
  DROP INDEX IF EXISTS "style__status_idx";
  DROP INDEX IF EXISTS "artist__status_idx";
  DROP INDEX IF EXISTS "tag__status_idx";
  ALTER TABLE "tattoo" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "tattoo" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "area" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "area" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "style" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "style" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "artist" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "artist" ALTER COLUMN "user_id" SET NOT NULL;
  ALTER TABLE "artist" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "tag" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "tag" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "tattoo" DROP COLUMN IF EXISTS "_status";
  ALTER TABLE "area" DROP COLUMN IF EXISTS "_status";
  ALTER TABLE "style" DROP COLUMN IF EXISTS "_status";
  ALTER TABLE "artist" DROP COLUMN IF EXISTS "_status";
  ALTER TABLE "tag" DROP COLUMN IF EXISTS "_status";
  DROP TYPE "public"."enum_tattoo_status";
  DROP TYPE "public"."enum__tattoo_v_version_status";
  DROP TYPE "public"."enum_area_status";
  DROP TYPE "public"."enum__area_v_version_status";
  DROP TYPE "public"."enum_style_status";
  DROP TYPE "public"."enum__style_v_version_status";
  DROP TYPE "public"."enum_artist_status";
  DROP TYPE "public"."enum__artist_v_version_status";
  DROP TYPE "public"."enum_tag_status";
  DROP TYPE "public"."enum__tag_v_version_status";`)
}
