import { methods } from "@/lib/authx";

export const dynamic = "force-dynamic";

export async function POST() {
  if (!methods().telegram) return Response.json({ success: false, error: "Ye login abhi band hai" }, { status: 403 });
  return Response.json({ success: false, error: "Telegram login needs a real bot token — configure SG_TG_BOT" }, { status: 501 });
}
