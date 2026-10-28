import { isAdmin, ADMIN_CH, subscribe, adminConnected, adminDisconnected, sseStream, presenceJoin, presenceBeat, presenceLeave } from "@/lib/db";
import { expireCalls } from "@/lib/calls";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 300;

export async function GET(req) {
  if (!(await isAdmin())) return new Response("unauthorized", { status: 401 });
  return sseStream(
    async (write) => {
      const un = subscribe(ADMIN_CH, write);
      write(`event: hello\ndata: {"ok":true}\n\n`);
      const pKey = await presenceJoin("admin", null);
      await adminConnected();
      const hb = setInterval(() => { presenceBeat(pKey); expireCalls().catch(() => {}); }, 15000);
      return () => {
        clearInterval(hb);
        un();
        presenceLeave(pKey);
        adminDisconnected();
      };
    },
    () => {},
    req.signal
  );
}
