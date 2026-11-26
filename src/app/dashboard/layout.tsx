import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard-shell";
import { isAdminEmail } from "@/lib/admin";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/masuk?next=/dashboard");
  }

  if (!user.hasPaidAccess) {
    redirect("/pembayaran");
  }

  return (
    <DashboardShell
      userName={user.name}
      userEmail={user.email}
      accessCode={user.accessCode}
      isAdmin={isAdminEmail(user.email)}
    >
      {children}
    </DashboardShell>
  );
}
