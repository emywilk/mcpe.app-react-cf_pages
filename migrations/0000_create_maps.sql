-- Migration: Create maps table
CREATE TABLE IF NOT EXISTS maps (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    author TEXT,
    album_id TEXT,
    cover_id TEXT,
    youtube TEXT,
    type TEXT,
    size TEXT,
    version_name TEXT,
    premium BOOLEAN DEFAULT 0,
    creator_links TEXT
);
