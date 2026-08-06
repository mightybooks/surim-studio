import { NextResponse } from "next/server";

// Retired: this auxiliary ingest endpoint accepted unauthenticated service-role writes.
// A replacement must use an authenticated server-to-server channel and a rotated secret.
export async function POST() {
  return NextResponse.json({ error: "ARCHIVE_INGEST_RETIRED" }, { status: 410 });
}
