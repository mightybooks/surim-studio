import "server-only";

import { createHash } from "crypto";
import { serviceRoleClient } from "@/lib/securityServer";

export async function consumeRateLimit(scope: string, identity: string, limit: number, windowSeconds: number) {
  const pepper = process.env.RATE_LIMIT_PEPPER ?? process.env.AUTH_BRIDGE_SECRET;
  if (!pepper) return { allowed: false, configured: false };
  const key = createHash("sha256").update(`${pepper}:${scope}:${identity}`).digest("hex");
  const { data, error } = await serviceRoleClient().rpc("consume_security_rate_limit", {
    p_key: key,
    p_limit: limit,
    p_window_seconds: windowSeconds,
  });
  if (error || typeof data !== "boolean") return { allowed: false, configured: false };
  return { allowed: data, configured: true };
}
