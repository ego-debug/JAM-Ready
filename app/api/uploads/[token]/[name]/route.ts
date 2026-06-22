import { readPhoto } from "@/lib/storage";

export const runtime = "nodejs";

/** Serve a locally-stored job photo. (Next 16: route params are async.) */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string; name: string }> },
) {
  const { token, name } = await params;
  const photo = await readPhoto(decodeURIComponent(token), decodeURIComponent(name));
  if (!photo) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(new Uint8Array(photo.buffer), {
    headers: {
      "Content-Type": photo.contentType,
      "Cache-Control": "private, max-age=3600",
    },
  });
}
