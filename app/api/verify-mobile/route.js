import { NextResponse } from "next/server";
import { findUserByMobile, createUser, newSession, sendWelcome, emit, ADMIN_CH } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req) {
  let body = {};
  try { body = await req.json(); } catch {}
  const mobile = String(body.mobile || "").replace(/\D/g, "").slice(0, 10);
  if (mobile.length !== 10) {
    return Response.json({ success: false, error: "10-digit mobile daalo" }, { status: 400 });
  }
  let user = await findUserByMobile(mobile);
  const isNew = !user;
  if (!user) user = await createUser(mobile, body.device_id);
  const token = await newSession(user.id);
  if (isNew) {
    sendWelcome(user.id);
    emit(ADMIN_CH, "user", { user });
  }
  const res = NextResponse.json({
    success: true,
    redirect: "/chat",
    username: user.username,
    user_id: user.id,
    is_new: isNew,
  });
  res.cookies.set("sg_session", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365 * 2,
  });
  return res;
}
