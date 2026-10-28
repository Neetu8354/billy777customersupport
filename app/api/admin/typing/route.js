import { isAdmin, emit, userCh } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req) {
  if (!(await isAdmin())) return Response.json({ success: false }, { status: 401 });
  let b = {};
  try { b = await req.json(); } catch {}
  emit(userCh(Number(b.userId)), "typing", { by: "admin", is_typing: !!b.is_typing });
  return Response.json({ success: true });
}
