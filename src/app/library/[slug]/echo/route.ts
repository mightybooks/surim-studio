// src/app/debug/[id]/route.ts
// GET /debug/abc → { "ok": true, "params": { "id": "abc" }, "pathname": "/debug/abc" }
export async function GET(
  req: Request,
  ctx: { params: { id?: string } }
) {
  const url = new URL(req.url);
  return Response.json({
    ok: true,
    params: ctx?.params ?? null,
    pathname: url.pathname,
  });
}
