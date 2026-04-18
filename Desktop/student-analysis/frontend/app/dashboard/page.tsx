import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  if (cookieStore.get("auth_token")?.value) {
    redirect("/classes");
  }
  redirect("/login");
}
