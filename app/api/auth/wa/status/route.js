import { NextResponse } from "next/server";
import { waStatus } from "@/lib/authx";

export const dynamic = "force-dynamic";

export async function GET(req) {
  const state = new URL(req.url).searchParams.get("state") || "";
  const r = await waStatus(state);
  if (r.state === "pending") return Response.json({ success: false, state: "pending" });
  if (r.state !== "ok") return Response.json({ success: false, state: r.state });
  const res = NextResponse.json({ success: true, redirect: "/chat", username: r.user.username, user_id: r.user.id });
  res.cookies.set("sg_session", r.token, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 63072000 });
  return res;
}
