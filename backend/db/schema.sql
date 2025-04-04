-- Database Schema Definition
-- Based on backend_structure_document.md

-- Users Table
CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255), -- Nullable if using OAuth only
    username VARCHAR(100) UNIQUE,
    display_name VARCHAR(255),
    avatar_url VARCHAR(1024),
    github_id VARCHAR(255) UNIQUE, -- Added for GitHub OAuth
    google_id VARCHAR(255) UNIQUE, -- Added for Google OAuth
    role VARCHAR(50) NOT NULL DEFAULT 'Solo Entrepreneur', -- e.g., Project Admin, Team Collaborator, Solo Entrepreneur
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Projects Table
CREATE TABLE IF NOT EXISTS Projects (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    project_name VARCHAR(255) NOT NULL,
    product_type VARCHAR(100), -- e.g., Physical Product, Software, Service
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Files/Documents Table (Combining Files and Documents concept for simplicity initially)
CREATE TABLE IF NOT EXISTS Documents (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES Projects(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES Users(id), -- User who uploaded/owns the file
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(1024) NOT NULL, -- Could be S3 key, GCS path, etc.
    file_type VARCHAR(100), -- Mime type, e.g., application/pdf, image/jpeg
    file_size BIGINT, -- Size in bytes
    storage_type VARCHAR(50) DEFAULT 's3', -- e.g., 's3', 'gcs', 'local' (for dev?)
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Assets Table (Potentially for things like generated 3D models, images, etc.)
-- This might overlap with Documents, decide based on specific needs. Keeping separate for now.
CREATE TABLE IF NOT EXISTS Assets (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES Projects(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES Users(id),
    asset_name VARCHAR(255) NOT NULL,
    asset_type VARCHAR(100), -- e.g., '3d_model', 'generated_image'
    asset_path VARCHAR(1024) NOT NULL,
    metadata JSONB, -- For storing additional info like generator settings
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Integrations Table
CREATE TABLE IF NOT EXISTS Integrations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    service_name VARCHAR(100) NOT NULL, -- e.g., 'github', 'google_docs', 'meshy_ai'
    external_user_id VARCHAR(255), -- User ID on the external service (e.g., GitHub ID, Google ID)
    external_username VARCHAR(255), -- Username on the external service
    access_token TEXT, -- Changed from oauth_token for clarity, encrypt sensitive tokens!
    refresh_token TEXT, -- Encrypt sensitive tokens!
    token_expiry TIMESTAMPTZ,
    scopes TEXT, -- Scopes granted
    connected_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, service_name) -- Ensure only one integration per user per service
);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply the trigger function to tables
DO $$
DECLARE
  tbl_name text;
BEGIN
  FOR tbl_name IN SELECT table_name FROM information_schema.columns WHERE table_schema = 'public' AND column_name = 'updated_at'
  LOOP
    EXECUTE format('CREATE TRIGGER update_%I_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();', tbl_name, tbl_name);
  END LOOP;
END;
$$; 