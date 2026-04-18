import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ClassSelectionGrid } from "@/components/classes/class-selection-grid";
import { ErrorPanel } from "@/components/ui/error-panel";
import { ApiRequestError, getClasses } from "@/lib/server-api";

export default async function ClassesPage() {
  const cookieStore = await cookies();
  const role = cookieStore.get("user_role")?.value ?? "admin";
  try {
    const classes = await getClasses();

    if (classes.length === 1) {
      redirect(`/classes/${classes[0].id}`);
    }

    return <ClassSelectionGrid classes={classes} role={role} />;
  } catch (error) {
    if (error instanceof ApiRequestError && (error.status === 401 || error.status === 403)) {
      redirect("/login");
    }

    return (
      <ErrorPanel
        title="Unable to load classes"
        message={
          error instanceof ApiRequestError
            ? error.detail
            : "The class selection page could not load. Check the backend server and try again."
        }
      />
    );
  }
}
