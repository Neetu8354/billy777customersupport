import { isAdmin } from "@/lib/db";
import { callAction } from "@/lib/calls";

export const dynamic = "force-dynamic";

export async function POST(req) {
  if (!(await isAdmin())) return Response.json({ success: false }, { status: 401 });
  let b = {};
  try { b = await req.json(); } catch {}
  return Response.json(await callAction("admin", null, b));
}
