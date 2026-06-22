import { promises as fs } from "fs";
import path from "path";
import type { Database } from "@/lib/types";

/**
 * Local-first persistence: a single JSON file under .data/ (gitignored).
 * Async API on purpose, so every call mirrors what a Supabase query will
 * return later and swapping the backend stays a contained change.
 *
 * Single-user local dev only; not concurrency-safe for production.
 */

const DATA_DIR = path.join(process.cwd(), ".data");
const DB_FILE = path.join(DATA_DIR, "db.json");

const emptyDb: Database = {
  customers: [],
  properties: [],
  jobs: [],
  lineItems: [],
  crewMembers: [],
  assignments: [],
  taskProgress: [],
  invoices: [],
  emailLog: [],
};

async function ensureFile(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DB_FILE);
  } catch {
    await fs.writeFile(DB_FILE, JSON.stringify(emptyDb, null, 2), "utf8");
  }
}

export async function readDb(): Promise<Database> {
  await ensureFile();
  const raw = await fs.readFile(DB_FILE, "utf8");
  try {
    return { ...emptyDb, ...(JSON.parse(raw) as Database) };
  } catch {
    return { ...emptyDb };
  }
}

export async function writeDb(db: Database): Promise<void> {
  await ensureFile();
  await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), "utf8");
}

/** Read, mutate, persist. The one write path. */
export async function mutateDb<T>(fn: (db: Database) => T): Promise<T> {
  const db = await readDb();
  const result = fn(db);
  await writeDb(db);
  return result;
}
