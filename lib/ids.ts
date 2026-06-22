import { randomUUID, randomBytes } from "crypto";

/** Stable entity id. */
export function newId(): string {
  return randomUUID();
}

/** URL-safe public token for the customer status link (no login needed). */
export function newToken(): string {
  return randomBytes(12).toString("base64url");
}
