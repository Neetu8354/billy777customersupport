import { vapidKey } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({ key: vapidKey() || null });
}
