import { NextResponse } from "next/server";
import { killSession } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST() {
  await killSession();
  const res = NextResponse.json({ success: true });
  res.cookies.set("sg_session", "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
