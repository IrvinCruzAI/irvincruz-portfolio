/*
  # Add image column to projects table

  1. Changes
    - Add `image` column to `projects` table to store project logo/preview images
    - Column is optional (nullable) as not all projects may have images
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'image'
  ) THEN
    ALTER TABLE projects ADD COLUMN image text;
  END IF;
END $$;
