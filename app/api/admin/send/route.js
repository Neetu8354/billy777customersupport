import { isAdmin, addMessage, patchMessage, emit, userCh, ADMIN_CH, userOnline, pushToUser, SUPPORT } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req) {
  if (!(await isAdmin())) return Response.json({ success: false }, { status: 401 });
  let b = {};
  try { b = await req.json(); } catch {}
  const userId = Number(b.userId);
  const message = String(b.message || "").trim();
  if (!userId || !message) return Response.json({ success: false, error: "Bad request" }, { status: 400 });

  const m = await addMessage(userId, {
    sender: "admin",
    username: "support",
    message,
    reply_to: b.reply_to ?? null,
    image: b.image || null,
    audio_file: b.audio_file || null,
    video_file: b.video_file || null,
  });
  m.is_delivered = (await userOnline(userId)) ? 1 : 0;
  if (m.is_delivered) await patchMessage(userId, m.id, { is_delivered: 1 });
  emit(userCh(userId), "message", { message: m });
  emit(ADMIN_CH, "message", { userId, message: m });
  if (m.is_delivered) emit(ADMIN_CH, "delivered", { userId, ids: [m.id] });
  pushToUser(userId, { title: SUPPORT.display_name, body: message });
  return Response.json({ success: true, message: m });
}
