export async function logEvent(event_type: string) {
  try {
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_type, referrer: document.referrer || "" }),
    });
  } catch {}
}
