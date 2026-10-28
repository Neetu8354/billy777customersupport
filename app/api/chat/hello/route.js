import { getUser, listMessages, SUPPORT, adminOnline, adminLastSeen } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const u = await getUser();
  if (!u) return Response.json({ success: false }, { status: 401 });
  return Response.json({
    success: true,
    username: u.username,
    user_id: u.id,
    blocked: !!u.blocked,
    messages: await listMessages(u.id),
    support: SUPPORT,
    admin_online: await adminOnline(),
    admin_last_seen: await adminLastSeen(),
  });
}
