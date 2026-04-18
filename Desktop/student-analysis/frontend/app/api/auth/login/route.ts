import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://127.0.0.1:8000/api/v1";
const AUTH_TIMEOUT_MS = 15000;

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const secure = process.env.NODE_ENV === "production";
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        remember_me: payload.rememberMe,
      }),
      signal: AbortSignal.timeout(AUTH_TIMEOUT_MS),
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    const result = NextResponse.json(data);
    result.cookies.set("auth_token", data.access_token, {
      httpOnly: true,
      sameSite: "lax",
      secure,
      path: "/",
      maxAge: payload.rememberMe ? 60 * 60 * 24 * 7 : 60 * 60,
    });
    result.cookies.set("user_role", data.role, {
      httpOnly: false,
      sameSite: "lax",
      secure,
      path: "/",
      maxAge: payload.rememberMe ? 60 * 60 * 24 * 7 : 60 * 60,
    });
    result.cookies.set("user_name", encodeURIComponent(data.user_name), {
      httpOnly: false,
      sameSite: "lax",
      secure,
      path: "/",
      maxAge: payload.rememberMe ? 60 * 60 * 24 * 7 : 60 * 60,
    });

    return result;
  } catch (error) {
    const message =
      error instanceof Error && error.name === "TimeoutError"
        ? "Login request timed out while waiting for the backend API. Make sure FastAPI and MySQL are running."
        : "Unable to reach the backend login service. Make sure FastAPI is running on http://127.0.0.1:8000.";

    return NextResponse.json({ detail: message }, { status: 503 });
  }
}
