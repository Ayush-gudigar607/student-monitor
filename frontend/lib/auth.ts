export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000/api/v1";

export type LoginPayload = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "teacher";
  adminSecret?: string;
};

export type ClassCard = {
  id: number;
  name: string;
  section: string;
  total_students: number;
  average_score: number;
  topper_name: string;
};

export async function loginRequest(payload: LoginPayload) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail ?? "Login failed");
  }

  return response.json();
}

export async function signupRequest(payload: SignupPayload) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail ?? "Signup failed");
  }

  return response.json();
}
