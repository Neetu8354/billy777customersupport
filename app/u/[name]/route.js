import fs from "fs";
import path from "path";
import { UPLOAD_DIR } from "@/lib/db";

export const dynamic = "force-dynamic";

const MIME = {
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp",
  ".gif": "image/gif", ".mp4": "video/mp4", ".webm": "video/webm", ".mov": "video/quicktime",
  ".ogg": "audio/ogg", ".mp3": "audio/mpeg", ".m4a": "audio/mp4", ".wav": "audio/wav",
};

export async function GET(_req, { params }) {
  const { name } = await params;
  const safe = path.basename(String(name || ""));
  const file = path.join(UPLOAD_DIR, safe);
  if (!fs.existsSync(file)) return new Response("not found", { status: 404 });
  const buf = fs.readFileSync(file);
  return new Response(buf, {
    headers: {
      "Content-Type": MIME[path.extname(safe).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Length": String(buf.length),
    },
  });
}
