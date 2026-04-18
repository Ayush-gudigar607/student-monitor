import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://127.0.0.1:8000/api/v1";
const AUTH_TIMEOUT_MS = 15000;

export async function POST(request: NextRequest) {
  const payload = await request.json();
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        password: payload.password,
        role: payload.role,
        admin_secret: payload.adminSecret || null,
      }),
      signal: AbortSignal.timeout(AUTH_TIMEOUT_MS),
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    const message =
      error instanceof Error && error.name === "TimeoutError"
        ? "Signup request timed out while waiting for the backend API. Make sure FastAPI and MySQL are running."
        : "Unable to reach the backend signup service. Make sure FastAPI is running on http://127.0.0.1:8000.";

    return NextResponse.json({ detail: message }, { status: 503 });
  }
}
