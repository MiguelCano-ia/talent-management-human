import { Sidebar } from "@/shared/admin/components/sidebar/SideBar";
import { Header } from "@/shared/admin/components/header/Header";
import { getUser } from "@/helpers/session";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (user === null) {
    redirect("/auth/login");
  }

  if (user.roleId !== 4) {
    redirect("/employee/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  );
}
