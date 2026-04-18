import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthShell
      title="Sign in to your workspace"
      subtitle="Use your school credentials to access protected analytics, role-based dashboards, and class data."
    >
      <LoginForm />
    </AuthShell>
  );
}
