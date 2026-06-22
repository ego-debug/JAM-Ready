import { promises as fs } from "fs";
import path from "path";
import type { JobPhoto } from "@/lib/types";

/**
 * Local photo storage under .data/uploads/<token>/. Files are served back
 * through the /api/uploads route. Mirrors a Supabase Storage bucket so this
 * swaps cleanly later.
 */

const UPLOADS_DIR = path.join(process.cwd(), ".data", "uploads");

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/heic"]);
const MAX_BYTES = 15 * 1024 * 1024; // 15MB per photo

export function uploadsRootFor(token: string): string {
  return path.join(UPLOADS_DIR, sanitizeSegment(token));
}

/** Keep a folder token to a safe charset (defense against traversal). */
function sanitizeSegment(seg: string): string {
  return seg.replace(/[^a-zA-Z0-9_-]/g, "");
}

/** Sanitize a stored file name: allow the extension dot, block traversal. */
function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9_.-]/g, "").replace(/\.\.+/g, ".");
}

function safeName(original: string): string {
  const ext = path.extname(original).toLowerCase().slice(0, 6) || ".jpg";
  const base = path
    .basename(original, path.extname(original))
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .slice(0, 40);
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${base}${ext}`;
}

export async function savePhotos(
  token: string,
  files: File[],
): Promise<JobPhoto[]> {
  const dir = uploadsRootFor(token);
  await fs.mkdir(dir, { recursive: true });

  const saved: JobPhoto[] = [];
  for (const file of files) {
    if (!file || file.size === 0) continue;
    if (file.size > MAX_BYTES) continue;
    if (file.type && !ALLOWED.has(file.type)) continue;

    const name = safeName(file.name || "photo.jpg");
    const buf = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(path.join(dir, name), buf);

    saved.push({
      url: `/api/uploads/${encodeURIComponent(token)}/${encodeURIComponent(name)}`,
      name,
      uploadedAt: new Date().toISOString(),
    });
  }
  return saved;
}

/** Read a stored photo for the /api/uploads route. */
export async function readPhoto(
  token: string,
  name: string,
): Promise<{ buffer: Buffer; contentType: string } | null> {
  const dir = uploadsRootFor(token);
  const file = path.join(dir, sanitizeFileName(name));
  // ensure the resolved path stays inside the token's folder
  if (!file.startsWith(dir)) return null;
  try {
    const buffer = await fs.readFile(file);
    const ext = path.extname(file).toLowerCase();
    const contentType =
      ext === ".png"
        ? "image/png"
        : ext === ".webp"
          ? "image/webp"
          : ext === ".heic"
            ? "image/heic"
            : "image/jpeg";
    return { buffer, contentType };
  } catch {
    return null;
  }
}
