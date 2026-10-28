import { db, save } from "@/lib/db";
import { remote } from "@/lib/remote";

export const dynamic = "force-dynamic";

export async function POST(req) {
  let b = {};
  try { b = await req.json(); } catch {}
  const v = { geo: b, at: new Date().toISOString() };
  if (db.visits) db.visits.push(v);
  save();
  remote.insertVisit(v);
  return Response.json({ ok: true });
}
