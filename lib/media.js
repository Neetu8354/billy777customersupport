/* Upload storage: Supabase Storage bucket "sg-media" when configured
   (public bucket), else local disk + /u/<name> route. */

import fs from "fs";
import path from "path";
import { remote, remoteOn } from "@/lib/remote";
import { UPLOAD_DIR } from "@/lib/db";

export async function storeUpload(name, buf, contentType) {
  if (remoteOn) {
    const publicUrl = await remote.upload(name, buf, contentType);
    if (publicUrl) return publicUrl;
    // fall through to local on storage failure (e.g. bucket missing on a
    // local dev machine) so dev keeps working
  }
  try {
    fs.writeFileSync(path.join(UPLOAD_DIR, name), buf);
    return `/u/${name}`;
  } catch {
    return null;
  }
}
