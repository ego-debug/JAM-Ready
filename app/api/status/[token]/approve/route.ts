import { NextResponse } from "next/server";
import { approveQuoteByToken } from "@/lib/db/jobs";

export const runtime = "nodejs";

/** Customer approves their quote via the private link. No login, the token is the key. */
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const result = await approveQuoteByToken(token);
  if (!result.ok) {
    const msg =
      result.reason === "not_found"
        ? "We couldn't find this request."
        : "This quote isn't ready to approve yet.";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
