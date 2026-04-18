import { redirect } from "next/navigation";

import { ClassDashboard } from "@/components/classes/class-dashboard";
import { ErrorPanel } from "@/components/ui/error-panel";
import { ApiRequestError, getClassAnalytics, getClassStudents } from "@/lib/server-api";

export default async function ClassDashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const [analytics, students] = await Promise.all([getClassAnalytics(id), getClassStudents(id)]);

    return <ClassDashboard analytics={analytics} students={students} />;
  } catch (error) {
    if (error instanceof ApiRequestError && (error.status === 401 || error.status === 403)) {
      redirect("/login");
    }

    return (
      <ErrorPanel
        title="Unable to load class dashboard"
        message={
          error instanceof ApiRequestError
            ? error.detail
            : "The selected class dashboard could not be loaded. Check the backend server and try again."
        }
      />
    );
  }
}
