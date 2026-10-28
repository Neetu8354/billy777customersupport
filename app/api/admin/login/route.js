import { NextResponse } from "next/server";
import { ADMIN_USER, ADMIN_PASS, newAdminSession } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req) {
  let b = {};
  try { b = await req.json(); } catch {}
  if (String(b.username) !== ADMIN_USER || String(b.password) !== ADMIN_PASS) {
    return Response.json({ success: false, error: "Invalid credentials" }, { status: 401 });
  }
  const token = await newAdminSession();
  const res = NextResponse.json({ success: true });
  res.cookies.set("sg_admin", token, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
  return res;
}
