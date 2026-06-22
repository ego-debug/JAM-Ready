import { Badge } from "@/components/ui/Badge";
import type { JobStatus } from "@/lib/types";

const tone: Record<JobStatus, React.ComponentProps<typeof Badge>["tone"]> = {
  Requested: "neutral",
  Quoted: "info",
  Approved: "brand",
  Scheduled: "brand",
  "In Progress": "accent",
  Done: "success",
  Invoiced: "success",
};

export function JobStatusBadge({ status }: { status: JobStatus }) {
  return <Badge tone={tone[status]}>{status}</Badge>;
}
