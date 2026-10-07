import { authSuccess } from "@/lib/auth/http";
import { clearSession } from "@/lib/auth/session";

export async function POST() {
  await clearSession();
  return authSuccess({ loggedOut: true });
}
