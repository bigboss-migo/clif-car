const LEAD_URL = `${import.meta.env.REACT_APP_BACKEND_URL}/api/lead`;

export async function submitLead(payload) {
  try {
    const res = await fetch(LEAD_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) return { ok: true, error: null };
    return { ok: false, error: data.error || "Something went wrong. Please try again." };
  } catch {
    return { ok: false, error: "Network error. Please check your connection and try again." };
  }
}
