const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

function createDatabase(filename = process.env.DATABASE_PATH || path.join(process.cwd(), 'data', 'taskmaster.db')) {
  if (filename !== ':memory:') fs.mkdirSync(path.dirname(path.resolve(filename)), { recursive: true });
  const db = new Database(filename);
  db.pragma('foreign_keys = ON');
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS teams (id INTEGER PRIMARY KEY, name TEXT NOT NULL, description TEXT, owner_id INTEGER NOT NULL REFERENCES users(id), created_at TEXT DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS team_members (team_id INTEGER REFERENCES teams(id) ON DELETE CASCADE, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, role TEXT NOT NULL DEFAULT 'member' CHECK(role IN ('owner','member')), PRIMARY KEY(team_id,user_id));
    CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY, name TEXT NOT NULL, description TEXT, team_id INTEGER NOT NULL REFERENCES teams(id) ON DELETE CASCADE, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, title TEXT NOT NULL, description TEXT, status TEXT NOT NULL DEFAULT 'todo' CHECK(status IN ('todo','in_progress','done')), priority TEXT NOT NULL DEFAULT 'medium' CHECK(priority IN ('low','medium','high')), due_date TEXT, project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE, creator_id INTEGER NOT NULL REFERENCES users(id), assignee_id INTEGER REFERENCES users(id), created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY, task_id INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE, author_id INTEGER NOT NULL REFERENCES users(id), body TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS attachments (id INTEGER PRIMARY KEY, task_id INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE, uploader_id INTEGER NOT NULL REFERENCES users(id), original_name TEXT NOT NULL, stored_name TEXT NOT NULL, mime_type TEXT, size INTEGER NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
  `);
  return db;
}
module.exports = { createDatabase };
