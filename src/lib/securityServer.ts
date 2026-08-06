import "server-only";

import { createClient } from "@supabase/supabase-js";
import { supabaseServer } from "@/lib/supabase/server";

export const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function serviceRoleClient() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase server credentials are missing");
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function getAdminContext() {
  const sessionClient = await supabaseServer();
  const {
    data: { user },
    error: authError,
  } = await sessionClient.auth.getUser();
  if (authError || !user) {
    return { ok: false as const, status: 401 as const, user: null };
  }

  const adminClient = serviceRoleClient();
  const { data: admin, error: adminError } = await adminClient
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (adminError || !admin) {
    return { ok: false as const, status: 403 as const, user };
  }
  return { ok: true as const, status: 200 as const, user, adminClient };
}

export function hasValidOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    const requestUrl = new URL(req.url);
    const originUrl = new URL(origin);
    const forwardedHost = req.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
    const expectedHost = forwardedHost || req.headers.get("host") || requestUrl.host;
    return originUrl.host === expectedHost;
  } catch {
    return false;
  }
}

export async function readJsonBody(req: Request, maxBytes = 16_384) {
  const declaredLength = Number(req.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    return { ok: false as const, status: 413 as const, error: "PAYLOAD_TOO_LARGE" };
  }
  const raw = await req.text();
  if (Buffer.byteLength(raw, "utf8") > maxBytes) {
    return { ok: false as const, status: 413 as const, error: "PAYLOAD_TOO_LARGE" };
  }
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error();
    return { ok: true as const, value: value as Record<string, unknown> };
  } catch {
    return { ok: false as const, status: 400 as const, error: "INVALID_JSON" };
  }
}

export function cleanSingleLine(value: unknown, maxLength: number) {
  const normalized = String(value ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").trim();
  return normalized.length <= maxLength ? normalized : null;
}
