// src/app/debug/[id]/route.ts
// GET /debug/abc → { "ok": true, "params": { "id": "abc" }, "pathname": "/debug/abc" }
export async function GET(
  req: Request,
  ctx: { params: Promise<{ slug: string }> }
) {
  if (process.env.NODE_ENV === "production") return new Response(null, { status: 404 });
  const url = new URL(req.url);
  const params = await ctx.params;
  return Response.json({
    ok: true,
    params,
    pathname: url.pathname,
  });
}
