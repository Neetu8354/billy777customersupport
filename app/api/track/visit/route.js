import { db, save } from "@/lib/db";
import { remote } from "@/lib/remote";

export const dynamic = "force-dynamic";

export async function POST(req) {
  let b = {};
  try { b = await req.json(); } catch {}
  const v = { ...b, at: new Date().toISOString() };
  if (db.visits) db.visits.push(v);
  if (db.visits.length > 5000) db.visits = db.visits.slice(-5000);
  save();
  remote.insertVisit(v);
  return Response.json({ ok: true });
}
