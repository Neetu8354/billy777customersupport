import { waStart, methods } from "@/lib/authx";

export const dynamic = "force-dynamic";

export async function POST(req) {
  if (!methods().waMsg) return Response.json({ success: false, error: "Ye login abhi band hai" }, { status: 403 });
  let b = {};
  try { b = await req.json(); } catch {}
  const mobile = String(b.mobile || "").replace(/\D/g, "");
  if (mobile.length !== 10) return Response.json({ success: false, error: "10-digit mobile daalo" }, { status: 400 });
  return Response.json({ success: true, ...(await waStart(mobile)) });
}
