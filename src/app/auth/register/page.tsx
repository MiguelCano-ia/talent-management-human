import { Roles } from '@/features/auth/roles/roles.enum'
import { RegisterForm } from "@/features/auth/components/RegiserForm";
import { getUser } from "@/helpers/session";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUser()

  if (user === null) {
    redirect("/auth/login")
  }

  if (user.roleId !== Roles.Administrativo) {
    redirect("/employee/dashboard")
  }

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-10">
      <RegisterForm />
    </main>
  );
}