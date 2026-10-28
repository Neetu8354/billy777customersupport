import { getUser } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const u = await getUser();
  if (!u) return Response.json({ success: false }, { status: 401 });
  return Response.json({ success: true, username: u.username, user_id: u.id, mobile: u.mobile });
}
