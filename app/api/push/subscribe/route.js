import { getUser, addSub } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const u = await getUser();
  if (!u) return Response.json({ success: false }, { status: 401 });
  let sub = null;
  try { sub = await req.json(); } catch {}
  if (!sub?.endpoint) return Response.json({ success: false }, { status: 400 });
  addSub(u.id, sub);
  return Response.json({ success: true });
}
