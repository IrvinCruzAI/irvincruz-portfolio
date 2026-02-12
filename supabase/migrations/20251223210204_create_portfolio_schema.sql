/*
  # Portfolio Website Database Schema
  
  This migration creates a complete database schema for the portfolio website,
  including tables for all content types and proper Row Level Security (RLS) policies.
  
  ## New Tables
  
  ### 1. `personal_info`
  Stores personal information (singleton table - only one row)
  - `id` (uuid, primary key)
  - `name` (text) - Full name
  - `tagline` (text) - Personal tagline/motto
  - `bio` (text) - Biography
  - `location` (text) - Location
  - `email` (text) - Contact email
  - `photo` (text) - Photo URL
  - `website` (text) - Website URL
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 2. `businesses`
  Stores service offerings
  - `id` (uuid, primary key)
  - `name` (text) - Service name
  - `url` (text) - Service URL
  - `description` (text) - Service description
  - `cta` (text) - Call-to-action text
  - `cta_url` (text) - Call-to-action URL
  - `sort_order` (integer) - Display order
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 3. `projects`
  Stores portfolio projects
  - `id` (uuid, primary key)
  - `name` (text) - Project name
  - `description` (text) - Project description
  - `status` (text) - Project status (Live, Beta, In Development)
  - `hosted_url` (text, nullable) - Live project URL
  - `github_url` (text, nullable) - GitHub repository URL
  - `technologies` (text array) - Technologies used
  - `key_features` (text array) - Key features list
  - `tags` (text array) - Tags for categorization
  - `sort_order` (integer) - Display order
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 4. `case_studies`
  Stores client work and results
  - `id` (uuid, primary key)
  - `title` (text) - Case study title
  - `company` (text) - Company name
  - `outcomes` (text array) - List of outcomes/results
  - `description` (text) - Detailed description
  - `technologies` (text array) - Technologies used
  - `sort_order` (integer) - Display order
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 5. `social_proof`
  Stores tools/platforms expertise
  - `id` (uuid, primary key)
  - `name` (text) - Tool/platform name
  - `logo` (text) - Logo image URL
  - `description` (text) - Description of expertise
  - `sort_order` (integer) - Display order
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 6. `timeline`
  Stores work experience and education
  - `id` (uuid, primary key)
  - `year` (text) - Year or year range
  - `title` (text) - Position title
  - `company` (text) - Company/institution name
  - `description` (text) - Role description
  - `type` (text) - Type: 'work' or 'education'
  - `sort_order` (integer) - Display order (most recent first)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 7. `social_links`
  Stores social media profiles
  - `id` (uuid, primary key)
  - `platform` (text) - Platform name
  - `url` (text) - Profile URL
  - `username` (text) - Username/display text
  - `followers` (text) - Follower count (optional)
  - `sort_order` (integer) - Display order
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 8. `lead_submissions`
  Stores email leads from lead magnet form
  - `id` (uuid, primary key)
  - `email` (text) - Submitted email address
  - `source` (text) - Lead source/campaign
  - `ip_address` (text, nullable) - Submitter IP (for analytics)
  - `user_agent` (text, nullable) - Browser info
  - `created_at` (timestamptz) - Submission timestamp
  
  ### 9. `site_settings`
  Stores SEO and site configuration (singleton table)
  - `id` (uuid, primary key)
  - `seo_title` (text) - SEO title
  - `seo_description` (text) - SEO description
  - `seo_keywords` (text array) - SEO keywords
  - `og_image` (text) - Open Graph image URL
  - `blog_url` (text, nullable) - Blog URL
  - `lead_magnet_title` (text) - Lead magnet title
  - `lead_magnet_tagline` (text) - Lead magnet tagline
  - `lead_magnet_description` (text) - Lead magnet description
  - `lead_magnet_cta` (text) - Lead magnet CTA text
  - `lead_magnet_type` (text) - Lead magnet type
  - `updated_at` (timestamptz)
  
  ## Security
  
  All tables have Row Level Security (RLS) enabled with the following policies:
  
  - **Public Read Access**: All content tables allow anonymous SELECT for public viewing
  - **Admin Write Access**: Only authenticated users can INSERT, UPDATE, DELETE content
  - **Lead Submissions**: Anyone can INSERT (for form submissions), only authenticated users can view
  
  ## Notes
  
  1. All tables include sort_order for custom ordering
  2. Timestamps track creation and updates
  3. Text arrays used for flexible lists (technologies, features, etc.)
  4. Singleton tables (personal_info, site_settings) should only have one row
  5. Lead submissions table captures essential data for marketing automation
*/

-- Create personal_info table
CREATE TABLE IF NOT EXISTS personal_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  tagline text NOT NULL,
  bio text NOT NULL,
  location text NOT NULL,
  email text NOT NULL,
  photo text NOT NULL,
  website text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create businesses table
CREATE TABLE IF NOT EXISTS businesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  url text NOT NULL,
  description text NOT NULL,
  cta text NOT NULL,
  cta_url text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  status text NOT NULL,
  hosted_url text,
  github_url text,
  technologies text[] NOT NULL DEFAULT '{}',
  key_features text[] NOT NULL DEFAULT '{}',
  tags text[] NOT NULL DEFAULT '{}',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create case_studies table
CREATE TABLE IF NOT EXISTS case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  outcomes text[] NOT NULL DEFAULT '{}',
  description text NOT NULL,
  technologies text[] NOT NULL DEFAULT '{}',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create social_proof table
CREATE TABLE IF NOT EXISTS social_proof (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo text NOT NULL,
  description text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create timeline table
CREATE TABLE IF NOT EXISTS timeline (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  year text NOT NULL,
  title text NOT NULL,
  company text NOT NULL,
  description text NOT NULL,
  type text NOT NULL CHECK (type IN ('work', 'education')),
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create social_links table
CREATE TABLE IF NOT EXISTS social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL,
  url text NOT NULL,
  username text NOT NULL,
  followers text DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create lead_submissions table
CREATE TABLE IF NOT EXISTS lead_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  source text NOT NULL,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seo_title text NOT NULL,
  seo_description text NOT NULL,
  seo_keywords text[] NOT NULL DEFAULT '{}',
  og_image text NOT NULL,
  blog_url text,
  lead_magnet_title text NOT NULL,
  lead_magnet_tagline text NOT NULL,
  lead_magnet_description text NOT NULL,
  lead_magnet_cta text NOT NULL,
  lead_magnet_type text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_proof ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_businesses_sort_order ON businesses(sort_order);
CREATE INDEX IF NOT EXISTS idx_projects_sort_order ON projects(sort_order);
CREATE INDEX IF NOT EXISTS idx_case_studies_sort_order ON case_studies(sort_order);
CREATE INDEX IF NOT EXISTS idx_social_proof_sort_order ON social_proof(sort_order);
CREATE INDEX IF NOT EXISTS idx_timeline_sort_order ON timeline(sort_order);
CREATE INDEX IF NOT EXISTS idx_social_links_sort_order ON social_links(sort_order);
CREATE INDEX IF NOT EXISTS idx_lead_submissions_created_at ON lead_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lead_submissions_email ON lead_submissions(email);

-- RLS Policies for content tables (public read, admin write)

-- personal_info policies
CREATE POLICY "Anyone can view personal info"
  ON personal_info FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert personal info"
  ON personal_info FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update personal info"
  ON personal_info FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete personal info"
  ON personal_info FOR DELETE
  TO authenticated
  USING (true);

-- businesses policies
CREATE POLICY "Anyone can view businesses"
  ON businesses FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert businesses"
  ON businesses FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update businesses"
  ON businesses FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete businesses"
  ON businesses FOR DELETE
  TO authenticated
  USING (true);

-- projects policies
CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- case_studies policies
CREATE POLICY "Anyone can view case studies"
  ON case_studies FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert case studies"
  ON case_studies FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update case studies"
  ON case_studies FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete case studies"
  ON case_studies FOR DELETE
  TO authenticated
  USING (true);

-- social_proof policies
CREATE POLICY "Anyone can view social proof"
  ON social_proof FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert social proof"
  ON social_proof FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update social proof"
  ON social_proof FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete social proof"
  ON social_proof FOR DELETE
  TO authenticated
  USING (true);

-- timeline policies
CREATE POLICY "Anyone can view timeline"
  ON timeline FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert timeline"
  ON timeline FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update timeline"
  ON timeline FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete timeline"
  ON timeline FOR DELETE
  TO authenticated
  USING (true);

-- social_links policies
CREATE POLICY "Anyone can view social links"
  ON social_links FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert social links"
  ON social_links FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update social links"
  ON social_links FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete social links"
  ON social_links FOR DELETE
  TO authenticated
  USING (true);

-- site_settings policies
CREATE POLICY "Anyone can view site settings"
  ON site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert site settings"
  ON site_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update site settings"
  ON site_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete site settings"
  ON site_settings FOR DELETE
  TO authenticated
  USING (true);

-- lead_submissions policies (special case - anyone can submit, only auth can read)
CREATE POLICY "Anyone can submit leads"
  ON lead_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view leads"
  ON lead_submissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete leads"
  ON lead_submissions FOR DELETE
  TO authenticated
  USING (true);