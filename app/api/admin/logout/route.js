import { NextResponse } from "next/server";
import { db, save } from "@/lib/db";
import { remote, remoteOn } from "@/lib/remote";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST() {
  const c = await cookies();
  const t = c.get("sg_admin")?.value;
  if (t) {
    if (remoteOn) remote.deleteAdminSession(t);
    else { delete db.adminSessions[t]; save(); }
  }
  const res = NextResponse.json({ success: true });
  res.cookies.set("sg_admin", "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
