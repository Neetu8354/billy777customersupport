import { isAdmin, getUserById, emit, userCh, ADMIN_CH } from "@/lib/db";
import { remote, remoteOn } from "@/lib/remote";

export const dynamic = "force-dynamic";

export async function POST(req) {
  if (!(await isAdmin())) return Response.json({ success: false }, { status: 401 });
  let b = {};
  try { b = await req.json(); } catch {}
  const userId = Number(b.userId);
  const u = await getUserById(userId);
  if (!u) return Response.json({ success: false }, { status: 404 });
  u.blocked = !!b.blocked;
  if (remoteOn) remote.patchUser(userId, { blocked: u.blocked });
  else { const { db, save } = await import("@/lib/db"); db.users[userId] = u; save(); }
  emit(userCh(userId), "blocked", { blocked: u.blocked });
  emit(ADMIN_CH, "blocked", { userId, blocked: u.blocked });
  return Response.json({ success: true });
}
