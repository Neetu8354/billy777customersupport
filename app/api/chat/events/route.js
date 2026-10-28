import { getUser, userCh, subscribe, userConnected, userDisconnected, adminOnline, sseStream, presenceJoin, presenceBeat, presenceLeave } from "@/lib/db";
import { expireCalls } from "@/lib/calls";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 300;

export async function GET(req) {
  const u = await getUser();
  if (!u) return new Response("unauthorized", { status: 401 });
  const userId = u.id;
  return sseStream(async (write) => {
    const un = subscribe(userCh(userId), write);
    write(`event: hello\ndata: {"ok":true}\n\n`);
    const pKey = await presenceJoin("user", userId);
    await userConnected(userId);
    write(`event: presence\ndata: ${JSON.stringify({ by: "admins", online: await adminOnline() })}\n\n`);
    const hb = setInterval(() => { presenceBeat(pKey); expireCalls().catch(() => {}); }, 15000);
    return () => {
      clearInterval(hb);
      un();
      presenceLeave(pKey);
      userDisconnected(userId);
    };
  }, undefined, req.signal);
}
