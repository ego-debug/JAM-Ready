import { mutateDb, readDb } from "./store";
import { newId } from "@/lib/ids";
import type { LineItem, TaskProgress } from "@/lib/types";

export interface ChecklistRow {
  task: TaskProgress;
  lineItem: LineItem;
}

/** Create a TaskProgress row for any of a job's line items that lacks one. */
export async function ensureChecklist(jobId: string): Promise<void> {
  await mutateDb((db) => {
    const items = db.lineItems.filter((li) => li.jobId === jobId);
    for (const li of items) {
      const exists = db.taskProgress.some(
        (t) => t.jobId === jobId && t.lineItemId === li.id,
      );
      if (!exists) {
        db.taskProgress.push({
          id: newId(),
          jobId,
          lineItemId: li.id,
          completed: false,
        });
      }
    }
  });
}

export async function getChecklist(jobId: string): Promise<ChecklistRow[]> {
  await ensureChecklist(jobId);
  const db = await readDb();
  const items = db.lineItems.filter((li) => li.jobId === jobId);
  return items.map((lineItem) => ({
    lineItem,
    task: db.taskProgress.find(
      (t) => t.jobId === jobId && t.lineItemId === lineItem.id,
    )!,
  }));
}

export async function setTaskCompleted(
  taskId: string,
  completed: boolean,
  completedBy?: string,
): Promise<void> {
  await mutateDb((db) => {
    const t = db.taskProgress.find((x) => x.id === taskId);
    if (t) {
      t.completed = completed;
      t.completedBy = completed ? completedBy : undefined;
    }
  });
}

export async function setTaskPhoto(
  taskId: string,
  which: "before" | "after",
  url: string,
): Promise<void> {
  await mutateDb((db) => {
    const t = db.taskProgress.find((x) => x.id === taskId);
    if (!t) return;
    if (which === "before") t.beforePhoto = url;
    else t.afterPhoto = url;
  });
}

/** Proof-to-close (spec §7): at least one after-photo exists for the job. */
export async function jobHasAfterPhoto(jobId: string): Promise<boolean> {
  const db = await readDb();
  return db.taskProgress.some((t) => t.jobId === jobId && !!t.afterPhoto);
}

export async function findTask(
  taskId: string,
): Promise<TaskProgress | undefined> {
  const db = await readDb();
  return db.taskProgress.find((t) => t.id === taskId);
}
