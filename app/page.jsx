import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Home() {
  const c = await cookies();
  redirect(c.get("sg_session")?.value ? "/chat" : "/verify");
}
