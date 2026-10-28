import { otpSend, methods } from "@/lib/authx";

export const dynamic = "force-dynamic";

export async function POST(req) {
  if (!methods().waOtp) return Response.json({ success: false, error: "Ye login abhi band hai" }, { status: 403 });
  let b = {};
  try { b = await req.json(); } catch {}
  const mobile = String(b.mobile || "").replace(/\D/g, "");
  if (mobile.length !== 10) return Response.json({ success: false, error: "10-digit mobile daalo" }, { status: 400 });
  const code = await otpSend(mobile);
  // No real WhatsApp gateway in the clone — the code is surfaced for demo use.
  return Response.json({ success: true, dev_code: code });
}
