export function generateSessionId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sessionId = localStorage.getItem("rahasya_session_id");
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem("rahasya_session_id", sessionId);
  }
  return sessionId;
}

export function hasSubmitted(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("rahasya_submitted") === "true";
}

export function markSubmitted(): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("rahasya_submitted", "true");
  }
}

export function formatTimestamp(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
