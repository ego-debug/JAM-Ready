import { NextResponse } from "next/server";
import { createTurnRequest } from "@/lib/db/jobs";
import { savePhotos } from "@/lib/storage";
import { newToken } from "@/lib/ids";

export const runtime = "nodejs";

function str(form: FormData, key: string): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function num(form: FormData, key: string): number | undefined {
  const v = str(form, key);
  if (!v) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

function strList(form: FormData, key: string): string[] {
  return form
    .getAll(key)
    .filter((v): v is string => typeof v === "string" && v.trim().length > 0);
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const name = str(form, "name");
  const email = str(form, "email");
  const phone = str(form, "phone");
  const address = str(form, "address");

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Your name is required.";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "A valid email is required.";
  if (!phone) errors.phone = "A phone number is required.";
  if (!address) errors.address = "The unit address is required.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  // token first so photos are stored under it
  const token = newToken();
  const files = form.getAll("photos").filter((f): f is File => f instanceof File);
  const photos = await savePhotos(token, files);

  const requestedServices = strList(form, "services");
  const flooringTypes = strList(form, "flooringTypes");
  const paintingScope = strList(form, "paintingScope");
  const serviceDetail = {
    unitSqft: num(form, "unitSqft"),
    flooringTypes: flooringTypes.length ? flooringTypes : undefined,
    flooringSqft: num(form, "flooringSqft"),
    paintingScope: paintingScope.length ? paintingScope : undefined,
    paintingSqft: num(form, "paintingSqft"),
  };
  const hasDetail = Object.values(serviceDetail).some((v) => v !== undefined);

  const job = await createTurnRequest({
    name,
    company: str(form, "company") || undefined,
    email,
    phone,
    address,
    unitNumber: str(form, "unitNumber") || undefined,
    beds: num(form, "beds"),
    baths: num(form, "baths"),
    dueDate: str(form, "dueDate") || undefined,
    notes: str(form, "notes") || undefined,
    photos,
    publicToken: token,
    requestedServices: requestedServices.length ? requestedServices : undefined,
    serviceDetail: hasDetail ? serviceDetail : undefined,
  });

  return NextResponse.json({ token: job.publicToken }, { status: 201 });
}
