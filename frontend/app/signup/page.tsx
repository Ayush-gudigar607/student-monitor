import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <AuthShell
      title="Create your school account"
      subtitle="Provision teacher or admin access with strong credentials and clean, role-aware onboarding."
    >
      <SignupForm />
    </AuthShell>
  );
}
