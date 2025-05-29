import { Roles } from '@/features/auth/roles/roles.enum'
import { Header } from "@/shared/employee/components/header/Header";
import { Sidebar } from "@/shared/employee/components/sidebar/SideBar";
import { getUser } from "@/helpers/session";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getUser()

  if (user === null) {
    redirect("/auth/login")
  }

  if (user.roleId !== Roles.Empleado) {
    redirect("/dashboard")
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