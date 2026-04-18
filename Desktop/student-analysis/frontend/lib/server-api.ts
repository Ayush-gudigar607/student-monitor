import { cookies } from "next/headers";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://127.0.0.1:8000/api/v1";

export class ApiRequestError extends Error {
  status: number;
  detail: string;

  constructor(status: number, detail: string) {
    super(detail);
    this.status = status;
    this.detail = detail;
  }
}

async function apiFetch(path: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    cache: "no-store",
  });

  if (!response.ok) {
    let detail = `API request failed for ${path}`;
    try {
      const payload = await response.json();
      detail = payload.detail ?? detail;
    } catch {
      try {
        const text = await response.text();
        if (text) {
          detail = text;
        }
      } catch {
        detail = `API request failed for ${path}`;
      }
    }
    throw new ApiRequestError(response.status, detail);
  }

  return response.json();
}

export async function getClasses() {
  return apiFetch("/classes");
}

export async function getClassStudents(classId: string) {
  return apiFetch(`/classes/${classId}/students`);
}

export async function getClassAnalytics(classId: string) {
  return apiFetch(`/classes/${classId}/analytics`);
}
