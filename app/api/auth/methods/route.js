import { methods } from "@/lib/authx";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(methods());
}
