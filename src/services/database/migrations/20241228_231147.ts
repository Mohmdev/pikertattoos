import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_breadcrumbs_bar_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_hero_primary_buttons_type" AS ENUM('link', 'npmCta');
  CREATE TYPE "public"."enum_pages_hero_primary_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_hero_links_link_appearance" AS ENUM('default', 'primary', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_link_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_link_link_appearance" AS ENUM('default', 'primary', 'secondary');
  CREATE TYPE "public"."enum_pages_hero_secondary_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('default', 'contentMedia', 'centeredContent', 'form', 'home', 'homeNew', 'livestream', 'gradient', 'three');
  CREATE TYPE "public"."enum_pages_hero_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_pages_hero_announcement_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_hero_three_c_t_a" AS ENUM('newsletter', 'buttons');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_hero_breadcrumbs_bar_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_hero_primary_buttons_type" AS ENUM('link', 'npmCta');
  CREATE TYPE "public"."enum__pages_v_version_hero_primary_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_appearance" AS ENUM('default', 'primary', 'secondary');
  CREATE TYPE "public"."enum__pages_v_blocks_link_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_link_link_appearance" AS ENUM('default', 'primary', 'secondary');
  CREATE TYPE "public"."enum__pages_v_version_hero_secondary_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('default', 'contentMedia', 'centeredContent', 'form', 'home', 'homeNew', 'livestream', 'gradient', 'three');
  CREATE TYPE "public"."enum__pages_v_version_hero_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum__pages_v_version_hero_announcement_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_hero_three_c_t_a" AS ENUM('newsletter', 'buttons');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor', 'public');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_main_menu_tabs_description_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_main_menu_tabs_nav_items_featured_link_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_main_menu_tabs_nav_items_list_links_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_main_menu_tabs_nav_items_style" AS ENUM('default', 'featured', 'list');
  CREATE TYPE "public"."enum_main_menu_tabs_nav_items_default_link_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_main_menu_tabs_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_main_menu_menu_cta_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_columns_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE IF NOT EXISTS "pages_hero_breadcrumbs_bar_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_hero_breadcrumbs_bar_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_custom_id" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_hero_primary_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_hero_primary_buttons_type" DEFAULT 'link',
  	"npm_cta_label" varchar,
  	"link_type" "enum_pages_hero_primary_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_custom_id" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_custom_id" varchar,
  	"link_appearance" "enum_pages_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_link_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_custom_id" varchar,
  	"link_appearance" "enum_pages_blocks_link_link_appearance" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_command" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"command" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_hero_secondary_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_hero_secondary_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_custom_id" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_hero_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_hero_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_media_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"full_title" varchar,
  	"noindex" boolean,
  	"hero_type" "enum_pages_hero_type" DEFAULT 'default',
  	"hero_full_background" boolean,
  	"hero_theme" "enum_pages_hero_theme",
  	"hero_enable_breadcrumbs_bar" boolean,
  	"hero_enable_announcement" boolean,
  	"hero_announcement_link_type" "enum_pages_hero_announcement_link_type" DEFAULT 'reference',
  	"hero_announcement_link_new_tab" boolean,
  	"hero_announcement_link_url" varchar,
  	"hero_announcement_link_label" varchar,
  	"hero_announcement_link_custom_id" varchar,
  	"hero_rich_text" jsonb,
  	"hero_description" jsonb,
  	"hero_secondary_heading" jsonb,
  	"hero_secondary_description" jsonb,
  	"hero_three_c_t_a" "enum_pages_hero_three_c_t_a",
  	"hero_newsletter_placeholder" varchar,
  	"hero_newsletter_description" varchar,
  	"hero_enable_media" boolean DEFAULT false,
  	"hero_media_id" integer,
  	"hero_secondary_media_id" integer,
  	"hero_feature_video_id" integer,
  	"hero_form_id" integer,
  	"hero_logo_showcase_label" jsonb,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"tattoo_id" integer,
  	"tag_id" integer,
  	"artist_id" integer,
  	"area_id" integer,
  	"style_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_breadcrumbs_bar_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_version_hero_breadcrumbs_bar_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_custom_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_primary_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_version_hero_primary_buttons_type" DEFAULT 'link',
  	"npm_cta_label" varchar,
  	"link_type" "enum__pages_v_version_hero_primary_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_custom_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_custom_id" varchar,
  	"link_appearance" "enum__pages_v_version_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_link_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_custom_id" varchar,
  	"link_appearance" "enum__pages_v_blocks_link_link_appearance" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_command" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"command" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_secondary_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_version_hero_secondary_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_custom_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_media_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_version_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_full_title" varchar,
  	"version_noindex" boolean,
  	"version_hero_type" "enum__pages_v_version_hero_type" DEFAULT 'default',
  	"version_hero_full_background" boolean,
  	"version_hero_theme" "enum__pages_v_version_hero_theme",
  	"version_hero_enable_breadcrumbs_bar" boolean,
  	"version_hero_enable_announcement" boolean,
  	"version_hero_announcement_link_type" "enum__pages_v_version_hero_announcement_link_type" DEFAULT 'reference',
  	"version_hero_announcement_link_new_tab" boolean,
  	"version_hero_announcement_link_url" varchar,
  	"version_hero_announcement_link_label" varchar,
  	"version_hero_announcement_link_custom_id" varchar,
  	"version_hero_rich_text" jsonb,
  	"version_hero_description" jsonb,
  	"version_hero_secondary_heading" jsonb,
  	"version_hero_secondary_description" jsonb,
  	"version_hero_three_c_t_a" "enum__pages_v_version_hero_three_c_t_a",
  	"version_hero_newsletter_placeholder" varchar,
  	"version_hero_newsletter_description" varchar,
  	"version_hero_enable_media" boolean DEFAULT false,
  	"version_hero_media_id" integer,
  	"version_hero_secondary_media_id" integer,
  	"version_hero_feature_video_id" integer,
  	"version_hero_form_id" integer,
  	"version_hero_logo_showcase_label" jsonb,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_parent_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"tattoo_id" integer,
  	"tag_id" integer,
  	"artist_id" integer,
  	"area_id" integer,
  	"style_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "tattoo" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "tattoo_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"area_id" integer,
  	"style_id" integer,
  	"artist_id" integer,
  	"tag_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "area_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "area" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"slug_lock" boolean DEFAULT true,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "style_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "style" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"slug_lock" boolean DEFAULT true,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "artist" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"user_id" integer NOT NULL,
  	"slug" varchar NOT NULL,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "artist_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"style_id" integer,
  	"tag_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "tag" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"alt" varchar NOT NULL,
  	"alt_lock" boolean DEFAULT true,
  	"caption" jsonb,
  	"prefix" varchar DEFAULT 'media',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_xlarge_url" varchar,
  	"sizes_xlarge_width" numeric,
  	"sizes_xlarge_height" numeric,
  	"sizes_xlarge_mime_type" varchar,
  	"sizes_xlarge_filesize" numeric,
  	"sizes_xlarge_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "assets" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"alt" varchar NOT NULL,
  	"alt_lock" boolean DEFAULT true,
  	"asset_dark_mode_fallback_id" integer,
  	"prefix" varchar DEFAULT 'assets',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "user_photo" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar,
  	"last_name" varchar,
  	"photo_id" integer,
  	"role" "enum_users_role" DEFAULT 'public' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar,
  	"username" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"_verified" boolean,
  	"_verificationtoken" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar,
  	"subject" varchar DEFAULT 'You''''ve received a new message.' NOT NULL,
  	"message" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"submit_button_label" varchar,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"confirmation_message" jsonb,
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "search_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"relation_to" varchar,
  	"title" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "search" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"priority" numeric,
  	"slug" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "search_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tattoo_id" integer,
  	"artist_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"tattoo_id" integer,
  	"area_id" integer,
  	"style_id" integer,
  	"artist_id" integer,
  	"tag_id" integer,
  	"media_id" integer,
  	"assets_id" integer,
  	"user_photo_id" integer,
  	"users_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer,
  	"search_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "global_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_identity_site_name" varchar,
  	"site_identity_site_description" varchar,
  	"branding_logo_id" integer,
  	"branding_logo_square_id" integer,
  	"branding_favicon_id" integer,
  	"contact_info_contact_name" varchar,
  	"contact_info_contact_email" varchar,
  	"contact_info_contact_phone" varchar,
  	"contact_info_contact_address" varchar,
  	"contact_info_social_media_facebook" varchar,
  	"contact_info_social_media_twitter" varchar,
  	"contact_info_social_media_instagram" varchar,
  	"contact_info_social_media_linkedin" varchar,
  	"contact_info_social_media_youtube" varchar,
  	"contact_info_social_media_whatsapp" varchar,
  	"contact_info_social_media_telegram" varchar,
  	"global_seo_keywords" varchar,
  	"global_seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "main_menu_tabs_description_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_main_menu_tabs_description_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_custom_id" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "main_menu_tabs_nav_items_featured_link_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_main_menu_tabs_nav_items_featured_link_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_custom_id" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "main_menu_tabs_nav_items_list_links_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_main_menu_tabs_nav_items_list_links_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_custom_id" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "main_menu_tabs_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_main_menu_tabs_nav_items_style" DEFAULT 'default',
  	"default_link_link_type" "enum_main_menu_tabs_nav_items_default_link_link_type" DEFAULT 'reference',
  	"default_link_link_new_tab" boolean,
  	"default_link_link_url" varchar,
  	"default_link_link_label" varchar,
  	"default_link_link_custom_id" varchar,
  	"default_link_description" varchar,
  	"featured_link_tag" varchar,
  	"featured_link_label" jsonb,
  	"list_links_tag" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "main_menu_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"enable_direct_link" boolean,
  	"enable_dropdown" boolean,
  	"link_type" "enum_main_menu_tabs_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_custom_id" varchar,
  	"description" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "main_menu" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"menu_cta_type" "enum_main_menu_menu_cta_type" DEFAULT 'reference',
  	"menu_cta_new_tab" boolean,
  	"menu_cta_url" varchar,
  	"menu_cta_label" varchar NOT NULL,
  	"menu_cta_custom_id" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "main_menu_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"tattoo_id" integer,
  	"tag_id" integer,
  	"artist_id" integer,
  	"area_id" integer,
  	"style_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "footer_columns_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_columns_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_custom_id" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"tattoo_id" integer,
  	"tag_id" integer,
  	"artist_id" integer,
  	"area_id" integer,
  	"style_id" integer
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_hero_breadcrumbs_bar_links" ADD CONSTRAINT "pages_hero_breadcrumbs_bar_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_hero_primary_buttons" ADD CONSTRAINT "pages_hero_primary_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_hero_links" ADD CONSTRAINT "pages_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_link" ADD CONSTRAINT "pages_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_command" ADD CONSTRAINT "pages_blocks_command_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_hero_secondary_buttons" ADD CONSTRAINT "pages_hero_secondary_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_hero_images" ADD CONSTRAINT "pages_hero_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_hero_images" ADD CONSTRAINT "pages_hero_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_hero_logos" ADD CONSTRAINT "pages_hero_logos_logo_media_id_media_id_fk" FOREIGN KEY ("logo_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_hero_logos" ADD CONSTRAINT "pages_hero_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_breadcrumbs" ADD CONSTRAINT "pages_breadcrumbs_doc_id_pages_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_breadcrumbs" ADD CONSTRAINT "pages_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_secondary_media_id_media_id_fk" FOREIGN KEY ("hero_secondary_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_feature_video_id_media_id_fk" FOREIGN KEY ("hero_feature_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_form_id_forms_id_fk" FOREIGN KEY ("hero_form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_tattoo_fk" FOREIGN KEY ("tattoo_id") REFERENCES "public"."tattoo"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_tag_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_artist_fk" FOREIGN KEY ("artist_id") REFERENCES "public"."artist"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_area_fk" FOREIGN KEY ("area_id") REFERENCES "public"."area"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_style_fk" FOREIGN KEY ("style_id") REFERENCES "public"."style"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_breadcrumbs_bar_links" ADD CONSTRAINT "_pages_v_version_hero_breadcrumbs_bar_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_primary_buttons" ADD CONSTRAINT "_pages_v_version_hero_primary_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_link" ADD CONSTRAINT "_pages_v_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_command" ADD CONSTRAINT "_pages_v_blocks_command_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_secondary_buttons" ADD CONSTRAINT "_pages_v_version_hero_secondary_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_images" ADD CONSTRAINT "_pages_v_version_hero_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_images" ADD CONSTRAINT "_pages_v_version_hero_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_logos" ADD CONSTRAINT "_pages_v_version_hero_logos_logo_media_id_media_id_fk" FOREIGN KEY ("logo_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_logos" ADD CONSTRAINT "_pages_v_version_hero_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_breadcrumbs" ADD CONSTRAINT "_pages_v_version_breadcrumbs_doc_id_pages_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_breadcrumbs" ADD CONSTRAINT "_pages_v_version_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_secondary_media_id_media_id_fk" FOREIGN KEY ("version_hero_secondary_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_feature_video_id_media_id_fk" FOREIGN KEY ("version_hero_feature_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_form_id_forms_id_fk" FOREIGN KEY ("version_hero_form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_parent_id_pages_id_fk" FOREIGN KEY ("version_parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_tattoo_fk" FOREIGN KEY ("tattoo_id") REFERENCES "public"."tattoo"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_tag_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_artist_fk" FOREIGN KEY ("artist_id") REFERENCES "public"."artist"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_area_fk" FOREIGN KEY ("area_id") REFERENCES "public"."area"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_style_fk" FOREIGN KEY ("style_id") REFERENCES "public"."style"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tattoo_rels" ADD CONSTRAINT "tattoo_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tattoo"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tattoo_rels" ADD CONSTRAINT "tattoo_rels_area_fk" FOREIGN KEY ("area_id") REFERENCES "public"."area"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tattoo_rels" ADD CONSTRAINT "tattoo_rels_style_fk" FOREIGN KEY ("style_id") REFERENCES "public"."style"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tattoo_rels" ADD CONSTRAINT "tattoo_rels_artist_fk" FOREIGN KEY ("artist_id") REFERENCES "public"."artist"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tattoo_rels" ADD CONSTRAINT "tattoo_rels_tag_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "area_breadcrumbs" ADD CONSTRAINT "area_breadcrumbs_doc_id_area_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."area"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "area_breadcrumbs" ADD CONSTRAINT "area_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."area"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "area" ADD CONSTRAINT "area_parent_id_area_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."area"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "style_breadcrumbs" ADD CONSTRAINT "style_breadcrumbs_doc_id_style_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."style"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "style_breadcrumbs" ADD CONSTRAINT "style_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."style"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "style" ADD CONSTRAINT "style_parent_id_style_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."style"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "artist" ADD CONSTRAINT "artist_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "artist_rels" ADD CONSTRAINT "artist_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."artist"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "artist_rels" ADD CONSTRAINT "artist_rels_style_fk" FOREIGN KEY ("style_id") REFERENCES "public"."style"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "artist_rels" ADD CONSTRAINT "artist_rels_tag_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "assets" ADD CONSTRAINT "assets_asset_dark_mode_fallback_id_assets_id_fk" FOREIGN KEY ("asset_dark_mode_fallback_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "users" ADD CONSTRAINT "users_photo_id_user_photo_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."user_photo"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search_categories" ADD CONSTRAINT "search_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search" ADD CONSTRAINT "search_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_tattoo_fk" FOREIGN KEY ("tattoo_id") REFERENCES "public"."tattoo"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_artist_fk" FOREIGN KEY ("artist_id") REFERENCES "public"."artist"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tattoo_fk" FOREIGN KEY ("tattoo_id") REFERENCES "public"."tattoo"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_area_fk" FOREIGN KEY ("area_id") REFERENCES "public"."area"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_style_fk" FOREIGN KEY ("style_id") REFERENCES "public"."style"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_artist_fk" FOREIGN KEY ("artist_id") REFERENCES "public"."artist"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tag_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_assets_fk" FOREIGN KEY ("assets_id") REFERENCES "public"."assets"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_user_photo_fk" FOREIGN KEY ("user_photo_id") REFERENCES "public"."user_photo"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_search_fk" FOREIGN KEY ("search_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "global_settings" ADD CONSTRAINT "global_settings_branding_logo_id_assets_id_fk" FOREIGN KEY ("branding_logo_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "global_settings" ADD CONSTRAINT "global_settings_branding_logo_square_id_assets_id_fk" FOREIGN KEY ("branding_logo_square_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "global_settings" ADD CONSTRAINT "global_settings_branding_favicon_id_assets_id_fk" FOREIGN KEY ("branding_favicon_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "global_settings" ADD CONSTRAINT "global_settings_global_seo_og_image_id_assets_id_fk" FOREIGN KEY ("global_seo_og_image_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "main_menu_tabs_description_links" ADD CONSTRAINT "main_menu_tabs_description_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_menu_tabs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "main_menu_tabs_nav_items_featured_link_links" ADD CONSTRAINT "main_menu_tabs_nav_items_featured_link_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_menu_tabs_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "main_menu_tabs_nav_items_list_links_links" ADD CONSTRAINT "main_menu_tabs_nav_items_list_links_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_menu_tabs_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "main_menu_tabs_nav_items" ADD CONSTRAINT "main_menu_tabs_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_menu_tabs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "main_menu_tabs" ADD CONSTRAINT "main_menu_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_menu"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "main_menu_rels" ADD CONSTRAINT "main_menu_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."main_menu"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "main_menu_rels" ADD CONSTRAINT "main_menu_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "main_menu_rels" ADD CONSTRAINT "main_menu_rels_tattoo_fk" FOREIGN KEY ("tattoo_id") REFERENCES "public"."tattoo"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "main_menu_rels" ADD CONSTRAINT "main_menu_rels_tag_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "main_menu_rels" ADD CONSTRAINT "main_menu_rels_artist_fk" FOREIGN KEY ("artist_id") REFERENCES "public"."artist"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "main_menu_rels" ADD CONSTRAINT "main_menu_rels_area_fk" FOREIGN KEY ("area_id") REFERENCES "public"."area"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "main_menu_rels" ADD CONSTRAINT "main_menu_rels_style_fk" FOREIGN KEY ("style_id") REFERENCES "public"."style"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_columns_nav_items" ADD CONSTRAINT "footer_columns_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_tattoo_fk" FOREIGN KEY ("tattoo_id") REFERENCES "public"."tattoo"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_tag_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_artist_fk" FOREIGN KEY ("artist_id") REFERENCES "public"."artist"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_area_fk" FOREIGN KEY ("area_id") REFERENCES "public"."area"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_style_fk" FOREIGN KEY ("style_id") REFERENCES "public"."style"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_hero_breadcrumbs_bar_links_order_idx" ON "pages_hero_breadcrumbs_bar_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_hero_breadcrumbs_bar_links_parent_id_idx" ON "pages_hero_breadcrumbs_bar_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_hero_primary_buttons_order_idx" ON "pages_hero_primary_buttons" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_hero_primary_buttons_parent_id_idx" ON "pages_hero_primary_buttons" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_hero_links_order_idx" ON "pages_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_hero_links_parent_id_idx" ON "pages_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_link_order_idx" ON "pages_blocks_link" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_link_parent_id_idx" ON "pages_blocks_link" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_link_path_idx" ON "pages_blocks_link" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_command_order_idx" ON "pages_blocks_command" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_command_parent_id_idx" ON "pages_blocks_command" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_command_path_idx" ON "pages_blocks_command" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_hero_secondary_buttons_order_idx" ON "pages_hero_secondary_buttons" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_hero_secondary_buttons_parent_id_idx" ON "pages_hero_secondary_buttons" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_hero_images_order_idx" ON "pages_hero_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_hero_images_parent_id_idx" ON "pages_hero_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_hero_images_image_idx" ON "pages_hero_images" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_hero_logos_order_idx" ON "pages_hero_logos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_hero_logos_parent_id_idx" ON "pages_hero_logos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_hero_logos_logo_media_idx" ON "pages_hero_logos" USING btree ("logo_media_id");
  CREATE INDEX IF NOT EXISTS "pages_breadcrumbs_order_idx" ON "pages_breadcrumbs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_breadcrumbs_parent_id_idx" ON "pages_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_breadcrumbs_doc_idx" ON "pages_breadcrumbs" USING btree ("doc_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_title_idx" ON "pages" USING btree ("title");
  CREATE INDEX IF NOT EXISTS "pages_hero_hero_media_idx" ON "pages" USING btree ("hero_media_id");
  CREATE INDEX IF NOT EXISTS "pages_hero_hero_secondary_media_idx" ON "pages" USING btree ("hero_secondary_media_id");
  CREATE INDEX IF NOT EXISTS "pages_hero_hero_feature_video_idx" ON "pages" USING btree ("hero_feature_video_id");
  CREATE INDEX IF NOT EXISTS "pages_hero_hero_form_idx" ON "pages" USING btree ("hero_form_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "pages_parent_idx" ON "pages" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_tattoo_id_idx" ON "pages_rels" USING btree ("tattoo_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_tag_id_idx" ON "pages_rels" USING btree ("tag_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_artist_id_idx" ON "pages_rels" USING btree ("artist_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_area_id_idx" ON "pages_rels" USING btree ("area_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_style_id_idx" ON "pages_rels" USING btree ("style_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_media_id_idx" ON "pages_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_users_id_idx" ON "pages_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_breadcrumbs_bar_links_order_idx" ON "_pages_v_version_hero_breadcrumbs_bar_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_breadcrumbs_bar_links_parent_id_idx" ON "_pages_v_version_hero_breadcrumbs_bar_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_primary_buttons_order_idx" ON "_pages_v_version_hero_primary_buttons" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_primary_buttons_parent_id_idx" ON "_pages_v_version_hero_primary_buttons" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_order_idx" ON "_pages_v_version_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_parent_id_idx" ON "_pages_v_version_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_link_order_idx" ON "_pages_v_blocks_link" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_link_parent_id_idx" ON "_pages_v_blocks_link" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_link_path_idx" ON "_pages_v_blocks_link" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_command_order_idx" ON "_pages_v_blocks_command" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_command_parent_id_idx" ON "_pages_v_blocks_command" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_command_path_idx" ON "_pages_v_blocks_command" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_secondary_buttons_order_idx" ON "_pages_v_version_hero_secondary_buttons" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_secondary_buttons_parent_id_idx" ON "_pages_v_version_hero_secondary_buttons" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_images_order_idx" ON "_pages_v_version_hero_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_images_parent_id_idx" ON "_pages_v_version_hero_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_images_image_idx" ON "_pages_v_version_hero_images" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_logos_order_idx" ON "_pages_v_version_hero_logos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_logos_parent_id_idx" ON "_pages_v_version_hero_logos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_logos_logo_media_idx" ON "_pages_v_version_hero_logos" USING btree ("logo_media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_breadcrumbs_order_idx" ON "_pages_v_version_breadcrumbs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_breadcrumbs_parent_id_idx" ON "_pages_v_version_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_breadcrumbs_doc_idx" ON "_pages_v_version_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_title_idx" ON "_pages_v" USING btree ("version_title");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_version_hero_media_idx" ON "_pages_v" USING btree ("version_hero_media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_version_hero_secondary_media_idx" ON "_pages_v" USING btree ("version_hero_secondary_media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_version_hero_feature_video_idx" ON "_pages_v" USING btree ("version_hero_feature_video_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_version_hero_form_idx" ON "_pages_v" USING btree ("version_hero_form_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_parent_idx" ON "_pages_v" USING btree ("version_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_tattoo_id_idx" ON "_pages_v_rels" USING btree ("tattoo_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_tag_id_idx" ON "_pages_v_rels" USING btree ("tag_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_artist_id_idx" ON "_pages_v_rels" USING btree ("artist_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_area_id_idx" ON "_pages_v_rels" USING btree ("area_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_style_id_idx" ON "_pages_v_rels" USING btree ("style_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_media_id_idx" ON "_pages_v_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_users_id_idx" ON "_pages_v_rels" USING btree ("users_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "tattoo_slug_idx" ON "tattoo" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "tattoo_updated_at_idx" ON "tattoo" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "tattoo_created_at_idx" ON "tattoo" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "tattoo_rels_order_idx" ON "tattoo_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "tattoo_rels_parent_idx" ON "tattoo_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "tattoo_rels_path_idx" ON "tattoo_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "tattoo_rels_area_id_idx" ON "tattoo_rels" USING btree ("area_id");
  CREATE INDEX IF NOT EXISTS "tattoo_rels_style_id_idx" ON "tattoo_rels" USING btree ("style_id");
  CREATE INDEX IF NOT EXISTS "tattoo_rels_artist_id_idx" ON "tattoo_rels" USING btree ("artist_id");
  CREATE INDEX IF NOT EXISTS "tattoo_rels_tag_id_idx" ON "tattoo_rels" USING btree ("tag_id");
  CREATE INDEX IF NOT EXISTS "area_breadcrumbs_order_idx" ON "area_breadcrumbs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "area_breadcrumbs_parent_id_idx" ON "area_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "area_breadcrumbs_doc_idx" ON "area_breadcrumbs" USING btree ("doc_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "area_slug_idx" ON "area" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "area_parent_idx" ON "area" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "area_updated_at_idx" ON "area" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "area_created_at_idx" ON "area" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "style_breadcrumbs_order_idx" ON "style_breadcrumbs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "style_breadcrumbs_parent_id_idx" ON "style_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "style_breadcrumbs_doc_idx" ON "style_breadcrumbs" USING btree ("doc_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "style_slug_idx" ON "style" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "style_parent_idx" ON "style" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "style_updated_at_idx" ON "style" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "style_created_at_idx" ON "style" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "artist_user_idx" ON "artist" USING btree ("user_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "artist_slug_idx" ON "artist" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "artist_updated_at_idx" ON "artist" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "artist_created_at_idx" ON "artist" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "artist_rels_order_idx" ON "artist_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "artist_rels_parent_idx" ON "artist_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "artist_rels_path_idx" ON "artist_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "artist_rels_style_id_idx" ON "artist_rels" USING btree ("style_id");
  CREATE INDEX IF NOT EXISTS "artist_rels_tag_id_idx" ON "artist_rels" USING btree ("tag_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "tag_slug_idx" ON "tag" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "tag_updated_at_idx" ON "tag" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "tag_created_at_idx" ON "tag" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "media_alt_idx" ON "media" USING btree ("alt");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX IF NOT EXISTS "assets_alt_idx" ON "assets" USING btree ("alt");
  CREATE INDEX IF NOT EXISTS "assets_asset_dark_mode_fallback_idx" ON "assets" USING btree ("asset_dark_mode_fallback_id");
  CREATE INDEX IF NOT EXISTS "assets_updated_at_idx" ON "assets" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "assets_created_at_idx" ON "assets" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "assets_filename_idx" ON "assets" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "user_photo_updated_at_idx" ON "user_photo" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "user_photo_created_at_idx" ON "user_photo" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "user_photo_filename_idx" ON "user_photo" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "user_photo_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "user_photo" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX IF NOT EXISTS "user_photo_sizes_square_sizes_square_filename_idx" ON "user_photo" USING btree ("sizes_square_filename");
  CREATE INDEX IF NOT EXISTS "user_photo_sizes_small_sizes_small_filename_idx" ON "user_photo" USING btree ("sizes_small_filename");
  CREATE INDEX IF NOT EXISTS "user_photo_sizes_medium_sizes_medium_filename_idx" ON "user_photo" USING btree ("sizes_medium_filename");
  CREATE INDEX IF NOT EXISTS "users_photo_idx" ON "users" USING btree ("photo_id");
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_username_idx" ON "users" USING btree ("username");
  CREATE INDEX IF NOT EXISTS "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "search_categories_order_idx" ON "search_categories" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "search_categories_parent_id_idx" ON "search_categories" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "search_slug_idx" ON "search" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "search_meta_meta_image_idx" ON "search" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "search_updated_at_idx" ON "search" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "search_created_at_idx" ON "search" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "search_rels_order_idx" ON "search_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "search_rels_parent_idx" ON "search_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "search_rels_path_idx" ON "search_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "search_rels_tattoo_id_idx" ON "search_rels" USING btree ("tattoo_id");
  CREATE INDEX IF NOT EXISTS "search_rels_artist_id_idx" ON "search_rels" USING btree ("artist_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_tattoo_id_idx" ON "payload_locked_documents_rels" USING btree ("tattoo_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_area_id_idx" ON "payload_locked_documents_rels" USING btree ("area_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_style_id_idx" ON "payload_locked_documents_rels" USING btree ("style_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_artist_id_idx" ON "payload_locked_documents_rels" USING btree ("artist_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_tag_id_idx" ON "payload_locked_documents_rels" USING btree ("tag_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_assets_id_idx" ON "payload_locked_documents_rels" USING btree ("assets_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_user_photo_id_idx" ON "payload_locked_documents_rels" USING btree ("user_photo_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_search_id_idx" ON "payload_locked_documents_rels" USING btree ("search_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "global_settings_branding_branding_logo_idx" ON "global_settings" USING btree ("branding_logo_id");
  CREATE INDEX IF NOT EXISTS "global_settings_branding_branding_logo_square_idx" ON "global_settings" USING btree ("branding_logo_square_id");
  CREATE INDEX IF NOT EXISTS "global_settings_branding_branding_favicon_idx" ON "global_settings" USING btree ("branding_favicon_id");
  CREATE INDEX IF NOT EXISTS "global_settings_global_seo_global_seo_og_image_idx" ON "global_settings" USING btree ("global_seo_og_image_id");
  CREATE INDEX IF NOT EXISTS "main_menu_tabs_description_links_order_idx" ON "main_menu_tabs_description_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "main_menu_tabs_description_links_parent_id_idx" ON "main_menu_tabs_description_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "main_menu_tabs_nav_items_featured_link_links_order_idx" ON "main_menu_tabs_nav_items_featured_link_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "main_menu_tabs_nav_items_featured_link_links_parent_id_idx" ON "main_menu_tabs_nav_items_featured_link_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "main_menu_tabs_nav_items_list_links_links_order_idx" ON "main_menu_tabs_nav_items_list_links_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "main_menu_tabs_nav_items_list_links_links_parent_id_idx" ON "main_menu_tabs_nav_items_list_links_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "main_menu_tabs_nav_items_order_idx" ON "main_menu_tabs_nav_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "main_menu_tabs_nav_items_parent_id_idx" ON "main_menu_tabs_nav_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "main_menu_tabs_order_idx" ON "main_menu_tabs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "main_menu_tabs_parent_id_idx" ON "main_menu_tabs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "main_menu_rels_order_idx" ON "main_menu_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "main_menu_rels_parent_idx" ON "main_menu_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "main_menu_rels_path_idx" ON "main_menu_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "main_menu_rels_pages_id_idx" ON "main_menu_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "main_menu_rels_tattoo_id_idx" ON "main_menu_rels" USING btree ("tattoo_id");
  CREATE INDEX IF NOT EXISTS "main_menu_rels_tag_id_idx" ON "main_menu_rels" USING btree ("tag_id");
  CREATE INDEX IF NOT EXISTS "main_menu_rels_artist_id_idx" ON "main_menu_rels" USING btree ("artist_id");
  CREATE INDEX IF NOT EXISTS "main_menu_rels_area_id_idx" ON "main_menu_rels" USING btree ("area_id");
  CREATE INDEX IF NOT EXISTS "main_menu_rels_style_id_idx" ON "main_menu_rels" USING btree ("style_id");
  CREATE INDEX IF NOT EXISTS "footer_columns_nav_items_order_idx" ON "footer_columns_nav_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_columns_nav_items_parent_id_idx" ON "footer_columns_nav_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_tattoo_id_idx" ON "footer_rels" USING btree ("tattoo_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_tag_id_idx" ON "footer_rels" USING btree ("tag_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_artist_id_idx" ON "footer_rels" USING btree ("artist_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_area_id_idx" ON "footer_rels" USING btree ("area_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_style_id_idx" ON "footer_rels" USING btree ("style_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_hero_breadcrumbs_bar_links" CASCADE;
  DROP TABLE "pages_hero_primary_buttons" CASCADE;
  DROP TABLE "pages_hero_links" CASCADE;
  DROP TABLE "pages_blocks_link" CASCADE;
  DROP TABLE "pages_blocks_command" CASCADE;
  DROP TABLE "pages_hero_secondary_buttons" CASCADE;
  DROP TABLE "pages_hero_images" CASCADE;
  DROP TABLE "pages_hero_logos" CASCADE;
  DROP TABLE "pages_breadcrumbs" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_version_hero_breadcrumbs_bar_links" CASCADE;
  DROP TABLE "_pages_v_version_hero_primary_buttons" CASCADE;
  DROP TABLE "_pages_v_version_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_link" CASCADE;
  DROP TABLE "_pages_v_blocks_command" CASCADE;
  DROP TABLE "_pages_v_version_hero_secondary_buttons" CASCADE;
  DROP TABLE "_pages_v_version_hero_images" CASCADE;
  DROP TABLE "_pages_v_version_hero_logos" CASCADE;
  DROP TABLE "_pages_v_version_breadcrumbs" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "tattoo" CASCADE;
  DROP TABLE "tattoo_rels" CASCADE;
  DROP TABLE "area_breadcrumbs" CASCADE;
  DROP TABLE "area" CASCADE;
  DROP TABLE "style_breadcrumbs" CASCADE;
  DROP TABLE "style" CASCADE;
  DROP TABLE "artist" CASCADE;
  DROP TABLE "artist_rels" CASCADE;
  DROP TABLE "tag" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "assets" CASCADE;
  DROP TABLE "user_photo" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "search_categories" CASCADE;
  DROP TABLE "search" CASCADE;
  DROP TABLE "search_rels" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "global_settings" CASCADE;
  DROP TABLE "main_menu_tabs_description_links" CASCADE;
  DROP TABLE "main_menu_tabs_nav_items_featured_link_links" CASCADE;
  DROP TABLE "main_menu_tabs_nav_items_list_links_links" CASCADE;
  DROP TABLE "main_menu_tabs_nav_items" CASCADE;
  DROP TABLE "main_menu_tabs" CASCADE;
  DROP TABLE "main_menu" CASCADE;
  DROP TABLE "main_menu_rels" CASCADE;
  DROP TABLE "footer_columns_nav_items" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TYPE "public"."enum_pages_hero_breadcrumbs_bar_links_link_type";
  DROP TYPE "public"."enum_pages_hero_primary_buttons_type";
  DROP TYPE "public"."enum_pages_hero_primary_buttons_link_type";
  DROP TYPE "public"."enum_pages_hero_links_link_type";
  DROP TYPE "public"."enum_pages_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_link_link_type";
  DROP TYPE "public"."enum_pages_blocks_link_link_appearance";
  DROP TYPE "public"."enum_pages_hero_secondary_buttons_link_type";
  DROP TYPE "public"."enum_pages_hero_type";
  DROP TYPE "public"."enum_pages_hero_theme";
  DROP TYPE "public"."enum_pages_hero_announcement_link_type";
  DROP TYPE "public"."enum_pages_hero_three_c_t_a";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_hero_breadcrumbs_bar_links_link_type";
  DROP TYPE "public"."enum__pages_v_version_hero_primary_buttons_type";
  DROP TYPE "public"."enum__pages_v_version_hero_primary_buttons_link_type";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_link_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_link_link_appearance";
  DROP TYPE "public"."enum__pages_v_version_hero_secondary_buttons_link_type";
  DROP TYPE "public"."enum__pages_v_version_hero_type";
  DROP TYPE "public"."enum__pages_v_version_hero_theme";
  DROP TYPE "public"."enum__pages_v_version_hero_announcement_link_type";
  DROP TYPE "public"."enum__pages_v_version_hero_three_c_t_a";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_main_menu_tabs_description_links_link_type";
  DROP TYPE "public"."enum_main_menu_tabs_nav_items_featured_link_links_link_type";
  DROP TYPE "public"."enum_main_menu_tabs_nav_items_list_links_links_link_type";
  DROP TYPE "public"."enum_main_menu_tabs_nav_items_style";
  DROP TYPE "public"."enum_main_menu_tabs_nav_items_default_link_link_type";
  DROP TYPE "public"."enum_main_menu_tabs_link_type";
  DROP TYPE "public"."enum_main_menu_menu_cta_type";
  DROP TYPE "public"."enum_footer_columns_nav_items_link_type";`)
}
