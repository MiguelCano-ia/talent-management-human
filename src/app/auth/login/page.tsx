import { LoginForm } from "@/features/auth/components/LoginForm"
import { getUser } from "@/helpers/session"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const user = await getUser()

  if (user !== null) {
    if (user?.roleId === 3) {
      redirect("/employee/dashboard")
    } else if (user?.roleId === 4) {
      redirect("/dashboard")
    }
  }

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 xl:w-2/3 bg-primary  items-center justify-center p-8">
        <h1 className="text-3xl font-bold text-center text-white">Bienvenido al sistema de Recursos Humanos</h1>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-card text-card-foreground p-8 h-dvh">
        <LoginForm />
      </div>
    </main>
  )
}
