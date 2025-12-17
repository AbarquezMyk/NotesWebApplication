// backend/db/database.js
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const initDb = async () => {
  const db = await open({
    filename: "./db/notes.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    note_content TEXT,
    address TEXT,
    txhash TEXT,
    status TEXT,
    created_at TEXT
);
  `);
  return db;
};
